#!/bin/bash

# WhatsApp AI Productivity Assistant Setup Script
# This script automates the setup process for the application

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check version
check_version() {
    local cmd=$1
    local min_version=$2
    local current_version

    if command_exists "$cmd"; then
        case $cmd in
            "node")
                current_version=$(node --version | sed 's/v//')
                ;;
            "python" | "python3")
                current_version=$(python3 --version | cut -d' ' -f2)
                ;;
            "go")
                current_version=$(go version | cut -d' ' -f3 | sed 's/go//')
                ;;
        esac
        
        if [ "$(printf '%s\n' "$min_version" "$current_version" | sort -V | head -n1)" = "$min_version" ]; then
            print_success "$cmd version $current_version is sufficient"
            return 0
        else
            print_error "$cmd version $current_version is below minimum required $min_version"
            return 1
        fi
    else
        print_error "$cmd is not installed"
        return 1
    fi
}

# Print welcome message
echo "🤖 WhatsApp AI Productivity Assistant Setup"
echo "=========================================="
echo ""

# Check prerequisites
print_status "Checking prerequisites..."

# Check Node.js
if ! check_version "node" "18.0.0"; then
    print_error "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check Python
if ! check_version "python3" "3.11.0"; then
    print_error "Please install Python 3.11+ from https://python.org/"
    exit 1
fi

# Check Go
if ! check_version "go" "1.21.0"; then
    print_error "Please install Go 1.21+ from https://golang.org/"
    exit 1
fi

# Check for uv
if ! command_exists uv; then
    print_warning "uv package manager not found, installing..."
    pip install uv
fi

# Check for wrangler
if ! command_exists wrangler; then
    print_warning "Wrangler CLI not found, installing..."
    npm install -g wrangler
fi

print_success "All prerequisites are met!"
echo ""

# Install main dependencies
print_status "Installing Node.js dependencies..."
npm install

# Setup environment file
print_status "Setting up environment configuration..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    print_success "Created .env file from template"
    print_warning "Please edit .env file with your API keys before continuing"
else
    print_warning ".env file already exists"
fi

# Setup WhatsApp MCP Server
print_status "Setting up WhatsApp MCP server..."
cd mcp-servers/whatsapp-mcp/whatsapp-mcp-server
if [ ! -f "pyproject.toml" ]; then
    print_error "WhatsApp MCP server files not found"
    exit 1
fi

uv sync
print_success "WhatsApp MCP server Python dependencies installed"

# Setup WhatsApp Bridge
print_status "Setting up WhatsApp bridge..."
cd ../whatsapp-bridge
if [ ! -f "go.mod" ]; then
    print_error "WhatsApp bridge files not found"
    exit 1
fi

go mod tidy
print_success "WhatsApp bridge Go dependencies installed"

# Setup ElevenLabs MCP Server
cd ../../elevenlabs
print_status "Setting up ElevenLabs MCP server..."
if [ ! -f "requirements.txt" ]; then
    print_warning "ElevenLabs MCP server not found, skipping..."
else
    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
    deactivate
    print_success "ElevenLabs MCP server Python dependencies installed"
fi

# Return to project root
cd ../../..

# Run basic checks
print_status "Running basic checks..."
npm run check
npm run types

print_success "Setup completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Edit .env file with your API keys:"
echo "   - ANTHROPIC_API_KEY (required)"
echo "   - ELEVENLABS_API_KEY (optional)"
echo ""
echo "2. Start the application:"
echo "   Run these commands in separate terminals:"
echo ""
echo "   Terminal 1 (Main app):"
echo "   npm start"
echo ""
echo "   Terminal 2 (WhatsApp bridge):"
echo "   cd mcp-servers/whatsapp-mcp/whatsapp-bridge && go run main.go"
echo ""
echo "   Terminal 3 (WhatsApp MCP server):"
echo "   npx mcp-proxy --port 8000 --shell \"cd mcp-servers/whatsapp-mcp/whatsapp-mcp-server && uv run python main.py\""
echo ""
echo "   Terminal 4 (ElevenLabs MCP server - optional):"
echo "   npx mcp-proxy --port 8081 --shell \"mcp-servers/elevenlabs/.venv/bin/python -m elevenlabs_mcp.server\""
echo ""
echo "3. Connect WhatsApp:"
echo "   - Open http://localhost:3001 in your browser"
echo "   - Scan QR code with WhatsApp mobile app"
echo "   - Return to main app at http://localhost:5173"
echo ""
echo "📖 For detailed instructions, see:"
echo "   - README.md for quick start"
echo "   - docs/SETUP_GUIDE.md for comprehensive setup"
echo "   - docs/DEMO_SCRIPT.md for usage examples"
echo ""
print_success "Happy coding! 🚀"