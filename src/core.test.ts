import { describe, expect, test } from "vitest";
import { createRoom, VendorError } from "./core.js";
describe("createRoom", () => {
  test("defaults to a Daily dry run", async () => expect(await createRoom({ name: "standup" })).toEqual({ vendor: "daily", name: "standup", url: "https://dry-run.invalid/daily/standup", dryRun: true }));
  test("does not call fetch for dry run", async () => { let called = false; await createRoom({}, { fetchFn: async () => { called = true; throw new Error("no"); } }); expect(called).toBe(false); });
  test("requires a key for live calls", async () => await expect(createRoom({ dryRun: false, vendor: "daily" })).rejects.toBeInstanceOf(VendorError));
  test("uses Daily fixture", async () => { const old = process.env.DAILY_API_KEY; process.env.DAILY_API_KEY = "fixture"; try { const room = await createRoom({ dryRun: false, vendor: "daily", name: "x" }, { fetchFn: async () => new Response(JSON.stringify({ url: "https://x.daily.co/x" }), { status: 200 }) }); expect(room.url).toBe("https://x.daily.co/x"); } finally { if (old === undefined) delete process.env.DAILY_API_KEY; else process.env.DAILY_API_KEY = old; } });
});
