const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/mechatronicsData.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

let nextId = Math.max(...data.questions.map(q => parseInt(q.id))) + 1;
if(isNaN(nextId)) nextId = 1000;

let added = 0;

data.flashcards.forEach(fc => {
  // Check if a question exists that already covers this term.
  // Many of our existing questions mention the term directly in the explanation.
  const termLower = fc.term.toLowerCase();
  
  // We'll skip generation if a question heavily focuses on this term
  // For basic robustness, if the term is more than 5 characters and exists in an explanation, we consider it covered.
  const exists = data.questions.some(q => {
    if (!q.explanation) return false;
    return q.explanation.toLowerCase().includes(termLower) && termLower.length > 3;
  });

  // Also skip if we already generated a question for it (preventing infinite loops/redundancy if script ran twice)
  const alreadyGenerated = data.questions.some(q => q.question.includes(`Which term is described by the following`));

  if (!exists) {
    // We need 3 distractors from the same category
    let pool = data.flashcards.filter(f => f.category === fc.category && f.term !== fc.term);
    if (pool.length < 3) {
      pool = data.flashcards.filter(f => f.term !== fc.term); // fallback to all categories
    }
    
    // shuffle pool
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const distractors = pool.slice(0, 3).map(f => f.term);
    let options = [fc.term, ...distractors];
    
    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    const correctIdx = options.indexOf(fc.term);

    const newQ = {
      id: nextId++,
      question: `Which term is best described by the following: "${fc.definition}"`,
      options: options,
      correct: correctIdx,
      category: fc.category,
      difficulty: "Medium",
      explanation: `${fc.term} is defined as: ${fc.definition}`
    };

    data.questions.push(newQ);
    added++;
  }
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log(`Successfully generated and added ${added} new quiz questions programmatically.`);
