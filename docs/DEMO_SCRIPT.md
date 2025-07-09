# Demo Script

This script helps you recreate the demo and showcase the WhatsApp AI Productivity Assistant.

## Pre-Demo Setup

### 1. Environment Check

```bash
# Verify all services are running
curl http://localhost:5173  # Main app
curl http://localhost:3001/health  # WhatsApp bridge
curl http://localhost:8000  # WhatsApp MCP
curl http://localhost:8081  # ElevenLabs MCP
```

### 2. WhatsApp Connection

- Ensure WhatsApp is connected via QR code
- Have some test messages ready in your WhatsApp
- Mix of business and personal messages works best

### 3. Demo Data Preparation

Ideal WhatsApp messages for demo:

- **Business messages**: Meeting requests, project updates, client communications
- **Personal messages**: Friends, family, casual conversations
- **Mixed content**: Messages with dates, tasks, contact information

## Demo Flow

### Opening (30 seconds)

```
"Hi! I'm going to show you my WhatsApp AI Productivity Assistant that I built
in 1 hour for the Cloudflare MCP Hackathon. This tool transforms your WhatsApp
into an AI-powered productivity hub."
```

**Show**:

- Open the app at localhost:5173
- Point out the clean, modern interface
- Mention it's built on Cloudflare Workers with Claude AI

### Feature 1: WhatsApp Integration (45 seconds)

```
"First, let me show you how it connects to WhatsApp. I've already connected
my personal WhatsApp account via QR code authentication."
```

**Demo**:

```
User: "Search my WhatsApp messages from the last week"
```

**Show**:

- Real-time streaming response
- AI analyzing actual WhatsApp messages
- Mention privacy: all data stays local

### Feature 2: Message Categorization (60 seconds)

```
"The AI automatically categorizes messages into business and social categories,
helping you focus on what matters most."
```

**Demo**:

```
User: "Analyze my recent messages and categorize them as business or social"
```

**Show**:

- AI processing messages
- Clear categorization with explanations
- Identification of key business contacts

### Feature 3: Action Item Extraction (45 seconds)

```
"But it goes beyond just categorization - it extracts actionable insights."
```

**Demo**:

```
User: "Extract action items and deadlines from my business messages"
```

**Show**:

- AI identifying tasks and deadlines
- Structured output with priorities
- Contact information extraction

### Feature 4: Voice Summaries (60 seconds)

```
"For busy professionals, I added voice summaries using ElevenLabs text-to-speech."
```

**Demo**:

```
User: "Create a voice summary of today's important messages"
```

**Show**:

- AI generating text summary
- Conversion to speech
- Audio playback of the summary

### Technical Highlights (45 seconds)

```
"Let me show you some of the technical architecture that makes this possible."
```

**Show**:

- Multiple terminal windows with services running
- Mention the tech stack: Cloudflare Workers, Claude AI, MCP protocol
- Point out the modular architecture

### Human-in-the-Loop Safety (30 seconds)

```
"For safety, sensitive actions require confirmation."
```

**Demo**:

```
User: "Send a message to John saying I'll be late"
```

**Show**:

- AI requesting confirmation
- Clear explanation of what will happen
- User approval process

## Demo Variations

### Quick Demo (2 minutes)

Focus on:

1. WhatsApp connection
2. Message categorization
3. Voice summary

### Technical Demo (5 minutes)

Include:

1. All features above
2. Architecture explanation
3. MCP server integration
4. Code walkthrough

### Business Demo (3 minutes)

Emphasize:

1. Productivity benefits
2. Time savings
3. Privacy and security
4. Scalability

## Common Demo Scenarios

### Scenario 1: Business Professional

```
"Show me all messages from my client meetings this week and create action items"
```

### Scenario 2: Personal Productivity

```
"Summarize my family group chat and identify any important dates or events"
```

### Scenario 3: Mixed Analysis

```
"Analyze all my messages and separate urgent business items from social updates"
```

## Demo Tips

### Do's

- Start with a clean chat interface
- Use real WhatsApp messages for authenticity
- Highlight the streaming responses
- Mention the 1-hour build time
- Show multiple features working together

### Don'ts

- Don't use sensitive personal messages
- Don't demo with empty WhatsApp
- Don't skip the voice feature - it's impressive
- Don't forget to mention privacy/security

## Troubleshooting During Demo

### If WhatsApp Disconnects

```
"Let me quickly reconnect WhatsApp - this happens sometimes during demos"
```

- Show the QR code process
- Mention this is a security feature

### If MCP Server Fails

```
"The beauty of the MCP architecture is modularity - let me restart this service"
```

- Restart the specific MCP server
- Continue with other features

### If AI Response is Slow

```
"Claude is processing a lot of message data here - this shows the real-time analysis"
```

- Use the delay to explain the processing
- Mention edge computing benefits

## Post-Demo Q&A

### Expected Questions

**Q: "How does it handle privacy?"**
A: "All processing happens locally - your WhatsApp data never leaves your machine. The MCP servers run on localhost."

**Q: "Can it integrate with other messaging platforms?"**
A: "Absolutely! The MCP architecture makes it easy to add Slack, Teams, or any other platform."

**Q: "What about costs?"**
A: "It runs on Cloudflare's free tier for most usage. You only pay for the AI API calls."

**Q: "How long did this really take to build?"**
A: "Honestly, about 1 hour! The Cloudflare template and MCP protocol made it incredibly fast."

## Follow-up Actions

After the demo:

1. Share the GitHub repository
2. Provide setup instructions
3. Offer to discuss technical details
4. Collect feedback for improvements

## Demo Recording Tips

If recording:

- Use high-quality screen recording
- Include audio commentary
- Show terminal windows for technical credibility
- Keep it under 3 minutes for social media
- Export at 1080p minimum

## Success Metrics

A successful demo should:

- Show all 4 core features working
- Demonstrate real-time processing
- Highlight the privacy benefits
- Explain the technical architecture
- Leave viewers impressed with the rapid development
