# DWS Vault V1 — Principles

Version 1.0.0 · 09.10.2026 · Lifetime Oy · Apache-2.0

These principles say what a secrets store for an agent production environment must guarantee.
They do not say how. Each principle is checked by the conformance statements in
`../conformance/CONFORMANCE.md`.

"Must" is a requirement. "Should" is a strong default that a deployment may depart from only with
a written reason.

---

## P1. One consumer, one secret set

Each consumer — a service, a container, a connector — receives only the secrets it uses, from a
store no other consumer reads. A secret two consumers need is held twice, and should have a
different value for each, so that one leak is revoked alone.

_Why:_ in a shared environment file every component sees every key. A component that runs a
language model can be steered by its input; it must not hold the production database key.

## P2. Values never travel

A secret value must never appear in source control, a prompt, a model context, a trace, a log, a
chat message or a ticket. Names of secrets are not secret and may be shown; values never.

## P3. Agents get references, not values

An agent or workflow declares the secrets it needs by reference. The reference is resolved by the
executing process at call time, outside the model's context. An agent whose trust level is below
the level the workflow requires resolves nothing. Any model output that contains a resolved value
must be masked and reported.

## P4. Every read is recorded

Every read of a secret store is recorded with the human identity behind it (kept across privilege
elevation), the program, the target and the time — including reads that bypass the vault's own
tool, such as an editor or a shell command. Expected readers are classified; unexpected readers
are highlighted, not hidden.

## P5. Every change is recorded and versioned

Every change records who made it, when, and which secret names changed — never the values. A
change made outside the vault's tool is still detected and flagged.

## P6. The record cannot be quietly rewritten

The audit record is append-only and each entry is chained to the one before it, so that deleting
or editing an entry is detectable. A copy of the record should be kept away from the host whose
administrator could otherwise rewrite it.

## P7. Backups the host cannot open

Backups are encrypted to keys held off the host, so the host can write a backup but cannot read
it. A vault without its backup recipients refuses to back up rather than writing plaintext. A
restore is a recorded action with a named actor.

## P8. People hold the keys, in hardware

The private key that opens backups is held by named people, on a hardware key for daily use and
in a separate recovery store, never as a file on a workstation or on the vault host.

## P9. Customer secrets are encrypted one by one

Credentials a customer entrusts to a connector are encrypted per entry under a key belonging to
that customer, opened only by that customer's connector, and kept in plaintext only in memory for
the call. Deleting the customer's key makes all of its entries unreadable (crypto-shredding),
which is how offboarding and erasure requests are met. The customer may hold the key itself
(bring your own key).

## P10. Sovereign by default, honest about limits

The vault runs on the customer's or operator's own hardware with no third-party secrets service in
the path. Its limits are stated, not hidden: what the record can and cannot see is part of the
documentation a buyer receives.

---

## Known limits of any file-level vault

- A read of a store shows that the store was read, not which value the reader used.
- An administrator of the host can stop recording and alter local records. Chaining makes this
  detectable; the off-host copy makes it provable.
- A process that has started holds its secrets in memory. The record shows the start, not later use.
