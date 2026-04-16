const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/mechatronicsData.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const newFlashcards = [
  {"term":"Gear Ratio Calculation","definition":"Ratio = Number of Driven Teeth / Number of Driving Teeth. Ex: 60 driven / 20 driver = 3:1 ratio.","category":"Mechanical"},
  {"term":"Speed Ratio Calculation","definition":"Output RPM = Input RPM x (Driving Teeth / Driven Teeth). Ex: 1200 RPM x (20 / 60) = 400 RPM output.","category":"Mechanical"},
  {"term":"Electrical Power Formula","definition":"P = V x I (Power = Voltage x Current). Also P = I^2 x R, and P = V^2 / R. Measured in Watts.","category":"Electrical"},
  {"term":"Resistors in Series","definition":"Rt = R1 + R2 + R3... Total resistance is the sum of all individual resistors.","category":"Electrical"},
  {"term":"Resistors in Parallel","definition":"1/Rt = 1/R1 + 1/R2... Or for two resistors: (R1 x R2) / (R1 + R2). Total resistance is always less than the smallest parallel resistor.","category":"Electrical"},
  {"term":"Pascal's Law Formula","definition":"F = P x A (Force = Pressure x Area). Use this to calculate hydraulic cylinder force. Pressure = Force / Area. Area = Force / Pressure.","category":"Hydraulic and Pneumatic Systems"},
  {"term":"Hydraulic Cylinder Area","definition":"Area = π x r^2. If diameter is 4 inches, radius is 2 inches. Area = 3.14159 x 2^2 = 12.56 square inches.","category":"Hydraulic and Pneumatic Systems"},
  {"term":"Mechanical Advantage (Lever)","definition":"MA = Length of Effort Arm / Length of Resistance (Load) Arm. Determines the force multiplication of a lever.","category":"Mechanical"},
  {"term":"Torque Formula","definition":"Torque (T) = Force (F) x Distance (d). Usually measured in foot-pounds (ft-lb) or Newton-meters (Nm).","category":"Mechanical"},
  {"term":"Ladder Base Distance","definition":"Using the 4:1 rule, base distance = Ladder Height to Support point / 4. Ex: 20 ft wall = 5 ft base distance.","category":"Safety"},
  {"term":"Tolerance Calculation","definition":"Tolerance is the total allowable variation in a dimension. Upper Limit - Lower Limit. Ex: dimension 1.000 ± 0.005 has a tolerance of 0.010.","category":"Instrumentation and Measurement"},
  {"term":"Binary to Decimal Conversion","definition":"Binary 1011 = (1x8) + (0x4) + (1x2) + (1x1) = 8 + 0 + 2 + 1 = 11.","category":"Computer and Control Systems"},
  {"term":"Celsius to Fahrenheit","definition":"F = (C x 1.8) + 32  or  F = (C x 9/5) + 32. Ex: 100°C = 212°F.","category":"Instrumentation and Measurement"},
  {"term":"Fahrenheit to Celsius","definition":"C = (F - 32) / 1.8  or  C = (F - 32) x 5/9. Ex: 32°F = 0°C.","category":"Instrumentation and Measurement"},
  {"term":"Period of an AC Wave","definition":"T = 1 / f. Period is the inverse of frequency. For 60 Hz AC, T = 1 / 60 = 0.0167 seconds (16.7 milliseconds).","category":"Electrical"},
  {"term":"Synchronous Motor Speed Formula","definition":"RPM = (120 x Frequency) / Number of Poles. Ex: 4-pole motor at 60 Hz = (120 x 60) / 4 = 7200 / 4 = 1800 RPM.","category":"Electrical"},
  {"term":"4-20mA Scaling","definition":"Span = 16 mA. A 12 mA signal is exactly 50% of scale (because 4 mA is 0% and 4 + 8 = 12).","category":"Instrumentation and Measurement"},
  {"term":"RMS Voltage","definition":"V_rms = V_peak x 0.707.  Root Mean Square is the effective heating value of an AC voltage compared to DC. US 120VAC is an RMS value.","category":"Electrical"},
  {"term":"Current Division (Parallel)","definition":"Current divides across parallel branches. I_branch = V_source / R_branch. According to KCL, sum of branch currents = total current.","category":"Electrical"},
  {"term":"Voltage Division (Series)","definition":"Voltage drops across series resistors proportional to their resistance. V_drop = I_total x R_specific. Sum of drops = supply voltage (KVL).","category":"Electrical"}
];

let nextId = Math.max(...data.questions.map(q => q.id)) + 1;

const newQuestions = [
  {
    "question": "A motor nameplate indicates it draws 10 Amps at 120V. Assuming it is purely resistive, what is the power consumption?",
    "options": ["12 Watts", "1200 Watts", "0.083 Watts", "120 Watts"],
    "correct": 1,
    "category": "Electrical",
    "difficulty": "Hard",
    "explanation": "Power (P) = Voltage (V) × Current (I). P = 120V × 10A = 1200 Watts."
  },
  {
    "question": "Three resistors of 10Ω, 20Ω, and 30Ω are connected in series. What is the total resistance?",
    "options": ["5.45Ω", "10Ω", "60Ω", "300Ω"],
    "correct": 2,
    "category": "Electrical",
    "difficulty": "Medium",
    "explanation": "In a series circuit, total resistance is the sum of the individual resistors. Rt = 10 + 20 + 30 = 60Ω."
  },
  {
    "question": "Two 100Ω resistors are connected in parallel. What is the total equivalent resistance?",
    "options": ["200Ω", "100Ω", "50Ω", "10Ω"],
    "correct": 2,
    "category": "Electrical",
    "difficulty": "Medium",
    "explanation": "For two equal resistors in parallel, the total resistance is half the value of one resistor. 100 / 2 = 50Ω."
  },
  {
    "question": "A 480V to 120V step-down transformer has a primary winding of 1000 turns. How many turns are on the secondary winding?",
    "options": ["4000 turns", "250 turns", "1000 turns", "120 turns"],
    "correct": 1,
    "category": "Electrical",
    "difficulty": "Hard",
    "explanation": "Turns ratio is proportional to voltage ratio. Vp/Vs = Np/Ns. 480/120 = 4. The ratio is 4:1. Thus, Ns = 1000 / 4 = 250 turns."
  },
  {
    "question": "A hydraulic cylinder has a piston area of 5 square inches. If the system pressure is 1,200 PSI, what is the maximum extension force?",
    "options": ["240 lbs", "6,000 lbs", "12,000 lbs", "600 lbs"],
    "correct": 1,
    "category": "Hydraulic and Pneumatic Systems",
    "difficulty": "Hard",
    "explanation": "Force = Pressure × Area. F = 1,200 PSI × 5 sq.in = 6,000 lbs."
  },
  {
    "question": "A hydraulic pump must move an 8,000 lb load using a cylinder with a 4 square inch piston area. How much pressure is required?",
    "options": ["2,000 PSI", "32,000 PSI", "200 PSI", "4,000 PSI"],
    "correct": 0,
    "category": "Hydraulic and Pneumatic Systems",
    "difficulty": "Hard",
    "explanation": "Pressure = Force / Area. P = 8,000 lbs / 4 sq.in = 2,000 PSI."
  },
  {
    "question": "A motor spinning at 1500 RPM has a 4-inch drive pulley connected via a belt to a 12-inch driven pulley. What is the RPM of the driven pulley?",
    "options": ["4500 RPM", "500 RPM", "300 RPM", "1500 RPM"],
    "correct": 1,
    "category": "Mechanical",
    "difficulty": "Hard",
    "explanation": "Speed Ratio = Driven RPM / Driver RPM = Driver Dia / Driven Dia. RPM_driven = 1500 × (4 / 12) = 500 RPM."
  },
  {
    "question": "A gear train consists of a 10-tooth driving gear and a 50-tooth driven gear. What is the gear ratio and torque effect?",
    "options": ["1:5 ratio, decreases torque", "5:1 ratio, increases torque by 5x", "5:1 ratio, decreases torque by 5x", "1:5 ratio, increases torque by 5x"],
    "correct": 1,
    "category": "Mechanical",
    "difficulty": "Hard",
    "explanation": "Gear ratio = Driven/Driver = 50/10 = 5:1. Because output speed is reduced, output torque is multiplied by the same factor (5x)."
  },
  {
    "question": "A worker needs to set up a ladder to reach a roof that is 24 feet high. According to the OSHA 4:1 rule, how far from the wall should the base of the ladder be placed?",
    "options": ["4 feet", "8 feet", "6 feet", "24 feet"],
    "correct": 2,
    "category": "Safety",
    "difficulty": "Medium",
    "explanation": "The 4:1 rule states that the base should be out 1 foot for every 4 feet of height. 24 / 4 = 6 feet."
  },
  {
    "question": "A drawing specifies a dimension of 2.500\" ± 0.015\". What is the total tolerance allowed?",
    "options": ["0.015\"", "0.030\"", "2.515\"", "2.485\""],
    "correct": 1,
    "category": "Instrumentation and Measurement",
    "difficulty": "Medium",
    "explanation": "Tolerance is the difference between the max limit and min limit. Total tolerance = (+0.015) + (-0.015) = 0.030\"."
  },
  {
    "question": "An AC circuit operates at 60 Hz. What is the duration (period) of one complete cycle?",
    "options": ["16.7 milliseconds", "60 seconds", "1.67 seconds", "100 milliseconds"],
    "correct": 0,
    "category": "Electrical",
    "difficulty": "Hard",
    "explanation": "Period (T) = 1 / Frequency (f). T = 1 / 60 = 0.01666... seconds, which is 16.7 milliseconds."
  },
  {
    "question": "A temperature sensor has a 4-20mA output range corresponding to 0°C to 100°C. If the sensor is reading 50°C, what should the expected output current be?",
    "options": ["10 mA", "12 mA", "20 mA", "8 mA"],
    "correct": 1,
    "category": "Instrumentation and Measurement",
    "difficulty": "Hard",
    "explanation": "The span is 16mA (from 4 to 20). 50°C is 50% of the temperature range. 50% of the 16mA span is 8mA. Added to the 4mA baseline, total is 12 mA."
  },
  {
    "question": "What is the decimal equivalent of the 4-bit binary number 1101?",
    "options": ["11", "9", "13", "15"],
    "correct": 2,
    "category": "Computer and Control Systems",
    "difficulty": "Medium",
    "explanation": "Binary 1101 = (1×8) + (1×4) + (0×2) + (1×1) = 8 + 4 + 0 + 1 = 13."
  },
  {
    "question": "A 4-pole AC induction motor operating on a 60 Hz power supply has a synchronous speed of:",
    "options": ["3600 RPM", "1800 RPM", "1200 RPM", "900 RPM"],
    "correct": 1,
    "category": "Electrical",
    "difficulty": "Hard",
    "explanation": "Synchronous Speed = (120 × f) / p = (120 × 60) / 4 = 7200 / 4 = 1800 RPM."
  },
  {
    "question": "If you apply 24V DC to a circuit with a 100Ω and a 200Ω resistor in series, what is the current flowing through the circuit?",
    "options": ["0.24 A", "0.08 A", "2.4 A", "0.12 A"],
    "correct": 1,
    "category": "Electrical",
    "difficulty": "Hard",
    "explanation": "First, find total resistance: Rt = 100 + 200 = 300Ω. Then apply Ohm's Law: I = V / R = 24 / 300 = 0.08 A."
  },
  {
    "question": "Which logic gate outputs a '1' ONLY when both Input A AND Input B are '0'?",
    "options": ["NAND", "NOR", "XOR", "NOT"],
    "correct": 1,
    "category": "Computer and Control Systems",
    "difficulty": "Medium",
    "explanation": "A NOR gate is an OR gate followed by an inverter. It only outputs a '1' (TRUE) when all of its inputs are '0' (FALSE)."
  },
  {
    "question": "A pneumatic cylinder has a 2-inch diameter. Approximately what is the surface area of the piston?",
    "options": ["12.5 sq.in", "3.14 sq.in", "6.28 sq.in", "4 sq.in"],
    "correct": 1,
    "category": "Hydraulic and Pneumatic Systems",
    "difficulty": "Medium",
    "explanation": "Radius = Diameter/2 = 1 inch. Area = π·r² = 3.14159 × (1)² ≈ 3.14 sq.in."
  },
  {
    "question": "If a hydraulic pump produces a flow rate of 10 GPM (gallons per minute) to a cylinder, increasing the flow rate to 20 GPM will:",
    "options": ["Double the cylinder extension force", "Double the cylinder extension speed", "Halve the pressure limit", "Cause the cylinder to lock up"],
    "correct": 1,
    "category": "Hydraulic and Pneumatic Systems",
    "difficulty": "Medium",
    "explanation": "Fluid flow rate determines actuator velocity (speed). Doubling the flow rate will double the speed. Pressure determines force."
  },
  {
    "question": "If a dial indicator completes exactly 2 full revolutions on its main dial (which indicates 0.100 inch per revolution), what distance has the spindle moved?",
    "options": ["0.010 inch", "0.100 inch", "0.200 inch", "1.000 inch"],
    "correct": 2,
    "category": "Instrumentation and Measurement",
    "difficulty": "Medium",
    "explanation": "Each revolution equals 0.100 inch displacement. Two complete revolutions means 2 × 0.100 = 0.200 inch."
  },
  {
    "question": "To properly check mechanical runout on a motor shaft, what tool is primarily used?",
    "options": ["A Vernier caliper", "A torque wrench", "A dial indicator", "A micrometer"],
    "correct": 2,
    "category": "Instrumentation and Measurement",
    "difficulty": "Easy",
    "explanation": "A dial indicator is the standard tool to measure runout, endplay, and alignment. It detects the precise deviation of a surface as it rotates."
  },
  {
    "question": "In a 3-phase, 480V motor branch circuit, which device provides protection exclusively against motor OVERLOAD (heat/thermal accumulation)?",
    "options": ["The main circuit breaker", "The motor overload relay (heater)", "The start pushbutton", "The control transformer"],
    "correct": 1,
    "category": "Electrical",
    "difficulty": "Medium",
    "explanation": "The overload relay senses motor current and trips when current exceeds the safe thermal profile of the motor, protecting against overloads, not instantaneous short circuits."
  },
  {
    "question": "Which network topology consists of a central switch or hub that connects out to all individual devices?",
    "options": ["Ring topology", "Star topology", "Bus topology", "Mesh topology"],
    "correct": 1,
    "category": "Computer and Control Systems",
    "difficulty": "Easy",
    "explanation": "A Star topology uses a central networking unit (like an Ethernet switch) where each node connects individually to the central hub/switch."
  },
  {
    "question": "A worker is drilling hole in a piece of steel plate on a drill press. Which action is the most critical for safety?",
    "options": ["Wearing gloves to prevent chips from hitting hands", "Clamping the workpiece securely to the drill press table", "Increasing drill speed as it breaks through", "Applying oil with a bare hand"],
    "correct": 1,
    "category": "Safety",
    "difficulty": "Medium",
    "explanation": "The workpiece MUST be securely clamped. If a drill bit catches, a loose piece of sheet metal will act as a spinning blade ('helicoptering') and cause severe injury. Gloves should generally NOT be worn around rotating spindles due to entanglement risk."
  },
  {
    "question": "What happens when an NPN transistor has a positive voltage applied to its base relative to its emitter?",
    "options": ["It blocks current from collector to emitter", "It conducts current from collector to emitter", "It becomes an insulator", "It explodes"],
    "correct": 1,
    "category": "Electrical",
    "difficulty": "Hard",
    "explanation": "An NPN transistor turns ON (conducts current from the collector to the emitter) when a positive bias voltage is applied to the base, acting as a switch."
  },
  {
    "question": "A 100 pound object is lifted using a Class 1 lever. The distance from the fulcrum to the effort is 4 feet, and the distance from the fulcrum to the load is 1 foot. What is the effort force required?",
    "options": ["100 lbs", "400 lbs", "25 lbs", "50 lbs"],
    "correct": 2,
    "category": "Mechanical",
    "difficulty": "Hard",
    "explanation": "Mechanical Advantage = Effort Arm / Load Arm = 4ft / 1ft = 4.  Effort Force = Load / MA = 100 lbs / 4 = 25 lbs."
  }
];

newQuestions.forEach(q => {
  q.id = nextId++;
  data.questions.push(q);
});

data.flashcards.push(...newFlashcards);

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log(`Added ${newQuestions.length} questions and ${newFlashcards.length} flashcards.`);
