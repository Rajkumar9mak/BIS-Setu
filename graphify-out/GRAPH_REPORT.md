# Graph Report - bis  (2026-09-29)

## Corpus Check
- 114 files · ~142,043 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 639 nodes · 1124 edges · 62 communities (41 shown, 19 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 49 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bb0d5f5c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- RetrievedDoc
- dependencies
- components/DecorativeShapes.tsx
- toy_standards.ts
- frontend/package.json
- clause_parser.py
- ComplianceEngine
- compilerOptions
- rag_engine.py
- FastAPI
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
- react
- RequestLoggingMiddleware
- main.py
- toys/page.tsx
- consumer/page.tsx
- types.ts
- models.py
- api.ts
- scripts
- lucide-react
- CitationBadge.tsx
- AIChatSection.tsx
- ToyStandardSearch.tsx
- dashboard/page.tsx
- utils.ts
- ToyAIChat.tsx
- projects.py
- compliance.py
- analyze_document
- get_connection
- grievances.py
- StandardSearch.tsx
- AudienceSection.tsx

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

## Communities (62 total, 19 thin omitted)

### Community 0 - "RetrievedDoc"
Cohesion: 0.06
Nodes (30): ClauseChunk, ClauseChunker, BaseModel, Page and clause-aware chunker that preserves regulatory provenance, clause…, StandardClause, Any, Path, Central document indexer that digests PDF standard specifications and… (+22 more)

### Community 1 - "dependencies"
Cohesion: 0.20
Nodes (10): dependencies, canvas-confetti, clsx, lucide-react, motion, next, react, react-dom (+2 more)

### Community 2 - "components/DecorativeShapes.tsx"
Cohesion: 0.20
Nodes (6): LabsPage(), loadLabs(), DecorativeShapes(), ShapeProps, fetchLaboratories(), Laboratory

### Community 3 - "toy_standards.ts"
Cohesion: 0.14
Nodes (15): ChatMessage, ProductComplianceExplorerProps, ToyCategoryCardsProps, InquiryOption, ToySafetyExplorerProps, ToyTypeOption, ProductSafetyScope, REGULATED_PRODUCTS_DATA (+7 more)

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

### Community 10 - "FastAPI"
Cohesion: 0.17
Nodes (19): get_certifications(), initiate_renewal(), BaseModel, get, post, RenewalRequest, app_exception_handler(), AppException (+11 more)

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

### Community 39 - "react"
Cohesion: 0.11
Nodes (17): BISAI(), ComplianceWorkflow(), steps, FeatureCardData, featureCards, FeatureGrid(), FinalCTA(), Hero() (+9 more)

### Community 40 - "RequestLoggingMiddleware"
Cohesion: 0.40
Nodes (4): Request, RequestLoggingMiddleware, BaseHTTPMiddleware, Response

### Community 41 - "main.py"
Cohesion: 0.20
Nodes (8): init_db(), Initializes SQLite database tables and schema., get_logger(), setup_logging(), health(), get, root(), Logger

### Community 42 - "toys/page.tsx"
Cohesion: 0.22
Nodes (6): metadata, ProductComplianceExplorer(), Footer(), Navbar(), nextConfig, next

### Community 43 - "consumer/page.tsx"
Cohesion: 0.24
Nodes (12): BUYING_CHECKLISTS, ConsumerPage(), ConsumerVerificationSection(), Props, VerificationCard(), submitGrievance(), verifyImage(), verifyProduct() (+4 more)

### Community 44 - "types.ts"
Cohesion: 0.14
Nodes (13): BaseFees, CostTimeline, DiscoveredStandard, DocumentAnalysisRequirement, FeeBreakdown, KeyTest, QcoStatus, RoadmapStep (+5 more)

### Community 45 - "models.py"
Cohesion: 0.31
Nodes (9): discover_standards(), post, DocumentAnalyzeRequest, GrievanceCreate, ProjectCreate, ProjectUpdate, BaseModel, StandardsDiscoveryRequest (+1 more)

### Community 46 - "api.ts"
Cohesion: 0.17
Nodes (21): IndustryPage(), loadData(), runAnalysis(), StandardsSearchSection(), analyzeCompliance(), analyzeDocument(), API_BASE, createProject() (+13 more)

### Community 47 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 48 - "lucide-react"
Cohesion: 0.13
Nodes (7): CORE_FEATURES, FeatureItem, ServiceHub(), ServiceItem, services, ToyHeroProps, lucide-react

### Community 50 - "AIChatSection.tsx"
Cohesion: 0.24
Nodes (9): CopilotPage(), AIChatSection(), CitationCard(), CitationProps, ToyAIChat(), extractErrorMessage(), queryRag(), RagResponse (+1 more)

### Community 51 - "ToyStandardSearch.tsx"
Cohesion: 0.29
Nodes (5): ToyStandardCard(), ToyStandardCardProps, FilterOption, ToyStandardSearchProps, ToySafetyScope

### Community 52 - "dashboard/page.tsx"
Cohesion: 0.38
Nodes (6): DashboardPage(), load(), fetchDashboardData(), initiateRenewal(), DashboardData, ManufacturerLicence

### Community 54 - "ToyAIChat.tsx"
Cohesion: 0.43
Nodes (5): ChatMessage, ToyAIChatProps, ToyCitation, ToyCitationCard(), ToyCitationCardProps

### Community 55 - "projects.py"
Cohesion: 0.24
Nodes (12): get_document_details(), get, create_project(), get_project(), list_project_tasks(), list_projects(), get, post (+4 more)

### Community 56 - "compliance.py"
Cohesion: 0.31
Nodes (8): analyze_compliance(), ComplianceAnalyzeRequest, get_labs(), get_product(), get_products(), BaseModel, get, post

### Community 57 - "analyze_document"
Cohesion: 0.50
Nodes (4): analyze_document(), post, UploadFile, upload_document()

### Community 58 - "get_connection"
Cohesion: 0.43
Nodes (4): DatabaseManager, get_connection(), Any, Connection

### Community 59 - "grievances.py"
Cohesion: 0.40
Nodes (5): get_grievance(), list_grievances(), get, post, report_grievance()

### Community 60 - "StandardSearch.tsx"
Cohesion: 0.50
Nodes (3): popularSearches, sampleResults, StandardSearch()

### Community 61 - "AudienceSection.tsx"
Cohesion: 0.50
Nodes (3): AudienceSection(), consumerPoints, industryPoints

## Knowledge Gaps
- **143 isolated node(s):** `maxDuration`, `GET`, `POST`, `PUT`, `DELETE` (+138 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 268 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `components/DecorativeShapes.tsx`, `toy_standards.ts`, `frontend/package.json`, `21st/ComplianceRoadmap.tsx`, `toys/page.tsx`, `consumer/page.tsx`, `api.ts`, `origin-button.tsx`, `lucide-react`, `CitationBadge.tsx`, `AIChatSection.tsx`, `ToyStandardSearch.tsx`, `dashboard/page.tsx`, `21st/DecorativeShapes.tsx`, `ToyAIChat.tsx`, `StandardSearch.tsx`, `AudienceSection.tsx`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `components/DecorativeShapes.tsx`, `toy_standards.ts`, `frontend/package.json`, `21st/ComplianceRoadmap.tsx`, `react`, `toys/page.tsx`, `consumer/page.tsx`, `api.ts`, `CitationBadge.tsx`, `AIChatSection.tsx`, `ToyStandardSearch.tsx`, `dashboard/page.tsx`, `ToyAIChat.tsx`, `StandardSearch.tsx`, `AudienceSection.tsx`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Why does `RetrievedDoc` connect `RetrievedDoc` to `rag_engine.py`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `RetrievedDoc` (e.g. with `HybridRetriever` and `RelevanceFilter`) actually correct?**
  _`RetrievedDoc` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Are the 11 inferred relationships involving `ComplianceEngine` (e.g. with `Electric Kettle Test Report (doc_0091e71c)` and `Electric Kettle Test Report (doc_01ee7870)`) actually correct?**
  _`ComplianceEngine` has 11 INFERRED edges - model-reasoned connections that need verification._
- **What connects `maxDuration`, `GET`, `POST` to the rest of the system?**
  _143 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `RetrievedDoc` be split into smaller, more focused modules?**
  _Cohesion score 0.05789235639981909 - nodes in this community are weakly interconnected._