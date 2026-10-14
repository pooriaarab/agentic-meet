import { describe, expect, test } from "vitest";
import { createRoom, VendorError } from "./core.js";
describe("createRoom", () => {
  test("defaults to a Daily dry run", async () => expect(await createRoom({ name: "standup" })).toEqual({ vendor: "daily", name: "standup", url: "https://dry-run.invalid/daily/standup", dryRun: true }));
  test("does not call fetch for dry run", async () => { let called = false; await createRoom({}, { fetchFn: async () => { called = true; throw new Error("no"); } }); expect(called).toBe(false); });
  test("requires a key for live calls", async () => await expect(createRoom({ dryRun: false, vendor: "daily" })).rejects.toBeInstanceOf(VendorError));
  test("uses Daily fixture", async () => { const old = process.env.DAILY_API_KEY; process.env.DAILY_API_KEY = "fixture"; try { const room = await createRoom({ dryRun: false, vendor: "daily", name: "x" }, { fetchFn: async () => new Response(JSON.stringify({ url: "https://x.daily.co/x" }), { status: 200 }) }); expect(room.url).toBe("https://x.daily.co/x"); } finally { if (old === undefined) delete process.env.DAILY_API_KEY; else process.env.DAILY_API_KEY = old; } });
});

describe("live vendor adapters", () => {
  test("calls the Daily HTTPS API host", async () => {
    const old = process.env.DAILY_API_KEY;
    process.env.DAILY_API_KEY = "fixture";
    let url = "";
    try {
      await createRoom(
        { dryRun: false, vendor: "daily", name: "standup" },
        { fetchFn: async (input) => {
          url = String(input);
          return new Response(JSON.stringify({ url: "https://example.daily.co/standup" }), { status: 200 });
        } },
      );
      expect(new URL(url).host).toBe("api.daily.co");
    } finally {
      if (old === undefined) delete process.env.DAILY_API_KEY;
      else process.env.DAILY_API_KEY = old;
    }
  });

  test("calls the Whereby HTTPS API host", async () => {
    const old = process.env.WHEREBY_API_KEY;
    process.env.WHEREBY_API_KEY = "fixture";
    let url = "";
    try {
      await createRoom(
        { dryRun: false, vendor: "whereby", name: "planning" },
        { fetchFn: async (input) => {
          url = String(input);
          return new Response(JSON.stringify({ roomUrl: "https://whereby.com/planning" }), { status: 200 });
        } },
      );
      expect(new URL(url).host).toBe("api.whereby.dev");
    } finally {
      if (old === undefined) delete process.env.WHEREBY_API_KEY;
      else process.env.WHEREBY_API_KEY = old;
    }
  });
});
