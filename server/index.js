const http = require("http");
const fs = require("fs");
const path = require("path");
const router = require("./router");

const clientBase = path.join(__dirname, "../client");
const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  const ext = path.extname(req.url);
  const staticTypes = [
    ".html",
    ".css",
    ".js",
    ".png",
    ".jpg",
    ".jpeg",
    ".svg",
    ".ico",
  ];
  // Serve static files from client/
  if (
    staticTypes.includes(ext) ||
    req.url === "/" ||
    req.url.startsWith("/assets/")
  ) {
    let filePath = path.join(
      clientBase,
      req.url === "/" ? "/index.html" : req.url,
    );
    const ext = path.extname(filePath) || ".html";
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      res.writeHead(200, { "Content-Type": mimeTypes[ext] || "text/plain" });
      res.end(data);
    });
    return;
  }

  if (req.url.startsWith("/api/")) {
    // Remove /api prefix for router
    req.url = req.url.replace(/^\/api/, "");
    router(req, res);
    return;
  }

  // SPA fallback: serve index.html for all client-side routes
  const indexPath = path.join(clientBase, "index.html");
  fs.readFile(indexPath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Server error");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`),
);
