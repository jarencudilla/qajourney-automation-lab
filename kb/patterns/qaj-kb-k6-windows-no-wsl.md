# QAJ KB: k6 on Windows Without WSL

**Category:** Performance Testing
**Tags:** k6, Windows, no-admin, Convex, AI endpoints

## The Constraint

Most k6 install paths require admin access: Chocolatey needs elevated PowerShell, winget needs system write access, WSL needs to be enabled. On a locked-down client machine, none of these are available.

## The Workaround

k6 ships as a standalone binary. No installer required.

1. Download the Windows zip from [k6.io](https://k6.io/docs/get-started/installation/)
2. Extract `k6.exe` to a user-controlled folder (e.g., `~/k6/`)
3. Run from Git Bash using the full path:

```bash
~/k6/k6.exe run your-test-script.js
```

To add it to PATH without admin rights: open Windows Environment Settings, edit the user-level PATH variable, add the folder. No elevation required.

## DevTools Recon on a Convex Backend

DevTools network tab gives you:
- Auth token — visible in Request Headers as `Authorization: Bearer [token]` on any authenticated request
- Function names — visible in the request payload `path` field

DevTools does NOT give you:
- Readable response bodies — Convex uses gzip-js compression; the Response tab shows raw bytes

If you see `compression=gzip-js` in the query string, you are in this situation. Escalation options: ask the dev team for function signatures, use Fiddler Classic (decodes gzip, no admin needed), or use mitmproxy if Python is available.

## Convex HTTP API Pattern

Convex exposes three endpoints for external test clients. Use `format: "json"` — not `convex_encoded_json`, which is the browser wire format.

| Endpoint | Use case |
|---|---|
| `/api/action` | AI calls, external service calls |
| `/api/query` | Read-only database operations |
| `/api/mutation` | Write operations |

```javascript
const CONVEX_URL = "https://your-project.convex.cloud";
const TOKEN = "YOUR_BEARER_TOKEN";
const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

function convexAction(path, args) {
  return http.post(
    `${CONVEX_URL}/api/action`,
    JSON.stringify({ path, format: "json", args: [args] }),
    { headers }
  );
}

function convexQuery(path, args) {
  return http.post(
    `${CONVEX_URL}/api/query`,
    JSON.stringify({ path, format: "json", args: [args] }),
    { headers }
  );
}
```

## Custom Metrics Per Endpoint

Required when AI and non-AI calls coexist. Default `http_req_duration` aggregation blends a 288ms query and a 26-second AI action into a meaningless average.

```javascript
import { Trend, Rate } from "k6/metrics";

const heavyAiDuration = new Trend("heavy_ai_duration");
const mediumAiDuration = new Trend("medium_ai_duration");
const directQueryDuration = new Trend("direct_query_duration");
const aiErrorRate = new Rate("ai_error_rate");

// In the default function, after each request:
heavyAiDuration.add(res.timings.duration);
aiErrorRate.add(res.status === 0 || res.status >= 500);
```

## Thresholds for AI Endpoints

Set thresholds that reflect actual workload costs. A complex multi-part AI generation call at 26 seconds is not a failure — it is the cost of the operation. Threshold contrast between AI and non-AI endpoints is itself a useful data point.

```javascript
export const options = {
  vus: 1,
  duration: "5m",
  thresholds: {
    heavy_ai_duration: ["p(95)<30000"],
    medium_ai_duration: ["p(95)<10000"],
    direct_query_duration: ["p(95)<3000"],
    ai_error_rate: ["rate<0.05"],
  },
};
```

## Sleep Between AI Calls

Add `sleep(5)` after each AI action call on a baseline single-VU run. AI calls consume backend compute or API credits on every iteration. Back-to-back calls without sleep create synthetic concurrent load that does not reflect real user behavior.

## Baseline vs Concurrent

Single-VU baseline confirms infrastructure health and per-endpoint latency benchmarks. It does not predict concurrent behavior. Before running concurrent load tests on AI endpoints, coordinate with the dev team: confirm credit budget for the run and warn ops so monitoring does not flag the spike as an attack.

## Real Numbers (Single VU Baseline, Convex + AI Backend)

| Endpoint type | p95 |
|---|---|
| Heavy AI generation (multi-part structured output) | ~26,000ms |
| Medium AI action (email generation) | ~3,015ms |
| Medium AI action (NL parsing) | ~3,073ms |
| Direct query (no AI) | 288ms to 767ms |
| Agent send acknowledgment | ~377ms* |

*377ms is send latency only. AI response streams back separately. Not the number to cite for agent response time UX evaluation.

Source: https://qajourney.net/k6-performance-testing-windows-no-wsl/
