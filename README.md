# 🤖 WhatsApp AI Productivity Assistant

> Transform your WhatsApp into an AI-powered productivity hub that automatically categorizes messages, extracts action items, and provides voice summaries.

## 🎥 Demo Video
<video controls src="https://github.com/user-attachments/assets/d09a5a8d-29b1-48fc-8f9c-926c1eb7a835" style="max-width: 100%;"></video>


## 🛠️ What I Built

This hackathon project extends the Cloudflare AI Agent template with:

- **WhatsApp MCP Integration**: Built a complete MCP server using Go for the bridge and Python for the server, enabling full WhatsApp access
- **ElevenLabs Voice Integration**: Added text-to-speech capabilities for hands-free updates
- **Custom AI Prompting**: Designed prompts specifically for productivity analysis and message categorization
- **Real-time Streaming**: Implemented streaming responses for instant feedback
- **Tool System**: Created auto-executing and confirmation-required tools for safety

## ✨ Features

- 📱 **WhatsApp Integration** - Connect your personal WhatsApp account via QR code
- 🧠 **AI-Powered Analysis** - Automatically categorize messages as business or social
- ✅ **Action Item Extraction** - Identify tasks, deadlines, and important contacts
- 🎙️ **Voice Summaries** - Get audio briefings via ElevenLabs text-to-speech
- ⚡ **Real-Time Processing** - Instant analysis powered by Claude
- 🌐 **Edge Deployment** - Runs on Cloudflare Workers for global performance

## 🏗️ Architecture

This project combines several cutting-edge technologies:

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   WhatsApp      │────▶│  WhatsApp MCP    │────▶│                 │
│   Account       │     │  Server (Go+Py)  │     │                 │
└─────────────────┘     └──────────────────┘     │                 │
                                                  │  Cloudflare     │
┌─────────────────┐     ┌──────────────────┐     │  AI Agent       │
│   Browser UI    │────▶│  React + Vite    │────▶│  (Claude AI)    │
│   (User)        │     │  Frontend        │     │                 │
└─────────────────┘     └──────────────────┘     │                 │
                                                  │                 │
┌─────────────────┐     ┌──────────────────┐     │                 │
│   Text Output   │◀────│  ElevenLabs MCP  │◀────│                 │
│   (Voice)       │     │  Server          │     │                 │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.11+ with `uv` package manager
- Go 1.21+
- Cloudflare account (free tier works)
- Anthropic API key
- WhatsApp account
- ElevenLabs API key (optional, for voice features)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/whatsapp-ai-assistant.git
   cd whatsapp-ai-assistant
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Start the MCP servers**

   In separate terminals:

   ```bash
   # Terminal 1: WhatsApp Bridge (Go)
   cd mcp-servers/whatsapp-mcp/whatsapp-bridge
   go run main.go
   ```

   ```bash
   # Terminal 2: WhatsApp MCP Server
   npx mcp-proxy --port 8000 --shell "cd mcp-servers/whatsapp-mcp/whatsapp-mcp-server && uv run python main.py"
   ```

   ```bash
   # Terminal 3: ElevenLabs MCP Server (optional)
   npx mcp-proxy --port 8081 --shell "mcp-servers/elevenlabs/.venv/bin/python -m elevenlabs_mcp.server"
   ```

5. **Start the development server**

   ```bash
   npm start
   ```

6. **Connect WhatsApp**
   - Open the WhatsApp Bridge UI (http://localhost:3001)
   - Scan the QR code with WhatsApp mobile
   - Return to the main app (http://localhost:5173)

## 📖 Usage

1. **Ask the AI to analyze your WhatsApp messages:**

   ```
   "Search my WhatsApp messages from the last week and categorize them"
   ```

2. **Get a productivity summary:**

   ```
   "Summarize my business messages and extract action items"
   ```

3. **Generate voice briefing:**
   ```
   "Create a voice summary of today's important messages"
   ```

### Technical Highlights

- Leveraged Model Context Protocol (MCP) for extensible integrations
- Built on Cloudflare Workers with Durable Objects for state persistence
- Implemented human-in-the-loop confirmations for sensitive operations

## 🔧 Configuration

See [docs/SETUP_GUIDE.md](docs/SETUP_GUIDE.md) for detailed configuration options.

## 📚 Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)
- [Setup Guide](docs/SETUP_GUIDE.md)
- [Demo Script](docs/DEMO_SCRIPT.md)


## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## 🔮 Future Improvements

- [ ] Multi-language support for global users
- [ ] Calendar integration for automatic scheduling
- [ ] Email digest generation
- [ ] Slack/Teams integration
- [ ] Custom notification rules
- [ ] Analytics dashboard

## 👨‍💻 About

Built in 1 hour for the Cloudflare MCP Hackathon. This project demonstrates the power of combining AI agents with real-world messaging platforms to create practical productivity tools.
