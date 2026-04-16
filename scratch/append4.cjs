const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/mechatronicsData.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

if (!data.categories.includes("Engineering Principles")) {
  data.categories.push("Engineering Principles");
}

const newFlashcards = [
  {"term":"Civil Engineering","definition":"A major engineering field that designs, constructs, and maintains the physical and naturally built environment (roads, bridges, dams).","category":"Engineering Principles"},
  {"term":"Mechanical Engineering","definition":"A major engineering field dealing with the design, construction, and use of machines to solve problems.","category":"Engineering Principles"},
  {"term":"Electrical Engineering","definition":"A major engineering field dealing with the study and application of electricity, electronics, and electromagnetism.","category":"Engineering Principles"},
  {"term":"Aerospace Engineering","definition":"A major engineering field concerned with the development of aircraft and spacecraft.","category":"Engineering Principles"},
  {"term":"Structural Engineering","definition":"A sub-discipline of civil engineering focused on the framework and foundations of structures, ensuring they can withstand loads.","category":"Engineering Principles"},
  {"term":"Orthographic Projection","definition":"A method that generates a three-view drawing (top, front, side) by placing a plane between the observer and the object.","category":"Engineering Principles"},
  {"term":"Core Concepts of Technology","definition":"Skillful research, ethical behavior, and critical thinking.","category":"Engineering Principles"},
  {"term":"Engineering Milestones","definition":"Henry Ford's assembly line, Wright brothers' first flight, Thomas Edison's light bulb, Robert Goddard's liquid fuel rockets.","category":"Engineering Principles"},
  {"term":"Six Simple Machines","definition":"Pulley, Lever, Wheel and Axle, Wedge, Screw, Inclined Plane.","category":"Engineering Principles"},
  {"term":"Characteristics of Effective Communication","definition":"Open discussion, speaking clearly to the audience, active listening, and not reading directly from slides.","category":"Communication"},
  {"term":"Steps in the Design Process","definition":"1. Identify the need, 2. Research/gather info, 3. Develop solutions, 4. Choose solution (analysis), 5. Construct prototype, 6. Test and evaluate.","category":"Engineering Principles"},
  {"term":"Analyzing a Solution (Strengths/Weaknesses)","definition":"Evaluating based on Efficiency, Cost, Safety, Functionality, Availability of materials, and Durability.","category":"Engineering Principles"},
  {"term":"Machining Processes","definition":"Turning (lathe) for cylindrical objects, Milling for flat/square objects, Casting (liquid into a mold), Welding (arc, spot, gas).","category":"Mechanical"},
  {"term":"Undercutting in Welding","definition":"A defect where the cross-sectional strength is reduced due to a groove melted into the base metal adjacent to the weld toe.","category":"Mechanical"},
  {"term":"Vernier Caliper (VIC)","definition":"A precision instrument used to measure inside and outside distances accurately.","category":"Instrumentation and Measurement"},
  {"term":"Fastener Identification","definition":"Machine screws (use hex nuts), Wood screws (coarse thread, pointy), Sheet metal screws (pointed heads, sharp fine threads).","category":"Mechanical"},
  {"term":"Thread Callout (e.g. UNC 1/4-20-2-2A)","definition":"UNC = type, 1/4 = diameter, 20 = threads per inch, 2 = length, 2A = thread fit/class.","category":"Mechanical"},
  {"term":"Quality Control in Manufacturing","definition":"Controls quality using methods like Six Sigma (standardization array), international organizations, and manufacturing tolerance to lower costs and reduce execution time.","category":"Engineering Principles"},
  {"term":"Supply and Outsourcing Roles","definition":"Setting reordering levels to attain materials on time without overstocking.","category":"Engineering Principles"},
  {"term":"Attributes of Common Materials","definition":"Ferrous: high weight, lower conductivity, easily corrodible, magnetic. Non-Ferrous: malleable, high conductivity.","category":"Mechanical"},
  {"term":"Histogram","definition":"A graphical display of data using bars of different heights, used for representing quantitative (numerical) data. Bar graphs represent qualitative data.","category":"Engineering Principles"},
  {"term":"Forms of Heat Transfer","definition":"Convection (fluid flow, hot to cold), Radiation (through vacuum/no direct contact), Conduction (direct physical contact).","category":"Mechanical"},
  {"term":"BTU (British Thermal Unit)","definition":"The amount of heat required to raise the temperature of 1 pound of water by 1 degree Fahrenheit.","category":"Mechanical"},
  {"term":"Fluid Resistance Factors","definition":"Pipe roughness, number of curves/bends, and viscosity affect resistance in a fluid system. Smoother interior and fewer curves reduce resistance.","category":"Hydraulic and Pneumatic Systems"},
  {"term":"Heat Insulators","definition":"Minimize heat flow. Examples include fiberglass and sealed windows (using a vacuum between panes).","category":"Mechanical"},
  {"term":"Ergonomics","definition":"Fitting the job to the person (e.g., proper workstation setup to avoid strain).","category":"Safety"},
  {"term":"Engineering Ethics","definition":"Using knowledge and skill for the advancement of human welfare, being honest, impartial, and increasing the reputation of the profession.","category":"Engineering Principles"},
  {"term":"Ductility","definition":"The ability of a material to be stretched into a long, thinner shape (like a wire) without breaking.","category":"Mechanical"},
  {"term":"Chemical Engineering","definition":"Combines physical/life sciences and math to convert raw materials into valuable forms.","category":"Engineering Principles"},
  {"term":"Forming","definition":"Pressing or squeezing a material into a desired shape (forging, rolling, stamping).","category":"Mechanical"},
  {"term":"Test Engineer","definition":"An engineer who verifies whether a prototype or product meets the design's quality and performance objectives.","category":"Engineering Principles"},
  {"term":"Water Tower Functions","definition":"Provide water storage and supply pressure (via gravity) to move water through the distribution system.","category":"Engineering Principles"}
];

let nextId = Math.max(...data.questions.map(q => q.id)) + 1;

const newQuestions = [
  {
    "question": "Which of the following is considered one of the major engineering fields?",
    "options": ["Culinary", "Aerospace", "Accounting", "Psychology"],
    "correct": 1,
    "category": "Engineering Principles",
    "difficulty": "Easy",
    "explanation": "Major engineering fields include Civil, Mechanical, Electrical, Aerospace, Structural, and Chemical engineering."
  },
  {
    "question": "What method generates a three-view drawing (top, front, side) of an object?",
    "options": ["Isometric projection", "Orthographic projection", "Perspective drawing", "Cavalier oblique"],
    "correct": 1,
    "category": "Engineering Principles",
    "difficulty": "Medium",
    "explanation": "Orthographic projection places a theoretical plane between the observer and the object to extract distinct 2D views (top, front, side)."
  },
  {
    "question": "Which of the following are considered core concepts of technology?",
    "options": ["Guesswork and estimation", "Skillful research, ethical behavior, and critical thinking", "Mass production and sales", "Drafting and assembling"],
    "correct": 1,
    "category": "Engineering Principles",
    "difficulty": "Easy",
    "explanation": "Skillful research, ethical behavior, and critical thinking form the foundational core concepts for advancing technology properly."
  },
  {
    "question": "Which option lists important milestones in the progression of the engineering field?",
    "options": ["Invention of the internet, the steam engine, the wheel", "Henry Ford's assembly line, Wright brothers' first flight, Thomas Edison's light bulb", "The discovery of fire and bronze tools", "The printing press and the telegraph"],
    "correct": 1,
    "category": "Engineering Principles",
    "difficulty": "Easy",
    "explanation": "Ford's assembly line, the Wright brothers' flight, Edison's mass-produced light bulb, and Goddard's liquid fuel rockets are major documented milestones."
  },
  {
    "question": "What is the very first step in the engineering design process?",
    "options": ["Construct a prototype", "Identify the need or define the problem", "Develop alternative solutions", "Test and evaluate"],
    "correct": 1,
    "category": "Engineering Principles",
    "difficulty": "Easy",
    "explanation": "The engineering design process always begins with step 1: Stating the problem or identifying the need."
  },
  {
    "question": "When analyzing and choosing a solution, which of the following is evaluated to identify strengths and weaknesses?",
    "options": ["Efficiency, Cost, and Safety", "The engineer's salary", "Color options alone", "Marketing budgets"],
    "correct": 0,
    "category": "Engineering Principles",
    "difficulty": "Medium",
    "explanation": "Evaluating a solution requires assessing Efficiency, Cost, Safety, Functionality, Durability, and Material Availability."
  },
  {
    "question": "Which machining process is primarily used to turn a rotating cylindrical workpiece against a cutting tool?",
    "options": ["Milling", "Casting", "Turning (Lathe)", "Welding"],
    "correct": 2,
    "category": "Mechanical",
    "difficulty": "Easy",
    "explanation": "Turning is performed on a lathe, spinning the part to cut cylindrical shapes. Milling is typically used for flat or squared objects."
  },
  {
    "question": "A thread callout reads 'UNC 1/4-20'. What does the '20' represent?",
    "options": ["The length of the screw in millimeters", "The diameter of the screw", "Threads per inch", "The torque rating"],
    "correct": 2,
    "category": "Mechanical",
    "difficulty": "Medium",
    "explanation": "In UNC 1/4-20, 1/4 is the diameter in inches, and 20 signifies the number of threads per inch."
  },
  {
    "question": "What role does Six Sigma and strict quality control play in assembly and fabrication?",
    "options": ["Increases material costs", "Improves quality, reduces execution time, and lowers costs", "Slows down the assembly line permanently", "Replaces technicians with engineers"],
    "correct": 1,
    "category": "Engineering Principles",
    "difficulty": "Medium",
    "explanation": "Quality control, including Six Sigma methodologies, standardizes manufacturing which improves reputation, reduces waste, and ultimately lowers costs."
  },
  {
    "question": "How do ferrous materials generally differ from non-ferrous materials?",
    "options": ["Ferrous materials are non-magnetic", "Ferrous materials have high weight, are magnetic, and are easily corrodible", "Non-ferrous materials are highly magnetic", "Ferrous materials have higher conductivity than non-ferrous"],
    "correct": 1,
    "category": "Mechanical",
    "difficulty": "Medium",
    "explanation": "Ferrous materials (containing iron) are typically heavier, magnetic, and prone to rust (corrosive), whereas non-ferrous (like copper) are non-magnetic and highly conductive."
  },
  {
    "question": "When expressing data, what is the primary difference between a Bar Graph and a Histogram?",
    "options": ["Bar graphs show percentages; Histograms show absolute numbers", "Bar graphs are for qualitative data; Histograms are for quantitative (numerical) data", "Histograms use lines; Bar graphs use bars", "There is no difference"],
    "correct": 1,
    "category": "Engineering Principles",
    "difficulty": "Hard",
    "explanation": "Bar graphs typically represent categorical or qualitative data. Histograms represent continuous quantitative or numerical data grouped in bins."
  },
  {
    "question": "Which of the following describes the three ways heat is transferred?",
    "options": ["Voltage, Current, Resistance", "Conduction, Convection, Radiation", "Friction, Tension, Compression", "Liquid, Gas, Solid"],
    "correct": 1,
    "category": "Mechanical",
    "difficulty": "Easy",
    "explanation": "Heat transfers via Convection (currents in fluids), Radiation (electromagnetic waves through space/vacuum), and Conduction (direct physical contact)."
  },
  {
    "question": "What is the Fahrenheit equivalent of 35 degrees Celsius?",
    "options": ["63 degrees F", "72 degrees F", "85 degrees F", "95 degrees F"],
    "correct": 3,
    "category": "Instrumentation and Measurement",
    "difficulty": "Medium",
    "explanation": "Formula: F = (C × 9/5) + 32.  (35 × 1.8) + 32 = 63 + 32 = 95°F."
  },
  {
    "question": "What defines a British Thermal Unit (BTU)?",
    "options": ["Heat to raise 1 gallon of water by 1 degree C", "Heat to raise 1 pound of water by 1 degree F", "Heat generated by 1 watt in 1 hour", "The energy of 1 horsepower"],
    "correct": 1,
    "category": "Mechanical",
    "difficulty": "Hard",
    "explanation": "A BTU is the standard measurement of thermal energy required to raise the temperature of exactly one pound of water by one degree Fahrenheit."
  },
  {
    "question": "When putting out a fire involving oily rags and flammable liquids, which class of fire extinguisher must be used?",
    "options": ["Class A", "Class B", "Class C", "Class K"],
    "correct": 1,
    "category": "Safety",
    "difficulty": "Easy",
    "explanation": "Class B fire extinguishers are specifically for flammable liquids, oils, and greases (like oily rags)."
  },
  {
    "question": "In the workplace, Ergonomics is best described as:",
    "options": ["Calculating economic profits", "Fitting the job and workstation to the person", "Analyzing material strength", "Improving machine speed"],
    "correct": 1,
    "category": "Safety",
    "difficulty": "Easy",
    "explanation": "Ergonomics is the science of designing the workplace, tools, and tasks to fit the physiological capabilities of the worker, preventing strain injuries."
  },
  {
    "question": "Often considered the earliest historical example of engineering, what machine was used to pump water in ancient times?",
    "options": ["The steam engine", "The Archimedes screw", "The wind turbine", "The water wheel"],
    "correct": 1,
    "category": "Engineering Principles",
    "difficulty": "Medium",
    "explanation": "The Archimedes screw, invented by Archimedes in the 3rd century BC, is one of the earliest engineering inventions used to elevate water."
  },
  {
    "question": "A 90 lb container rests on a surface with a coefficient of friction of 0.61. How much force is needed to move it?",
    "options": ["147.5 lbs", "90.6 lbs", "54.9 lbs", "30.4 lbs"],
    "correct": 2,
    "category": "Mechanical",
    "difficulty": "Hard",
    "explanation": "Friction Force = Normal Force (Weight) × Coefficient of Friction. 90 lbs × 0.61 = 54.9 lbs."
  },
  {
    "question": "What is the cubic area (volume) of an object that is 5 feet long, 2.5 feet wide, and 3.5 feet tall?",
    "options": ["11 cubic feet", "25.5 cubic feet", "43.75 cubic feet", "50 cubic feet"],
    "correct": 2,
    "category": "Engineering Principles",
    "difficulty": "Medium",
    "explanation": "Volume = Length × Width × Height. 5 × 2.5 × 3.5 = 43.75 cubic feet."
  },
  {
    "question": "Which field combines physical and life sciences with math to convert raw materials into valuable forms?",
    "options": ["Electrical Engineering", "Chemical Engineering", "Aerospace Engineering", "Civil Engineering"],
    "correct": 1,
    "category": "Engineering Principles",
    "difficulty": "Easy",
    "explanation": "Chemical engineering applies chemistry, biology, physics, and math to create, convert, and transport materials efficiently."
  },
  {
    "question": "What type of education and pathway is strictly required to become a licensed Professional Engineer (PE)?",
    "options": ["A high school diploma and 1 year of work", "An Associate's degree and an OSHA certificate", "A Bachelor's degree (ABET), passing the FE (EIT) exam, 4 years of practice, and passing the PE exam", "Only passing the FE exam"],
    "correct": 2,
    "category": "Engineering Principles",
    "difficulty": "Medium",
    "explanation": "Becoming a licensed engineer requires an ABET accredited Bachelor's degree, passing the Fundamentals of Engineering (FE) exam, practicing for 4 years, and passing the final PE exam."
  },
  {
    "question": "In order to reduce friction and heat between a workpiece and a cutting tool on a lathe or mill, what is commonly used?",
    "options": ["Water", "Cutting fluid", "Compressed air only", "Sanding grit"],
    "correct": 1,
    "category": "Mechanical",
    "difficulty": "Easy",
    "explanation": "Cutting fluid (coolant) lubricates the cut, drastically reducing friction and carrying away intense heat from the tool interface."
  },
  {
    "question": "The ability of a material to be stretched into a long, thinner shape without breaking is called:",
    "options": ["Brittleness", "Hardness", "Ductility", "Malleability"],
    "correct": 2,
    "category": "Mechanical",
    "difficulty": "Medium",
    "explanation": "Ductility is the property allowing deformation under tensile stress (stretching into a wire). Malleability is deformation under compressive stress (hammering into a sheet)."
  },
  {
    "question": "When working with heavy machine tools, which of the following is ALWAYS required?",
    "options": ["Loose fitting clothing for mobility", "Personal Protective Equipment (PPE)", "Two operators per machine", "Removing the safety guards for better visibility"],
    "correct": 1,
    "category": "Safety",
    "difficulty": "Easy",
    "explanation": "PPE (Safety glasses, safety shoes, tight clothing/no jewelry) is always mandatory when operating tools and machines."
  },
  {
    "question": "Which process is universally used for mass production of plastic parts by heating plastic, injecting it, and extracting parts from a mold?",
    "options": ["Forging", "Injection molding", "Die casting", "Extrusion"],
    "correct": 1,
    "category": "Mechanical",
    "difficulty": "Easy",
    "explanation": "Injection molding is the standard process for mass-producing complex plastic components rapidly and uniformly."
  },
  {
    "question": "To properly use a drill press to drill a hole near one end of a ruler or thin workpiece, you must:",
    "options": ["Hold it tightly with a leather glove", "Increase drill speed before contact", "Securely clamp the workpiece in a vise", "Use a larger drill bit"],
    "correct": 2,
    "category": "Safety",
    "difficulty": "Medium",
    "explanation": "Thin objects like rulers can easily catch the drill bit, spinning violently ('helicoptering'). They must ALWAYS be securely clamped to the table or in a vise."
  },
  {
    "question": "Which of the following materials is most appropriate for a highly corrosion resistant valve?",
    "options": ["Carbon steel", "Cast iron", "Brass", "Low-carbon steel"],
    "correct": 2,
    "category": "Mechanical",
    "difficulty": "Easy",
    "explanation": "Brass (a non-ferrous alloy of copper and zinc) is highly resistant to corrosion, making it a standard choice for valves and plumbing."
  },
  {
    "question": "Person A weighs 100 lbs and Person B weighs 150 lbs on a 15' seesaw. If Person A sits 9 ft from the fulcrum, how far should Person B sit to balance?",
    "options": ["9 feet", "6 feet", "10 feet", "4.5 feet"],
    "correct": 1,
    "category": "Mechanical",
    "difficulty": "Hard",
    "explanation": "Lever balance equation: W1 × D1 = W2 × D2.  100 × 9 = 900.  900 = 150 × D2.  D2 = 900 / 150 = 6 feet."
  },
  {
    "question": "Calculate the flow out of a pipe per hour if the flow rate is 180 gallons per minute.",
    "options": ["1800 gallons/hour", "6480 gallons/hour", "10,800 gallons/hour", "3 gallons/hour"],
    "correct": 2,
    "category": "Hydraulic and Pneumatic Systems",
    "difficulty": "Medium",
    "explanation": "180 gallons per minute × 60 minutes per hour = 10,800 gallons/hour."
  },
  {
    "question": "What is the primary role of a 'Test Engineer'?",
    "options": ["To design the initial concept", "To verify whether a prototype meets design, quality, and performance objectives", "To manage the construction site", "To sell the product to consumers"],
    "correct": 1,
    "category": "Engineering Principles",
    "difficulty": "Medium",
    "explanation": "Test Engineers focus on verifying functionality, ensuring the prototype adheres to safety standards and meets performance goals before mass production."
  }
];

newQuestions.forEach(q => {
  q.id = nextId++;
  data.questions.push(q);
});

data.flashcards.push(...newFlashcards);

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log(`Added ${newQuestions.length} questions and ${newFlashcards.length} flashcards.`);
