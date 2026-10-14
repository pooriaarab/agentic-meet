# agentic-meet

[![npm version](https://img.shields.io/npm/v/agentic-meet)](https://www.npmjs.com/package/agentic-meet)
[![Downloads/month](https://img.shields.io/npm/dm/agentic-meet)](https://www.npmjs.com/package/agentic-meet)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](https://opensource.org/license/mit)

[Package](https://www.npmjs.com/package/agentic-meet) · [Source and support](https://github.com/pooriaarab/agentic-meet)

agentic-meet is an open-source Node.js wrapper that creates Daily and Whereby video meeting rooms through a library, command-line interface, or Model Context Protocol (MCP) server.

## Install

```sh
npm install agentic-meet
```

Requires Node.js 18 or later. Includes TypeScript declarations.

## Create your first room

Preview a request without credentials:

```sh
npx agentic-meet create --vendor daily --name standup
```

The JSON result contains `dryRun: true` and `https://dry-run.invalid/daily/standup`. This URL is a preview, not a join link.

After previewing, export your provider key and create a real room:

```sh
export DAILY_API_KEY='your-daily-api-key'
npx agentic-meet create --vendor daily --name standup --live
```

The JSON result contains `dryRun: false` and the provider's room URL. Open that URL to join.
Environment variables come from your shell; the package does not load `.env` files.

For library calls, preview first and set `dryRun: false` for live creation:

```js
import { createRoom } from 'agentic-meet';
console.log(await createRoom({ vendor: 'daily', name: 'standup' }));
```

## Features and providers

- **Room creation:** two implemented HTTP provider paths return join URLs.
- **Expiration:** `--expires-at ISO` sends Daily's expiration timestamp or Whereby's end date.
- **Dry run:** previews make no network requests and need no API key.
- **Errors:** failed requests and missing room URLs raise `VendorError`.

| Provider | Implementation | Live credential |
| --- | --- | --- |
| Daily | Implemented | `DAILY_API_KEY` |
| Whereby | Implemented | `WHEREBY_API_KEY` |

Source inspection confirms both request paths. This rewrite does not verify either provider with live credentials.

## Runtime surfaces

The CLI supports `create`, `--help` / `-h`, and `--version` / `-V`.
Creation accepts `--vendor`, `--name`, `--expires-at`, `--live`, and `--dry-run`.

```sh
npx agentic-meet-mcp
```

The stdio MCP server exposes one tool: `create_room`.
Its inputs are `vendor`, `name`, `expiresAt`, and `live`. Live calls require the same environment keys.

## Limits and status

The package does not manage calls, recordings, room deletion, retries, or a hosted meeting service.
Room names accept letters, numbers, underscores, and hyphens. Expiration strings receive no date validation.
Version 0.1.x interfaces can change. Report problems through [GitHub issues](https://github.com/pooriaarab/agentic-meet/issues).

## License

MIT.
