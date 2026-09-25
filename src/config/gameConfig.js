// =====================================================================
//  THE LOST JEDI HOLOCRON  -  EVERYTHING YOU MIGHT WANT TO CHANGE IS HERE
// =====================================================================

// ---------- 1. CODES & GAME RULES ----------
// Change a code by editing the string. The keypad automatically gets the
// right number of slots (e.g. "12345" gives 5 slots).
export const GAME_CONFIG = {
  accessCode: "7394",   // Screen 1  - Code 1 (opens the Holocron)
  laserCode: "427",     // Screen 3  - Code 2 (found under "the fallen one")
  yodaAnswer: "JEDI",   // Screen 4  - letters only, not case sensitive
  finalCode: "7492",    // Screen 6  - Final Holocron code
  timeLimitSeconds: 20 * 60,
  amberAtSeconds: 5 * 60,   // timer turns amber
  redAtSeconds: 2 * 60,     // timer turns red + "LINK UNSTABLE"
  startingScore: 100,
};

// The "TRIAL RECORD" on the final screen is built from the digits of
// finalCode, in order (7492 -> 07 / 04 / 09 / 02). Change finalCode and this
// updates itself. Rename the rows here if you like.
export const TRIAL_NAMES = ["TEMPLE", "BLASTER", "YODA", "FORCE"];
export const TRIAL_RECORD = TRIAL_NAMES.map((name, i) => [
  name, GAME_CONFIG.finalCode[i] ? GAME_CONFIG.finalCode[i].padStart(2, "0") : "--",
]);

// Hint costs shown in the organizer panel
export const HINT_COSTS = [
  { label: "SMALL HINT", cost: 5 },
  { label: "STRONG HINT", cost: 10 },
  { label: "SOLUTION", cost: 20 },
  { label: "DEMONSTRATE", cost: 25 },
];

// Force formation: 9 floor tiles, 1 = someone stands here. Default = a "Y".
export const FORCE_PATTERN = [
  1, 0, 1,
  0, 1, 0,
  0, 1, 0,
];

// ---------- 2. BACKGROUNDS ----------
// Replace the files in /public/assets/backgrounds with your own (same names),
// or point src somewhere else.
//   position : which part of the picture stays visible on the iPad's 4:3 screen
//              ("0% 50%" = keep the left edge, "100% 50%" = keep the right edge)
//   fadeMs   : how slowly this picture fades in
export const BACKGROUNDS = {
  start:   { src: "/assets/backgrounds/start.jpg",   position: "42% 50%" },
  temple:  { src: "/assets/backgrounds/temple.jpg",  position: "35% 50%" },
  laser:   { src: "/assets/backgrounds/laser.jpg",   position: "30% 50%" },
  yoda:    { src: "/assets/backgrounds/yoda.jpg",    position: "22% 50%" },
  force:   { src: "/assets/backgrounds/force.jpg",   position: "45% 50%" },
  final:   { src: "/assets/backgrounds/final.jpg",   position: "60% 50%" },
  victory: { src: "/assets/backgrounds/victory.jpg", position: "25% 50%", fadeMs: 7000 },
};

// ---------- 3. CHARACTER (your yoda.png) ----------
// null = hidden on that screen. width is in rem (about 16px each on an iPad).
export const CHARACTERS = { yoda: "/assets/characters/yoda.png" };
export const CHARACTER_PLACEMENTS = {
  start:   { position: "bottom-left",  width: 9,  opacity: 0.28 },
  yoda:    null,   // the Yoda background already has Yoda in it - set to e.g. { position: "bottom-left", width: 12, opacity: 0.9 } to add yours
  victory: { position: "bottom-right", width: 10, opacity: 0.32 },
};

// ---------- 4. SOUNDS ----------
// Swap the mp3 files (same names) or change the paths.
//   volume    : 1 = as recorded. Can go above 1 to boost quiet files.
//   loop      : repeat forever
//   stream    : for LONG files - streamed instead of loaded into memory
//   maxMs     : cut the sound off after this many ms (with a fade out)
//   fadeInMs / fadeOutMs : fades
//   stopAmbient : silence the background loop when this plays
// Your current file lengths: click 0.16s, error 1.6s, success 2.8s,
// transition 5.3s (trimmed below), ambient 90s (looped), victory 5m46s.
export const SOUNDS = {
  ambient:    { file: "/assets/sounds/ambient.mp3",    volume: 6,   loop: true, stream: true, fadeInMs: 4000 }, // very quiet file (-47 dB) so it is boosted
  click:      { file: "/assets/sounds/click.mp3",      volume: 0.55 },
  error:      { file: "/assets/sounds/error.mp3",      volume: 0.8 },
  success:    { file: "/assets/sounds/success.mp3",    volume: 0.8 },
  transition: { file: "/assets/sounds/transition.mp3", volume: 0.55, maxMs: 2600, fadeOutMs: 1000 },
  victory:    { file: "/assets/sounds/victory.mp3",    volume: 0.8, stream: true, fadeInMs: 1500, stopAmbient: true },
  // Plays once per second once the clock drops below amberAtSeconds (see App.jsx). Kept quiet on purpose.
  tick:       { file: "/assets/sounds/tick.mp3",       volume: 0.15 },
};

// ---------- 5. TINY TECHNICAL TEXT (bottom-left of every screen) ----------
export const SCREEN_META = [
  ["TEMPLE NETWORK", "SIGNAL: CORRUPTED"],
  ["ARCHIVE ID: JTA-07", "FORCE CHANNEL: ACTIVE", "SECURITY: JEDI"],
  ["DEFLECTION PROTOCOL", "MIRROR ARRAY: READY", "TARGET LOCK: PENDING"],
  ["IDENTITY ARCHIVE", "SUBJECT: UNKNOWN", "ARCHIVE INTEGRITY: 83%"],
  ["FORCE ALIGNMENT", "PATTERN MEMORY", "SEQUENCE: \u25AE \u25AE \u25AE \u25AE \u25AE"],
  ["HOLOCRON ACCESS", "TRIALS COMPLETE: 4 / 4", "SEAL: PENDING"],
  ["HOLOCRON UNSEALED", "SURVIVAL PROTOCOL: COMPLETE"],
];
