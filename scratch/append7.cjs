const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/mechatronicsData.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const newFlashcards = [
  {"term":"Journal Bearing","definition":"A plain bearing consisting of a tube or sleeve that supports a rotating shaft.","category":"Mechanical"},
  {"term":"Sintered Bronze Bearing Installation","definition":"When installing a sintered bronze bearing, it is necessary to align the oil groove with the oil cup in the housing.","category":"Mechanical"},
  {"term":"Plain Bearing Specifications","definition":"Typically described by four features: manufacturer's code, bore, outside diameter, and length.","category":"Mechanical"},
  {"term":"Plain Bearing Lubrication Rule","definition":"A general rule of thumb is heavier oils or grease are recommended for high loads and low speeds.","category":"Mechanical"},
  {"term":"Type 1 Bearing Groove Purpose","definition":"The purpose of the groove is to spread oil uniformly over the surface of the bearing so it does not gall.","category":"Mechanical"},
  {"term":"Plain Bearing Dirt Maintenance","definition":"The best solution for dirt in a plain bearing is usually to remove the source of the dirt or use a different sealed type of bearing.","category":"Mechanical"},
  {"term":"Bearing PV Factor","definition":"An indication of its load carrying ability in a plain bearing material. P = pressure, V = velocity.","category":"Mechanical"},
  {"term":"Bearing","definition":"A device that reduces friction between two surfaces while supporting a load.","category":"Mechanical"},
  {"term":"Babbitt","definition":"A soft bearing alloy consisting primarily of tin, lead, and antimony.","category":"Mechanical"},
  {"term":"Shaft Clearance","definition":"In a plain bearing installation, it is the difference between the shaft diameter and the bearing inside bore.","category":"Mechanical"},
  {"term":"Oil Cup","definition":"On a plain bearing system, oil can be applied directly to components or into an oil cup attached directly to the bearing.","category":"Mechanical"},
  {"term":"Plain Bearing Assembly Components","definition":"The four basic components are: bearing, bearing housing, journal, and lubricant.","category":"Mechanical"},
  {"term":"Fatigue Resistance (Bearing)","definition":"The ability of the bearing to withstand repeated application of stress and strain.","category":"Mechanical"},
  {"term":"Bearing Troubleshooting Table","definition":"An aid that lists faults, probable causes, and corrective actions.","category":"Mechanical"},
  {"term":"Arbor Press (Plain Bearing)","definition":"The best way to install a plain bearing into a bearing housing ensuring even, steady pressure.","category":"Mechanical"},

  {"term":"Phenolic Fumes Inhalation","definition":"If you inhale phenolic fumes/resins, it usually results in trouble breathing and respiratory distress.","category":"Safety"},
  {"term":"Electrical Fire Extinguisher","definition":"A Class C fire extinguisher should be used on an electrical fire.","category":"Safety"},
  {"term":"OSHA","definition":"Occupational Safety and Health Administration.","category":"Safety"},
  {"term":"Orthographic Drawing","definition":"Represents a three-dimensional object using several two-dimensional views of the object (front, top, side).","category":"Engineering Principles"},
  {"term":"Linear Dimensions","definition":"Usually expressed in decimal or fractional units.","category":"Instrumentation and Measurement"},
  {"term":"Filled Triangle (Fluid Power)","definition":"Represents hydraulic fluid flow in a schematic diagram.","category":"Hydraulic and Pneumatic Systems"},
  {"term":"Improper Torque Effects","definition":"If bolts and nuts are not properly torqued, they wear out wildly quickly and can cause catastrophic failure.","category":"Mechanical"},
  {"term":"Lockout/Tagout (LOTO)","definition":"A safety practice used to prevent equipment from being energized. Extremely vital when working on Electrical, Fluid Power, and Mechanical systems.","category":"Safety"},
  {"term":"Safety Data Sheet (SDS) Elements","definition":"Provides info about handling, storage, first aid, stability, and reactivity. Must be provided by chemical manufacturers.","category":"Safety"},
  {"term":"Title Block Fact","definition":"The format of technical title blocks is NOT the same from company to company. Formats vary wildly.","category":"Engineering Principles"},
  {"term":"NFPA 70E","definition":"A regulation that provides specific guidelines and details for electrical safety in the workplace.","category":"Safety"},
  {"term":"GFCI Devices Purpose","definition":"To prevent a person from being electrocuted by detecting dangerous ground faults.","category":"Safety"},
  {"term":"Electrical Injury Response","definition":"Move an electrocuted person ONLY if in immediate danger. If actively attached to a live circuit, first SHUT OFF the circuit.","category":"Safety"},
  {"term":"Workplace Physical Hazards","definition":"Includes slipping hazards, slippery floors, and cluttered walkways.","category":"Safety"},
  {"term":"Torque Wrench","definition":"A tool used to explicitly measure the turning force when tightening a fastener.","category":"Instrumentation and Measurement"},
  {"term":"Technical Report Abstract","definition":"The specific section of a technical report which summarizes the report's overall contents.","category":"Communication"},
  {"term":"Thick Line in Schematic","definition":"Represents the main flow of current or heavy power circuitry.","category":"Electrical"},

  {"term":"Temperature Mounting (Freezing/Heating)","definition":"A method used to install a bearing into a housing by shrinking or expanding races respectively.","category":"Mechanical"},
  {"term":"Drift Plate Alignment","definition":"In a bearing press kit, the specific lip helps to closely align the drift plate to the cup during tightening.","category":"Mechanical"},
  {"term":"Arbor Press (Roller)","definition":"Using an arbor press to install a bearing on a shaft results in perfectly even pressure being applied to the bearing race.","category":"Mechanical"},
  {"term":"Replacement Bore Check","definition":"The inner bore of a replacement bearing must be actively measured to affirm it will fit on the shaft.","category":"Mechanical"},
  {"term":"Cylindrical Roller Bearings","definition":"The highest speed roller bearings available.","category":"Mechanical"},
  {"term":"Tapered Roller Bearing Adjustment","definition":"Must be adjusted because the adjusting determines the structural play between the two parts of the bearing.","category":"Mechanical"},
  {"term":"Tapered Bearing Heat Expansion","definition":"When using the direct method of mounting tapered roller bearings, the end play must be checked because it will increase as the shaft heats up.","category":"Mechanical"},
  {"term":"Methods to Pack Grease","definition":"Two major methods used to pack a bearing with grease are utilizing a bearing packer and intricate hand packing.","category":"Mechanical"},
  {"term":"Roller Cage","definition":"The structural component that neatly separates the rollers in an antifriction bearing, allowing them to turn freely.","category":"Mechanical"},
  {"term":"Direct Mounting (Tapered)","definition":"The specified method of mounting tapered roller bearings that carefully places the backs of the bearing cups together.","category":"Mechanical"},
  {"term":"Cup Follower Retaining","definition":"A method of firmly retaining a tapered roller bearing that presses tightly against the cup of the bearing.","category":"Mechanical"},
  {"term":"Inner Race Support","definition":"When using the basic hammer and driver method to remove a roller bearing, the inner race must remain robustly supported.","category":"Mechanical"},
  {"term":"Heating Bearing Limit","definition":"A bearing should NEVER be heated to a temperature exceeding 120°C (250°F) unless explicitly defined by the bearing manufacturer.","category":"Mechanical"},
  {"term":"Bearing Separator","definition":"A precision tool actively used with a push-puller to cleanly and safely remove bearings.","category":"Mechanical"},
  {"term":"Press Kit Sleeve","definition":"A bearing press kit actively includes a hollow sleeve which provides space for the bearing to seamlessly come out of the housing during removal.","category":"Mechanical"},
  {"term":"Fafnir Locknut","definition":"A highly specific type of locknut that strictly requires a groove to be cut deeply into the shaft.","category":"Mechanical"},
  {"term":"Tapered Bearing Widths","definition":"The three specified widths to detail a tapered roller bearing are overall width, cone width, and precise cup width.","category":"Mechanical"},
  {"term":"Slide-Hammer Extraction","definition":"An internal bearing removal method that routinely utilizes a sharp upward hammering motion to carefully extract a bearing cup from a housing.","category":"Mechanical"}
];


data.flashcards.push(...newFlashcards);

let nextId = Math.max(...data.questions.map(q => parseInt(q.id))) + 1;
if(isNaN(nextId)) nextId = 1500;
let added = 0;

// Re-run the programmatic generation specifically for the new cards
newFlashcards.forEach(fc => {
  let pool = data.flashcards.filter(f => f.category === fc.category && f.term !== fc.term);
  if (pool.length < 3) {
    pool = data.flashcards.filter(f => f.term !== fc.term);
  }
  
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const distractors = pool.slice(0, 3).map(f => f.term);
  let options = [fc.term, ...distractors];
  
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
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log(`Successfully added ${newFlashcards.length} flashcards and generated ${added} matching quiz questions programmatically.`);
