---
layout: default
title: Jordan Waxman | AI Systems & Operations
---

# Jordan Waxman

**14 years operations leadership — building human-AI infrastructure since 2025**

Most teams build with AI first and add governance later — usually after something breaks. I did it the other way around.

The system has two layers. HAIOS is the collaboration layer — how a human and an AI work together when one of them forgets everything overnight. Authority tiers, forbidden action lists, skill contracts, session continuity, drift detection. All of it defined before the AI touched anything in production. AOS is the platform layer — 17 services across 7 operational domains that any business can consume. Database, compliance, search, learning, automation. Built once, inherited by every downstream business.

The methodology underneath both layers is the same: Best Practices → Architecture → Design → Implement → Production. When production breaks something — and it does — the failure feeds back through root cause, fix, constraint, version bump, and into the next cycle. That's why skills are at v2.x. Why the database schema is at v7.14. Why the same problem doesn't break the system twice.

The platform model is what makes it scale. Every capability hardened by production use in one business gets promoted to AOS, where every other business inherits it. A new business isn't a new codebase — it's configuration on top of what production already validated. The lessons don't stay where they're learned.

At the time I built the governance infrastructure, no tool could fully run inside it. I was governing something that didn't quite exist yet. Then the tools caught up. Multiple agents now run in parallel while CEO and COO handle strategy and decisions. The governance didn't need to change — the tools stepped into roles that were already defined for them.

That's what building in production since 2025 looks like. Not reacting to what the tools can do. Understanding the problems deeply enough that the solution works regardless of which tools show up.

Every number on this page comes from that work.

---

## What I Built

| Layer | What | Scale |
|-------|------|-------|
| **Security governance** | 5-tier authority system with 18 immutable laws and forbidden-action enforcement | In production since August 2025 |
| **Database security** | PostgreSQL schema v1→v7.14, RLS on all tables, statement-type allowlisting, column-level write permissions — 8 security errors found and fixed via audit | 14 additive-only migrations with 7-step checklist |
| **Defense-in-depth** | 4-layer deployment protection: validation → health checks → auto-rollback → cooldown | 2 workflows, 24 nodes, 6-URL health check, zero customer-visible outages |
| **Search infrastructure** | 17,428 embedded chunks with sub-second retrieval and hash-based change detection | Incremental updates <10s vs 5+ min full rebuilds |
| **Compliance** | Prohibited content enforcement with severity tiers, FTC/Amazon ToS mapping — daily Spot Audit verifies enforcement layer is firing, not just content | 10/10 executions passing; isolated service survives workflow changes |
| **Continuity** | 4-layer state management for session-based AI with no persistent memory | Zero unexpected cutoffs in 350+ sessions |
| **Skills framework** | 8 versioned capability modules with standardized contracts — name, triggers, workflow, authority tier, error handling, handoff statement | v2.x; each version bump traceable to a production failure |
| **Email intelligence** | Gmail classification, invoice extraction, automated routing to expenses or review queue | 4 email types, 90%+ auto-processed without intervention |
| **Knowledge mining** | Semantic mining pipeline over full operational history | 50 queries → 485 results → 33 accomplishments, 205 evidence excerpts |
| **Autonomy taxonomy** | 10-level maturity model classifying every workflow — L6 ceiling for deterministic flows, explicit upgrade paths for the rest | 14 workflows tagged; 4-month autonomy target anchored to a number |
| **Knowledge architecture** | Tiered context loading with SSOT rules and cascade dependency tracking — hot/warm/cold tiers each with defined token budgets | 17,428-chunk cold tier; hot context capped at 15-20% of session window |
| **Continuous learning** | Sunday intelligence pipeline: search trends, competitor signals, performance data → synthesized weekly recommendations | Cross-business pattern sharing via shared schema — new business inherits every lesson production already taught |
| **Human-AI coordination** | Session-state document, async Slack coordination, drift detection on approval rate | 365 sessions; approval rate monitoring built in as a rubber-stamping signal |
| **Multi-agent coordination** | Authority tiers and dispatch protocols for parallel CEO+COO+CC+CiC execution | Built governance before any tool could fully run inside it; zero context-loss handoffs since |
| **Financial operations** | IRS tax category mapping, 50/30/20 budget allocation, 80% threshold alerts — all with $0 AI spending authority | 3 workflows scored 54–60/60 on production audit framework |
| **Slack integration** | Bi-directional bot: outbound alerts + inbound command parsing, loop detection, message classification, database logging | Two workflows in `#haios-coo` — instructions without opening Claude |
| **Data pipeline** | Hash-based incremental indexing: 373 conversations, 224MB raw JSON, change detection per chunk | <10s incremental updates vs 5+ min full rebuild; 2.4x index growth ChromaDB → pgvector |
| **Automation** | 33 production workflows across 7 domains built with Claude + n8n-MCP — 541 nodes, 2,646 template patterns, 60-point audit framework | 4 documented failure patterns; 60/60 top score; 100% error handling coverage |

---

## Deep Dives

### [Security Governance — Authority Tiers for Autonomous AI](https://github.com/MrMinor-dev/ai-security-compliance-framework)

Before I let the AI touch anything in production, I wrote down 18 things it's never allowed to do. That list became a contract — five tiers from forbidden to fully autonomous. Running inside those boundaries since August 2025. $0 spending authority. Every dollar still goes through me. But it handles most of what a COO would handle day to day.

The hardest part wasn't defining the tiers. It was detecting when I stopped actually reviewing them. Approval rate above 95%, challenge rate below 5% — that looks like a healthy relationship. It's actually the warning sign. So I built the flag in.

**Why it matters:** Prohibited action lists = usage policies. Tiered authority = access control levels. Escalation rules = incident response procedures. Defining what a system *cannot* do is as important as defining what it can.

---

### [Autonomy + Cascading — The Platform Model](https://github.com/MrMinor-dev/autonomy-taxonomy)

Not every workflow needs to be AI-driven. Some run better as pure n8n automation — deterministic, no intelligence required, right at L6 by design. The taxonomy's job isn't to push everything toward L10. It's to give every workflow a position on the maturity curve, a ceiling if it's already at the right level, and an explicit upgrade path if it's not.

14 workflows tagged. The 4-month vacation wasn't the fear of what would break — it was the definition of "done." L8 meant the system could get there. The taxonomy made that answerable instead of aspirational.

---

### [Knowledge Architecture — Managing What an Amnesic System Knows](https://github.com/MrMinor-dev/knowledge-architecture-framework)

The AI forgets everything overnight. Every session starts from zero. The naive fix is to dump everything into context at the start — all the docs, all the history, all the state. That doesn't scale. At 100k tokens you're out of space before you've done anything useful.

So I built a tiered knowledge system. Three tiers, each with different loading behavior and a defined token budget. Hot context loads at session start — capped at 15-20% of the window. Warm context loads on task detection. Cold context is 17,428 embedded chunks retrieved on demand in under a second.

The harder problem was keeping it consistent. The rule: one source of truth per topic, one location, cascade dependencies documented. Change the embedding model and six things need to update — the schema doc, the script, the skill, the search baseline, and two downstream workflows. The cascade rule makes that automatic. Without it, you get drift.

**Why it matters:** Any large-scale system has a knowledge management problem. SSOT discipline, cascade rules, and tiered retrieval are the same patterns behind configuration management, runbook maintenance, and incident playbook design. The difference is that here, if the knowledge is stale, the agent acts on it immediately.

---

### [Continuous Learning — Ops Data as Compounding Infrastructure](https://github.com/MrMinor-dev/continuous-learning-framework)

Search trends, competitor signals, and performance data flow into a pipeline that generates strategic recommendations by Sunday morning. Every session starts with that intelligence already synthesized. When the first video ships, the loop closes — performance data feeds back in, and the next topic recommendation is different because of it.

The harder problem was making learning cross business lines. A pattern discovered in TGT doesn't automatically improve PB. The fix: validated patterns land in a shared table that skills query before execution. A new business inherits every lesson production already taught — not from a doc, from the schema.

**Why it matters:** Most systems treat knowledge as a byproduct of work. This treats it as infrastructure. The pipeline exists so the system gets harder to break the same way twice, and faster to stand up the next time.

---

### [Human-AI Coordination — Building Alignment With an Amnesic Partner](https://github.com/MrMinor-dev/human-ai-coordination-framework)

Staying aligned with an agent that forgets everything overnight is a coordination problem, not a technical one. HAIOS has exactly one domain: Collaboration. Everything else — skills, knowledge, database, monitoring — belongs to AOS. The single domain focus is deliberate: the only thing that doesn't transfer if the business were sold is the working relationship itself. The collaboration layer is a structured state document with five sections, each with a defined job. Every session reads it first and is productive in one message. Async coordination runs through Slack — instructions, reroutes, and status checks without opening a full session. Neither side needs to be available at the same time.

Drift detection runs on the relationship itself. Approval rate above 95%, challenge rate below 5% — that looks like trust. It's actually rubber-stamping. I built the flag in because the number that signals a problem looks identical to the number that signals a healthy working relationship. Journey capture logs 361 sessions of decisions, trade-offs, and failures as they happen. The organizational memory isn't reconstructed after — it's produced as a side effect of working.

**Why it matters:** TPMs keep distributed stakeholders aligned across scope changes, ambiguous ownership, and competing priorities. The difference here is one stakeholder forgets everything overnight and can't ask for context. Same skill, harder constraint.

---

### [Multi-Agent Coordination — Governance-First Parallel Execution](https://github.com/MrMinor-dev/multi-agent-coordination-framework)

One person building and running a business with AI hits the same ceiling: one context window, one thing at a time, everything sequential. The answer is parallel agents — CEO + COO on strategy, Claude Code and Claude in Chrome executing in parallel. But parallel agents without coordination is just multiple things going wrong simultaneously.

I built the authority tiers, forbidden action lists, and dispatch protocols before any tool could fully run inside them. When Claude Code and Claude in Chrome came online, the governance didn't need to change. The tools stepped into roles that were already defined for them. That sequencing is what most teams miss — they build execution first and retrofit governance after something breaks. Context loss between handoffs since building this: zero.

**Why it matters:** Most teams build execution first and bolt on governance after something breaks. Authority boundaries get retrofitted around whatever the tool already did. Building governance first means the tools step into defined roles — not defined roles get retrofitted to whatever the tools did. The handoff contract scales: every new agent type steps in without redesigning the coordination layer.

---

### [Semantic Search — Building Retrieval Infrastructure](https://github.com/MrMinor-dev/semantic-search-framework)

Two weeks in, retrieval quality started degrading with no errors. The HuggingFace API had migrated endpoints silently — the old URL still accepted requests, just returned bad vectors. The only signal was gradually worse search results. That failure is now a health-check item in weekly ops. And it's the reason the framework monitors retrieval quality, not just uptime.

373 conversations, 1.2 million words, 224MB — all of it searchable in under a second. Chunking conversations turned out to be harder than chunking documents: a document has sections, a conversation shifts topics mid-exchange and carries context across 50 turns. Sliding window with overlap, always preserving full responses, never cutting mid-answer. Once the infrastructure was solid I turned it on my own conversation history — 50 queries, 485 results, verified accomplishment inventory.

**Why it matters:** Security observability at scale requires searchable, indexed data. This pipeline demonstrates: data ingestion → normalization → indexing → retrieval — the same architecture pattern behind security log analysis, threat detection, and audit trail search.

---

### [Data Pipeline — Incremental Indexing for Production AI](https://github.com/MrMinor-dev/incremental-indexing-pipeline)

The obvious way to build a semantic search pipeline is also the wrong way: parse everything, embed everything, store everything, repeat when anything changes. At 373 conversations and 224MB of raw JSON, a full rebuild takes 5+ minutes — which means you run it less often, the index drifts from reality, and retrieval quality degrades before you notice.

Hash-based change detection fixed it: hash every chunk, compare against stored hashes, skip anything unchanged. On any given day, 98%+ of the corpus hasn't changed. Incremental updates now run in under 10 seconds. The difference between a batch job you run weekly and infrastructure you run after every session.

The harder problem was chunking conversations. Documents have sections. Conversations shift topics mid-exchange and carry context across 50 turns. Naive token-count chunking destroys the retrieval signal. Fix: sliding window with overlap, always preserving full responses, never cutting mid-answer.

**Why it matters:** Data ingestion pipelines with incremental change detection over mixed content types are infrastructure fundamentals. The hash-based approach applies anywhere you're maintaining a searchable index over a corpus that continuously changes.

---

### [Compliance by Design — Four Domains, Built Into the Architecture](https://github.com/MrMinor-dev/compliance-enforcement-framework)

Most compliance systems are bolted on — rules in a document somewhere, checked when someone remembers. I built it the other way. The compliance layer is a separate service that workflows call, not a step embedded inside them. You can't publish a product without passing the content check. You can't run an operation outside your authority tier without hitting the enforcement layer.

Four domains, each genuinely different: content compliance (Amazon/FTC rules, four severity tiers, zero AI discretion), operational compliance (60-point audit score is the proof the rules actually run), legal compliance (AI tracks deadlines, human executes), tax compliance (automated categorization, human submits). The thing that holds them together: isolated enforcement services survive changes to the systems they govern. Embedded enforcement drifts with them.

**Why it matters:** Compliance programs fail two ways — the rules don't actually run, or nobody can tell if they're running. Both are architectural problems. The patterns here apply to any program with regulatory, legal, or operational compliance requirements.

---

### [Knowledge Mining — Structured Intelligence from Operational History](https://github.com/MrMinor-dev/knowledge-mining-framework)

373 conversations, 1.2 million words. 50 structured queries designed against a specific target schema — 9 job description categories from a real role. 485 result chunks surfaced, reviewed, distilled into 33 accomplishments backed by 205 evidence excerpts. Not reconstructed from memory. Mined from what actually happened.

The pipeline is the pattern for any organization trying to extract value from AI-generated operational history: embed and index the corpus, define a target schema, write queries against it, extract and distill. The inputs change — customer support transcripts, sales call recordings, engineering post-mortems — the architecture doesn't. The companies moving fastest with AI aren't just automating tasks. They're instrumenting operations so the history compounds.

**Why it matters:** Institutional knowledge trapped in unstructured history is a liability. Every organization doing serious work with AI is generating operational history at scale. The question is whether it compounds or disappears.

---

### [Session Continuity — State Management for Amnesic AI](https://github.com/MrMinor-dev/session-continuity-framework)

Mid-session, the AI told me there was plenty of context left. A few minutes later it hit the limit and we lost the work. When I dug into it, the session had auto-loaded 51k tokens before I sent the first message — against a 100k limit. Neither of us had any visibility into that. So I built it in: 4-layer continuity system, proactive checkpoints every 25k tokens, a 75% warning that prompts a save. Zero unexpected cutoffs in the 200+ sessions since.

The part that actually makes it work is the structure of the state document. Five sections, each with a defined job — what to focus on next, what's in progress, the last 10 sessions, anything urgent, and the IDs and stats the AI needs to operate. A new session reads that file first and is productive in one message. The structure is the reason, not just the document's existence.

**Why it matters:** Incident response applied to AI systems — detect, find the root cause, fix it, prevent recurrence. The incident revealed an observability gap: neither of us knew the resource state. If you can't see it, you can't secure it.

---

### [Database Security — RLS, Allowlisting, and Least-Privilege Enforcement](https://github.com/MrMinor-dev/database-security-framework)

I ran a security audit on a system I'd been building for months and found 8 actual errors. 5 tables with no Row-Level Security at all. 3 views running with creator privileges instead of caller privileges. The system looked secure from every design document. It wasn't.

From there I built two services that control exactly what the AI can touch. Read queries block 7 statement types at the string-parsing layer — if the query contains DELETE, it never reaches the database. Writes go through a per-table, per-column allowlist — the agent can update product content but can't touch `id`, `created_at`, or `compliance_status`. The intermittent failures that took longest to diagnose weren't in the SQL or the application logic. They were in the invisible difference between how two frameworks inject the same request. Same workflow, two different payload structures depending on how you called it. Fix is one line of defensive type-checking, now in all 3 utility workflows.

**Why it matters:** Least-privilege access control for autonomous agents. The question isn't whether AI should access the database — it's which tables, which columns, which operations, with what constraints. Same pattern as securing any infrastructure access at scale.

---

### [Defense-in-Depth for Automated Deployments](https://github.com/MrMinor-dev/deployment-protection-framework)

The failure mode I was most worried about wasn't a bad deploy. It was a bad deploy that keeps deploying. Rollback fires, triggers a new deploy, new deploy fails, system loops. So I built four layers where each one catches what the previous missed — validation before it ships, health checks after it lands, automatic rollback when health fails, and cooldown that blocks re-deploy until the recovery window clears.

The layer most teams skip is cooldown. Health status is three states — healthy, degraded, failed — stored in one table any workflow can check before it does anything. A content publishing workflow reads that table first. If the site is degraded or failed, it exits. The enum isn't decorative. It's what keeps the system from doing work on a broken foundation.

**Why it matters:** Layered security controls where each layer catches what the previous missed. Pre-deploy = preventive controls. Health checks = detective controls. Rollback = corrective controls. Cooldown = circuit breakers. Classic defense-in-depth.

---

### [Skills Framework — Versioned Capability Contracts for Autonomous AI](https://github.com/MrMinor-dev/skills-framework)

A skill destroyed ~150 sessions of organizational history. The session-end skill was supposed to append to a journey log. It overwrote it instead. Root cause: the skill didn't specify write mode. "Save to file" is ambiguous. The agent made a choice. It was the wrong one.

That failure is why skills are at v2.x. Each version bump is traceable to a specific production failure. The version number is the evidence count. 8 skills in production, each with a standardized contract — name, trigger phrases, workflow, authority tier, error handling, explicit write modes. The contracts are the reason they run consistently: not because the agent remembers, but because the contract is read before execution, every time.

**Why it matters:** Skill contracts for autonomous agents are the same idea as standard operating procedures for distributed teams — except here, if the procedure isn't read before execution, the agent operates from memory, and memory resets overnight. The failure mode for SOPs and skill contracts is the same: an underdefined instruction, a reasonable-seeming default, and no one to ask.

---

### [Financial Operations Automation](https://github.com/MrMinor-dev/financial-operations-framework)

The budget monitor ran cleanly for weeks. The audit found it was broken in the one path that mattered — the alert branch wrote to a table that had been dropped in a prior migration. Perfect under normal conditions. Silent failure the moment spending hit 80%.

That's what made the $0 spending authority non-negotiable. Under $0, errors are operational. Over $0, errors are financial. The line is where the risk profile changes. Three workflows, all audited to verify the boundary holds — not just that they run.

**Why it matters:** Financial workflow automation with explicit authorization boundaries. The constraint is the design — knowing exactly where human approval is required, and building the system so that boundary is hard to cross accidentally.

---

### [Bi-Directional Slack Integration](https://github.com/MrMinor-dev/slack-integration-framework)

Outbound alerts were straightforward. Inbound was harder — the bot receives its own messages and loops if you don't filter them. Built message classification, command parsing, database logging, and acknowledgment flows. Two workflows running in `#haios-coo`.

The practical result: I can give the AI instructions without opening Claude. It stays in the loop without needing me there. The deeper capability: the AI can alert me when something needs attention, and I can respond without either of us being in the same place at the same time.

**Why it matters:** Human-AI coordination through asynchronous messaging. Message classification and loop detection are the same problems you solve in any multi-system communication layer — except here, one participant forgets everything overnight.

---

### [Email Intelligence — Classification, Extraction, and Routing](https://github.com/MrMinor-dev/email-intelligence-framework)

Every business has the same inbox problem: invoices to log, compliance notices that need immediate attention, vendor updates worth tracking, and noise that should disappear. The default is a human reading every email. This automates the triage and everything that follows.

Claude reads and classifies each message into one of 9 categories. Rules handle the routing. Invoices get parsed — vendor, amount, date, IRS category — and written to the expenses table automatically. Slack closes the loop with a daily count. 90%+ processed without intervention.

**Why it matters:** Most businesses are one step away from this — Gmail is already connected, the emails are already arriving. The gap is structured extraction and routing logic. Same architecture applies to support tickets, vendor communications, compliance filings.

---

### [n8n Development Framework — Building 33 Production Workflows with AI](https://github.com/MrMinor-dev/n8n-development-framework)

The first version of every workflow worked. The problem was the tenth, and the one someone added at 11pm to fix something urgent. Credentials get hardcoded. Error handling gets skipped. Logging disappears. At 5 workflows that's manageable. At 33, it's a reliability problem — unless you built the audit framework first.

60 points, two phases, 13 categories. Phase 1 runs on the raw JSON — no execution needed. Phase 2 confirms it actually did what it was supposed to: last 10 executions, database writes present, webhook callable. A workflow that silently completes but writes nothing passes Phase 1. It fails Phase 2, Category C. Four failure patterns documented, all fixed, all in the anti-patterns list — including the one where a full API update silently strips credentials from every node with no error.

**Why it matters:** Workflow governance at scale is the same problem as release management, change control, and operational runbooks — systematic standards applied consistently, not remembered selectively. The audit framework is what makes 33 workflows maintainable instead of a liability.

---

## Career Foundation

**Amazon (2020–Present)** — Program Manager, Global Security Operations

Two roles across 5 years. First: L5→L6 promoted Program Manager for Global Outsourcing, directing hardware supply for 60,000+ Customer Service Agents across 23 partners, 138 sites, 44 countries. $1.35M in cost savings through strategic procurement. 70% delivery SLA improvement (3 weeks → 10 days). Executed a 36-hour emergency device deployment to 1,613 agents ahead of India COVID lockdowns.

Second: L6 TPM in CS Security, delivering $2.4M+ annual value through AI automation. 79% average efficiency gains across 4 programs. Deployed live production automation systems (100% uptime since October 2025). Led cross-functional programs across 15+ organizations.

**Flexport (2016–2020)** — Global Operations Manager

Managed 150 freight forwarding clients across San Francisco, Hamburg, and Philadelphia. Selected twice for expansion leadership: 300% new business growth in DACH region within one year, $4M top-line revenue in 6 months from the Philadelphia launch. Redesigned invoicing process reducing Days Sales Outstanding by 50% and cost-to-serve by 40%. Conceptualized Flexport's first Capital financing product — adopted company-wide and became a significant revenue driver.

**Pasha Group (2012–2016)** — Operations Manager

Promoted from analyst to manager in 2 years, leading a 12-person team across Northern California terminal operations. Automated military household goods booking: accuracy from 77% → 99.4%, cost-to-serve down 89%. Coordinated 1,200 container emergency transfers in under 36 hours following a vessel failure. Directed M&A integration of Horizon Transport Lines. Prevented $218K in invoice leakage through process redesign.

**MRMINOR LLC (2025–present)** — Founder

Built the entire HAIOS/AOS infrastructure documented on this page. 17 services, 33 workflows, 17,428 embedded chunks — running live since August 2025. Routine operations run autonomously — governed by defined authority tiers, monitored for drift, and inspected by design.

---

## Documented Failures

Every system breaks. The question is whether failures leave the system better or just fixed.

These four broke things in production. Each one produced a permanent change — to skill logic, to tooling, to operating constraints, to how the next session starts. The anti-patterns are documented and referenced. The fixes are versioned. `claude-instructions.md` has been rewritten based on what went wrong, not what was planned. Skills are at v2.x because v1.x had gaps that production exposed.

That's not incidental. It's the correction loop: failure → root cause → fix → constraint → version bump → documented anti-pattern. The system is designed to get harder to break the same way twice.

---

**Token exhaustion incident.** The AI told me there was plenty of context left. A few minutes later it hit the limit and we lost the work. Root cause: neither of us had visibility into token consumption. The session had auto-loaded 51k tokens against a 100k limit before I sent the first message. Fix: 4-layer continuity system, proactive checkpoints every 25k tokens, 75% warning built into operating protocol. Zero recurrence in 200+ sessions.

**Journey capture overwrite.** A skill overwrote instead of appending, destroying ~150 sessions of organizational learning history. Content partially recoverable from embeddings. Root cause: ambiguous skill instructions with no explicit mode specification. Fix: updated skill logic, added write-mode validation, documented as a standing anti-pattern — "ambiguous skill instructions default to destructive behavior." Now a mandatory check in skill-creator-skill.

**n8n credential stripping.** Full API workflow updates silently remove credential assignments from all nodes. No error. No warning. Discovered through a production failure when workflows stopped authenticating. Fix: mandatory warning added before any full workflow update, partial update tooling built to avoid the operation entirely when possible.

**Framework-level input routing bug.** Intermittent database query failures that looked random. Traced to MCP and webhook injecting request bodies through different payload structures — same workflow, two different call paths, two different shapes. Invisible at the application layer. Fix: defensive type-checking across all 3 utility workflows. Now a standard pattern for any workflow that can be invoked through multiple entry points.

---

## Technical Stack

| Category | Tools |
|----------|-------|
| **AI** | Claude (Anthropic), Model Context Protocol (MCP) |
| **Automation** | n8n (33 production workflows) |
| **Database** | Supabase (PostgreSQL + pgvector), Row-Level Security |
| **Search** | sentence-transformers (all-MiniLM-L6-v2), HuggingFace API |
| **Infrastructure** | GitHub Pages, Google Drive, Cloudflare |
| **Languages** | Python, SQL, JavaScript, Markdown |

---

## Contact

- **GitHub:** [@MrMinor-dev](https://github.com/MrMinor-dev)
- **LinkedIn:** [linkedin.com/in/waxmanjordan](https://www.linkedin.com/in/waxmanjordan/)
- **Email:** waxmanj@mac.com
- **Location:** Seattle, WA

---

*33 accomplishments across 9 domains. Every number verified from production systems.*
