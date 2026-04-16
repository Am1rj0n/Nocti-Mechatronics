const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/mechatronicsData.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

if (!data.categories.includes("Engineering Principles")) {
  data.categories.push("Engineering Principles");
}

const newFlashcards = [
  {"term":"Water Weight","definition":"One gallon of water weighs approximately 8.3 pounds.","category":"Engineering Principles"},
  {"term":"Nonferrous Metals","definition":"Metals that do not contain any iron. They are generally non-magnetic and highly resistant to corrosion (e.g., aluminum, copper, brass).","category":"Mechanical"},
  {"term":"Ferrous Metals Example","definition":"Mild steel is an example of a ferrous metal because it contains iron.","category":"Mechanical"},
  {"term":"Tensile Strength","definition":"The maximum resistance a metal has to being pulled apart before it breaks.","category":"Mechanical"},
  {"term":"Nondestructive Testing","definition":"Testing methods that do not destroy the part being tested, such as vibration analysis, x-ray, or ultrasonic testing.","category":"Mechanical"},
  {"term":"Toughness","definition":"The ability of a metal or material to withstand shock loading and absorb energy without fracturing.","category":"Mechanical"},
  {"term":"Concrete Rebar","definition":"Steel reinforcing bars (rebar) are added to concrete primarily to resist the force of tension, which concrete is naturally weak against.","category":"Mechanical"},
  {"term":"Gauge Pressure at Sea Level","definition":"0 psi. Gauge pressure ignores standard atmospheric pressure.","category":"Hydraulic and Pneumatic Systems"},
  {"term":"Atmospheric Pressure at Sea Level","definition":"14.7 psi (or 1 atmosphere). This is absolute pressure.","category":"Hydraulic and Pneumatic Systems"},
  {"term":"Electromagnet","definition":"A coil surrounding an iron core to which voltage has been applied.","category":"Electrical"},
  {"term":"Valve Ports","definition":"A two-way valve has exactly 2 ports. A three-way pneumatic valve typically attaches ports A and B to the pneumatic cylinder.","category":"Hydraulic and Pneumatic Systems"},
  {"term":"Solenoid Principle","definition":"A solenoid works on the principle of electromagnetic force. When energized, it typically actuates upon a ferrous material like steel.","category":"Electrical"},
  {"term":"Pneumatic Valve Sizing","definition":"For highest efficiency, directional control valves should be sized according to their flow coefficient (Cv) rather than simply matching pipe sizes.","category":"Hydraulic and Pneumatic Systems"},
  {"term":"Analog Signal","definition":"A continuous varying signal, such as a 60 hertz sine wave measuring 120 volts on an oscilloscope.","category":"Communication"},
  {"term":"Pneumatics Enemy","definition":"The worst enemy of a pneumatic system is contamination (dirt, water, oil).","category":"Hydraulic and Pneumatic Systems"},
  {"term":"Ladder Diagram","definition":"A specialized electrical schematic used heavily in PLCs and industrial control logic systems.","category":"Electrical"},
  {"term":"Hydraulic Fluid Compressibility","definition":"Fluid in a hydraulic system is considered non-compressible, which allows it to transfer massive forces rigidly.","category":"Hydraulic and Pneumatic Systems"},
  {"term":"Pump Blockage","definition":"If contaminants block a fluid system, the blockage most frequently occurs first in the suction side of the system's pump.","category":"Hydraulic and Pneumatic Systems"},
  {"term":"Horizontal Band Saw","definition":"The most accurate machine commonly used to efficiently cut square metal steel tubing.","category":"Mechanical"},
  {"term":"Chasing Die","definition":"A tool whose best use is to recut or repair damaged external threads on a bolt or shaft.","category":"Mechanical"},
  {"term":"Milling Aluminum","definition":"When milling aluminum, the mill should generally be set at a high RPM speed compared to steel.","category":"Mechanical"},
  {"term":"OEM","definition":"Original Equipment Manufacturer.","category":"Engineering Principles"},
  {"term":"Vector Addition","definition":"Combining two directional forces. E.g., A force of 10 lbs West and 25 lbs South yields a resultant force of approx 27 lbs SW.","category":"Engineering Principles"},
  {"term":"Lead-Acid Batteries","definition":"When charging, they give off dangerous, explosive hydrogen and oxygen gases.","category":"Safety"},
  {"term":"Thermocouple","definition":"The junction of two dissimilar metals that produces a voltage directly proportional to the amount of heat applied.","category":"Instrumentation and Measurement"},
  {"term":"Availability Calculation","definition":"A measure of operable uptime. For a 365-day year with 20 days of scheduled downtime, the availability is 345 days.","category":"Engineering Principles"},
  {"term":"Gantt Chart","definition":"The progression of a project displayed in chart form using horizontal bar graphs to indicate time and specific tasks.","category":"Communication"},
  {"term":"Truss Analysis Assumption","definition":"1. Truss members have no mass. 2. Members are allowed to pivot. 3. Forces are in line with the member. 4. Forces at each node balance to zero.","category":"Engineering Principles"},
  {"term":"Truss Compression vs Tension","definition":"Member in compression gets shorter and fatter (reaction force points towards the ends). Member in tension gets longer and skinnier (reaction force towards the center).","category":"Mechanical"}
];

let nextId = Math.max(...data.questions.map(q => q.id)) + 1;

const newQuestions = [
  {
    "question": "How much does one standard US gallon of water weigh?",
    "options": ["5.5 pounds", "8.3 pounds", "10.0 pounds", "14.7 pounds"],
    "correct": 1,
    "category": "Engineering Principles",
    "difficulty": "Easy",
    "explanation": "One gallon of water weighs approximately 8.34 pounds at room temperature."
  },
  {
    "question": "Which of the following designates a ferrous metal?",
    "options": ["Aluminum", "Copper", "Brass", "Mild Steel"],
    "correct": 3,
    "category": "Mechanical",
    "difficulty": "Easy",
    "explanation": "Ferrous metals contain iron. Mild steel is a common iron alloy."
  },
  {
    "question": "The resistance a metal has to being pulled apart is known as its:",
    "options": ["Compressive strength", "Tensile strength", "Shear strength", "Toughness"],
    "correct": 1,
    "category": "Mechanical",
    "difficulty": "Medium",
    "explanation": "Tensile strength measures the force required to pull something such as rope, wire, or a structural beam to the point where it breaks."
  },
  {
    "question": "Which of the following represents a nondestructive test?",
    "options": ["Tensile pull-testing until failure", "Vibration analysis", "Impact testing", "Hardness indentation testing that mars the surface"],
    "correct": 1,
    "category": "Mechanical",
    "difficulty": "Medium",
    "explanation": "Nondestructive testing (NDT), such as vibration analysis or ultrasounds, analyzes the properties of a material without causing damage."
  },
  {
    "question": "Steel reinforcing bars (rebar) are added to concrete primarily to resist the force of:",
    "options": ["Compression", "Tension", "Radiation", "Expansion"],
    "correct": 1,
    "category": "Mechanical",
    "difficulty": "Medium",
    "explanation": "Concrete has excellent compressive strength but very poor tensile strength. Rebar is added to handle tensile (pulling/stretching) loads."
  },
  {
    "question": "Gauge pressure at sea level is exactly:",
    "options": ["14.7 psi", "0 psi", "1 atmosphere", "100 psi"],
    "correct": 1,
    "category": "Hydraulic and Pneumatic Systems",
    "difficulty": "Medium",
    "explanation": "Gauge pressure uses atmospheric pressure as its zero point. Therefore, standard atmospheric pressure at sea level reads as 0 psi on a gauge."
  },
  {
    "question": "A solenoid works on the principal of:",
    "options": ["Hydraulic leverage", "Pneumatic compression", "Electromagnetic force", "Thermal expansion"],
    "correct": 2,
    "category": "Electrical",
    "difficulty": "Easy",
    "explanation": "A solenoid uses an electrical coil wound around a core to generate an electromagnetic force that mechanically moves an armature."
  },
  {
    "question": "Pneumatic directional control valves are sometimes sized just for pipe convenience. However, a more efficient method is to size them according to:",
    "options": ["The physical color of the valve", "Flow coefficient (Cv)", "The highest weight allowed", "The length of the electrical wire"],
    "correct": 1,
    "category": "Hydraulic and Pneumatic Systems",
    "difficulty": "Hard",
    "explanation": "The flow coefficient (Cv) accurately specifies the liquid/gas flow capacity of a valve, ensuring the system isn't choked by undersizing."
  },
  {
    "question": "A photo detector converts light directly into:",
    "options": ["Sound", "An electrical signal", "Pneumatic pressure", "Hydraulic fluid flow"],
    "correct": 1,
    "category": "Instrumentation and Measurement",
    "difficulty": "Easy",
    "explanation": "Photoelectric sensors detect the presence of light and translate that physical phenomena into an electrical analog or digital signal."
  },
  {
    "question": "If contaminants begin to block a fluid flow system, the first place the blockage typically negatively impacts is:",
    "options": ["The system exhaust", "The suction side of the system's pump", "The end actuator", "The outer pressure vessel"],
    "correct": 1,
    "category": "Hydraulic and Pneumatic Systems",
    "difficulty": "Medium",
    "explanation": "Filters and strainers are typically located on the pump's inlet. Contamination clogging here causes pump cavitation on the suction side."
  },
  {
    "question": "The speed of a pneumatic cylinder is affected mainly by:",
    "options": ["The compressibility of air and flow rate", "The color of the cylinder housing", "The weight of the system reservoir", "The type of oil in the neighboring hydraulic system"],
    "correct": 0,
    "category": "Hydraulic and Pneumatic Systems",
    "difficulty": "Medium",
    "explanation": "Unlike rigid hydraulics, pneumatic speed is heavily dependent on the compressibility of the gas and the flow valves restricting air entering/exiting."
  },
  {
    "question": "In a manufacturing facility, undercutting is a condition that generally occurs when:",
    "options": ["A saw blade isn't sharp enough", "The welding current is too high", "A lathe operates too slowly", "The plastic injection mold is cold"],
    "correct": 1,
    "category": "Mechanical",
    "difficulty": "Hard",
    "explanation": "Undercutting is a dangerous weld defect where too high of a welding current melts a groove into the base metal, weakening the cross-section."
  },
  {
    "question": "When milling aluminum on a standard vertical mill, the RPM speed should generally be set:",
    "options": ["Extremely low", "High", "The same as hardened steel", "Zero"],
    "correct": 1,
    "category": "Mechanical",
    "difficulty": "Medium",
    "explanation": "Aluminum is a soft metal; machining it optimally requires high spindle speeds (RPM) and fast feed rates to prevent material from galling."
  },
  {
    "question": "When a force of 10 pounds is applied to the West and a perpendicular force of 25 pounds is applied to the South, what is the approximate resultant force?",
    "options": ["35 pounds SW", "15 pounds SW", "27 pounds SW", "250 pounds SW"],
    "correct": 2,
    "category": "Engineering Principles",
    "difficulty": "Hard",
    "explanation": "Using the Pythagorean theorem (A^2 + B^2 = C^2) for vectors: 10^2 + 25^2 = C^2. 100 + 625 = 725. The square root of 725 is approximately 26.9 (27 pounds)."
  },
  {
    "question": "What is considered a positive example of corrective action in a manufacturing setting?",
    "options": ["Firing all QA staff", "A change in the maintenance procedure to prevent future failure", "Ignoring the error if it only happens once", "Hiding the defective batch"],
    "correct": 1,
    "category": "Engineering Principles",
    "difficulty": "Easy",
    "explanation": "Corrective action eliminates the root cause of an identified nonconformity to prevent recurrence, such as rewriting a flawed maintenance procedure."
  },
  {
    "question": "When storing compressed gas cylinders, it is paramount that they be chained to a rigid object and:",
    "options": ["Stored in well ventilated areas", "Kept at exactly 0 degrees F", "Stored lying flat on the floor", "Painted bright red regardless of gas type"],
    "correct": 0,
    "category": "Safety",
    "difficulty": "Medium",
    "explanation": "Cylinders must be chained upright to prevent falling and decapitating the valve, and stored in ventilated areas to prevent gas buildup if a leak occurs."
  },
  {
    "question": "When lead-acid batteries are charging, they require ventilation because they give off:",
    "options": ["Helium", "Hydrogen and oxygen gas", "Carbon monoxide", "Freon"],
    "correct": 1,
    "category": "Safety",
    "difficulty": "Hard",
    "explanation": "The charging process of a lead-acid battery electrolyzes the water in the electrolyte, releasing a highly explosive mixture of hydrogen and oxygen."
  },
  {
    "question": "When measuring a hole with a micrometer, the reading is 2.468 inches for a hole that is specified to be bored to 2.473 inches. The hole is considered to be:",
    "options": ["0.005 inch oversize", "0.005 inch undersize", "Perfectly within spec", "Routinely aligned"],
    "correct": 1,
    "category": "Instrumentation and Measurement",
    "difficulty": "Medium",
    "explanation": "2.473 (specified) - 2.468 (actual) = 0.005. Because the actual hole is smaller than the target, it is 0.005 inches undersize."
  },
  {
    "question": "The junction of two dissimilar metals that produces a voltage proportional to the amount of heat applied is a:",
    "options": ["Thermistor", "Photo-resistor", "Thermocouple", "Limit switch"],
    "correct": 2,
    "category": "Instrumentation and Measurement",
    "difficulty": "Medium",
    "explanation": "A thermocouple utilizes the Seebeck effect, creating a millivolt signal between two dissimilar metals when subjected to a temperature gradient."
  },
  {
    "question": "A commercial freezer has an internal temperature of 22 degrees F. The outside room is 78 degrees F. In which direction will the heat flow?",
    "options": ["Heat will flow out of the freezer to the room", "Heat will flow into the freezer from the surrounding room", "Heat will remain totally static", "Cold will flow out of the freezer"],
    "correct": 1,
    "category": "Mechanical",
    "difficulty": "Medium",
    "explanation": "According to the laws of thermodynamics, heat always flows from hotter regions to colder regions. Cold does not 'flow', heat simply evacuates."
  },
  {
    "question": "Which basic electrical equation demonstrates Ohm's law?",
    "options": ["R = E / I", "P = V x I", "C = A x B", "I = R x E"],
    "correct": 0,
    "category": "Electrical",
    "difficulty": "Medium",
    "explanation": "Normally V = I x R. Rearranged for Resistance: R = V/I (or R = E/I, where E is Electromotive force/Voltage)."
  },
  {
    "question": "A knitting needle and a mechanical wood splitter are physical examples of which type of simple machine?",
    "options": ["Inclined Plane", "Lever", "Wedge", "Pulley"],
    "correct": 2,
    "category": "Engineering Principles",
    "difficulty": "Easy",
    "explanation": "A wedge is an active tool used to separate two objects or portions of an object, lift an object, or hold an object in place."
  },
  {
    "question": "If a speed reducing system (like belts or gears) has a reduction ratio of 2:1, and exactly 200 RPM is input into the driver, what will the output speed be?",
    "options": ["400 RPM", "200 RPM", "100 RPM", "50 RPM"],
    "correct": 2,
    "category": "Mechanical",
    "difficulty": "Medium",
    "explanation": "A 2 to 1 reduction means the output rotates once for every two rotations of the input. 200 / 2 = 100 RPM."
  },
  {
    "question": "Using a spreadsheet for documenting data, tracking project variables, and mapping XYZ coordinates allows the engineer to:",
    "options": ["Bypass safety protocols", "Produce tables, graphs, charts, and visual formats easily", "Construct a physical 3D model", "Weld autonomously"],
    "correct": 1,
    "category": "Computer and Control Systems",
    "difficulty": "Easy",
    "explanation": "Spreadsheets aggregate raw data and visually extrapolate them into charts and graphs for project analytics and Gantt tracking."
  },
  {
    "question": "When drawing a truss vector array, a truss member reacting to being 'in tension' will experience what physical deformation?",
    "options": ["It gets shorter and fatter", "It bends at a perfect 90 degree angle", "It gets longer and skinnier", "It turns into a liquid"],
    "correct": 2,
    "category": "Mechanical",
    "difficulty": "Hard",
    "explanation": "Tension is a pulling force. When a rod is pulled from both ends, elastic deformation causes it to elongate (longer) and significantly decrease in cross-sectional diameter (skinnier)."
  }
];

newQuestions.forEach(q => {
  q.id = nextId++;
  data.questions.push(q);
});

data.flashcards.push(...newFlashcards);

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log(`Added ${newQuestions.length} questions and ${newFlashcards.length} flashcards.`);
