"""
Vercel Serverless Function — proxy para API do Albion Online Data Project.
Rota: /api/prices?items=T6_METALBAR,T6_PLANKS&locations=Caerleon&server=west
"""
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import urllib.request
import json

HOSTS = {
    "west":   "https://west.albion-online-data.com",
    "europe": "https://europe.albion-online-data.com",
    "east":   "https://east.albion-online-data.com",
}

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed   = urlparse(self.path)
        params   = parse_qs(parsed.query)

        items     = params.get("items",     [""])[0]
        server    = params.get("server",    ["west"])[0]
        locations = params.get("locations", ["Caerleon"])[0]

        host = HOSTS.get(server, HOSTS["west"])
        url  = f"{host}/api/v2/stats/prices/{items}.json?locations={locations}"

        try:
            req  = urllib.request.Request(url, headers={"User-Agent": "GallaMaster/2.0"})
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = resp.read()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(data)
        except Exception as e:
            error = json.dumps({"error": str(e)}).encode()
            self.send_response(502)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(error)
