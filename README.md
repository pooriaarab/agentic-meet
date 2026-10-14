# agentic-meet

Create a video room. Get its join link.

Daily and Whereby are supported. Dry run is the default.

## Install

```sh
npm install agentic-meet
```

## Quick start

```sh
npx agentic-meet create --vendor daily --name standup
```

It prints a dry-run room result. No vendor call is made.

## Three uses

### CLI

```sh
agentic-meet create --vendor whereby --name planning --live
```

Set `DAILY_API_KEY` or `WHEREBY_API_KEY` for live calls.

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
