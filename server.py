#!/usr/bin/env python3
"""
Simple HTTP Server for Grammar Games Prototype
Runs without requiring Xcode Developer Tools
"""

import http.server
import socketserver
import os
import webbrowser
import json
import csv
from datetime import datetime, timezone
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

    # CORS preflight support
    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Content-Length', '0')
        self.end_headers()

    def do_POST(self):
        path = (self.path or '').split('?')[0].rstrip('/').lower()
        if path == '/api/subscribe':
            return self.handle_subscribe()
        # Fallback: not found for other POST paths
        self.send_error(404, 'Not Found')

    def handle_subscribe(self):
        try:
            length = int(self.headers.get('Content-Length', '0'))
        except Exception:
            length = 0
        raw = self.rfile.read(length) if length > 0 else b''

        try:
            payload = json.loads(raw.decode('utf-8') or '{}')
        except Exception:
            payload = {}

        name = str(payload.get('name', '')).strip()
        email = str(payload.get('email', '')).strip()
        age = str(payload.get('age', '')).strip()
        lang = str(payload.get('lang', '')).strip().lower() or 'de'
        variant = str(payload.get('variant', '')).strip().upper() or 'A'

        # Basic validation
        if not email or '@' not in email:
            self.send_response(400)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps({'ok': False, 'error': 'invalid_email'}).encode('utf-8'))
            return

        received_at = datetime.now(timezone.utc).isoformat()
        client_ip = getattr(self, 'client_address', ('', ''))[0]
        user_agent = self.headers.get('User-Agent', '')

        record = {
            'receivedAt': received_at,
            'name': name,
            'email': email,
            'age': age,
            'lang': lang,
            'variant': variant,
            'clientIp': client_ip,
            'userAgent': user_agent,
        }

        # Persist to ./data/subscribers.ndjson and .csv
        data_dir = DIRECTORY / 'data'
        try:
            data_dir.mkdir(exist_ok=True)
        except Exception:
            pass

        # NDJSON
        try:
            with (data_dir / 'subscribers.ndjson').open('a', encoding='utf-8') as f:
                f.write(json.dumps(record, ensure_ascii=False) + "\n")
        except Exception as e:
            print(f"⚠️  Failed to write NDJSON: {e}")

        # CSV
        csv_path = data_dir / 'subscribers.csv'
        write_header = not csv_path.exists()
        try:
            with csv_path.open('a', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                if write_header:
                    writer.writerow(['receivedAt','name','email','age','lang','variant','clientIp','userAgent'])
                writer.writerow([
                    received_at, name, email, age, lang, variant, client_ip, user_agent
                ])
        except Exception as e:
            print(f"⚠️  Failed to write CSV: {e}")

        # Respond OK
        self.send_response(201)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.end_headers()
        self.wfile.write(json.dumps({'ok': True}).encode('utf-8'))

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
