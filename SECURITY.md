# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 1.x     | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT open a public issue**
2. Email: ajentik@users.noreply.github.com
3. Include a description of the vulnerability and steps to reproduce

We will acknowledge receipt within 48 hours and aim to release a fix within 7 days for critical issues.

## Scope

doo-iconik is a client-side SVG icon library. The primary security considerations are:
- SVG path data injection (mitigated: all icon data is static and bundled at build time)
- XSS via innerHTML in Angular, Alpine, Vanilla, Laravel, and Rails adapters (mitigated: icon data is never user-supplied at runtime)
