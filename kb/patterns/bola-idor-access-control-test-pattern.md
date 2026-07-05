# BOLA/IDOR Access Control Fork Pattern

Reference pattern for testing object-level authorization gaps on any endpoint accepting a user-supplied object ID.

---

Terminology: IDOR is the broad class, any exposed object reference without an ownership check (OWASP, since 2007). BOLA is the same mechanism scoped to the API layer, ranked number one on OWASP API Security Top 10 since the list's 2019 launch. Every BOLA is an IDOR. Not every IDOR is a BOLA.

Trigger conditions, all three required:
- Customer-facing application
- Multiple user accounts exist
- Users own objects other users should not access

Test procedure:
1. Two accounts, identical role
2. Account A creates or retrieves an object, ID captured (URL / response body / request param)
3. Account B session sends identical request with Account A's ID
4. Response inspected for Account A's data

Positive result (B receives A's data) = missing or broken ownership check. File as finding.

Repeat per HTTP method independently. GET-level authorization does not imply PUT/PATCH/DELETE authorization.

Minimum tooling: Postman + two browser sessions. Burp Suite optional, improves interception/replay speed at scale.

Reporting note: severity framing changes triage outcome. State exact exposed data, affected user scope, and business impact explicitly rather than a generic access description.

---

Source: https://qajourney.net/bola-idor-testing-qa-engineers/