# BIS Setu — AI-Powered Indian Standards Compliance & Verification Platform

> **National Standards & Conformity Assessment Platform**  
> Solving the technical discovery, compliance roadmap, and consumer counterfeit challenges in the Bureau of Indian Standards (BIS) ecosystem.

---

## 🏗️ Architecture & Dual-Mode Pipeline

```text
                               ┌──────────────────────────────────────────────┐
                               │           BIS SETU WEB APPLICATION           │
                               │           (Next.js 16 + Tailwind)            │
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
│ Products, IS    │      │ Semantic Search │     │ CM-L Registry   │      │ Testing labs,   │
│ Schemes, QCOs   │      │ + BM25 Hybrid   │     │ Active/Expired  │      │ MSME discounts  │
└─────────────────┘      └────────┬────────┘     └─────────────────┘      └─────────────────┘
                                  │
                         ┌────────▼────────┐
                         │ LLM Synthesizer │
                         │ Gemini / Grounded│
                         │ Strict Citation │
                         └─────────────────┘
```

---

## 🌟 Key Modules

### 1. 🏭 Industry Compliance Mode (`/industry`)
- **Product Categorization & Selection**: Electric Kettles (IS 302), Protective Helmets (IS 4151), Toys & Child Safety (IS 9873), Packaged Drinking Water (IS 14543), IT Equipment (IS 13252).
- **Mandatory QCO Verification**: Checks Ministry gazette orders and statutory enforcement under Section 16 of BIS Act, 2016.
- **7-Phase Interactive Compliance Roadmap**: Step-by-step interactive milestones from testing setup to licence grant with toggleable checkboxes.
- **Form-V Document Preparation Checklist**: Required machinery lists, calibration certificates, and QC personnel appointments.
- **Itemized Cost & Timeline Estimator**: Computes application fee, factory inspection, lab testing, and statutory minimum marking fee with up to **50% MSME concession**.
- **Printable Compliance Dossier**: One-click dossier export.

### 2. 🔍 Consumer Verification Mode (`/consumer`)
- **Real-Time CM/L & QR Lookup**: Instant verification of 7 or 8-digit licence numbers.
- **Authenticity States**:
  - `GENUINE_ACTIVE`: Verified badge, manufacturer name, brand, factory address, valid until date.
  - `EXPIRING_SOON`: Amber caution notice with remaining days countdown.
  - `SUSPENDED / EXPIRED`: Red regulatory warning with violation details.
  - `FRAUD_COUNTERFEIT`: Spurious mark alert with 1-click grievance filing to BIS Enforcement & National Consumer Helpline 1915.
- **QR Code Camera Simulation**: Simulates camera scanner and image file upload.
- **Educational Guide**: Visual breakdown of standard code, ISI emblem, and CM/L number.

### 3. 🤖 Setu AI Copilot (`/copilot`)
- **Zero-Hallucination RAG**: Answers synthesized exclusively from retrieved Indian Standard clauses.
- **Explicit In-Line Citations**: Format: `[IS Number, Clause Number, Page N]`.
- **Source Clause Inspector**: Click any retrieved clause to inspect the exact verbatim text and page number.

### 4. 🔬 BIS Recognized Testing Laboratories (`/labs`)
- Directory of central, regional, and partner laboratories (Sahibabad CL, Mumbai WROL, Chennai SROL, Kolkata EROL, ERDA Vadodara, SIIR Delhi, ARAI Pune, CPRI Bengaluru).
- Filter by Indian Standard and geographical region.

### 5. 📊 Manufacturer Certification Dashboard (`/dashboard`)
- Real-time tracker for active licences.
- Automated 90-day, 60-day, and 30-day renewal deadline alerts.
- One-click Form-VI renewal application submission.

---

## 🚀 Running the Project Locally

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### Step 1: Start Backend (FastAPI)
```bash
cd backend
cp .env.example .env  # Optional: configure GEMINI_API_KEY, PORT, etc.
pip install -r requirements.txt
python main.py
```
*API runs at `http://127.0.0.1:8000` (Swagger docs at `http://127.0.0.1:8000/docs`, Health check at `http://127.0.0.1:8000/health`)*

### Step 2: Start Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs at `http://localhost:3000`*

### Run Backend Tests
```bash
cd backend
python -m pytest tests/
```

