const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/mechatronicsData.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Valid categories
const validCategories = [
  "Safety",
  "Communication",
  "Instrumentation and Measurement",
  "Electrical",
  "Mechanical",
  "Hydraulic and Pneumatic Systems",
  "Computer and Control Systems",
  "Engineering Principles"
];

let fcRemoved = 0;
let qRemoved = 0;
let catFixed = 0;

// 1. Validate and Fix Categories
data.flashcards.forEach(fc => {
  if (!validCategories.includes(fc.category)) {
    fc.category = "Engineering Principles"; // Default fallback
    catFixed++;
  }
});
data.questions.forEach(q => {
  if (!validCategories.includes(q.category)) {
    q.category = "Engineering Principles";
    catFixed++;
  }
});

// 2. Remove Duplicate Flashcards (by term)
const uniqueFcs = [];
const seenFcTerms = new Set();
data.flashcards.forEach(fc => {
  const termLower = fc.term.trim().toLowerCase();
  if (!seenFcTerms.has(termLower)) {
    seenFcTerms.add(termLower);
    uniqueFcs.push(fc);
  } else {
    fcRemoved++;
  }
});
data.flashcards = uniqueFcs;

// 3. Remove Duplicate Questions (by exact question string)
const uniqueQs = [];
const seenQStrings = new Set();

data.questions.forEach(q => {
  // Normalize question text to catch slight whitespace diffs
  const qLower = q.question.trim().toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s]/gi, ''); // remove punctuation for deduplication check

  if (!seenQStrings.has(qLower)) {
    seenQStrings.add(qLower);
    uniqueQs.push(q);
  } else {
    qRemoved++;
  }
});
data.questions = uniqueQs;

// Ensure IDs are perfectly sequential and unique
data.questions.forEach((q, index) => {
  q.id = index + 1;
});
data.flashcards.forEach((fc, index) => {
  fc.id = index + 1;
});

// Write changes back
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

console.log('--- Cleanup Report ---');
console.log(`Categories normalized: ${catFixed}`);
console.log(`Duplicate Flashcards removed: ${fcRemoved}`);
console.log(`Duplicate Questions removed: ${qRemoved}`);
console.log(`Final Flashcard Count: ${data.flashcards.length}`);
console.log(`Final Question Count: ${data.questions.length}`);
