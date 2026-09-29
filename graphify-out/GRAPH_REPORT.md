# Graph Report - bis  (2026-09-29)

## Corpus Check
- 114 files · ~142,136 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 640 nodes · 1127 edges · 60 communities (37 shown, 21 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 49 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `496e0bc3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- StandardClause
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
- RetrievedDoc
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
- logging_config.py
- toys/page.tsx
- rag.py
- LexicalBM25Retriever
- RelevanceFilter
- api.ts
- scripts
- lucide-react
- VectorRetriever
- AIChatSection.tsx
- grounding.py
- FeatureCard.tsx
- utils.ts
- ToyAIChat.tsx
- main.py
- FeatureGrid.tsx
- LatestUpdates.tsx
- next
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
9. `IndustryPageContent()` - 12 edges
10. `ToyStandard` - 11 edges

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

## Communities (60 total, 21 thin omitted)

### Community 0 - "StandardClause"
Cohesion: 0.18
Nodes (9): ClauseChunk, ClauseChunker, BaseModel, Page and clause-aware chunker that preserves regulatory provenance, clause…, StandardClause, Any, Path, Central document indexer that digests PDF standard specifications and… (+1 more)

### Community 1 - "dependencies"
Cohesion: 0.20
Nodes (10): dependencies, canvas-confetti, clsx, lucide-react, motion, next, react, react-dom (+2 more)

### Community 2 - "react"
Cohesion: 0.23
Nodes (4): DecorativeShapes(), ShapeProps, GlassCardProps, react

### Community 3 - "toy_standards.ts"
Cohesion: 0.11
Nodes (21): ChatMessage, ProductComplianceExplorer(), ProductComplianceExplorerProps, ToyCategoryCardsProps, InquiryOption, ToySafetyExplorerProps, ToyTypeOption, ToyStandardCard() (+13 more)

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
Cohesion: 0.16
Nodes (14): Extracts numeric standard identifiers, e.g. '4151' from 'IS 4151:2015' or 'IS…, Detects Indian Standard numbers and domain/product categories from queries., StandardDetector, extract_key_requirement_summary(), LegacyClauseIndex, Any, query_rag_engine(), Extracts the key technical requirement sentence or structured thresholds from a… (+6 more)

### Community 10 - "errors.py"
Cohesion: 0.33
Nodes (12): app_exception_handler(), AppException, format_error_response(), http_exception_handler(), Any, Request, register_error_handlers(), unhandled_exception_handler() (+4 more)

### Community 11 - "verification.py"
Cohesion: 0.13
Nodes (16): get_registry_samples(), get_verification_stats(), BaseModel, get, post, UploadFile, QrVerifyRequest, verify_cml() (+8 more)

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

### Community 19 - "RetrievedDoc"
Cohesion: 0.20
Nodes (9): BaseModel, RetrievedDoc, Second-stage reranker that evaluates regulatory relevance, technical term…, RegulatoryReranker, Citation, CitationBuilder, BaseModel, Builds authoritative, page-level regulatory citations compliant with BIS Setu… (+1 more)

### Community 21 - "package.json"
Cohesion: 0.50
Nodes (3): dependencies, graphify, graphify

### Community 38 - "21st/ComplianceRoadmap.tsx"
Cohesion: 0.33
Nodes (3): ComplianceRoadmapProps, DEFAULT_STEPS, StepItem

### Community 39 - "app/page.tsx"
Cohesion: 0.12
Nodes (13): AudienceSection(), consumerPoints, industryPoints, BISAI(), ComplianceWorkflow(), steps, FinalCTA(), Hero() (+5 more)

### Community 40 - "RequestLoggingMiddleware"
Cohesion: 0.40
Nodes (4): Request, RequestLoggingMiddleware, BaseHTTPMiddleware, Response

### Community 42 - "toys/page.tsx"
Cohesion: 0.36
Nodes (3): metadata, Footer(), Navbar()

### Community 43 - "rag.py"
Cohesion: 0.27
Nodes (10): ask_rag(), get_all_clauses(), get_rag_stats(), get_source_clause(), BaseModel, get, post, RagQueryRequest (+2 more)

### Community 44 - "LexicalBM25Retriever"
Cohesion: 0.27
Nodes (4): HybridRetriever, Hybrid retriever combining Lexical (BM25) and Dense Vector (ChromaDB) using…, LexicalBM25Retriever, Production-grade BM25 lexical retriever tailored for regulatory Indian…

### Community 45 - "RelevanceFilter"
Cohesion: 0.24
Nodes (5): Identifies the primary applicable standard for ambiguous or generic queries., Filters candidates using multiple relevance signals: 1. Standard number match…, Detects product keywords in the query and returns (matched_standard_digits,…, Multi-signal relevance filter applied after reranking. Eliminates cross-…, RelevanceFilter

### Community 46 - "api.ts"
Cohesion: 0.06
Nodes (56): BUYING_CHECKLISTS, ConsumerPage(), DashboardPage(), load(), IndustryPageContent(), loadData(), runAnalysis(), LabsPage() (+48 more)

### Community 47 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 48 - "lucide-react"
Cohesion: 0.12
Nodes (6): CitationBadgeProps, ServiceHub(), ServiceItem, services, ToyHeroProps, lucide-react

### Community 49 - "VectorRetriever"
Cohesion: 0.32
Nodes (3): Path, ChromaDB-backed dense vector retriever for Indian Standards clauses. Persists…, VectorRetriever

### Community 50 - "AIChatSection.tsx"
Cohesion: 0.27
Nodes (8): CopilotPage(), AIChatSection(), CitationCard(), CitationProps, extractErrorMessage(), queryRag(), RagResponse, SourceClause

### Community 51 - "grounding.py"
Cohesion: 0.32
Nodes (5): GroundingEvaluation, GroundingValidator, BaseModel, Validates that answers are strictly grounded in retrieved Indian Standards…, Ensures the generated answer reflects grounded evidence and does not invent…

### Community 54 - "ToyAIChat.tsx"
Cohesion: 0.36
Nodes (6): ChatMessage, ToyAIChat(), ToyAIChatProps, ToyCitation, ToyCitationCard(), ToyCitationCardProps

### Community 55 - "main.py"
Cohesion: 0.06
Nodes (55): analyze_compliance(), ComplianceAnalyzeRequest, get_labs(), get_product(), get_products(), BaseModel, get, post (+47 more)

### Community 56 - "FeatureGrid.tsx"
Cohesion: 0.50
Nodes (3): FeatureCardData, featureCards, FeatureGrid()

### Community 57 - "LatestUpdates.tsx"
Cohesion: 0.50
Nodes (3): LatestUpdates(), UpdateItem, updates

### Community 60 - "StandardSearch.tsx"
Cohesion: 0.50
Nodes (3): popularSearches, sampleResults, StandardSearch()

## Knowledge Gaps
- **143 isolated node(s):** `maxDuration`, `GET`, `POST`, `PUT`, `DELETE` (+138 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 269 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `toy_standards.ts`, `frontend/package.json`, `21st/ComplianceRoadmap.tsx`, `app/page.tsx`, `toys/page.tsx`, `api.ts`, `origin-button.tsx`, `lucide-react`, `AIChatSection.tsx`, `21st/DecorativeShapes.tsx`, `FeatureCard.tsx`, `ToyAIChat.tsx`, `FeatureGrid.tsx`, `LatestUpdates.tsx`, `StandardSearch.tsx`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `react`, `toy_standards.ts`, `frontend/package.json`, `21st/ComplianceRoadmap.tsx`, `app/page.tsx`, `toys/page.tsx`, `api.ts`, `AIChatSection.tsx`, `FeatureCard.tsx`, `ToyAIChat.tsx`, `FeatureGrid.tsx`, `LatestUpdates.tsx`, `StandardSearch.tsx`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Why does `RetrievedDoc` connect `RetrievedDoc` to `logging_config.py`, `rag_engine.py`, `LexicalBM25Retriever`, `RelevanceFilter`, `VectorRetriever`, `grounding.py`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `RetrievedDoc` (e.g. with `HybridRetriever` and `RelevanceFilter`) actually correct?**
  _`RetrievedDoc` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Are the 11 inferred relationships involving `ComplianceEngine` (e.g. with `Electric Kettle Test Report (doc_0091e71c)` and `Electric Kettle Test Report (doc_01ee7870)`) actually correct?**
  _`ComplianceEngine` has 11 INFERRED edges - model-reasoned connections that need verification._
- **What connects `maxDuration`, `GET`, `POST` to the rest of the system?**
  _143 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `toy_standards.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10756302521008404 - nodes in this community are weakly interconnected._