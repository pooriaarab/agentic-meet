import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { createRoom } from "./core.js";
import { VERSION } from "./version.js";
const result = (value: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(value) }] });
export function createMcpServer(): McpServer { const server = new McpServer({ name: "agentic-meet", version: VERSION }); server.registerTool("create_room", { description: "Create a video room and return its join link. Dry run is the default.", inputSchema: { vendor: z.enum(["daily", "whereby"]).optional(), name: z.string().optional(), expiresAt: z.string().optional(), live: z.boolean().optional() } }, async ({ vendor, name, expiresAt, live }) => { try { return result(await createRoom({ vendor, name, expiresAt, dryRun: !live })); } catch (error) { return { ...result({ error: error instanceof Error ? error.message : String(error) }), isError: true }; } }); return server; }
export async function startMcp(): Promise<void> { const server = createMcpServer(); await server.connect(new StdioServerTransport()); }
