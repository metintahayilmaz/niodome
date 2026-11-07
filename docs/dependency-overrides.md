# Scoped dependency security overrides

These overrides apply only to the named parent dependency and stay within the
child package's existing major version. They avoid downgrading Sanity or forcing
unrelated packages to a different major version.

| Parent                          | Child       | Pinned version | Reason                                                                                |
| ------------------------------- | ----------- | -------------- | ------------------------------------------------------------------------------------- |
| `@vercel/frameworks`            | `js-yaml`   | `3.15.2`       | Replaces pinned 3.13.1; YAML parsing denial-of-service and prototype-pollution fixes. |
| `@vercel/frameworks`            | `smol-toml` | `1.9.1`        | Replaces pinned 1.5.2; TOML parsing denial-of-service fixes.                          |
| `@module-federation/dts-plugin` | `undici`    | `7.30.2`       | Replaces pinned 7.29.1; HTTP/TLS and parser security fixes.                           |

Recheck these with `npm audit` when updating Sanity or its CLI dependencies.
Remove an override once the parent accepts a fixed version without it. Do not
override minimatch 10 with 11 merely to suppress the remaining moderate advisory;
that would require a separate compatibility review.

Validation includes TypeScript, ESLint, the GROQ regression tests, dependency-tree
checks and an authenticated Vercel preview build. These checks do not replace a
Studio editor session or a Sanity content migration test.
