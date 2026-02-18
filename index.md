---
layout: default
title: Jordan Waxman | AI Systems & Operations
---

# Jordan Waxman

**14 years operations leadership + 355 sessions building human-AI infrastructure**

I spent 5 months building HAIOS — a Human-AI Operating System where AI operates as COO with defined authority boundaries, and the human stays CEO. Building that required solving real security and governance problems: what an autonomous AI agent is forbidden to do, how to enforce those boundaries in production, how to evolve a database schema 14 times without losing data, and how to maintain operational continuity when your COO has amnesia every session.

The hardest problems in AI security aren't purely technical — they're governance problems. What should an autonomous system be allowed to do? How do you enforce boundaries without killing capability? How do you scale security controls when the system is growing faster than your ability to audit it? I've spent 355 sessions answering those questions in production. Every number on this page comes from that work.

---

## What I Built

| Layer | What | Scale |
|-------|------|-------|
| **Security governance** | 5-tier authority system with 18 immutable laws and forbidden-action enforcement | 355+ sessions governed |
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

### [Security Governance — Authority Tiers for Autonomous AI](https://github.com/MrMinor-dev/ai-security-compliance-framework)

Created a 5-tier authority system (Forbidden → Human-Only → Approval Required → Inform After → Autonomous) codified in a CEO-COO contract with 18 immutable laws. The AI COO operates with $0 spending authority — all influence through process design, trust calibration, and proactive recommendation. Autonomy expands or contracts based on demonstrated competence, not assumptions. Drift detection is quantified: >95% approval rate with <5% challenge rate triggers a review alert — the human is rubber-stamping, not reviewing.

**Why it matters:** Prohibited action lists = usage policies. Tiered authority = access control levels. Escalation rules = incident response procedures. Defining what a system *cannot* do is as important as defining what it can.

---

### [Database Security — RLS, Whitelisting, and Least-Privilege Enforcement](https://github.com/MrMinor-dev/database-security-framework)

Evolved a production PostgreSQL schema through 14 versions (v1 → v7.14, 50+ tables) with zero data loss. Enforced additive-only migrations, namespace conventions, and a mandatory 7-step change checklist before every modification.

Security audit surfaced 8 actual errors: 5 tables missing Row-Level Security, 3 SECURITY DEFINER views. Generated and executed fix scripts. The blocked statement list for Safe SQL Query: `INSERT`, `UPDATE`, `DELETE`, `DROP`, `ALTER`, `CREATE`, `TRUNCATE` — seven types, enforced at the string-parsing layer before any query reaches the database. If the statement contains any of these tokens, it's rejected with an error, not silently ignored.

The write whitelist covers 6 tables with specific allowed columns per table. Example: `tgt_products` allows writes to `title`, `description`, `price`, `affiliate_url` — but not `id`, `created_at`, or `compliance_status`. An agent can update product content but cannot modify the fields that governance and compliance processes set.

Built two safe database access services: Safe SQL Query (read-only, blocks 7 statement types) and Safe Database Write (table/column whitelist, per-table INSERT permissions, DELETE restricted to 3 tables with WHERE clause requirement, 50-row output limits).

**Why it matters:** Least-privilege access control for autonomous agents. The question isn't whether AI should access the database — it's which tables, which columns, which operations, with what constraints. Same pattern as securing any infrastructure access at scale.

The root cause of the intermittent query failures was invisible at the application layer. n8n's MCP `execute_workflow` injects the request body as `chatInput`. Webhook `curl` injects it as `body.query`. The same workflow, called two different ways, received completely different payload structures. The fix: `$input.first().json.body?.query || $input.first().json.chatInput || ''` — defensive type-checking that handles both invocation paths. Now standardized across all 3 utility workflows.

---

### [Defense-in-Depth for Automated Deployments](https://github.com/MrMinor-dev/deployment-protection-framework)

Designed 4-layer deployment protection: pre-deploy validation → post-deploy health checks → automatic rollback (Cloudflare) → cooldown logic. Health status enum (healthy → degraded → failed) with rollback triggers at each layer.

The enum transitions are explicit: `healthy` = last 3 health checks passed; `degraded` = 1-2 of last 3 failed, trigger warning alert; `failed` = all 3 failed, trigger automatic rollback. State is stored in the `system_flags` table so any workflow can read current system health before executing. A content publishing workflow checks health status first — if `degraded` or `failed`, it exits cleanly rather than publishing to a broken site.

Cooldown logic prevents the failure mode where a bad deploy triggers rollback, the rollback triggers a new deploy, the new deploy fails, and you're in a loop. Cooldown enforces a minimum 10-minute wait between deploy attempts after any rollback event. Circuit breaker pattern: the system stops trying before it makes things worse.

Cloudflare rollback is an API call to activate a previous deployment snapshot. Pre-deploy validation catches the obvious failures (missing environment variables, broken build). Post-deploy health checks catch the runtime failures (site returns 500, critical endpoints unreachable). Rollback catches the failures that only appear under live traffic. Each layer has a different failure surface — that's the point. Cooldown logic prevents cascading failures. Zero customer-visible outages.

**Why it matters:** Layered security controls where each layer catches what the previous missed. Pre-deploy = preventive controls. Health checks = detective controls. Rollback = corrective controls. Cooldown = circuit breakers. Classic defense-in-depth.

---

### [Session Continuity — State Management for Amnesic AI](https://github.com/MrMinor-dev/ai-session-orchestration)

After a mid-session resource exhaustion incident (AI said "plenty left" then hit the limit), conducted formal incident analysis. Root cause: zero visibility into token consumption for either party. Auto-loaded 51k tokens without budget check.

Built a 4-layer continuity system: session-context.md (living status document updated 355+ times), startup/end protocols, semantic search over 17,428 chunks, and proactive token management (25k checkpoints, budget estimation, 75% warnings). The session-context.md schema has 5 sections: **Next Session** (focus + context for the next COO to pick up), **Active State** (current priorities, work in progress, patterns discovered), **Recent Sessions** (rolling table of last 10: number, date, focus, key output), **Flags** (urgent items surfaced for immediate attention), **Structure Notes** (database version, embedding stats, IDs the COO needs). A new session reads this file first and is productive within one message — zero ramp-up. Zero unexpected cutoffs in 200+ subsequent sessions.

The incident numbers: the session auto-loaded 51,000 tokens of context before the first message. Against a ~100k token limit, that left less than half the context available before the session even started. Neither party had visibility into this. The AI said "plenty of context remaining" at turn 15 — and was wrong. The fix isn't just checkpoints; it's shared visibility. Both parties now estimate budget before large operations and the COO proactively flags at 75% consumption.

**Why it matters:** Incident response applied to AI systems — detect → analyze root cause → remediate → prevent recurrence. The incident revealed an observability gap: neither human nor AI knew the resource state. If you can't see it, you can't secure it.

---

### [Semantic Search — Building Retrieval Infrastructure](https://github.com/MrMinor-dev/semantic-search-framework)

Built a pipeline to parse, chunk, and embed 373 AI conversations (1.2M words, 224MB) into 14,335 searchable vectors. Combined with 3,093 document chunks = 17,428 total. Chunking conversations is harder than chunking documents. A document has headers and sections. A conversation has topic shifts mid-exchange, context that spans 50 turns, and the same concept discussed in completely different words across different sessions. The chunking strategy: sliding window of ~400 tokens with 50-token overlap, preserving full assistant turns rather than cutting mid-response. The overlap ensures a topic that spans a chunk boundary appears in both chunks and stays retrievable.

The HuggingFace API migration broke silently: `api-inference.huggingface.co` was deprecated in favor of `router.huggingface.co`. The old endpoint continued accepting requests but started returning degraded results — embeddings that looked valid but weren't semantically accurate. Only caught it by noticing retrieval quality drop on queries that should have returned strong matches. Lesson: API migrations that don't throw errors are the dangerous ones.

Architecture: sentence-transformers for embeddings, Supabase pgvector for storage, n8n webhook for cloud retrieval. Hash-based incremental updates run in <10 seconds vs. 5+ minutes for full rebuilds. Used this infrastructure to mine my own conversation history — running 50 semantic queries across 485 chunks to produce a verified accomplishment inventory.

The retrieval query against pgvector:

```sql
SELECT content, metadata, 1 - (embedding <=> query_embedding) AS similarity
FROM doc_embeddings
WHERE 1 - (embedding <=> query_embedding) > 0.3
ORDER BY similarity DESC LIMIT 10;
```

The `<=>` operator is pgvector's cosine distance. Subtracting from 1 gives similarity (0 = unrelated, 1 = identical). Threshold at 0.3 filters noise. The query runs in under a second on 17,428 vectors because pgvector uses an IVFFlat index — approximate nearest neighbor, not brute force.

**Why it matters:** Security observability at scale requires searchable, indexed data. This pipeline demonstrates: data ingestion → normalization → indexing → retrieval — the same architecture pattern behind security log analysis, threat detection, and audit trail search.

---

### [L1-L10 Autonomy Taxonomy — Framework for Ambiguous Domains](https://github.com/MrMinor-dev/autonomy-taxonomy)

When "how autonomous should this agent be?" had no clear answer, created a 10-level taxonomy across 4 capability tiers: Manual (L1-3), Supervised (L4-6), Autonomous + Monitoring (L7-9), Full Autonomy (L10). 14 agents tagged with three-part convention: current level, status, target.

Real examples from production: `Content Publisher: L7 | WIP | GOAL-L8` — runs independently and deploys to the site, but doesn't yet self-heal when the upstream content API returns malformed data. `Compliance Auditor: L6 | MAX | GOAL-L7` — flags violations correctly but requires human review before any action; ceiling is L6 until automated action is approved. `Budget Monitor: L8 | MAX | GOAL-L8` — monitors daily, alerts on threshold breach, self-recovers from API failures; vacation-ready.

The critical path that determines vacation-readiness: `Products → Content → Deploy → Site Up → Revenue`. Every agent on this path needs L7+ (runs independently). Agents off the critical path — analytics, reporting, archival — can be L5 without blocking operations. The taxonomy makes the dependency explicit: it's not "how autonomous is this agent?" it's "what breaks if this agent needs human intervention at 2am?"

Upgrade paths are concrete checklists, not assessments. L6→L7: add monitoring (detect the "no data collected" condition and log it). L7→L8: add self-healing (detect the failure, attempt recovery, alert if recovery fails). L8→L9: add self-optimization (detect performance degradation, adjust parameters). The difference between levels is a specific capability, not a vibe.

"Vacation-ready" defined as L8+ (4-week unattended operation). Key insight: individual agents don't need L10 — they just need to not block the critical path. Explicit upgrade paths per level: L5→L6 = add retry logic; L6→L7 = add monitoring; L7→L8 = self-healing.

**Why it matters:** Maturity models for emerging domains. When there's no established framework, you build one — defining what "ready" means at each capability level, with clear criteria for progressing to the next.

---

## What Else I Built

The deep dives above cover six systems in detail. Below is everything else in the same infrastructure — same production environment, same verification standards.

---

### Financial Operations Automation

The business needed expense tracking, budget monitoring, and revenue import without manual spreadsheets. Built 3 n8n workflows with IRS tax category mapping, 50/30/20 allocation enforcement, and automated alerts at 80%+ budget consumption. All three scored 54-60/60 on systematic audit.

The constraint that shaped the design: the AI COO has $0 spending authority. Every workflow that touches money is read-only or requires explicit human approval. The financial system is where the governance model gets tested most directly.

---

### Bi-Directional Slack Integration

Outbound alerts were straightforward. Inbound command processing was harder: the bot receives its own messages, creating loops if you don't filter them. Built message classification (bot vs. human), command parsing for structured inputs, database logging of all communications, and acknowledgment flows. Two workflows — outbound system alerts and inbound command processing — running in `#haios-coo`.

The practical result: the AI COO can be given instructions asynchronously without opening Claude. The human stays in the loop without being a bottleneck.

---

### Schema Documentation as Living SSOT

50+ tables, 4 namespaces, 14 version increments. The documentation problem isn't writing it — it's keeping it current. Built SUPABASE-SCHEMA-MASTER.md as a mandatory checkpoint: no schema change executes without updating the doc first. The 7-step checklist is the gate, not the afterthought.

When the schema was at v7.14 and an agent needed to know which columns it could write to, it read the doc. That only works if the doc is actually current. The checklist enforces that.

---

### Multi-Agent Coordination Architecture

When one AI agent hands off to another, context doesn't transfer automatically — the receiving agent starts with nothing. Built a coordination layer supporting two topology patterns: hierarchical (orchestrator routes work to specialist agents) and peer-to-peer (agents hand off directly). Standardized handoff contract schema across all 8 production skills: every handoff specifies what was done, which files changed, current state, errors surfaced, and what's next. Research incorporated production patterns from AWS Agent Squad, claude-flow, and a 108-agent framework. Context loss between handoffs: zero.

---

### Knowledge Architecture & Research Synthesis

The information needed to build effective agentic systems is scattered — Anthropic docs, MCP spec, Microsoft LLMLingua, Mem0, open-source frameworks. Synthesized 10 research-backed best practices documents, each cross-validated from 10+ sources. Applied them to optimize the system's knowledge architecture: 67% token reduction on routine queries, projected 83+ hours saved annually. The pattern: don't just read the research, build it into the system's operating constraints.

---

### Stakeholder Communication & Reporting

**Living status document.** Updated 355+ times. Zero-ramp-up session starts. Structured flag system for urgent items.

**Journey capture system.** Organizational learning document capturing decisions, trade-offs, and failure patterns. Transparent documentation of system bugs.

**Structured handoff contracts.** Standardized schema (action/files/state/errors/next) across 8 production skills. Prevents context loss between operational phases.

---

### Building Program Structure for Emerging Domains

**Self-bootstrapping skill creation.** skill-creator-skill (v2.3) builds new skills to standard with validation rules: token budgets, trigger uniqueness checks, structure requirements.

**[Agentic document management](https://github.com/MrMinor-dev/document-autonomy-system).** SSOT registry (20+ docs) with cascade dependencies. 9-gate quality validation improved doc scores from 45→88/100 with 36/36 gate passes.

**[60-point workflow audit framework](https://github.com/MrMinor-dev/quality-assurance-framework).** Two-phase scoring (JSON analysis + runtime verification) across 13 categories. Applied to all 33 workflows.

**10 research-backed best practices.** Cross-validated from 10+ external sources (Anthropic docs, MCP spec, Microsoft LLMLingua, Mem0). Knowledge architecture optimizations: 67% token reduction, projected 83+ hours annual savings.

---

## Career Foundation

**Amazon (2020–2025)** — Program Manager, Global Security Operations

Two roles across 5 years. First: L5→L6 promoted Program Manager for Global Outsourcing, directing hardware supply for 60,000+ Customer Service Agents across 23 partners, 138 sites, 44 countries. $1.35M in cost savings through strategic procurement. 70% delivery SLA improvement (3 weeks → 10 days). Executed a 36-hour emergency device deployment to 1,613 agents ahead of India COVID lockdowns.

Second: L6 TPM in CS Security, delivering $2.4M+ annual value through AI automation. 79% average efficiency gains across 4 programs. Deployed live production automation systems (100% uptime since October 2025). Led cross-functional programs across 15+ organizations.

**Flexport (2016–2020)** — Global Operations Manager

Managed 150 freight forwarding clients across San Francisco, Hamburg, and Philadelphia. Selected twice for expansion leadership: 300% new business growth in DACH region within one year, $4M top-line revenue in 6 months from the Philadelphia launch. Redesigned invoicing process reducing Days Sales Outstanding by 50% and cost-to-serve by 40%. Conceptualized Flexport's first Capital financing product — adopted company-wide and became a significant revenue driver.

**Pasha Group (2012–2016)** — Operations Manager

Promoted from analyst to manager in 2 years, leading a 12-person team across Northern California terminal operations. Automated military household goods booking: accuracy from 77% → 99.4%, cost-to-serve down 89%. Coordinated 1,200 container emergency transfers in under 36 hours following a vessel failure. Directed M&A integration of Horizon Transport Lines. Prevented $218K in invoice leakage through process redesign.

**MRMINOR LLC (2025–present)** — Founder

Built the entire HAIOS/AOS infrastructure documented on this page. 5 months, 355 sessions, 17 services, 33 workflows, 17,428 embedded chunks. Running live with zero human oversight required for routine operations.

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
- **LinkedIn:** [linkedin.com/in/waxmanjordan](https://www.linkedin.com/in/waxmanjordan/)
- **Email:** waxmanj@mac.com
- **Location:** Seattle, WA

---

*33 accomplishments across 9 domains. Every number verified from production systems.*
