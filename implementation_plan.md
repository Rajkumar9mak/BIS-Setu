# Implementation Plan: BIS Setu (AI-Powered BIS Compliance & Verification Platform)

**BIS Setu** is a comprehensive civic-tech & industrial intelligence platform bridging Indian Standards (BIS) with manufacturers and consumers. It features a dual-mode workflow: **Industry Compliance Wizard & Roadmap Engine** and **Consumer Verification & Counterfeit Detection Engine**, backed by a verified Indian Standards RAG knowledge base with strict citation grounding (zero-hallucination).

---

## User Review Required

> [!IMPORTANT]
> **Tech Stack Selection & Architecture**:
> - **Frontend**: Next.js 14+ (App Router), React, TypeScript, Tailwind CSS, Lucide icons, Framer Motion for sleek animations, glassmorphic Indian civic-tech UI theme (Deep Navy, Saffron Accent, Emerald Verified Green).
> - **Backend**: FastAPI (Python 3.13), Pydantic v2, SQLite / ChromaDB for vector retrieval, LangChain / Google Gemini integration with an intelligent local deterministic fallback so the prototype functions 100% out-of-the-box offline and online.
> - **Initial Categories (MVP)**:
>   1. **Electrical & Electronics**: IS 302 (Part 1 & 2-15) for Electric Kettles / Water Heaters; IS 13252 for IT products under CRS.
>   2. **Consumer Safety / Helmets**: IS 4151 for Protective Helmets for Two-Wheeler Riders.
>   3. **Toys & Child Safety**: IS 9873 (Parts 1-3) & IS 15644 for Electric Toys.
>   4. **Packaged Water & Food Containers**: IS 14543 for Packaged Drinking Water.

> [!NOTE]
> **AI / LLM API Key**:
> The system will support a `GEMINI_API_KEY` in `.env`. If an API key is not yet provided, our built-in Semantic & Clause-Ranked RAG retrieval engine will seamlessly synthesize precise answers from the verified BIS clauses with full citations, ensuring no demo failures in production or offline demonstration environments.

---

## Proposed System Architecture

```text
                               ┌──────────────────────────────────────────────┐
                               │           BIS SETU WEB APPLICATION           │
                               │           (Next.js 14 + Tailwind)            │
                               └──────────────┬───────────────────────────────┘
                                              │
                     ┌────────────────────────┴────────────────────────┐
                     │                                                 │
          ┌──────────▼──────────┐                           ┌──────────▼──────────┐
          │   🏭 INDUSTRY MODE   │                           │   🔍 CONSUMER MODE  │
          │  Compliance Wizard  │                           │  QR / CM-L Scanner  │
          │  Roadmap & Costs    │                           │  Validity Verifier  │
          │  Lab Finder & Expiry│                           │  Grievance Reporter │
          └──────────┬──────────┘                           └──────────┬──────────┘
                     │                                                 │
                     └────────────────────────┬────────────────────────┘
                                              │ REST API
                               ┌──────────────▼──────────────┐
                               │    FASTAPI BACKEND ENGINE   │
                               └──────────────┬──────────────┘
                                              │
         ┌────────────────────────┬───────────┴───────────┬────────────────────────┐
         │                        │                       │                        │
┌────────▼────────┐      ┌────────▼────────┐     ┌────────▼────────┐      ┌────────▼────────┐
│ Structured DB   │      │ RAG Retriever   │     │ Verification DB │      │ Lab & Fee Engine│
│ Products, IS    │      │ ChromaDB /      │     │ CM-L Registry   │      │ Testing labs,   │
│ Schemes, QCOs   │      │ Semantic Search │     │ Active/Expired  │      │ MSME discounts  │
└─────────────────┘      └────────┬────────┘     └─────────────────┘      └─────────────────┘
                                  │
                         ┌────────▼────────┐
                         │ LLM Synthesizer │
                         │ Gemini / Strict │
                         │ Cited Generator │
                         └─────────────────┘
```

---

## Proposed Changes

### Directory Structure

```text
c:\Lest's Code\bis\
├── backend/
│   ├── main.py                     # FastAPI server entrypoint
│   ├── requirements.txt            # Dependencies
│   ├── config.py                   # App configuration & env
│   ├── database/
│   │   ├── db.py                   # Database connection (SQLite)
│   │   └── models.py               # Schemas for Products, Standards, Labs, Licences
│   ├── data/
│   │   ├── standards_knowledge/    # Rich extracted Indian Standard clauses (JSON / MD)
│   │   ├── products_catalog.json   # Seed products, QCOs, Schemes, Testing Requirements
│   │   ├── laboratories.json       # BIS recognized testing labs across India
│   │   ├── cml_registry.json       # Genuine & counterfeit CM/L numbers for verification
│   │   └── fee_structures.json     # BIS official fee slabs & MSME concessions
│   ├── api/
│   │   ├── compliance.py           # Wizard, roadmap, lab recommendations, fee calculations
│   │   ├── verification.py         # CM/L & QR code product verification
│   │   ├── rag.py                  # RAG clause search & AI grounded responses with citations
│   │   └── dashboard.py            # Manufacturer license tracker & renewal alerts
│   └── services/
│       ├── rag_engine.py           # Vector embeddings / BM25 hybrid search & citation builder
│       ├── compliance_engine.py    # Business logic for standard mapping & roadmap generation
│       └── verification_engine.py  # CM/L pattern validator & registry matcher
│
├── frontend/
│   ├── package.json                # Next.js 14, Lucide, Tailwind, Framer Motion
│   ├── tailwind.config.ts          # Custom palette (Tricolor/BIS civic-tech theme)
│   ├── app/
│   │   ├── layout.tsx              # Root layout with Header & Footer
│   │   ├── page.tsx                # Landing page with mode selection & quick stats
│   │   ├── industry/
│   │   │   └── page.tsx            # 5-Step Interactive Compliance Wizard & Roadmap
│   │   ├── consumer/
│   │   │   └── page.tsx            # Scanner / CM-L lookup with counterfeit alerts
│   │   ├── copilot/
│   │   │   └── page.tsx            # BIS Setu AI Copilot (strict grounded RAG chat)
│   │   ├── labs/
│   │   │   └── page.tsx            # Interactive BIS Recognized Lab Finder & Map
│   │   └── dashboard/
│   │       └── page.tsx            # Manufacturer License Expiry & Renewal Dashboard
│   ├── components/
│   │   ├── Navbar.tsx              # Sticky glassmorphic navbar with mode switcher
│   │   ├── Footer.tsx              # BIS official reference footer
│   │   ├── WizardStep1Product.tsx  # Product category & classification selector
│   │   ├── WizardStep2Details.tsx  # MSME scale, location, production volume
│   │   ├── WizardStep3Standards.tsx# Applicable IS standards & QCO compliance
│   │   ├── WizardStep4Roadmap.tsx  # Interactive step-by-step compliance checklist
│   │   ├── WizardStep5Cost.tsx     # Itemized fees & timeline calculator with MSME discount
│   │   ├── VerificationCard.tsx    # Genuine vs Counterfeit result display with official stamps
│   │   ├── QRScannerModal.tsx      # QR code / barcode camera & image upload simulator
│   │   └── CitationModal.tsx       # Modal showing raw official IS clause from source PDF
│   └── lib/
│       ├── api.ts                  # Axios / fetch client for FastAPI backend
│       └── types.ts                # TypeScript interfaces
```

---

## Detailed Component Implementation

### 1. Structured Knowledge Base & Datasets (`backend/data/`)
- **Indian Standards Indexed**:
  - `IS 302 (Part 2/Sec 15)`: Safety of Household and Similar Electrical Appliances — Electric Kettles & Jugs.
  - `IS 302 (Part 1)`: General Safety Requirements for Electrical Appliances.
  - `IS 4151: 2015`: Protective Helmets for Two Wheeler Riders (Mandatory QCO).
  - `IS 9873 (Part 1, 2, 3)`: Safety of Toys — Mechanical, Flammability, Heavy Metals migration.
  - `IS 14543: 2004`: Packaged Drinking Water (Other than Natural Mineral Water).
  - `IS 13252 (Part 1)`: Information Technology Equipment — Safety (CRS Scheme).
- **Metadata for each clause**: Standard Number, Year, Title, Clause Number, Clause Heading, Exact Excerpt Text, Testing Methodology, Pass/Fail Threshold, Source Page Number.
- **Genuine CM/L Database**:
  - Genuine active licenses (e.g. `CM/L-8400192` - Havells India, `CM/L-7123901` - Steelbird Hi-Tech, etc.).
  - Expired / Suspended licenses (with warning details).
  - Flagged counterfeit / bogus licenses for instant demo testing.

### 2. Backend RAG & Strict Citation Engine (`backend/services/rag_engine.py`)
- **Semantic Retrieval**:
  - Computes clause embeddings and lexical matching against query.
  - Reranks top-$K$ clauses and provides exact clause citations: `[IS 302:Part 2:Sec 15, Clause 19.101, Page 14]`.
- **Hallucination Guardrail**:
  - Strict system prompt: answers must be synthesized exclusively from retrieved context clauses.
  - If a query is outside the scope of indexed standards, responds: *"I could not find sufficient authoritative information in the indexed Indian Standards. Please consult e-BIS portal or an authorized BIS officer."*
  - Includes a "View Official Clause" payload with every response, allowing users to verify the exact text.

### 3. Industry Compliance Wizard (`frontend/app/industry/page.tsx`)
- **Step 1**: Select Category & Product (e.g. Household Appliances -> Electric Kettle; Automotive Safety -> Motorcycle Helmet; Toys -> Electric/Non-Electric Toys).
- **Step 2**: Manufacturer Profile (Location: Domestic vs Foreign FMCS; Enterprise Scale: Micro/Small/Medium/Large for up to 50% marking fee concession).
- **Step 3**: Applicable Standards & Scheme Analysis:
  - Applicable IS codes, Compulsory Quality Control Orders (QCO) notifications, Applicable Scheme (Scheme-I ISI Mark, CRS Scheme-II).
- **Step 4**: Interactive Step-by-step Compliance Roadmap:
  - 7 phases: Standard Identification -> In-house Lab Setup -> Pre-test Selection -> Application Submission (Form-V) -> Factory Inspection & Sample Drawing -> BIS Assessment -> Grant of License (CM/L).
  - Checklist with interactive state toggle and document requirement checklists.
- **Step 5**: Itemized Cost & Timeline Estimator:
  - Interactive calculator computing Application fee, Processing fee, Testing fees at recognized labs, Minimum annual marking fees, and MSME subsidy deduction.
  - Estimated timeline breakdown (document prep, lab testing, factory inspection, final license grant).
  - Exportable Compliance Summary Report (PDF/Print ready).

### 4. Consumer Verification & Counterfeit Detection (`frontend/app/consumer/page.tsx`)
- **Dual Input Modes**:
  - Direct 7/8-digit CM/L number input with autocomplete demo chips for testing (Genuine, Expired, Suspended, Counterfeit).
  - QR Code scanner / Image upload simulator.
- **Verification Engine Output**:
  - **Verified (Genuine)**: Glowing green shield, ISI mark badge, Manufacturer Name, Brand, Product, Factory Address, Issue Date, Expiry Date, Operative Scope.
  - **Suspended / Expired**: Amber alert, non-compliance notice, past validity range, caution notice.
  - **Counterfeit / Invalid**: Red alert, counterfeit warning ("This CM/L number does not exist in the official BIS National Register"), one-click button to File Grievance on BIS Care / Consumer Forum.

### 5. BIS Setu AI Copilot (`frontend/app/copilot/page.tsx`)
- Grounded conversational interface with preset quick-prompts:
  - *"What are the safety tests required for electric kettles under IS 302?"*
  - *"Is BIS certification mandatory for selling helmets in India?"*
  - *"What heavy metal limits apply to children's toys under IS 9873?"*
  - *"What documents are needed for Form-V factory audit?"*
- Real-time responses featuring expandable **Source Clause Badges** with page and clause metadata.

### 6. Manufacturer License Dashboard & Expiry Alerts (`frontend/app/dashboard/page.tsx`)
- Overview of active licenses with renewal countdowns.
- Automatic status badges: *Active*, *Expiring in 45 Days*, *Action Required*.
- Renewal checklist and step-by-step guidance.

---

## Verification Plan

### Automated Verification
1. **Backend Unit Tests**:
   - `python -m pytest backend/tests/` to test:
     - Compliance engine product standard mappings.
     - CM/L verification logic (valid, expired, counterfeit).
     - RAG clause retrieval and citation generation.
     - Fee calculator accuracy including MSME subsidies.
2. **Frontend Build & Lint Check**:
   - `npm run build` in `frontend/` to ensure clean TypeScript compilation without errors.
   - Test API proxy / CORS communication between Next.js and FastAPI.

### Manual Verification (Browser Subagent Demo Flow)
1. **Industry Wizard Flow**:
   - Navigate to `/industry`.
   - Select "Electrical Appliances" -> "Electric Kettle" -> "Small Enterprise (MSME)".
   - Review mapped standards: `IS 302 (Part 2/Sec 15)` and `IS 302 (Part 1)`.
   - Verify roadmap, required documents, and 20% MSME fee discount calculation.
2. **Consumer Verification Flow**:
   - Navigate to `/consumer`.
   - Test with valid CM/L (`8400192`): Confirm green "VERIFIED" badge and factory details.
   - Test with counterfeit CM/L (`9999999`): Confirm red "COUNTERFEIT / UNVERIFIED" warning and grievance filing action.
3. **AI Copilot Grounding Flow**:
   - Navigate to `/copilot`.
   - Ask about electric kettle insulation tests.
   - Verify response has exact citation `[IS 302 (Part 2/Sec 15), Clause 19.101]` and clickable source clause drawer.
4. **License Management Dashboard**:
   - Navigate to `/dashboard`.
   - Verify license tracking, expiry alert badges, and renewal modal.
