# Graph Report - bis  (2026-09-29)

## Corpus Check
- 111 files · ~140,186 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 587 nodes · 973 edges · 50 communities (28 shown, 20 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 49 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ae6babff`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- RetrievedDoc
- RelevanceFilter
- lucide-react
- toy_standards.ts
- frontend/package.json
- clause_parser.py
- ComplianceEngine
- compilerOptions
- rag.py
- errors.py
- verification.py
- LocalRegulatoryEmbeddingFunction
- StandardSearch.tsx
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
- RequestLoggingMiddleware
- react
- toys/page.tsx
- FeatureGrid.tsx
- ToyHero.tsx
- main.py
- consumer/page.tsx
- homepage/Hero.tsx
- FeatureCard.tsx
- IndustryPage

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

## Communities (50 total, 20 thin omitted)

### Community 0 - "RetrievedDoc"
Cohesion: 0.05
Nodes (33): ClauseChunk, ClauseChunker, BaseModel, Page and clause-aware chunker that preserves regulatory provenance, clause…, StandardClause, Any, Path, Central document indexer that digests PDF standard specifications and… (+25 more)

### Community 1 - "RelevanceFilter"
Cohesion: 0.17
Nodes (10): Identifies the primary applicable standard for ambiguous or generic queries., Filters candidates using multiple relevance signals: 1. Standard number match…, Extracts numeric standard identifiers, e.g. '4151' from 'IS 4151:2015' or 'IS…, Detects product keywords in the query and returns (matched_standard_digits,…, Detects Indian Standard numbers and domain/product categories from queries., Multi-signal relevance filter applied after reranking. Eliminates cross-…, RelevanceFilter, StandardDetector (+2 more)

### Community 2 - "lucide-react"
Cohesion: 0.14
Nodes (7): DashboardPage(), LabsPage(), CitationCard(), CitationProps, DecorativeShapes(), ShapeProps, lucide-react

### Community 3 - "toy_standards.ts"
Cohesion: 0.09
Nodes (26): ChatMessage, ProductComplianceExplorer(), ProductComplianceExplorerProps, ChatMessage, ToyAIChatProps, ToyCategoryCardsProps, ToyCitation, ToyCitationCard() (+18 more)

### Community 4 - "frontend/package.json"
Cohesion: 0.05
Nodes (41): dependencies, canvas-confetti, clsx, lucide-react, motion, next, react, react-dom (+33 more)

### Community 5 - "clause_parser.py"
Cohesion: 0.15
Nodes (13): ClauseParser, ClauseSource, Any, BaseModel, Scans PDF pages for regulatory clause blocks and associates them with exact…, Extracts individual regulatory clauses from parsed PDF text or structured data,…, Converts a raw JSON knowledge item into a validated StandardClause, filling in…, PageContent (+5 more)

### Community 6 - "ComplianceEngine"
Cohesion: 0.13
Nodes (13): Electric Kettle Test Report (doc_0091e71c), Electric Kettle Test Report (doc_01ee7870), Electric Kettle Test Report (doc_05239407), Electric Kettle Test Report (doc_0b83ab90), Electric Kettle Test Report (doc_0d32946d), Electric Kettle Test Report (doc_3dba183a), Electric Kettle Test Report (doc_773cd8f4), Electric Kettle Test Report (doc_7ab21df0) (+5 more)

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 9 - "rag.py"
Cohesion: 0.15
Nodes (18): ask_rag(), get_all_clauses(), get_rag_stats(), get_source_clause(), BaseModel, get, post, RagQueryRequest (+10 more)

### Community 10 - "errors.py"
Cohesion: 0.33
Nodes (12): app_exception_handler(), AppException, format_error_response(), http_exception_handler(), Any, Request, register_error_handlers(), unhandled_exception_handler() (+4 more)

### Community 11 - "verification.py"
Cohesion: 0.26
Nodes (12): get_registry_samples(), get_verification_stats(), BaseModel, get, post, UploadFile, QrVerifyRequest, verify_cml() (+4 more)

### Community 12 - "LocalRegulatoryEmbeddingFunction"
Cohesion: 0.19
Nodes (6): EmbeddingFunction, LocalRegulatoryEmbeddingFunction, Any, High-performance, 100% offline dense embedding function for Indian Standards.…, Documents, Embeddings

### Community 13 - "StandardSearch.tsx"
Cohesion: 0.50
Nodes (3): popularSearches, sampleResults, StandardSearch()

### Community 14 - "origin-button.tsx"
Cohesion: 0.29
Nodes (7): assignRef(), ButtonHTMLAttributesForMotion, FILL_EASE, getCoverDiameter(), hasTextContent(), OriginButton, OriginButtonProps

### Community 16 - "route.ts"
Cohesion: 0.25
Nodes (8): DELETE, findBackendPort(), GET, handleProxy(), OPTIONS, PATCH, POST, PUT

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
Cohesion: 0.11
Nodes (15): AudienceSection(), consumerPoints, industryPoints, BISAI(), ComplianceWorkflow(), steps, FinalCTA(), exampleLabs (+7 more)

### Community 40 - "RequestLoggingMiddleware"
Cohesion: 0.40
Nodes (4): Request, RequestLoggingMiddleware, BaseHTTPMiddleware, Response

### Community 41 - "react"
Cohesion: 0.12
Nodes (3): CitationBadgeProps, GlassCardProps, react

### Community 42 - "toys/page.tsx"
Cohesion: 0.24
Nodes (5): metadata, Footer(), Navbar(), nextConfig, next

### Community 43 - "FeatureGrid.tsx"
Cohesion: 0.50
Nodes (3): FeatureCardData, featureCards, FeatureGrid()

### Community 45 - "main.py"
Cohesion: 0.05
Nodes (55): analyze_compliance(), ComplianceAnalyzeRequest, get_labs(), get_product(), get_products(), BaseModel, get, post (+47 more)

### Community 46 - "consumer/page.tsx"
Cohesion: 0.32
Nodes (3): BUYING_CHECKLISTS, Props, VerificationCard()

### Community 48 - "homepage/Hero.tsx"
Cohesion: 0.40
Nodes (4): Hero(), ServiceHub(), ServiceItem, services

## Knowledge Gaps
- **131 isolated node(s):** `GET`, `POST`, `PUT`, `DELETE`, `PATCH` (+126 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 265 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `lucide-react`, `toy_standards.ts`, `frontend/package.json`, `21st/ComplianceRoadmap.tsx`, `app/page.tsx`, `toys/page.tsx`, `FeatureGrid.tsx`, `ToyHero.tsx`, `StandardSearch.tsx`, `consumer/page.tsx`, `origin-button.tsx`, `homepage/Hero.tsx`, `FeatureCard.tsx`, `21st/DecorativeShapes.tsx`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `toy_standards.ts`, `frontend/package.json`, `21st/ComplianceRoadmap.tsx`, `app/page.tsx`, `react`, `toys/page.tsx`, `FeatureGrid.tsx`, `ToyHero.tsx`, `StandardSearch.tsx`, `consumer/page.tsx`, `homepage/Hero.tsx`, `FeatureCard.tsx`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Why does `RetrievedDoc` connect `RetrievedDoc` to `RelevanceFilter`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `RetrievedDoc` (e.g. with `HybridRetriever` and `RelevanceFilter`) actually correct?**
  _`RetrievedDoc` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Are the 11 inferred relationships involving `ComplianceEngine` (e.g. with `Electric Kettle Test Report (doc_0091e71c)` and `Electric Kettle Test Report (doc_01ee7870)`) actually correct?**
  _`ComplianceEngine` has 11 INFERRED edges - model-reasoned connections that need verification._
- **What connects `GET`, `POST`, `PUT` to the rest of the system?**
  _131 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `RetrievedDoc` be split into smaller, more focused modules?**
  _Cohesion score 0.05297334244702666 - nodes in this community are weakly interconnected._