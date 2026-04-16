# Graph Report - NOCTI-Mechatronics (2026-04-16)

## Corpus Check
- Corpus is ~4,001 words - fits in a single context window. You may not need a graph.

## Summary
- 26 nodes · 17 edges · 11 communities detected
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Local Storage Utility|Local Storage Utility]]
- [[_COMMUNITY_Main App Layout|Main App Layout]]
- [[_COMMUNITY_Full Test Engine|Full Test Engine]]
- [[_COMMUNITY_Quiz Generator Logic|Quiz Generator Logic]]
- [[_COMMUNITY_Flashcard Logic|Flashcard Logic]]
- [[_COMMUNITY_AI Chatbot Component|AI Chatbot Component]]
- [[_COMMUNITY_Missed Questions View|Missed Questions View]]
- [[_COMMUNITY_Progress Analytics|Progress Analytics]]
- [[_COMMUNITY_Study Guide View|Study Guide View]]
- [[_COMMUNITY_Build Configuration|Build Configuration]]
- [[_COMMUNITY_Main Entry Point|Main Entry Point]]

## God Nodes (most connected - your core abstractions)
1. `getScores()` - 2 edges
2. `getMissed()` - 2 edges
3. `FullTest()` - 2 edges
4. `QuizGenerator()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `FullTest()` --calls--> `getScores()`  [INFERRED]
  src/pages/FullTest.jsx → src/utils/storage.js
- `QuizGenerator()` --calls--> `getMissed()`  [INFERRED]
  src/pages/QuizGenerator.jsx → src/utils/storage.js

## Communities

### Community 0 - "Local Storage Utility"
Cohesion: 0.5
Nodes (0): 

### Community 1 - "Main App Layout"
Cohesion: 0.67
Nodes (0): 

### Community 2 - "Full Test Engine"
Cohesion: 0.67
Nodes (2): FullTest(), getScores()

### Community 3 - "Quiz Generator Logic"
Cohesion: 0.67
Nodes (2): QuizGenerator(), getMissed()

### Community 4 - "Flashcard Logic"
Cohesion: 0.67
Nodes (0): 

### Community 5 - "AI Chatbot Component"
Cohesion: 1.0
Nodes (0): 

### Community 6 - "Missed Questions View"
Cohesion: 1.0
Nodes (0): 

### Community 7 - "Progress Analytics"
Cohesion: 1.0
Nodes (0): 

### Community 8 - "Study Guide View"
Cohesion: 1.0
Nodes (0): 

### Community 9 - "Build Configuration"
Cohesion: 1.0
Nodes (0): 

### Community 10 - "Main Entry Point"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **Thin community `AI Chatbot Component`** (2 nodes): `Chatbot()`, `Chatbot.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Missed Questions View`** (2 nodes): `MissedQuestions()`, `MissedQuestions.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Progress Analytics`** (2 nodes): `Progress()`, `Progress.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Study Guide View`** (2 nodes): `StudyGuide.jsx`, `StudyGuide()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Build Configuration`** (1 nodes): `vite.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Main Entry Point`** (1 nodes): `main.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getScores()` connect `Full Test Engine` to `Local Storage Utility`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `getMissed()` connect `Quiz Generator Logic` to `Local Storage Utility`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._