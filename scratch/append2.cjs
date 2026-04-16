const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/mechatronicsData.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Engineering Principles extra flashcards
const newFlashcards = [
  {"term":"Resistor Color Band: Blue","definition":"Blue represents the number 6 in standard resistor color coding.","category":"Electrical"},
  {"term":"Microprocessor","definition":"An integrated circuit that contains all the functions of a central processing unit (CPU). Acts as the brain of PLCs and computers in automation.","category":"Computer and Control Systems"},
  {"term":"Photoelectric Cell (Photocell)","definition":"A transducer that detects the presence or absence of light, often used to count objects on a conveyor or trigger safety stops.","category":"Instrumentation and Measurement"},
  {"term":"Shaft Speed Reduction","definition":"Driven gear is larger than the driving gear. Lowers RPM but mathematically increases the output torque available.","category":"Mechanical"},
  {"term":"Mounting Fasteners","definition":"Selecting proper bolts, nuts, and washers to secure components. T-slot nuts are common for aluminum extrusion. Lock washers or threadlocker prevent vibration loosening.","category":"Mechanical"},
  {"term":"Hydraulic Fluid Characteristics","definition":"Must transmit power, lubricate moving parts, seal clearances, and dissipate heat. The most important characteristic is viscosity.","category":"Hydraulic and Pneumatic Systems"},
  {"term":"Pneumatic Conductors","definition":"Pipes, tubes, and hoses that carry compressed air. Rigid pipe for main headers; flexible polyurethane tubing for moving actuators.","category":"Hydraulic and Pneumatic Systems"},
  {"term":"Wired vs. Wireless Systems","definition":"Hardwired systems provide reliable, immediate connection critical for emergency stops. Wireless allows remote monitoring and mobile tools but is susceptible to interference and latency.","category":"Computer and Control Systems"},
  {"term":"Hydraulic Valve Types","definition":"Pressure control (relief, reducing), Flow control (needle), and Directional control (spool, poppet valves).","category":"Hydraulic and Pneumatic Systems"},
  {"term":"Engineering Units: Mass","definition":"Measured in slugs (Imperial) or kilograms (Metric). Mass is constant; weight changes with gravity.","category":"Mechanical"},
  {"term":"Plain Bearings","definition":"Also called sleeve, bushing, or journal bearings. Use sliding action instead of rolling elements. Often made of bronze or Babbitt metal. Excellent for high loads, slow speeds, or oscillation.","category":"Mechanical"},
  {"term":"Roller Bearings","definition":"Use cylindrical, tapered, needle, or spherical rollers to handle higher load capacities than ball bearings, especially strong in radial loads.","category":"Mechanical"}
];

let nextId = Math.max(...data.questions.map(q => q.id)) + 1;

const newQuestions = [
  {
    "question": "Which of the following describes the correct procedure for measuring current with an ammeter?",
    "options": ["Connect it in parallel with the power source", "Connect it in series with the load being measured", "Connect it across the open switch", "It does not matter how it is connected"],
    "correct": 1,
    "category": "Instrumentation and Measurement",
    "difficulty": "Medium",
    "explanation": "Ammeters must be connected in series with the component to measure the flow of current running through the circuit. Connecting in parallel can cause a short circuit and blow the meter's fuse."
  },
  {
    "question": "When interpreting MSDS/SDS sheets, which section provides details about hazardous ingredients?",
    "options": ["Section 1", "Section 3", "Section 8", "Section 15"],
    "correct": 1,
    "category": "Safety",
    "difficulty": "Hard",
    "explanation": "Section 3 covers the Composition/Information on Ingredients, which includes chemical names, common names, and CAS numbers."
  },
  {
    "question": "In pneumatic systems, which valve accurately determines the speed at which a cylinder extends?",
    "options": ["Directional control valve", "Pressure relief valve", "Check valve", "Flow control valve"],
    "correct": 3,
    "category": "Hydraulic and Pneumatic Systems",
    "difficulty": "Easy",
    "explanation": "A flow control (or needle) valve regulates the volume of air entering or leaving the cylinder, directly dictating its speed."
  },
  {
    "question": "What is the function of a limit switch in an automated system?",
    "options": ["To limit the voltage in the power supply", "To detect the physical presence or position of an object", "To convert AC to DC", "To regulate hydraulic pressure"],
    "correct": 1,
    "category": "Electrical",
    "difficulty": "Medium",
    "explanation": "A limit switch uses a physical lever, plunger, or roller that triggers electrical contacts when an object physically hits it, detecting position or end-of-travel."
  },
  {
    "question": "To properly calibrate electrical equipment, a technician should:",
    "options": ["Hit it. If it works, it's calibrated.", "Compare its measurements to a known traceable standard.", "Reset the batteries.", "Only measure voltages below 12V."],
    "correct": 1,
    "category": "Instrumentation and Measurement",
    "difficulty": "Medium",
    "explanation": "Calibration is the process of adjusting an instrument to match a verifiable, traceable standard (like NIST) to guarantee accuracy."
  },
  {
    "question": "A microprocessor in a modern control system acts as the:",
    "options": ["Power supply", "Actuator", "Brain (CPU) that executes logic instructions", "Human-Machine Interface"],
    "correct": 2,
    "category": "Computer and Control Systems",
    "difficulty": "Easy",
    "explanation": "The microprocessor is the central processing unit (CPU) that handles truth tables, logic gates, and calculation instructions."
  },
  {
    "question": "When selecting wire sizes per NEC rules, what dictates the required AWG gauge?",
    "options": ["The voltage of the circuit", "The color of the insulation", "The maximum amperage load of the circuit", "The physical length of the conduit"],
    "correct": 2,
    "category": "Electrical",
    "difficulty": "Medium",
    "explanation": "Wire size (gauge) must be chosen based on the maximum current (amperage load). Lower AWG numbers carry higher amperage."
  },
  {
    "question": "Which of the following is an example of a potential energy hazard?",
    "options": ["A spinning motor shaft", "A compressed heavy-duty spring", "A conveyor belt moving boxes", "A fan blade blowing air"],
    "correct": 1,
    "category": "Safety",
    "difficulty": "Medium",
    "explanation": "Potential energy is stored energy waiting to be released. Compressed springs, suspended loads, and pressurized vessels are lethal potential energy hazards."
  },
  {
    "question": "Plain bearings (bushings) are typically chosen over roller bearings when the application involves:",
    "options": ["Extremely high RPM", "Low speed and extremely high loads", "Zero friction requirements", "Frequent start/stop at 3000 RPM"],
    "correct": 1,
    "category": "Mechanical",
    "difficulty": "Hard",
    "explanation": "Plain bearings have a massive surface area of sliding contact, allowing them to support massive loads at slow or oscillating speeds. They require thick lubrication films."
  },
  {
    "question": "When measuring the shaft alignment of two coupled motors, you would most likely use a:",
    "options": ["Tape measure", "Level", "Dial indicator", "Plumb bob"],
    "correct": 2,
    "category": "Mechanical",
    "difficulty": "Medium",
    "explanation": "Dial indicators (and laser alignment tools) offer thousandths-of-an-inch precision to check radial or axial runout during shaft alignment."
  },
  {
    "question": "A truth table for an AND gate with two inputs will only output TRUE (1) if:",
    "options": ["Input A is 1 and Input B is 0", "Input A is 0 and Input B is 1", "Both Input A and Input B are 1", "Both Input A and Input B are 0"],
    "correct": 2,
    "category": "Computer and Control Systems",
    "difficulty": "Easy",
    "explanation": "AND logic requires ALL conditions to be met. Therefore, both input A AND input B must be TRUE (1)."
  },
  {
    "question": "Which fastener prevents heavy machinery nuts from loosening due to intense vibration?",
    "options": ["Standard flat washer", "A set screw", "A split lock washer or threadlocker fluid", "A cotter pin in a straight bolt"],
    "correct": 2,
    "category": "Mechanical",
    "difficulty": "Medium",
    "explanation": "Split ring lock washers, nylon-insert nuts, and threadlocker adhesives (like Loctite) actively push against threads to prevent back-out from vibration."
  },
  {
    "question": "To perform proper machine guarding of a chain and sprocket drive, the guard should:",
    "options": ["Be made of glass", "Completely enclose the nip points and rotating elements", "Only cover the top half", "Be easily removable without tools while running"],
    "correct": 1,
    "category": "Safety",
    "difficulty": "Easy",
    "explanation": "OSHA requires all nip points and rotating mechanical drives to be strictly enclosed so hands/clothing cannot get caught. Guards should require a tool for removal."
  },
  {
    "question": "When converting from Imperial to Metric measurements, 2 inches is equal to:",
    "options": ["50.8 mm", "25.4 mm", "5.08 cm", "Both A and C are correct"],
    "correct": 3,
    "category": "Instrumentation and Measurement",
    "difficulty": "Medium",
    "explanation": "1 inch = 25.4 mm. Therefore, 2 inches = 50.8 mm, which is exactly equal to 5.08 cm."
  },
  {
    "question": "Proper application of a multimeter's Ohmmeter function requires that the component being tested:",
    "options": ["Is under full power", "Has an AC voltage, not DC", "Is completely disconnected from all electrical power", "Is wet"],
    "correct": 2,
    "category": "Instrumentation and Measurement",
    "difficulty": "Medium",
    "explanation": "Ohmmeters push a tiny internal battery voltage through the component to measure resistance. If the circuit is powered, it will destroy the meter or give false readings."
  },
  {
    "question": "Which of these pairs represents components connected in PARALLEL?",
    "options": ["Current flows through one to reach the other", "If one fails, the entire circuit stops", "Voltage is the same across both components", "Total resistance increases when more components are added"],
    "correct": 2,
    "category": "Electrical",
    "difficulty": "Medium",
    "explanation": "In parallel circuits, all branches connect to the same source nodes, meaning the voltage drop across all parallel branches is identical."
  },
  {
    "question": "When working with PLCs, the abbreviation CAD most generally refers to:",
    "options": ["Computer-Aided Design", "Control Analog Device", "Computer Automated Distribution", "Cathode Arc Discharge"],
    "correct": 0,
    "category": "Computer and Control Systems",
    "difficulty": "Easy",
    "explanation": "Computer-Aided Design software is used globally in engineering to create 2D electrical schematics and 3D mechanical models."
  },
  {
    "question": "In a pneumatic piping system, the primary function of a \"filter\" in an FRL unit is to:",
    "options": ["Add oil to the air", "Regulate the pressure down to 80 PSI", "Remove solid particulates and liquid water drops from compressed air", "Quiet the exhaust noise"],
    "correct": 2,
    "category": "Hydraulic and Pneumatic Systems",
    "difficulty": "Medium",
    "explanation": "The Filter physically scrubs solids and drops out moisture/water using centrifugal force and micron screens to protect downstream valves and cylinders."
  },
  {
    "question": "To correctly use a torque wrench, the technician must:",
    "options": ["Jerk the wrench quickly until it clicks", "Pull with a smooth, steady continuous motion until the specified setting is reached", "Use an extension pipe for more leverage", "Push instead of pull"],
    "correct": 1,
    "category": "Instrumentation and Measurement",
    "difficulty": "Medium",
    "explanation": "Torque wrenches measure rotational force accurately only when applied with slow, steady, 90-degree pulling pressure. Jerking or using 'cheater bars' voids the calibration."
  },
  {
    "question": "In the event of a workplace chemical spill, where should a technician look first to determine safe clean-up procedures?",
    "options": ["The machine blueprint", "The Safety Data Sheet (SDS)", "The electrical schematic", "The company website"],
    "correct": 1,
    "category": "Safety",
    "difficulty": "Easy",
    "explanation": "The SDS (Safety Data Sheet) has specific sections on how to safely handle spills, fires, and exposures regarding the exact chemical involved."
  }
];

newQuestions.forEach(q => {
  q.id = nextId++;
  data.questions.push(q);
});

data.flashcards.push(...newFlashcards);

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log(`Added ${newQuestions.length} questions and ${newFlashcards.length} flashcards.`);
