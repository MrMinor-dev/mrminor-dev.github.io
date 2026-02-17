---
layout: default
title: Jordan Waxman | AI Systems & Operations
---

# Jordan Waxman

**14 years operations leadership + 350 sessions building human-AI infrastructure**

I spent 5 months building HAIOS — a Human-AI Operating System where AI operates as COO with defined authority boundaries, and the human stays CEO. Building that required solving real security and governance problems: what an autonomous AI agent is forbidden to do, how to enforce those boundaries in production, how to evolve a database schema 14 times without losing data, and how to maintain operational continuity when your COO has amnesia every session.

The hardest problems in AI security aren't purely technical — they're governance problems. What should an autonomous system be allowed to do? How do you enforce boundaries without killing capability? How do you scale security controls when the system is growing faster than your ability to audit it? I've spent 350 sessions answering those questions in production. Every number on this page comes from that work.

---

## What I Built

| Layer | What | Scale |
|-------|------|-------|
| **Security governance** | 5-tier authority system with 18 immutable laws and forbidden-action enforcement | 350+ sessions governed |
| **Access controls** | RLS on all tables, statement-type whitelisting, column-level write permissions | 8 security errors found and fixed via audit |
| **Infrastructure** | 17-service platform across 7 operational domains with contract-based interfaces | 3 business units consuming shared services |
| **Database** | PostgreSQL schema evolved v1 → v7.14, 50+ tables, zero data loss | 14 additive-only migrations with 7-step checklist |
| **Defense-in-depth** | 4-layer deployment protection: validation → health checks → auto-rollback → cooldown | Zero customer-visible outages |
| **Search infrastructure** | 17,428 embedded chunks with sub-second retrieval and hash-based change detection | Incremental updates <10s vs 5+ min full rebuilds |
| **Automation** | 33 production workflows with 60-point audit framework across 13 categories | Systematic debugging: 4 documented failure patterns |
| **Compliance** | Prohibited content enforcement with severity tiers, FTC/Amazon ToS mapping | Autonomous audit capability |
| **Continuity** | 4-layer state management for session-based AI with no persistent memory | Zero unexpected cutoffs in 200+ sessions |
| **Skills framework** | 8 versioned capability modules with standardized contracts | Consistent autonomous execution across 100+ sessions |

---

## Deep Dives

### Security Governance — Authority Tiers for Autonomous AI

Created a 5-tier authority system (Forbidden → Human-Only → Approval Required → Inform After → Autonomous) codified in a CEO-COO contract with 18 immutable laws across 4 categories: Governance, Safety, Operational, Quality.

Forbidden actions: banking access, delete production data, bypass compliance. Escalation rules shift decisions upward when external visibility or money is involved. Default under uncertainty: higher tier. The AI COO operates with $0 spending authority — all influence through process design, trust calibration, and proactive recommendation, driving 80%+ routine decision reduction.

Trust calibration quantifies drift: >95% approval rate with <5% challenge rate triggers a review alert. Autonomy expands or contracts based on demonstrated competence, not assumptions.

**Why it matters:** Prohibited action lists = usage policies. Tiered authority = access control levels. Escalation rules = incident response procedures. "Default to higher tier under uncertainty" = safety-first posture. Defining what a system *cannot* do is as important as defining what it can.

---

### Database Security — RLS, Whitelisting, and Least-Privilege Enforcement

Evolved a production PostgreSQL schema through 14 versions (v1 → v7.14, 50+ tables) with zero data loss. Enforced additive-only migrations, namespace conventions, and a mandatory 7-step change checklist before every modification.

Security audit surfaced 8 actual errors: 5 tables missing Row-Level Security, 3 SECURITY DEFINER views. Generated and executed fix scripts. Built two safe database access services: Safe SQL Query (read-only, blocks 7 statement types) and Safe Database Write (table/column whitelist, per-table INSERT permissions, DELETE restricted to 3 tables with WHERE clause requirement, 50-row output limits).

**Why it matters:** Least-privilege access control for autonomous agents. The question isn't whether AI should access the database — it's which tables, which columns, which operations, with what constraints. Same pattern as securing any infrastructure access at scale.

---

### Defense-in-Depth for Automated Deployments

Designed 4-layer deployment protection: pre-deploy validation → post-deploy health checks → automatic rollback (Cloudflare) → cooldown logic. Health status enum (healthy → degraded → failed) with rollback triggers at each layer. Cooldown logic prevents cascading failures. Zero customer-visible outages.

**Why it matters:** Layered security controls where each layer catches what the previous missed. Pre-deploy = preventive controls. Health checks = detective controls. Rollback = corrective controls. Cooldown = circuit breakers. Classic defense-in-depth.

---

### Session Continuity — State Management for Amnesic AI

After a mid-session resource exhaustion incident (AI said "plenty left" then hit the limit), conducted formal incident analysis. Root cause: zero visibility into token consumption for either party. Auto-loaded 51k tokens without budget check.

Built a 4-layer continuity system: session-context.md (living status document updated 350+ times), startup/end protocols, semantic search over 17,428 chunks, and proactive token management (25k checkpoints, budget estimation, 75% warnings). Zero unexpected cutoffs in 200+ subsequent sessions.

**Why it matters:** Incident response applied to AI systems — detect → analyze root cause → remediate → prevent recurrence. The incident revealed an observability gap: neither human nor AI knew the resource state. If you can't see it, you can't secure it.

---

### Semantic Search — Building Retrieval Infrastructure

Built a pipeline to parse, chunk, and embed 373 AI conversations (1.2M words, 224MB) into 14,335 searchable vectors. Combined with 3,093 document chunks = 17,428 total. Architecture: sentence-transformers for embeddings, Supabase pgvector for storage, n8n webhook for cloud retrieval.

Hash-based incremental updates run in <10 seconds vs. 5+ minutes for full rebuilds. Used this infrastructure to mine my own conversation history — running 50 semantic queries across 485 chunks to produce a verified accomplishment inventory.

**Why it matters:** Security observability at scale requires searchable, indexed data. This pipeline demonstrates: data ingestion → normalization → indexing → retrieval — the same architecture pattern behind security log analysis, threat detection, and audit trail search.

---

### L1-L10 Autonomy Taxonomy — Framework for Ambiguous Domains

When "how autonomous should this agent be?" had no clear answer, created a 10-level taxonomy across 4 capability tiers: Manual (L1-3), Supervised (L4-6), Autonomous + Monitoring (L7-9), Full Autonomy (L10). 14 agents tagged with three-part convention: current level, status, target.

"Vacation-ready" defined as L8+ (4-week unattended operation). Key insight: individual agents don't need L10 — they just need to not block the critical path. Explicit upgrade paths per level: L5→L6 = add retry logic; L6→L7 = add monitoring; L7→L8 = self-healing.

**Why it matters:** Maturity models for emerging domains. When there's no established framework, you build one — defining what "ready" means at each capability level, with clear criteria for progressing to the next.

---

## Full Portfolio

### Cross-Functional Program Execution

**17-service agentic operating system.** Architected a service-oriented platform across 7 operational domains (Content, Finance, Compliance, Learning, Infrastructure, Database, Website) with contract-based interfaces and a consumer matrix tracking which business units use which services.

**33 production automation workflows.** Built, tested, and maintained 33 n8n workflows with a 60-point audit framework across 13 validation categories. Systematic debugging methodology identified 4 common failure patterns (type mismatches, merge node misconfiguration, Postgres parameterization errors, credential stripping).

**Multi-agent coordination architecture.** Designed coordination topologies (hierarchical, peer-to-peer), state sharing approaches, and standardized handoff contracts across 8 production skills. Research incorporated patterns from AWS Agent Squad, claude-flow, and 108-agent frameworks.

---

### Systems & Engineering-Level Technical Depth

**Schema evolution v1 → v7.14.** 50+ tables, 4 namespaces, zero data loss across 14 version increments. Mandatory 7-step change checklist enforced.

**Custom semantic search server.** 17,428 embedded chunks, sub-second retrieval, hash-based incremental updates (<10s vs 5+ min rebuilds). Migrated from ChromaDB local to Supabase pgvector.

**Defense-in-depth deployments.** 4-layer protection with health status enums, rollback triggers, and cooldown logic. Zero customer-visible outages.

**Safe database access services.** Read-only enforcement (7 blocked statement types), per-table column whitelisting for writes, 50-row output limits.

**Bi-directional Slack integration.** Outbound alerts + inbound command processing with bot-loop prevention, message classification, and database logging.

---

### LLM Automation & Novel Solutions

**Human-AI Operating System (HAIOS).** 350+ sessions, 17 services, 8 skills, 33 workflows, 17,428 embedded chunks, 50+ tables, 50,000+ words of documentation.

**Skills framework.** 8 versioned capability modules with standardized contracts (trigger/inputs/workflow/outputs/error handling). Consistent execution across 100+ sessions.

**Session continuity system.** 4-layer state management solving AI's memory limitation. Zero unexpected cutoffs in 200+ sessions after protocol implementation.

**Conversation embedding pipeline.** 373 conversations parsed, 1.2M words processed, 14,335 conversation chunks embedded.

**Cloud semantic search workflow.** HuggingFace embeddings + Supabase pgvector, webhook-triggered. Debugged API migration and webhook configuration conflicts.

---

### SQL & Data-Driven Reporting

**Financial tracking system.** 3 automated workflows (budget monitoring, expense tracking, revenue import) scoring 54-60/60 on audit. IRS tax category mapping, 50/30/20 allocation enforcement, automated threshold alerts.

**Schema documentation as living SSOT.** 50+ tables documented with column-level detail, constraints, indexes, reader/writer annotations. v7.14 current.

**Framework-level input routing debugging.** Root-caused intermittent query failures to payload differences between MCP and webhook invocation paths. Implemented defensive type-checking across 3 utility workflows.

---

### Cybersecurity & Compliance

**Compliance enforcement system.** Two-tier design: prohibited categories (FTC Act Section 5, 16 CFR Part 255 mapped) and keyword matching with block/flag severity levels. Risk profile: $16k-$43k+ fines per violation.

**5-tier authority system.** 18 immutable laws, forbidden-action enforcement, escalation rules. Practical AI safety: defining prohibited behaviors, enforcing boundaries, defaulting to caution.

**Row-Level Security audit.** Surfaced 8 errors (5 tables missing RLS, 3 SECURITY DEFINER views). Column-level write whitelisting for least-privilege autonomous operations.

**Verification philosophy.** "Ran ≠ Verified" — 3-step protocol (READ → RUN → TEST) codified as immutable law. Applied across 350+ sessions.

---

### Complex Program Management Under Ambiguity

**Strategic pivot under deadline.** After 337 sessions on a $0-revenue business, executed evidence-based pivot to portfolio extraction. New priority hierarchy with March 2026 deadline driving sequencing.

**L1-L10 autonomy taxonomy.** 10 levels, 4 capability tiers, three-tag tracking convention, explicit upgrade paths. 14 agents tagged. "Vacation-ready" = L8+.

**Token management protocol.** Formal incident analysis → proactive management. Zero recurrence in 200+ sessions.

**Deadline-driven operations.** Multi-phase implementation (4 phases, 17+ items each) with deferred items and explicit trigger conditions for reactivation.

---

### Influence Without Authority

**CEO-COO governance contract.** $0 spending authority. 80%+ decision reduction through process design and constraint-based autonomy. Effective governance enables autonomy rather than restricting it.

**Trust calibration model.** Quantified drift detection (approval rate, challenge rate, review time thresholds). Data-driven autonomy expansion with safety guarantees.

---

### Stakeholder Communication & Reporting

**Living status document.** Updated 350+ times. Zero-ramp-up session starts. Structured flag system for urgent items.

**Journey capture system.** Organizational learning document capturing decisions, trade-offs, and failure patterns. Transparent documentation of system bugs.

**Structured handoff contracts.** Standardized schema (action/files/state/errors/next) across 8 production skills. Prevents context loss between operational phases.

---

### Building Program Structure for Emerging Domains

**Self-bootstrapping skill creation.** skill-creator-skill (v2.3) builds new skills to standard with validation rules: token budgets, trigger uniqueness checks, structure requirements.

**Agentic document management.** SSOT registry (20+ docs) with cascade dependencies. 9-gate quality validation improved doc scores from 45→88/100 with 36/36 gate passes.

**60-point workflow audit framework.** Two-phase scoring (JSON analysis + runtime verification) across 13 categories. Applied to all 33 workflows.

**10 research-backed best practices.** Cross-validated from 10+ external sources (Anthropic docs, MCP spec, Microsoft LLMLingua, Mem0). Knowledge architecture optimizations: 67% token reduction, projected 83+ hours annual savings.

---

## Career Foundation

**Amazon** — Global Security Operations. Compliance programs, cross-functional coordination, policy enforcement at scale.

**Flexport** — Freight technology operations. Systems integration, partner management, operational process design.

**Pasha** — Logistics operations leadership. Program management, stakeholder communication, deadline-driven execution.

**MRMINOR LLC** — Founded and operate. Built the entire HAIOS/AOS infrastructure documented on this page.

14 years of operations → the pattern recognition that makes this AI work possible. Compliance programs, security policies, cross-functional coordination, and program management under ambiguity aren't new to me. Applying them to autonomous AI systems is.

---

## Documented Failures

**Token exhaustion incident.** AI blew through context limits mid-session, lost work. Root cause: zero visibility into token consumption for either party. Auto-loaded 51k tokens without budget check. Fix: proactive management protocol with checkpoints. Zero recurrence in 200+ sessions.

**Journey capture overwrite.** A skill overwrote instead of appending, destroying ~150 sessions of organizational learning history. Content partially recoverable from embeddings. Fix: updated skill logic, documented as anti-pattern ("ambiguous skill instructions default to destructive behavior").

**n8n credential stripping.** Full API workflow updates silently remove credential assignments from all nodes. Discovered through production failure. Fix: mandatory warning before full updates, partial update tooling built.

**Framework-level input routing bug.** Intermittent database query failures traced to MCP and webhook injecting request bodies through different payload structures. Invisible at the application layer — only diagnosable by tracing invocation paths. Fix: defensive type-checking across all utility workflows.

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
- **Email:** waxmanj@mac.com
- **Location:** Seattle, WA

---

*33 accomplishments across 9 domains. Every number verified from production systems.*
