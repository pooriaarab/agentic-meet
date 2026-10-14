import { expect, test } from "vitest";
import { parseArgs } from "./cli.js";
test("CLI defaults to dry run", () => expect(parseArgs(["create", "--vendor", "daily", "--name", "standup"])).toMatchObject({ dryRun: true, name: "standup" }));
