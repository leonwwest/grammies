#!/usr/bin/env python3
"""
Simple HTTP Server for Grammar Games Prototype
Runs without requiring Xcode Developer Tools
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Configuration
PORT = 8080
DIRECTORY = Path(__file__).parent

class SimpleHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def start_server():
    """Start the HTTP server and open browser"""
    try:
        with socketserver.TCPServer(("", PORT), SimpleHTTPRequestHandler) as httpd:
            print(f"🚀 Grammar Games Prototype Server")
            print(f"📍 Serving at: http://localhost:{PORT}")
            print(f"📁 Directory: {DIRECTORY}")
            print(f"🌐 Opening browser...")
            print(f"⏹️  Press Ctrl+C to stop server")
            
            # Open browser automatically
            webbrowser.open(f'http://localhost:{PORT}')
            
            # Start serving
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n👋 Server stopped")
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        print("\n💡 Alternative: Open index.html directly in browser")

if __name__ == "__main__":
    # Change to script directory
    os.chdir(DIRECTORY)
    start_server()
