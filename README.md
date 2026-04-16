# NOCTI Mechatronics Level 1 Mastery Platform

A comprehensive study and examination suite designed for the NOCTI Mechatronics Level 1 certification. This platform provides a rigorous testing environment with algorithmic question generation, performance analytics, and a detailed study dictionary.

## Features

### Examination Engines
- Full Assessment Mode: Simulate the complete NOCTI exam with randomized questions covering all seven core competencies.
- Custom Quiz Generator: Create targeted practice sessions by choosing specific units and difficulty levels.
- Algorithmic Distractors: Unlike standard multiple-choice tests, this platform dynamically generates incorrect options based on related concepts in the same category, ensuring a deeper level of knowledge is required to succeed.

### Study Tools
- Interactive Flashcards: Over 350 high-fidelity terms and definitions with a dark-mode optimized interface.
- Master Dictionary: A searchable repository of all mechatronics concepts integrated into the curriculum.
- Missed Question Tracker: Automatically identifies and stores questions you answer incorrectly, allowing for focused "Practice Most Missed" sessions.

### Performance Analytics
- Progress Visualization: Integrated line charts track your quiz and assessment scores over time.
- Accuracy Statistics: Detailed breakdown of your average, best, and latest performance across all categories.

### AI Tutoring
- Integrated AI Assistant: A localized tutor (powered by Ollama) capable of explaining complex mechatronics concepts, safety protocols, and mechanical principles.

## Getting Started

### Local Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Enabling the AI Tutor
The AI Tutor requires a local instance of Ollama to be running.
1. Install [Ollama](https://ollama.ai).
2. Download the recommended model:
   ```bash
   ollama pull driaforall/tiny-agent-a:0.5b
   ```
3. Ensure Ollama is running on port 11434 before launching the platform.

## Architecture
This project is built using:
- React (Single Page Application)
- Vite (Build Tooling)
- Vanilla CSS (Theming and Animation)
- LocalStorage (Persistent Student Data)

The codebase structure is visualized in the `graphify-out/` directory, which contains a structural knowledge graph of the application's components and their relationships.
