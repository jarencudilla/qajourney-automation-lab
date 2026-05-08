# QA Testing Playground — v3

**[playground.qajourney.net](https://playground.qajourney.net)**

A QA-first test environment. Manual testing, automation practice, and AI-assisted workflows — no setup required.

---

## Modules

| Module | URL | What to Test |
|--------|-----|-------------|
| Login Scenario | `/login/` | Happy/sad path, empty fields, lockout, SQL injection |
| Form Validation | `/form/` | Required fields, formats, ranges, min/max length |
| Basic UI Elements | `/basic-ui/` | Inputs, dropdowns, checkboxes, radio buttons |
| Dynamic DOM | `/dynamic-dom/` | Show/hide, delayed elements, list mutation, disabled state |
| JavaScript Alerts | `/alerts/` | alert(), confirm(), prompt() — accept and dismiss |
| iFrame Interaction | `/iframes/` | Frame context switching, embedded form |
| Network Delays | `/network-delay/` | Auto-load (3s), manual trigger, fast load (500ms) |
| Broken Links | `/broken-links/` | 200s, 404s, redirects — crawl and classify |
| 404 Handling | `/404/` | Error page assertions |

---

## Per-Module Features

Every module page includes:

**Collapsible sidebar**
- Test scenario description
- Test goals checklist
- Related QAJourney articles (manual + per-tool automation)

**Four-tab panel**
- **Test Target** — the actual UI to test
- **Test Cases** — checkable rows in your format, saves progress to localStorage, export as Markdown
- **Bug Report** — structured form (title, steps, expected, actual, severity/priority, env), export as Markdown
- **Hybrid Testing** — embedded QAJ Prompt Builder, pre-filled context per module, generates prompts for Claude/ChatGPT/etc.

**Notes panel** — full-width scratchpad below, saves to localStorage, exportable

---

## data-testid Reference

### Login (`/login/`)
```
username-input
password-input
login-button
msg-ok / msg-err / msg-locked
err-user / err-pass
```

### Form Validation (`/form/`)
```
name-input / email-input / age-input / password-input
submit-btn / form-result
err-name / err-email / err-age / err-pass
```

### Basic UI (`/basic-ui/`)
```
text-input / email-input
dropdown-select
checkbox-option-1 / checkbox-option-2
radio-yes / radio-no
action-btn / output-area
```

### Dynamic DOM (`/dynamic-dom/`)
```
show-btn / hide-btn
dynamic-element
delay-btn / delayed-element
list-input / add-btn / dom-list
dom-item-1, dom-item-2, ... (dynamic)
toggle-disable-btn / disabled-input
```

### Alerts (`/alerts/`)
```
alert-btn / confirm-btn / prompt-btn
dialog-result
```

### iFrames (`/iframes/`)
```
content-iframe    (outer frame selector)
form-iframe       (outer frame selector)
iframe-heading    (inside content-iframe)
iframe-input      (inside form-iframe)
iframe-submit     (inside form-iframe)
iframe-result     (inside form-iframe)
```

### Network Delays (`/network-delay/`)
```
auto-loading / auto-content
manual-trigger-btn / manual-loading / manual-content
fast-trigger-btn / fast-content
```

### Broken Links (`/broken-links/`)
```
link-valid-home / link-valid-basic-ui / link-valid-login
link-broken-1 / link-broken-2 / link-broken-3
link-redirect / link-external
```

### 404 (`/404/`)
```
404-page / 404-code / 404-heading
404-description / 404-back-link
```

---

## API Endpoints

The REST API is live at `playground.qajourney.net/api`:

```
GET  /api/users
GET  /api/users?id=1
POST /api/users/create.php
PUT  /api/users/update.php?id=1
DELETE /api/users/delete.php?id=1

GET  /api/products
POST /api/products/create.php

POST /api/auth/login.php
POST /api/auth/logout.php
GET  /api/auth/verify.php

GET  /api/test/slow-endpoint.php     → 3s delay
GET  /api/test/random-failure.php    → 50% chance of 500
GET  /api/test/rate-limited.php      → 5 req/min limit
```

---

## Deploying

Extract the playground archive directly into the `playground.qajourney.net` webroot. No build step. Pure HTML/CSS/JS.

```
playground/
├── index.html
├── login/index.html
├── form/index.html
├── basic-ui/index.html
├── dynamic-dom/index.html
├── alerts/index.html
├── iframes/index.html
├── network-delay/index.html
├── broken-links/index.html
├── 404/index.html
├── api/
├── assets/css/style.css
├── assets/js/script.js
├── assets/js/prompt-builder.js
└── assets/logo/
```
