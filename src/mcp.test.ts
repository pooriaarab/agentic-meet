import { expect, test } from "vitest";
import { createMcpServer } from "./mcp.js";
test("creates MCP server", () => expect(createMcpServer()).toBeDefined());
