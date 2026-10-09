# NIS2 Art. 21(2) mapping

Version 1.0.0 · 09.10.2026 · Apache-2.0

NIS2 (Directive (EU) 2022/2555) does not require a particular product. It requires risk-management
measures whose effect an entity can show. The table says which principle supports which measure.
Following the principles does not by itself make an entity NIS2 compliant; that is decided for the
entity as a whole.

| Art. 21(2) measure                   | Principles | What the principle contributes                                                            |
| ------------------------------------ | ---------- | ----------------------------------------------------------------------------------------- |
| (b) incident handling                | P4, P5, P6 | Unexpected reads and changes are detected; the record is tamper-evident                   |
| (c) business continuity, backup      | P7, P8     | Encrypted, versioned backups that only named people can open                              |
| (d) supply chain security            | P10        | No third-party secrets service in the path; suppliers can be asked the conformance checks |
| (h) cryptography and encryption      | P7, P8, P9 | Backups and customer secrets encrypted; keys held in hardware, off the host               |
| (i) access control, asset management | P1, P2, P3 | Least privilege per consumer and per agent workflow                                       |
| (j) multi-factor authentication      | P8         | Key custody on a hardware key                                                             |
