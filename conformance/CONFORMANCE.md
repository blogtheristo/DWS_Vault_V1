# DWS Vault V1 — Conformance checks

Version 1.0.0 · 09.10.2026 · Apache-2.0

Each check is run against a live deployment and gives PASS or FAIL with the evidence attached.
A deployment conforms when every check passes. Checks C13–C14 apply only where the deployment
holds customer connector secrets (P9).

| ID  | Check                                                                                                                      | Principle |
| --- | -------------------------------------------------------------------------------------------------------------------------- | --------- |
| C1  | List each consumer and the secret names it receives. No consumer receives a secret it does not use.                        | P1        |
| C2  | A secret held by two consumers has a different value for each, or the deployment states why not.                           | P1        |
| C3  | A secret scanner run over the source repositories, logs and agent traces of the last 30 days finds no secret value.        | P2        |
| C4  | An agent workflow that uses a secret shows a reference in its trace, never the value; a below-threshold agent is refused.  | P3        |
| C5  | Reading a store with an ordinary shell command produces a record naming the human login, the program and the time.         | P4        |
| C6  | That read is classified as unexpected and shown to the operator within one reporting period.                               | P4        |
| C7  | Changing a secret produces a record with actor, time and changed names; the record holds no value.                         | P5        |
| C8  | Changing a store outside the vault's tool is detected and flagged.                                                         | P5        |
| C9  | Editing or deleting one audit record makes the chain verification fail.                                                    | P6        |
| C10 | A copy of the audit record exists off the host and is no older than one day.                                               | P6        |
| C11 | The host can create a backup but cannot decrypt it; removing the backup recipients makes backup fail, not write plaintext. | P7        |
| C12 | A full restore from backup, decrypted off the host, gives byte-identical stores and records a named restore action.        | P7, P8    |
| C13 | A connector can open only its own customer's entries; opening another customer's entry fails and is recorded.              | P9        |
| C14 | Deleting a customer's key makes all of that customer's entries unreadable.                                                 | P9        |

## Reporting

A conformance report lists, per check: result, date, operator, and the evidence (command output or
record identifiers). Values of secrets never appear in a report (P2).
