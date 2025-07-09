import { routeAgentRequest, type Schedule } from "agents";

import { AIChatAgent } from "agents/ai-chat-agent";
import {
  createDataStreamResponse,
  generateId,
  streamText,
  type StreamTextOnFinishCallback,
  type ToolSet,
} from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { processToolCalls } from "./utils";
import { tools, executions } from "./tools";
// import { env } from "cloudflare:workers";
import { fiberplane, withInstrumentation } from "@fiberplane/agents";

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const model = anthropic("claude-3-5-sonnet-20240620");
// Cloudflare AI Gateway
// const openai = createOpenAI({
//   apiKey: env.OPENAI_API_KEY,
//   baseURL: env.GATEWAY_BASE_URL,
// });

/**
 * Chat Agent implementation that handles real-time AI chat interactions
 */
//export
export class ChatInternal extends AIChatAgent<Env> {
  /**
   * Handles incoming chat messages and manages the response stream
   * @param onFinish - Callback function executed when streaming completes
   */

  async onChatMessage(
    onFinish: StreamTextOnFinishCallback<ToolSet>,
    options?: { abortSignal?: AbortSignal }
  ) {
    // const mcpConnection = await this.mcp.connect(
    //   "https://path-to-mcp-server/sse"
    // );

    // Collect all tools, including MCP tools
    const allTools = {
      ...tools,
      ...this.mcp.unstable_getAITools(),
    };

    // Create a streaming response that handles both text and tool outputs
    const dataStreamResponse = createDataStreamResponse({
      execute: async (dataStream) => {
        // Process any pending tool calls from previous messages
        // This handles human-in-the-loop confirmations for tools
        const processedMessages = await processToolCalls({
          messages: this.messages,
          dataStream,
          tools: allTools,
          executions,
        });

        // Stream the AI response using GPT-4
        const result = streamText({
          model,
          system: `You are a productivity assistant. Your function is to analyze my WhatsApp messages and organize them into business and social categories, summarizing key information in structured table format.

          Scan all recent messages for business-related topics. Extract actionable tasks, deadlines, commitments, and follow-ups and populate 'business_communications'.

Scan all recent messages for social conversations. Extract any plans, events, or to-dos and populate 'social_interactions'.

          Format your response as a markdown table with the following structure:

          | Category | Topic | Action Items | Deadlines | Contacts |
          |----------|-------|--------------|-----------|----------|
          | Business | [topic] | [action items] | [deadlines] | [contacts] |
          | Social | [topic] | [plans/events] | [dates] | [contacts] |

         

Finally, create a concise 2-3 sentence summary of the most important business and social points. This summary will be read aloud, so it should be natural and easy to understand. Populate the 'voice_summary' field with this text. Make this summary action oriented, use phrases like "you should", "you need to", "you can", "you might want to", etc.`,
          messages: processedMessages,
          tools: allTools,
          onFinish: async (args) => {
            onFinish(
              args as Parameters<StreamTextOnFinishCallback<ToolSet>>[0]
            );
            // await this.mcp.closeConnection(mcpConnection.id);
          },
          onError: (error) => {
            console.error("Error while streaming:", error);
          },
          maxSteps: 10,
        });

        // Merge the AI response stream with tool execution outputs
        result.mergeIntoDataStream(dataStream);
      },
    });

    return dataStreamResponse;
  }
  async executeTask(description: string, task: Schedule<string>) {
    await this.saveMessages([
      ...this.messages,
      {
        id: generateId(),
        role: "user",
        content: `Running scheduled task: ${description}`,
        createdAt: new Date(),
      },
    ]);
  }
}

export const Chat = withInstrumentation(ChatInternal as any);

/**
 * Worker entry point that routes incoming requests to the appropriate handler
 */
export default {
  fetch: fiberplane(
    async (request: Request, env: Env, ctx: ExecutionContext) => {
      const url = new URL(request.url);

      if (url.pathname === "/check-anthropic-key") {
        const hasAnthropicKey = !!process.env.ANTHROPIC_API_KEY;
        return new Response(hasAnthropicKey ? "true" : "false", {
          headers: { "Content-Type": "text/plain" },
        });
      }
      if (!process.env.ANTHROPIC_API_KEY) {
        console.error(
          "ANTHROPIC_API_KEY is not set, don't forget to set it locally in .dev.vars, and use `wrangler secret bulk .dev.vars` to upload it to production"
        );
      }
      return (
        // Route the request to our agent or return 404 if not found
        (await routeAgentRequest(request, env)) ||
        new Response("Not found", { status: 404 })
      );
    }
  ),
} satisfies ExportedHandler<Env>;

// export default {
//   async fetch(request: Request, env: Env, ctx: ExecutionContext) {
//     const url = new URL(request.url);

//     if (url.pathname === "/check-open-ai-key") {
//       const hasOpenAIKey = !!process.env.OPENAI_API_KEY;
//       return Response.json({
//         success: hasOpenAIKey,
//       });
//     }
//     if (!process.env.OPENAI_API_KEY) {
//       console.error(
//         "OPENAI_API_KEY is not set, don't forget to set it locally in .dev.vars, and use `wrangler secret bulk .dev.vars` to upload it to production"
//       );
//     }
//     return (
//       // Route the request to our agent or return 404 if not found
//       (await routeAgentRequest(request, env)) ||
//       new Response("Not found", { status: 404 })
//     );
//   },
// } satisfies ExportedHandler<Env>;
