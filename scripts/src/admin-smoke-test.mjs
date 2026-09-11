import { randomUUID } from "node:crypto";

const baseUrl = (
  process.env.SMOKE_BASE_URL || "http://127.0.0.1:20053"
).replace(/\/+$/, "");
const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;
const requestTimeoutMs = Number(process.env.SMOKE_TIMEOUT_MS || "10000");

if (!username || !password) {
  throw new Error(
    "ADMIN_USERNAME and ADMIN_PASSWORD must be configured for the admin smoke test.",
  );
}

if (!Number.isInteger(requestTimeoutMs) || requestTimeoutMs < 1) {
  throw new Error(
    `SMOKE_TIMEOUT_MS must be a positive integer, received "${requestTimeoutMs}".`,
  );
}

let sessionCookie;
let temporaryProjectId;

function url(path) {
  return new URL(path, `${baseUrl}/`).toString();
}

function getSetCookieHeader(response) {
  if (typeof response.headers.getSetCookie === "function") {
    return response.headers.getSetCookie();
  }

  const setCookie = response.headers.get("set-cookie");
  return setCookie ? [setCookie] : [];
}

function updateSessionCookie(response) {
  for (const value of getSetCookieHeader(response)) {
    const cookie = value.split(";", 1)[0];
    if (cookie.startsWith("connect.sid=")) {
      sessionCookie = cookie;
    }
  }
}

async function request(path, options = {}) {
  const headers = new Headers(options.headers);
  if (sessionCookie) {
    headers.set("Cookie", sessionCookie);
  }

  const response = await fetch(url(path), {
    ...options,
    headers,
    signal: AbortSignal.timeout(requestTimeoutMs),
  });
  updateSessionCookie(response);
  return response;
}

async function readJson(response, step) {
  try {
    return await response.json();
  } catch {
    throw new Error(`${step} returned an invalid JSON response.`);
  }
}

function assertStatus(response, expected, step) {
  if (response.status !== expected) {
    throw new Error(
      `${step} returned HTTP ${response.status}; expected HTTP ${expected}.`,
    );
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function listProjects(step = "Project list") {
  const response = await request("/api/projects");
  assertStatus(response, 200, step);
  const projects = await readJson(response, step);
  assert(Array.isArray(projects), `${step} did not return a JSON array.`);
  return projects;
}

async function deleteTemporaryProject() {
  if (temporaryProjectId === undefined || !sessionCookie) {
    return;
  }

  try {
    const response = await request(`/api/projects/${temporaryProjectId}`, {
      method: "DELETE",
    });
    if (response.status === 204 || response.status === 404) {
      temporaryProjectId = undefined;
    }
  } catch {
    // Preserve the original assertion error. The test reports cleanup failure
    // through the final project-list assertion when the server is reachable.
  }
}

async function run() {
  const initialProjects = await listProjects("Frontend proxy project list");

  const loginResponse = await request("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  assertStatus(loginResponse, 200, "Admin login");

  const loggedInUser = await readJson(loginResponse, "Admin login");
  assert(
    loggedInUser &&
      loggedInUser.username === username &&
      loggedInUser.isAdmin === true,
    "Admin login did not return the configured administrator.",
  );

  const sessionResponse = await request("/api/auth/me");
  assertStatus(sessionResponse, 200, "Admin session check");
  const sessionUser = await readJson(sessionResponse, "Admin session check");
  assert(
    sessionUser &&
      sessionUser.username === username &&
      sessionUser.isAdmin === true,
    "Admin session was not established for the configured administrator.",
  );

  const authenticatedProjects = await listProjects(
    "Authenticated frontend proxy project list",
  );
  assert(
    authenticatedProjects.length === initialProjects.length,
    "Authenticated project list did not match the initial project list.",
  );

  const marker = randomUUID();
  const temporaryProject = {
    title: `Admin smoke project ${marker}`,
    description: "Temporary project created by the admin smoke test.",
    imageUrl: "/images/community-screening.jpg",
    date: "Smoke test",
    isHidden: true,
  };

  const createResponse = await request("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(temporaryProject),
  });
  assertStatus(createResponse, 201, "Temporary project creation");
  const createdProject = await readJson(
    createResponse,
    "Temporary project creation",
  );
  assert(
    Number.isInteger(createdProject?.id),
    "Temporary project creation did not return an ID.",
  );
  assert(
    createdProject.title === temporaryProject.title,
    "Created project title did not match.",
  );
  temporaryProjectId = createdProject.id;

  const editedProject = {
    title: `${temporaryProject.title} (edited)`,
    description: "Updated by the admin smoke test.",
    date: "Smoke test edited",
    isHidden: false,
  };
  const updateResponse = await request(`/api/projects/${temporaryProjectId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editedProject),
  });
  assertStatus(updateResponse, 200, "Temporary project edit");
  const updatedProject = await readJson(
    updateResponse,
    "Temporary project edit",
  );
  assert(
    updatedProject.id === temporaryProjectId,
    "Edited project ID did not match.",
  );
  assert(
    updatedProject.title === editedProject.title,
    "Edited project title did not persist.",
  );
  assert(
    updatedProject.description === editedProject.description,
    "Edited project description did not persist.",
  );
  assert(
    updatedProject.date === editedProject.date,
    "Edited project date did not persist.",
  );
  assert(
    updatedProject.isHidden === editedProject.isHidden,
    "Edited project visibility did not persist.",
  );

  const projectsAfterEdit = await listProjects("Project list after edit");
  const projectInList = projectsAfterEdit.find(
    (project) => project.id === temporaryProjectId,
  );
  assert(
    projectInList?.title === editedProject.title,
    "Edited project was not visible in the project list.",
  );

  const deleteResponse = await request(`/api/projects/${temporaryProjectId}`, {
    method: "DELETE",
  });
  assertStatus(deleteResponse, 204, "Temporary project deletion");
  temporaryProjectId = undefined;

  const projectsAfterDelete = await listProjects("Project list after cleanup");
  assert(
    !projectsAfterDelete.some((project) => project.id === createdProject.id),
    "Temporary project was still present after deletion.",
  );

  const logoutResponse = await request("/api/auth/logout", { method: "POST" });
  assertStatus(logoutResponse, 200, "Admin logout");

  const invalidatedSessionResponse = await request("/api/auth/me");
  assertStatus(
    invalidatedSessionResponse,
    401,
    "Invalidated admin session check",
  );
}

try {
  await run();
  console.log(
    "Admin smoke test passed: login, session, proxy list, project CRUD, cleanup, and logout.",
  );
} catch (error) {
  await deleteTemporaryProject();
  console.error(
    `Admin smoke test failed: ${error instanceof Error ? error.message : "unknown error"}`,
  );
  process.exitCode = 1;
}
