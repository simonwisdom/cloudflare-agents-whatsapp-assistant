# Quick Setup Guide - WhatsApp Productivity AI Agent

This guide helps you quickly set up and test the WhatsApp Productivity AI Agent for evaluation.

## 🎯 What This Project Does

Transforms WhatsApp into an AI-powered productivity tool that:

- Analyzes messages and extracts action items
- Categorizes communications (business vs social)
- Generates voice summaries via ElevenLabs
- Enables AI-assisted message management

## ⚡ Fastest Setup (10 minutes)

### Prerequisites Check

```bash
# Check required tools
node --version  # Should be 18+
python --version  # Should be 3.6+
go version  # Should be 1.19+
```

### Step 1: Install Dependencies

```bash
# Clone and setup
git clone <repository>
cd ai-agent-template
npm install

# Install UV if not present
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Step 2: Configure Environment

Create `.dev.vars` file:

```bash
ANTHROPIC_API_KEY=<your-key>
ELEVENLABS_API_KEY=<your-key>  # Optional
```

### Step 3: Start Services (4 terminals needed)

**Terminal 1 - WhatsApp Bridge:**

```bash
cd mcp-servers/whatsapp-mcp/whatsapp-bridge
go run main.go
# Scan QR code with WhatsApp mobile app
```

**Terminal 2 - WhatsApp MCP:**

```bash
npx mcp-proxy --port 8000 --shell "cd mcp-servers/whatsapp-mcp/whatsapp-mcp-server && uv run python main.py"
```

**Terminal 3 - ElevenLabs MCP (Optional):**

```bash
# Only if you want voice summaries
export $(grep -v '^#' .dev.vars | xargs)
npx mcp-proxy --port 8081 --shell "mcp-servers/elevenlabs/.venv/bin/python -m elevenlabs_mcp.server"
```

**Terminal 4 - AI Agent:**

```bash
npm start
# Opens at http://localhost:5173
```

## 🧪 Test Scenarios

### 1. Basic Message Analysis

Type in chat:

```
"Analyze my recent WhatsApp messages"
```

### 2. Search Specific Contact

```
"Show me messages from [contact name]"
```

### 3. Voice Summary (if ElevenLabs configured)

```
"Give me a voice summary of today's important messages"
```

### 4. Send a Message

```
"Send a message to [contact] saying [message]"
```

## 🔍 What to Look For

1. **Message Categorization**: See how it splits business vs social
2. **Action Extraction**: Notice deadline and task identification
3. **Table Format**: Clean presentation of organized data
4. **Voice Integration**: Natural language summaries
5. **Privacy**: All data stays local (check no external calls)

## 🚨 Common Issues & Fixes

### WhatsApp QR Code Issues

- Make sure you're using personal WhatsApp (not Business)
- QR code expires in 20 seconds, scan quickly
- If expired, restart the bridge

### No Messages Showing

- Initial sync can take 1-2 minutes
- Check Terminal 1 for sync progress
- Try: "List my recent chats"

### Voice Not Working

- ElevenLabs is optional
- Check API key is set correctly
- Verify Terminal 3 shows no errors

### Connection Refused

- Ensure all services are running
- Check ports 8000 and 8081 are free
- Try: `lsof -i :8000` to check port usage

## 📊 Architecture Overview

```
User Interface (React)
        ↓
Cloudflare AI Agent (Claude)
        ↓
MCP Orchestration Layer
    ↓         ↓
WhatsApp   ElevenLabs
   MCP        MCP
    ↓         ↓
WhatsApp   Voice
  Bridge    API
```


## 🔗 Quick Links

- Main Interface: http://localhost:5173
- Fiberplane Debug: http://localhost:5173/fp
- WhatsApp Bridge Logs: Terminal 1
- MCP Server Status: Terminals 2 & 3

---

**Need Help?** The architecture is modular - if one component fails, others continue working. Focus on the core WhatsApp analysis features for evaluation.
