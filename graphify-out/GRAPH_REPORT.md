# Graph Report - bis  (2026-09-29)

## Corpus Check
- 114 files · ~141,953 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 636 nodes · 1120 edges · 61 communities (35 shown, 24 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 49 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4517ad8d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- RetrievedDoc
- dependencies
- react
- toy_standards.ts
- frontend/package.json
- clause_parser.py
- ComplianceEngine
- compilerOptions
- rag_engine.py
- errors.py
- verification.py
- LocalRegulatoryEmbeddingFunction
- devDependencies
- origin-button.tsx
- route.ts
- DocumentAnalyzer
- StandardsDiscoveryEngine
- VerificationEngine
- 21st/DecorativeShapes.tsx
- package.json
- eslint.config.mjs
- postcss.config.mjs
- BIS-Setu Architecture & Compliance Engine
- Specification Doc: graphify
- Specification Doc: graphify
- IS 302-2-15 Official Gazette Amendment
- Backend Python Dependencies
- Specification Doc: AGENTS
- Specification Doc: CLAUDE
- UI Asset file
- UI Asset globe
- UI Asset next
- UI Asset vercel
- UI Asset window
- Specification Doc: README
- Specification Doc: implementation_plan
- 21st/ComplianceRoadmap.tsx
- app/page.tsx
- .dispatch
- main.py
- lucide-react
- FeatureGrid.tsx
- ToyHero.tsx
- projects.py
- api.ts
- scripts
- homepage/Hero.tsx
- CitationBadge.tsx
- FeatureCard.tsx
- LatestUpdates.tsx
- GlassCard.tsx
- utils.ts
- next
- HTTPException
- compliance.py
- FastAPI
- get_connection
- grievances.py
- StandardSearch.tsx

## God Nodes (most connected - your core abstractions)
1. `react` - 50 edges
2. `lucide-react` - 45 edges
3. `RetrievedDoc` - 26 edges
4. `ComplianceEngine` - 19 edges
5. `compilerOptions` - 16 edges
6. `StandardClause` - 13 edges
7. `ClauseChunk` - 12 edges
8. `VectorRetriever` - 12 edges
9. `ToyStandard` - 11 edges
10. `LexicalBM25Retriever` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Electric Kettle Test Report (doc_0091e71c)` --references--> `ComplianceEngine`  [INFERRED]
  backend/data/uploads/doc_0091e71c1c_test_kettle_report.txt → backend/services/compliance_engine.py
- `Electric Kettle Test Report (doc_01ee7870)` --references--> `ComplianceEngine`  [INFERRED]
  backend/data/uploads/doc_01ee78705d_test_kettle_report.txt → backend/services/compliance_engine.py
- `Electric Kettle Test Report (doc_05239407)` --references--> `ComplianceEngine`  [INFERRED]
  backend/data/uploads/doc_0523940753_test_kettle_report.txt → backend/services/compliance_engine.py
- `Electric Kettle Test Report (doc_0b83ab90)` --references--> `ComplianceEngine`  [INFERRED]
  backend/data/uploads/doc_0b83ab9011_kettle_compliant_test_report.txt → backend/services/compliance_engine.py
- `Electric Kettle Test Report (doc_0d32946d)` --references--> `ComplianceEngine`  [INFERRED]
  backend/data/uploads/doc_0d32946d3f_test_kettle_report.txt → backend/services/compliance_engine.py

## Import Cycles
- None detected.

## Communities (61 total, 24 thin omitted)

### Community 0 - "RetrievedDoc"
Cohesion: 0.06
Nodes (30): ClauseChunk, ClauseChunker, BaseModel, Page and clause-aware chunker that preserves regulatory provenance, clause…, StandardClause, Any, Path, Central document indexer that digests PDF standard specifications and… (+22 more)

### Community 1 - "dependencies"
Cohesion: 0.20
Nodes (10): dependencies, canvas-confetti, clsx, lucide-react, motion, next, react, react-dom (+2 more)

### Community 2 - "react"
Cohesion: 0.20
Nodes (8): AIChatSection(), CitationCard(), CitationProps, DecorativeShapes(), ShapeProps, RagResponse, SourceClause, react

### Community 3 - "toy_standards.ts"
Cohesion: 0.08
Nodes (29): CopilotPage(), ChatMessage, ProductComplianceExplorer(), ProductComplianceExplorerProps, ChatMessage, ToyAIChat(), ToyAIChatProps, ToyCategoryCardsProps (+21 more)

### Community 4 - "frontend/package.json"
Cohesion: 0.13
Nodes (14): name, private, version, eslint, eslint-config-next, motion, react-dom, tailwindcss (+6 more)

### Community 5 - "clause_parser.py"
Cohesion: 0.15
Nodes (13): ClauseParser, ClauseSource, Any, BaseModel, Scans PDF pages for regulatory clause blocks and associates them with exact…, Extracts individual regulatory clauses from parsed PDF text or structured data,…, Converts a raw JSON knowledge item into a validated StandardClause, filling in…, PageContent (+5 more)

### Community 6 - "ComplianceEngine"
Cohesion: 0.13
Nodes (13): Electric Kettle Test Report (doc_0091e71c), Electric Kettle Test Report (doc_01ee7870), Electric Kettle Test Report (doc_05239407), Electric Kettle Test Report (doc_0b83ab90), Electric Kettle Test Report (doc_0d32946d), Electric Kettle Test Report (doc_3dba183a), Electric Kettle Test Report (doc_773cd8f4), Electric Kettle Test Report (doc_7ab21df0) (+5 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 9 - "rag_engine.py"
Cohesion: 0.08
Nodes (29): ask_rag(), get_all_clauses(), get_rag_stats(), get_source_clause(), BaseModel, get, post, RagQueryRequest (+21 more)

### Community 10 - "errors.py"
Cohesion: 0.33
Nodes (12): app_exception_handler(), AppException, format_error_response(), http_exception_handler(), Any, Request, register_error_handlers(), unhandled_exception_handler() (+4 more)

### Community 11 - "verification.py"
Cohesion: 0.26
Nodes (12): get_registry_samples(), get_verification_stats(), BaseModel, get, post, UploadFile, QrVerifyRequest, verify_cml() (+4 more)

### Community 12 - "LocalRegulatoryEmbeddingFunction"
Cohesion: 0.19
Nodes (6): EmbeddingFunction, LocalRegulatoryEmbeddingFunction, Any, High-performance, 100% offline dense embedding function for Indian Standards.…, Documents, Embeddings

### Community 13 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

### Community 14 - "origin-button.tsx"
Cohesion: 0.27
Nodes (8): assignRef(), ButtonHTMLAttributesForMotion, FILL_EASE, getCoverDiameter(), hasTextContent(), OriginButton, OriginButtonProps, cn()

### Community 16 - "route.ts"
Cohesion: 0.22
Nodes (9): DELETE, findBackendPort(), GET, handleProxy(), maxDuration, OPTIONS, PATCH, POST (+1 more)

### Community 17 - "DocumentAnalyzer"
Cohesion: 0.43
Nodes (4): DocumentAnalyzer, Any, Document compliance audit pipeline that validates uploaded specifications,…, Heuristic regex field extraction from specification sheets or test reports.

### Community 18 - "StandardsDiscoveryEngine"
Cohesion: 0.40
Nodes (3): Any, Intelligent engine that translates natural language product descriptions into…, StandardsDiscoveryEngine

### Community 19 - "VerificationEngine"
Cohesion: 0.29
Nodes (4): Any, Parses OCR extracted text from product label image, detects IS standard and…, Extracts CM/L or CRS number from QR string or URL and verifies., VerificationEngine

### Community 21 - "package.json"
Cohesion: 0.50
Nodes (3): dependencies, graphify, graphify

### Community 38 - "21st/ComplianceRoadmap.tsx"
Cohesion: 0.33
Nodes (3): ComplianceRoadmapProps, DEFAULT_STEPS, StepItem

### Community 39 - "app/page.tsx"
Cohesion: 0.13
Nodes (12): AudienceSection(), consumerPoints, industryPoints, BISAI(), ComplianceWorkflow(), steps, FinalCTA(), exampleLabs (+4 more)

### Community 41 - "main.py"
Cohesion: 0.18
Nodes (10): init_db(), Initializes SQLite database tables and schema., get_logger(), RequestLoggingMiddleware, setup_logging(), health(), get, root() (+2 more)

### Community 42 - "lucide-react"
Cohesion: 0.18
Nodes (4): metadata, Footer(), Navbar(), lucide-react

### Community 43 - "FeatureGrid.tsx"
Cohesion: 0.50
Nodes (3): FeatureCardData, featureCards, FeatureGrid()

### Community 45 - "projects.py"
Cohesion: 0.21
Nodes (14): create_project(), list_project_tasks(), list_projects(), get, post, discover_standards(), post, DocumentAnalyzeRequest (+6 more)

### Community 46 - "api.ts"
Cohesion: 0.07
Nodes (55): BUYING_CHECKLISTS, ConsumerPage(), DashboardPage(), load(), IndustryPage(), loadData(), runAnalysis(), LabsPage() (+47 more)

### Community 47 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 48 - "homepage/Hero.tsx"
Cohesion: 0.40
Nodes (4): Hero(), ServiceHub(), ServiceItem, services

### Community 51 - "LatestUpdates.tsx"
Cohesion: 0.50
Nodes (3): LatestUpdates(), UpdateItem, updates

### Community 55 - "HTTPException"
Cohesion: 0.24
Nodes (11): analyze_document(), get_document_details(), get, post, UploadFile, upload_document(), get_project(), update_project() (+3 more)

### Community 56 - "compliance.py"
Cohesion: 0.31
Nodes (8): analyze_compliance(), ComplianceAnalyzeRequest, get_labs(), get_product(), get_products(), BaseModel, get, post

### Community 57 - "FastAPI"
Cohesion: 0.29
Nodes (7): get_certifications(), initiate_renewal(), BaseModel, get, post, RenewalRequest, FastAPI

### Community 58 - "get_connection"
Cohesion: 0.43
Nodes (4): DatabaseManager, get_connection(), Any, Connection

### Community 59 - "grievances.py"
Cohesion: 0.40
Nodes (5): get_grievance(), list_grievances(), get, post, report_grievance()

### Community 60 - "StandardSearch.tsx"
Cohesion: 0.50
Nodes (3): popularSearches, sampleResults, StandardSearch()

## Knowledge Gaps
- **142 isolated node(s):** `maxDuration`, `GET`, `POST`, `PUT`, `DELETE` (+137 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 266 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `toy_standards.ts`, `frontend/package.json`, `21st/ComplianceRoadmap.tsx`, `app/page.tsx`, `lucide-react`, `FeatureGrid.tsx`, `ToyHero.tsx`, `api.ts`, `origin-button.tsx`, `homepage/Hero.tsx`, `CitationBadge.tsx`, `FeatureCard.tsx`, `LatestUpdates.tsx`, `21st/DecorativeShapes.tsx`, `GlassCard.tsx`, `StandardSearch.tsx`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `react`, `toy_standards.ts`, `frontend/package.json`, `21st/ComplianceRoadmap.tsx`, `app/page.tsx`, `FeatureGrid.tsx`, `ToyHero.tsx`, `api.ts`, `homepage/Hero.tsx`, `CitationBadge.tsx`, `FeatureCard.tsx`, `LatestUpdates.tsx`, `StandardSearch.tsx`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Why does `RetrievedDoc` connect `RetrievedDoc` to `rag_engine.py`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `RetrievedDoc` (e.g. with `HybridRetriever` and `RelevanceFilter`) actually correct?**
  _`RetrievedDoc` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Are the 11 inferred relationships involving `ComplianceEngine` (e.g. with `Electric Kettle Test Report (doc_0091e71c)` and `Electric Kettle Test Report (doc_01ee7870)`) actually correct?**
  _`ComplianceEngine` has 11 INFERRED edges - model-reasoned connections that need verification._
- **What connects `maxDuration`, `GET`, `POST` to the rest of the system?**
  _142 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `RetrievedDoc` be split into smaller, more focused modules?**
  _Cohesion score 0.05789235639981909 - nodes in this community are weakly interconnected._