/**
 * Data structures, key-finger mappings, and training datasets for TypeBrush Typing Gym.
 */

export const QWERTY_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";"],
  ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
  ["Space"]
];

export const KEY_FINGER_MAP = {
  Q: { finger: "Left Pinky", row: "Top Row", hand: "Left" },
  W: { finger: "Left Ring", row: "Top Row", hand: "Left" },
  E: { finger: "Left Middle", row: "Top Row", hand: "Left" },
  R: { finger: "Left Index", row: "Top Row", hand: "Left" },
  T: { finger: "Left Index", row: "Top Row", hand: "Left" },
  Y: { finger: "Right Index", row: "Top Row", hand: "Right" },
  U: { finger: "Right Index", row: "Top Row", hand: "Right" },
  I: { finger: "Right Middle", row: "Top Row", hand: "Right" },
  O: { finger: "Right Ring", row: "Top Row", hand: "Right" },
  P: { finger: "Right Pinky", row: "Top Row", hand: "Right" },

  A: { finger: "Left Pinky", row: "Home Row", hand: "Left" },
  S: { finger: "Left Ring", row: "Home Row", hand: "Left" },
  D: { finger: "Left Middle", row: "Home Row", hand: "Left" },
  F: { finger: "Left Index", row: "Home Row", hand: "Left" },
  G: { finger: "Left Index", row: "Home Row", hand: "Left" },
  H: { finger: "Right Index", row: "Home Row", hand: "Right" },
  J: { finger: "Right Index", row: "Home Row", hand: "Right" },
  K: { finger: "Right Middle", row: "Home Row", hand: "Right" },
  L: { finger: "Right Ring", row: "Home Row", hand: "Right" },
  ";": { finger: "Right Pinky", row: "Home Row", hand: "Right" },

  Z: { finger: "Left Pinky", row: "Bottom Row", hand: "Left" },
  X: { finger: "Left Ring", row: "Bottom Row", hand: "Left" },
  C: { finger: "Left Middle", row: "Bottom Row", hand: "Left" },
  V: { finger: "Left Index", row: "Bottom Row", hand: "Left" },
  B: { finger: "Left Index", row: "Bottom Row", hand: "Left" },
  N: { finger: "Right Index", row: "Bottom Row", hand: "Right" },
  M: { finger: "Right Index", row: "Bottom Row", hand: "Right" },
  ",": { finger: "Right Middle", row: "Bottom Row", hand: "Right" },
  ".": { finger: "Right Ring", row: "Bottom Row", hand: "Right" },
  "/": { finger: "Right Pinky", row: "Bottom Row", hand: "Right" },

  Space: { finger: "Thumbs", row: "Space Bar", hand: "Both" }
};

export const FINGER_COLOR_MAP = {
  "Left Pinky": "finger-purple",
  "Left Ring": "finger-blue",
  "Left Middle": "finger-teal",
  "Left Index": "finger-emerald",
  "Right Index": "finger-amber",
  "Right Middle": "finger-rose",
  "Right Ring": "finger-indigo",
  "Right Pinky": "finger-pink",
  Thumbs: "finger-slate"
};

export const FINGER_KEYS_LIST = {
  "Left Pinky": ["Q", "A", "Z"],
  "Left Ring": ["W", "S", "X"],
  "Left Middle": ["E", "D", "C"],
  "Left Index": ["R", "F", "V", "T", "G", "B"],
  "Right Index": ["Y", "H", "N", "U", "J", "M"],
  "Right Middle": ["I", "K", ","],
  "Right Ring": ["O", "L", "."],
  "Right Pinky": ["P", ";", "/"],
  Thumbs: ["Space"]
};

// Word lists focused on practicing specific target keys
export const WEAK_KEYS_WORDS = {
  Q: ["quick", "quiet", "queen", "quote", "equip", "squad", "equal", "squat", "quill", "quest"],
  W: ["water", "world", "window", "white", "write", "power", "sweet", "swing", "crown", "tower"],
  E: ["every", "speed", "enter", "green", "steel", "peace", "wheel", "greet", "breeze", "screen"],
  R: ["river", "right", "green", "great", "train", "round", "storm", "drive", "frost", "forest"],
  T: ["train", "trust", "state", "truth", "taste", "street", "total", "bottom", "target", "start"],
  Y: ["young", "yesterday", "every", "style", "layer", "reply", "story", "yellow", "array", "entry"],
  U: ["sugar", "usual", "sound", "round", "group", "cloud", "count", "proud", "ground", "focus"],
  I: ["inside", "light", "shine", "point", "voice", "build", "skill", "quick", "spirit", "white"],
  O: ["open", "door", "book", "look", "room", "tool", "good", "mood", "boot", "cook", "moon"],
  P: ["paper", "drop", "jump", "leap", "point", "space", "loop", "map", "shape", "slope", "speed"],
  A: ["apple", "grace", "place", "state", "brave", "paint", "flame", "space", "stair", "trail"],
  S: ["speed", "skill", "start", "space", "stone", "storm", "smile", "spark", "shine", "sweet"],
  D: ["drive", "dream", "cloud", "round", "ground", "sound", "board", "blade", "order", "build"],
  F: ["front", "frost", "frame", "flame", "flash", "focus", "force", "fresh", "swift", "brief"],
  G: ["green", "great", "group", "ground", "grace", "guard", "guide", "light", "bright", "angle"],
  H: ["heart", "house", "light", "white", "shine", "share", "catch", "bench", "depth", "earth"],
  J: ["jump", "join", "joke", "judge", "juice", "jungle", "journey", "joyful", "object", "project"],
  K: ["key", "kind", "keep", "know", "think", "spark", "shake", "break", "track", "check"],
  L: ["light", "large", "flame", "clear", "cloud", "slide", "bloom", "world", "pulse", "style"],
  Z: ["zone", "zero", "size", "maze", "prize", "freeze", "hazard", "puzzle", "quiz", "blaze"],
  X: ["exact", "extra", "index", "relax", "matrix", "prefix", "suffix", "complex", "fixed", "boxer"],
  C: ["clean", "clear", "circle", "catch", "crack", "topic", "action", "sector", "screen", "pulse"],
  V: ["value", "voice", "vivid", "river", "drive", "brave", "event", "cover", "heavy", "silver"],
  B: ["brave", "build", "board", "bloom", "bright", "breeze", "table", "cable", "label", "globe"],
  N: ["night", "sound", "paint", "stone", "green", "shine", "clean", "front", "brain", "plain"],
  M: ["music", "flame", "storm", "dream", "charm", "model", "smart", "climb", "stamp", "stream"]
};

// Finger Training Drills
export const FINGER_DRILLS = {
  "Left Pinky": [
    { title: "Left Pinky Warmup", text: "aqua quiz quest zone amaze Equal quote squall piazza azure" },
    { title: "Left Pinky Endurance", text: "all zoo aqua maze equal quiz apex area zeal squad plaza" }
  ],
  "Left Ring": [
    { title: "Left Ring Precision", text: "swim wax wolf sweet extra west silver window relax fix" },
    { title: "Left Ring Speed", text: "small water index swing box wax world fixed sweet extra" }
  ],
  "Left Middle": [
    { title: "Left Middle Rhythm", text: "deck code trace decide center secret direct circle clear cedar" },
    { title: "Left Middle Flow", text: "rice exact voice slice cedar force space screen deck check" }
  ],
  "Left Index": [
    { title: "Left Index Key Mastery", text: "train frog grave raft front brave craft grand grant trust" },
    { title: "Left Index Combination", text: "breeze tiger target forest ground brave vibrant gravity swift" }
  ],
  "Right Index": [
    { title: "Right Index Mastery", text: "jump hunt month drum turn human youth junior night high" },
    { title: "Right Index Speed Drill", text: "young humor unique return thunder rhythm harm mount join" }
  ],
  "Right Middle": [
    { title: "Right Middle Keys", text: "like kind link kick sink pick smile white think strike" },
    { title: "Right Middle Precision", text: "skill climb knife spark focus quick build drink pink milk" }
  ],
  "Right Ring": [
    { title: "Right Ring Keys", text: "look door pool open solo floor scroll gold solid color" },
    { title: "Right Ring Fluidity", text: "stone slope loop bloom gloss frost spoon cross glow polar" }
  ],
  "Right Pinky": [
    { title: "Right Pinky Edge Drill", text: "paper drop slope Loop shape cap top trap group crisp" },
    { title: "Right Pinky Punctuation", text: "drop point type; jump; loop; map; cap; sharp; steep;" }
  ],
  Thumbs: [
    { title: "Space Bar Timing", text: "the sun set over the sea while smooth waves hit the shore" },
    { title: "Space Rhythm Drill", text: "keep a steady rhythm with clear spacing between all words" }
  ]
};

// Key Pairs Training
export const KEY_PAIRS_DRILLS = {
  th: { pair: "th", text: "the path math length truth booth worth earth healthy breath weather together" },
  he: { pair: "he", text: "here hero help heart heavy shelf fresh theme sheet wheel sphere height" },
  in: { pair: "in", text: "inside input point shine main rain train brain winter sprint violin" },
  er: { pair: "er", text: "water paper sister river silver winter power letter border super driver" },
  an: { pair: "an", text: "plant dance stand brand giant blank panel angle planar oceanic band" },
  re: { pair: "re", text: "read real reach reward result return report record react reform retain" },
  on: { pair: "on", text: "icon iron lion song long strong stone front month wagon dragon" },
  at: { pair: "at", text: "path chat flat plate water state battle scatter native natural pattern" },
  en: { pair: "en", text: "enter event energy engine silent screen momentum center talent open" },
  nd: { pair: "nd", text: "land hand stand brand sound round friend ground blend island mind" }
};

// Number Exercises
export const NUMBER_DRILLS = [
  { id: "num-basic", title: "Basic Digits 0-9", text: "12345 67890 10293 84756 50493 82716 19283 74650 90817" },
  { id: "num-financial", title: "Financial & Amounts", text: "100 2500 4999 12500 98.50 149.99 2026 50000 75.25 1000" },
  { id: "num-data-codes", title: "Data Entry Codes", text: "90210 10001 80302 94103 40219 75001 60601 30301 02108" },
  { id: "num-sequences", title: "Numeric Sequences", text: "1024 2048 4096 8192 16384 32768 65536 131072 262144" }
];

// Symbol Exercises
export const SYMBOL_DRILLS = {
  shift: { title: "Shift Symbols (!@#$%^&*)", text: "hello! world@email #hashtag $100 50% 2^8 Tom&Jerry 8*5 (notes)" },
  brackets: { title: "Brackets & Chevrons ([ ] { } < >)", text: "[1, 2, 3] {name: 'value'} <html> <div> array[0] fn() <key>" },
  punctuation: { title: "Punctuation & Slashes (, . ; : ? ! - /)", text: "ready, set, go; fast: smooth? yes! top-tier item/route total = 100;" }
};

// Speed Burst Drills (Short, fast text)
export const SPEED_BURST_DRILLS = [
  { id: "sb-15", duration: 15, title: "15-Second Sprint", text: "The quick brown fox jumps over the lazy dog with incredible velocity and smooth speed." },
  { id: "sb-30", duration: 30, title: "30-Second Sprint", text: "Building high typing speed requires consistent posture, relaxed hands, and daily finger movement drills across the keyboard." }
];
