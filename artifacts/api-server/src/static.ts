import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    return;
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use((req, res, next) => {
    if (
      req.path === "/api" ||
      req.path.startsWith("/api/") ||
      (req.method !== "GET" && req.method !== "HEAD")
    ) {
      next();
      return;
    }
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
