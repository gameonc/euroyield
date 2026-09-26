# Security boundaries

Keep EuroYield public without publishing credentials. Store runtime values in the hosting provider's secret settings or untracked local environment files. `.env.example` contains placeholders only. Never put service-role, email-provider, scheduler or wallet private keys in `NEXT_PUBLIC_*` variables: that prefix exposes values to the browser.

Supabase public URL/anonymous keys and WalletConnect project identifiers are client configuration, not administrative secrets. Their safety still depends on row-level security, project restrictions and correct authorization. Public token contract addresses are not wallet private keys. Do not remove those addresses as though they were credentials.

## Alert scheduler

The `process-alerts` Edge Function requires POST and an exact `Authorization: Bearer <CRON_SECRET>` header. Missing configuration returns 503; missing or incorrect authorization returns 401 before database or email access. Configure a dedicated unpredictable secret in both the Edge Function and scheduler before deployment. Preserve Supabase gateway JWT verification; this check is additional protection, not a reason to turn it off.

Missing email-provider configuration does not count as delivery or advance the delivery timestamp. Provider response bodies and recipient addresses are omitted from this function's logs. Run its isolated regression tests with Node 24+: `node --test tests/alert-security.test.mjs`. These use mocks and send no email.

## Review scope and remaining work

On September 26, 2026, the reviewed main commit was `f2c848a47fca4e50e9302f66bd2eb8111400d19c`. A redacted Gitleaks history scan reported 17 matches: public protocol contract addresses and API documentation placeholders. No actual credential was identified in those matches. Environment usage was also reviewed. This does not prove that all branches, external logs or deployed settings are secret-free.

The September 24 dependency audit reported 93 affected dependency entries (1 critical, 46 high, 43 moderate, 3 low). Dependency remediation, full application regression testing, live database-policy verification and abuse protection for the public subscription endpoint remain outstanding. The public source is not a production-security certification. This patch does not deploy an Edge Function or modify live credentials.

If a real secret is discovered, revoke or rotate it with its provider, update the runtime securely, then assess Git history and cached/forked copies. Deleting the latest source line alone does not revoke access. Never post secret values in issues or pull requests.
