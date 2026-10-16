# agentic-meet

Create a meeting room and return its join link with Daily or Whereby. Use this CLI or MCP server to create video rooms for an agent.

Dry run is the default. It exits successfully and makes no network call.

## Install

```sh
npm install agentic-meet
```

## Vendors

| Brand | Environment key | Live command |
| --- | --- | --- |
| Daily | `DAILY_API_KEY` | `agentic-meet create --vendor daily --name standup --live` |
| Whereby | `WHEREBY_API_KEY` | `agentic-meet create --vendor whereby --name planning --live` |

## Quick start

```sh
npx agentic-meet create --vendor daily --name standup
```

It prints a dry-run room result. No vendor call is made.

## Three uses

### CLI

Use a vendor key and `--live` to create a real room.

```sh
agentic-meet create --vendor whereby --name planning --live
```

### Library

```ts
import { createRoom } from "agentic-meet";
const room = await createRoom({ vendor: "daily", name: "standup" });
```

### MCP

```sh
npx agentic-meet mcp
```

Call `create_room`. Set `live: true` to create a real room.

## License

MIT
