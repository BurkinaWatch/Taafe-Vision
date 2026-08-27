import { spawn } from "node:child_process";
import { createConnection } from "node:net";
import { setTimeout as delay } from "node:timers/promises";

const host = process.env.SMOKE_HOST || "127.0.0.1";
const port = Number(process.env.SMOKE_PORT || "5000");
const baseUrl = `http://${host}:${port}`;
const startupTimeoutMs = 30_000;
const output = [];

if (!Number.isInteger(port) || port < 1 || port > 65_535) {
  throw new Error(`SMOKE_PORT must be a valid TCP port, received "${port}"`);
}

const assertPortAvailable = () =>
  new Promise((resolve, reject) => {
    const socket = createConnection({ host, port });

    socket.once("connect", () => {
      socket.destroy();
      reject(new Error(`Port ${port} is already in use; stop the existing server first.`));
    });
    socket.once("error", (error) => {
      socket.destroy();
      if (error.code === "ECONNREFUSED") {
        resolve();
      } else {
        reject(new Error(`Unable to check port ${port}: ${error.message}`));
      }
    });
    socket.setTimeout(2_000, () => {
      socket.destroy();
      reject(new Error(`Timed out while checking port ${port}.`));
    });
  });

try {
  await assertPortAvailable();
} catch (error) {
  console.error(`Smoke check failed: ${error.message}`);
  process.exit(1);
}

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const server = spawn(npmCommand, ["run", "dev"], {
  env: {
    ...process.env,
    NODE_ENV: "development",
    PORT: String(port),
  },
  stdio: ["ignore", "pipe", "pipe"],
  detached: process.platform !== "win32",
});

const captureOutput = (chunk) => {
  output.push(chunk.toString());
  if (output.length > 80) output.shift();
};

server.stdout.on("data", captureOutput);
server.stderr.on("data", captureOutput);

const signalServer = (signal) => {
  try {
    if (process.platform === "win32") {
      server.kill(signal);
    } else if (server.pid) {
      process.kill(-server.pid, signal);
    }
  } catch (error) {
    if (error.code !== "ESRCH") throw error;
  }
};

const stopServer = () =>
  new Promise((resolve) => {
    const forceStop = setTimeout(() => {
      signalServer("SIGKILL");
      finish();
    }, 5_000);

    const finish = () => {
      clearTimeout(forceStop);
      server.stdout.destroy();
      server.stderr.destroy();
      resolve();
    };

    server.once("exit", finish);
    server.once("error", finish);
    signalServer("SIGTERM");
  });

const request = (path) =>
  fetch(`${baseUrl}${path}`, {
    signal: AbortSignal.timeout(2_000),
  });

const waitForServer = async () => {
  const deadline = Date.now() + startupTimeoutMs;
  let lastError;

  while (Date.now() < deadline) {
    if (server.exitCode !== null || server.signalCode !== null) {
      throw new Error("The development server exited before it became ready.");
    }

    try {
      const response = await request("/");
      await delay(100);
      if (server.exitCode !== null || server.signalCode !== null) {
        throw new Error("The smoke-test server exited after the port became reachable.");
      }
      return response;
    } catch (error) {
      lastError = error;
      await delay(250);
    }
  }

  throw new Error(
    `The server did not respond on port ${port} within ${startupTimeoutMs / 1000}s: ${lastError?.message || "unknown error"}`,
  );
};

try {
  const homepageResponse = await waitForServer();
  if (!homepageResponse.ok) {
    throw new Error(`Homepage returned HTTP ${homepageResponse.status}.`);
  }

  const homepage = await homepageResponse.text();
  if (!homepageResponse.headers.get("content-type")?.includes("text/html")) {
    throw new Error("Homepage did not return an HTML response.");
  }
  if (!homepage.includes('<div id="root">')) {
    throw new Error("Homepage HTML is missing the application root.");
  }

  const projectsResponse = await request("/api/projects");
  if (!projectsResponse.ok) {
    throw new Error(`Projects API returned HTTP ${projectsResponse.status}.`);
  }

  const projects = await projectsResponse.json();
  if (!Array.isArray(projects)) {
    throw new Error("Projects API did not return a JSON array.");
  }

  console.log(
    `Smoke check passed: port ${port}, homepage, and /api/projects (${projects.length} projects).`,
  );
} catch (error) {
  console.error(`Smoke check failed: ${error.message}`);
  if (output.length > 0) {
    console.error("\nServer output:\n" + output.join(""));
  }
  process.exitCode = 1;
} finally {
  await stopServer();
}