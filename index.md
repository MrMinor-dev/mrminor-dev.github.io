---
layout: default
title: Jordan Waxman | AI Systems & Operations
---

# Jordan Waxman

**14 years operations leadership — building human-AI infrastructure since 2025**

I wanted to build an operating system for running a business with AI. To do that, I had to build one for working with AI first.

HAIOS — the collaboration layer. How a human and an AI make decisions together. What the AI can do autonomously. What requires approval. How work survives when the AI forgets everything between sessions. Built from scratch starting in 2025, 14 years of operations experience, no existing blueprint.

That system made the second one possible. AOS is the platform — 17 services across 7 operational domains. Database, compliance, search, learning, automation. A new business doesn't start from zero. It inherits everything production already broke, fixed, and made more durable.

Everything on this page is from those builds.

---

## What I Built

| Layer | What | Business Problem |
|-------|------|-----------------|
| [**Security governance**](#security-governance--authority-tiers-for-autonomous-ai) | 5-tier authority system with 18 immutable laws and forbidden-action enforcement | AI needed authority boundaries before it could touch production safely |
| [**Database security**](#database-security--rls-allowlisting-and-least-privilege-enforcement) | PostgreSQL schema v1→v7.14, RLS on all tables, statement-type allowlisting, column-level write permissions — 8 security errors found and fixed via audit | AI needed surgical access — broad enough to run the business, narrow enough to be safe |
| [**Defense-in-depth**](#defense-in-depth-for-automated-deployments) | 4-layer deployment protection: validation → health checks → auto-rollback → cooldown | System runs unattended — no one available to catch a bad deploy |
| [**Compliance**](#compliance-by-design--four-domains-built-into-the-architecture) | Prohibited content enforcement with severity tiers, FTC/Amazon ToS mapping — daily Spot Audit verifies enforcement layer is firing, not just content | Four compliance domains with different rules — enforcement had to be structural, not remembered |
| [**Multi-agent coordination**](#multi-agent-coordination--governance-first-parallel-execution) | Authority tiers and dispatch protocols for parallel CEO+COO+CC+CiC execution | Parallel AI execution without governance creates technical debt that's hard to retrofit |
| [**Human-AI coordination**](#human-ai-coordination--coordination-infrastructure-for-human-ai-collaboration) | Structured state document, async Slack coordination, handoff contract schema for 8 production skills, drift detection on the working relationship | Two parties operating across time need explicit coordination infrastructure |
| [**Autonomy taxonomy**](#autonomy-taxonomy--the-platform-model) | 10-level maturity model classifying every workflow — L6 ceiling for deterministic flows, explicit upgrade paths for the rest | Can't scale autonomy without measuring where every workflow sits |
| [**Session continuity**](#session-continuity--state-management-for-session-based-ai) | 4-layer continuity system: living state document, session protocols with standardized handoffs, semantic retrieval, and proactive token management | Session-based AI loses all context between conversations — continuity is a productivity problem |
| [**Skills framework**](#skills-framework--versioned-capability-contracts-for-autonomous-ai) | 8 versioned capability modules — each a standardized contract with trigger phrases, workflow, authority tier, error handling, and explicit write modes | Repeatable operations without defined contracts produce inconsistent results |
| [**Document autonomy**](#document-autonomy--building-documentation-that-ai-can-act-on) | Agentic doc standards, SSOT registry with cascade dependencies, and 9-gate quality validation — documentation AI agents can find, trust, and act on without human help | Documentation written for humans fails AI agents — stale docs produce bad actions |
| [**Search infrastructure**](#semantic-search--building-retrieval-infrastructure) | 17,428 embedded chunks with sub-second retrieval and hash-based change detection | 17,000+ embedded chunks are useless without fast, accurate retrieval |
| [**Data pipeline**](#data-pipeline--incremental-indexing-for-production-ai) | Hash-based incremental indexing: 373 conversations, 224MB raw JSON, change detection per chunk | Business intelligence only useful if it flows continuously across all operations |
| [**Knowledge mining**](#knowledge-mining--structured-intelligence-from-operational-history) | Semantic mining pipeline over full operational history | 373 conversations of operational history — inaccessible without systematic mining |
| [**Continuous learning**](#continuous-learning--ops-data-as-compounding-infrastructure) | Sunday intelligence pipeline: search trends, competitor signals, performance data → synthesized weekly recommendations | Lessons don't transfer across business lines without shared infrastructure |
| [**Automation**](#n8n-development-framework--building-33-production-workflows-with-ai) | 33 production workflows across 7 domains built with Claude + n8n-MCP — 541 nodes, 2,646 template patterns, 60-point audit framework | 33 workflows need governance standards, not just execution |
| [**Financial operations**](#financial-operations-automation) | IRS tax category mapping, 50/30/20 budget allocation, 80% threshold alerts — all with $0 AI spending authority | AI touching financial operations needed $0 spending authority and structural oversight |
| [**Email intelligence**](#email-intelligence--classification-extraction-and-routing) | Gmail classification, invoice extraction, automated routing to expenses or review queue | Human reading every email is the bottleneck |
| [**Slack integration**](#bi-directional-slack-integration) | Bi-directional bot: outbound alerts + inbound command parsing, loop detection, message classification, database logging | Coordinating with AI shouldn't require opening a full session |

---

## Deep Dives

### [Security Governance — Authority Tiers for Autonomous AI](https://github.com/MrMinor-dev/security-governance-framework)

Before I let the AI touch anything in production, I wrote down 18 things it's never allowed to do. That list became a contract — five tiers from forbidden to fully autonomous. Running inside those boundaries since August 2025. $0 spending authority. Every dollar still goes through me. But it handles most of what a COO would handle day to day.

The hardest part wasn't defining the tiers. It was detecting when I stopped actually reviewing them. Approval rate above 95%, challenge rate below 5% — that looks like a healthy relationship. It's actually the warning sign. So I built the flag in.

**Why it matters:** Defining what a system cannot do is as important as defining what it can. Forbidden action lists, tiered authority, and escalation rules are governance infrastructure — the same kind that underlies access control, incident response, and policy enforcement in any production system. The monitoring layer is what makes it compound: every decision, approval, and challenge is data — the system learns from what works, flags what doesn't, and surfaces where new capabilities need new boundaries.

---

### [Database Security — RLS, Allowlisting, and Least-Privilege Enforcement](https://github.com/MrMinor-dev/database-security-framework)

An autonomous agent managing financial workflows, compliance checks, and content operations needs broad read access and surgical write access. Full database access is dangerous. No access is useless. The problem is building something in between — specific enough to be safe, flexible enough to actually run the business.

I built two services that control exactly what the AI can touch. Read queries block 7 statement types at the string-parsing layer — if the query contains DELETE, it never reaches the database. Writes go through a per-table, per-column allowlist — the agent can update product content but can't touch `id`, `created_at`, or `compliance_status`. Then a security audit found 8 actual errors in the system I'd been running for months: 5 tables with no Row-Level Security, 3 views running with creator privileges instead of caller privileges. The system looked secure from every design document. It wasn't.

The hardest bug to find was at the framework boundary. Intermittent query failures traced not to SQL or application logic, but to the invisible difference between how MCP and webhook protocols inject request bodies. Same workflow, two different payload structures depending on how you called it. Fix is one line of defensive type-checking, now in all 3 utility workflows.

**Why it matters:** Least-privilege access control for an AI agent is the same problem as least-privilege access control for any infrastructure. Which identities, which resources, which operations, with what constraints. The audit methodology — checking actual production state rather than documented intent — is where the 8 errors were. That gap between what the architecture says and what the system does is where every real security failure lives.

---

### [Defense-in-Depth for Automated Deployments](https://github.com/MrMinor-dev/deployment-protection-framework)

The system runs unattended. No one watching the dashboard, no one checking logs, no one rolling back when something goes wrong. When a deploy breaks, it has to catch itself.

That shaped the design: four layers, each catching what the previous missed. Validation before it ships to systematically stop known-bad patterns before they reach production. Health checks after it lands to catch problems validation didn't predict. Automatic rollback when health fails to revert without human intervention. Cooldown that blocks re-deploy until the recovery window clears, because rollback that immediately re-deploys the same bad code just loops.

The layer most teams skip is cooldown. Health status is three states — healthy, degraded, failed — stored in one table any workflow can query before doing anything. A content publishing workflow reads that table first. If the site is degraded or failed, it exits. The enum keeps the system from doing work on a broken foundation.

**Why it matters:** Each layer compensates for a specific blind spot the previous one has. Validation catches known-bad patterns but can't predict emergent failures. Health checks detect post-deploy degradation but only after it's happened. Rollback fixes detected failures but can trigger cascading loops without a cooldown window. No single layer is sufficient. The same principle applies to network security, physical security, and any infrastructure that needs to stay operational without a human in the room.

---

### [Compliance by Design — Four Domains, Built Into the Architecture](https://github.com/MrMinor-dev/compliance-by-design-framework)

Four compliance domains — content, operational, legal, tax — each with different rules, different failure modes, different enforcement strategies. What holds them together: non-compliance is structurally impossible, not just unlikely.

Content compliance is an isolated service workflows call — publishing can't happen without passing it. Operational compliance is a 60-point audit that verifies behavior, not intent. Legal compliance surfaces deadlines before they're urgent. Tax compliance categorizes every transaction at point of entry. The enforcement runs whether you remember to check or not.

**Why it matters:** Compliance programs fail two ways — the rules don't actually run, or nobody can tell whether they're running. The patterns here — isolated enforcement services, audit scoring, automated preparation with human submission gates — apply to any program with regulatory, legal, or operational requirements.

---

### [Multi-Agent Coordination — Governance-First Parallel Execution](https://github.com/MrMinor-dev/multi-agent-coordination-framework)

The governance layer — authority tiers, forbidden action lists, dispatch protocols — was fully defined before Claude Code or Claude in Chrome could fully run inside it. When those tools came online, they stepped into roles that already existed. Nothing had to be retrofitted.

That sequencing is the design. CEO + COO handle decisions. Claude Code and Claude in Chrome execute in parallel. The constraint shifts from execution speed to decision throughput — which is the right constraint to have. Context loss between handoffs since building this: zero.

**Why it matters:** Most teams build execution first and bolt on governance after something breaks. Authority boundaries get retrofitted around whatever the tool already did. Building governance first means the tools step into defined roles — not defined roles get retrofitted to whatever the tools did.

---

### [Human-AI Coordination — Coordination Infrastructure for Human-AI Collaboration](https://github.com/MrMinor-dev/human-ai-coordination-framework)

Security governance defines what the AI can and can't do. This is what comes after that: how two parties stay aligned, communicate across time, hand off work cleanly, and monitor the health of the working relationship itself.

The coordination layer has four components. A structured state document — five sections, each with a defined job, updated across 365 sessions and never ambiguous about what lives where. Async Slack coordination — instructions, reroutes, and status checks without opening a full session, with command classification, logging, and acknowledgment built in. A handoff contract schema that all 8 production skills use when passing work between phases — facts only, no interpretation, so chaining agents don't have to trust each other's judgment about what happened. And journey capture: 365 sessions of decisions, trade-offs, and failures logged as they happen, not reconstructed after.

Drift detection runs on the relationship itself. Approval rate above 95%, challenge rate below 5% — that looks like a healthy working relationship. It's rubber-stamping. The warning flag has to be defined in advance, because the number that signals a problem looks identical to the number that signals trust.

**Why it matters:** Coordination at scale is a communication and reporting problem. Structured state, async channels, standardized handoffs, and relationship monitoring are the same patterns behind program management, distributed team operations, and any system where multiple parties need to stay aligned without being in the same place at the same time.

---

### [Autonomy Taxonomy — The Platform Model](https://github.com/MrMinor-dev/autonomy-taxonomy-framework)

Scaling agentic operations means knowing where every workflow sits on the maturity curve — and what it needs to move. L8 is vacation-ready: self-healing, self-reporting, 4 weeks unattended. L6 is the right ceiling for deterministic flows that don't need intelligence. The taxonomy's job isn't to push everything to L10. It's to give every workflow a position, a ceiling if it belongs there, and a path if it doesn't.

14 workflows tagged. The 4-month vacation was the definition of "done" — the taxonomy made that answerable instead of aspirational.

**Why it matters:** "Autonomous" isn't binary. A scheduled data import and a self-healing content pipeline are completely different things. Without a shared maturity model, prioritization is guesswork. With one, the upgrade backlog writes itself.

---

### [Session Continuity — State Management for Session-Based AI](https://github.com/MrMinor-dev/session-continuity-framework)

Mid-session, the AI told me there was plenty of context left. A few minutes later it hit the limit and we lost the work. When I dug into it, the session had auto-loaded 51k tokens before I sent the first message — against a 100k limit. Neither of us had any visibility into that. So I built it in: 4-layer continuity system, proactive checkpoints every 25k tokens, a 75% warning that prompts a save. Zero unexpected cutoffs in the 200+ sessions since.

The part that actually makes it work is the structure of the state document. Five sections, each with a defined job — what to focus on next, what's in progress, the last 10 sessions, anything urgent, and the IDs and stats the AI needs to operate. A new session reads that file first and is productive in one message. The structure is the reason, not just the document's existence.

**Why it matters:** Every session that starts from clean state is a session that produces something instead of re-explaining history. Continuity compounds — an agent that inherits accurate state from 365 prior sessions moves faster on day 366 than it did on day one. The 4-layer architecture here applies to any system where an autonomous operator needs to stay oriented across resets: state management, structured handoffs, selective retrieval, and resource monitoring. Without all four, the system works in isolation but not at scale.

---

### [Skills Framework — Versioned Capability Contracts for Autonomous AI](https://github.com/MrMinor-dev/skills-framework)

8 skills run every repeatable operation in the system — session startup, session end, document management, semantic search, database writes, workflow audits, index updates, skill creation. Each one is a versioned contract: name, exact trigger phrases, step-by-step workflow, authority tier, error handling, explicit write modes, and a handoff statement declaring what was produced. The agent reads the contract before executing, every time. Not because it remembers the right way — because the contract is there.

That last detail matters. A skill that destroyed ~150 sessions of organizational history did it because the instructions didn't specify write mode. "Save to file" is ambiguous. The agent made a reasonable choice. It was wrong. From that failure: explicit write modes are now required fields. Version bumps are traceable to specific production failures. The version number is the evidence count — skill-creator-skill is at v2.3 because three rounds of real use found three rounds of real gaps.

**Why it matters:** SOPs fail the same way skill contracts fail — an underdefined instruction, a reasonable-seeming default, no one to ask. The difference here is the default runs immediately, with no manager to check with. Complete contracts before production. Versioned on every failure. That's what makes autonomous execution consistent at scale.

---

### [Document Autonomy — Building Documentation That AI Can Act On](https://github.com/MrMinor-dev/document-autonomy-framework)

Skills read documents to know how to execute. Agents consult them before acting. Workflows run on whatever they find. A stale document isn't a documentation problem — it's a production failure waiting to happen.

At 20+ operational documents with live dependencies, that compounds. A schema change invalidates a skill contract. A compliance rule update needs to cascade to the enforcement workflow, the audit doc, and the architecture record. Without infrastructure tracking those connections, the system drifts. Agents act on the drift.

Three layers manage it. A design layer: agentic doc standards — structure, currency signals, scope boundaries for everything agents can act on. An enforcement layer: a 9-gate quality framework every document runs through before entering the knowledge base. Doc quality went from 45→88/100. 36/36 gate passes. A cascade management layer: the SSOT Registry, every document's dependencies mapped explicitly. One agent changes one thing. The registry surfaces everything downstream. Nothing silently goes stale.

That last layer is what makes this a platform, not a documentation system.

**Why it matters:** An agentic system that can't manage its own knowledge base can't scale. Design, enforcement, and cascade tracking together turn a document collection into a self-maintaining operational layer. Same architecture applies anywhere autonomous systems act on evolving information: compliance frameworks, security runbooks, policy libraries under active revision. The 9-gate framework makes doc quality auditable in under two minutes without reading every word.

---

### [Semantic Search — Building Retrieval Infrastructure](https://github.com/MrMinor-dev/semantic-search-framework)

373 conversations. 1.2 million words. 224MB of operational history — plus SSOT docs, skills, operational recommendations, architecture decisions. Without retrieval infrastructure, none of it is usable — loading "everything that might be relevant" burns the token budget before the agent does any work. The system needed to find the right paragraph from the right document in under a second, and expose that as a service any AOS workflow or agent could call.

That shaped the architecture: chunk content with sliding window overlap so context survives at boundaries, embed with sentence-transformers, store in pgvector with an HNSW index for fast approximate search. Chunking conversations was harder than chunking documents — a document has sections, a conversation shifts topics mid-exchange and carries context across 50 turns. Cutting in the wrong place means retrieving a fragment that makes no sense without what came before it.

Two weeks after launch, retrieval quality degraded with no errors. The HuggingFace API had migrated endpoints silently — the old URL still accepted requests, just returned bad vectors. The only signal was gradually worse results. That failure is now a health-check item in weekly ops. The framework monitors retrieval quality, not just uptime.

Once the infrastructure was solid: 50 structured queries across the full conversation history, 485 results, 33 accomplishments distilled from what actually happened.

**Why it matters:** An organization's operational history is either searchable institutional knowledge or it disappears session by session. Ingest → normalize → embed → index → retrieve is the same pipeline behind customer support search, security log analysis, engineering post-mortem retrieval — any domain where finding the right record fast matters.

---

### [Data Pipeline — Business Intelligence at Scale](https://github.com/MrMinor-dev/data-pipeline-framework)

Every business running on AOS generates operational data — workflow executions, financial transactions, content performance, email volume. The pipeline collects it, normalizes it, and cascades it through an analysis layer that surfaces recommendations by Sunday morning. Workflow health data feeds back in too — execution rates, error patterns, timing — so the system improves its own operations from the same pipeline that tracks the business.

A new business doesn't build its own reporting infrastructure. It connects to this one.

**Why it matters:** Most businesses treat reporting as a byproduct. This treats it as infrastructure — data that flows continuously, analysis that compounds, recommendations that arrive before the week starts.

---

### [Knowledge Mining — Structured Intelligence from Operational History](https://github.com/MrMinor-dev/knowledge-mining-framework)

373 conversations. Incident reports, session records, post-mortems, decision logs. Searchable — but searching isn't the hard part. The harder problem is interrogating it systematically to get structured output: not "find something about cross-functional coordination," but extract every piece of evidence that proves impact in that domain, organized by what actually matters.

That's a query design problem. 50 structured queries written against a target schema — 9 domains, each with specific evidence requirements. Not open-ended. Each query maps to a domain, each result either evidences it or doesn't. 485 chunks surfaced, reviewed, distilled into 33 accomplishments backed by 205 evidence excerpts. Not reconstructed from memory. Mined from what actually happened.

The schema is what separates mining from searching. Open-ended queries produce interesting findings. Schema-driven queries produce structured proof.

**Why it matters:** Every organization doing serious work with AI generates operational history — support transcripts, incident logs, post-mortems, session records. Most of it sits uninterrogated. The pipeline here — embed → define schema → query systematically → distill — is the methodology for turning that history into structured intelligence. The inputs change. The architecture doesn't.

**Why it matters:** Institutional knowledge trapped in unstructured history is a liability. Every organization doing serious work with AI is generating operational history at scale. The question is whether it compounds or disappears.

---

### [Continuous Learning — Ops Data as Compounding Infrastructure](https://github.com/MrMinor-dev/continuous-learning-framework)

Search trends, competitor signals, and performance data flow into a pipeline that generates strategic recommendations by Sunday morning. Every session starts with that intelligence already synthesized. When the first video ships, the loop closes — performance data feeds back in, and the next topic recommendation is different because of it.

The harder problem was making learning cross business lines. A pattern discovered in TGT doesn't automatically improve PB. The fix: validated patterns land in a shared table that skills query before execution. A new business inherits every lesson production already taught — not from a doc, from the schema.

**Why it matters:** Most systems treat knowledge as a byproduct of work. This treats it as infrastructure. The pipeline exists so the system gets harder to break the same way twice, and faster to stand up the next time.

---

### [n8n Development Framework — Building 33 Production Workflows with AI](https://github.com/MrMinor-dev/n8n-development-framework)

Two things have to exist before the first workflow gets written: the right tooling and a governance standard. Without both, the workflow structure is guesswork and there's nothing systematic to verify the result actually worked.

The tooling is n8n-MCP — it gives Claude direct access to all 541 node definitions and 2,646 real-world template patterns. Without it, Claude produces plausible-looking workflow JSON with wrong property names and missing required fields. With it, Claude designs the full workflow, validates node connections, and flags configuration errors before anything touches production.

The governance standard is a 60-point two-phase audit. Phase 1 runs on raw JSON — no execution needed. Phase 2 verifies runtime behavior. A workflow that silently completes but writes nothing to the database passes Phase 1. It fails Phase 2, Category C. Every workflow passes both before going live. Packaged as a versioned skill, the audit is what enables agentic operations to identify a need, build a workflow, and verify it meets the standard — without human review every time.

Four failure patterns are documented because they happened in production. All fixed. All in the anti-patterns list — including the one where a full API update silently strips credentials from every node with no error or alert.

**Why it matters:** Workflow governance is the same problem as release management and change control — systematic standards applied consistently, not remembered selectively. The build methodology applies anywhere humans and AI are constructing systems together: give the AI the actual specs, build incrementally, verify at each step, audit before deploy.

---

### [Financial Operations Automation](https://github.com/MrMinor-dev/financial-operations-framework)

Running a business with AI means the AI touches financial operations. The question is how much authority it gets. The answer: $0. It tracks income and expenses, allocates to 50/30/20 targets, monitors spending against budget thresholds, and alerts when any category hits 80%. It doesn't move money. Every dollar still requires approval.

That constraint is built once and inherited by every business on the platform. A new business running on AOS doesn't build its own financial system — it steps into the same three workflows, the same authority rules, the same allocation model. Budget data flows into the continuous learning pipeline alongside performance data, so the system can connect what things cost to what they produced.

**Why it matters:** Financial oversight at the single-business level is a workflow problem. At the platform level, it's an architecture problem — consistent authority boundaries, consistent allocation rules, financial results as a signal the system can actually learn from.

---

### [Email Intelligence — Classification, Extraction, and Routing](https://github.com/MrMinor-dev/email-intelligence-framework)

Every business has the same inbox problem: invoices to log, compliance notices that need immediate attention, vendor updates worth tracking, and noise that should disappear. The default is a human reading every email. This automates the triage and everything that follows.

Claude reads and classifies each message into one of 9 categories. Rules handle the routing. Invoices get parsed — vendor, amount, date, IRS category — and written to the expenses table automatically. Slack closes the loop with a daily count. 90%+ processed without intervention.

**Why it matters:** Most businesses are one step away from this — Gmail is already connected, the emails are already arriving. The gap is structured extraction and routing logic. Same architecture applies to support tickets, vendor communications, compliance filings.

---

### [Bi-Directional Slack Integration](https://github.com/MrMinor-dev/slack-integration-framework)

The AI can alert me when something needs attention. I can respond with an instruction — pause operations, check status, resume — without opening a full session. The coordination happens in Slack, asynchronously, while I'm doing something else.

Two workflows make that work. Outbound is a shared send service every other workflow calls. Inbound is the control plane — command parsing, database logging, acknowledgment, loop detection to prevent the bot from processing its own messages. 23 nodes, five command branches, every error path accounted for.

**Why it matters:** Human-AI coordination through asynchronous messaging. The patterns — message classification, loop detection, command routing — are the same problems you solve in any multi-system communication layer.

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

## The Correction Loop

Failure → root cause → fix → constraint → version bump → documented anti-pattern. That loop is built into the system. `claude-instructions.md` has been rewritten based on what went wrong, not what was planned. Skills are at v2.x because v1.x had gaps that production exposed. The anti-patterns are referenced in the skills that replaced them — so the same failure can't recur without the system flagging it first.

Four examples from production. Each produced a permanent change.

---

**Token exhaustion.** Mid-session, the AI said plenty of context remained. A few minutes later it hit the limit and the work was lost. Root cause: neither party had visibility into consumption. The session had auto-loaded 51k tokens against a 100k limit before the first message. Fix: 4-layer continuity system, proactive checkpoints every 25k tokens, 75% warning built into operating protocol. Zero recurrence in 200+ sessions. *(Covered in depth: [Session Continuity](#session-continuity--state-management-for-session-based-ai))*

**Journey capture overwrite.** A skill destroyed ~150 sessions of organizational history — overwrote instead of appending. Root cause: ambiguous instructions with no explicit write mode. Fix: write-mode validation now a required field in every skill. Documented as a standing anti-pattern: "ambiguous skill instructions default to destructive behavior." *(Covered in depth: [Skills Framework](#skills-framework--versioned-capability-contracts-for-autonomous-ai))*

**n8n credential stripping.** Full API workflow updates silently remove credential assignments from all nodes. No error. No warning. Discovered only when workflows stopped authenticating in production. Fix: mandatory warning added before any full workflow update, partial update tooling built to avoid the operation entirely when possible. Now in the pre-update checklist for every workflow change.

**Framework-level input routing bug.** Intermittent database query failures that looked random. Traced to MCP and webhook injecting request bodies through different payload structures — same workflow, two different call paths, two different shapes. Invisible at the application layer. Fix: defensive type-checking across all 3 utility workflows. Now a standard pattern for any workflow callable through multiple entry points.

---

## Technical Stack

| Category | Tools |
|----------|-------|
| **AI** | Claude (Anthropic), Model Context Protocol (MCP) |
| **Automation** | n8n (33 production workflows) |
| **Database** | Supabase (PostgreSQL + pgvector), Row-Level Security |
| **Search** | sentence-transformers (all-MiniLM-L6-v2), HuggingFace API |
| **Integrations** | Slack API, Gmail API, Google Drive API |
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
