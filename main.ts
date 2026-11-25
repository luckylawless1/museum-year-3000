// Museum of the Year 3000 — entry program.
//
// Writes the museum label for a parking meter, as displayed in the year 3000,
// to /output/entry.txt.
//
// Joke logic: the label is a deadpan curatorial misreading. A parking meter
// really did take coins in exchange for time, so the curator's shrine
// reading — citizens feeding it coins and praying for more time — is true
// and absurd at once, and the flat closer ("It never forgave anyone")
// trusts the reader to get it without explaining the joke. The "c. 2024"
// date and the short, confident sentences keep it in real museum-label
// voice, and the parking meter is a fresher object than the obvious first
// pick (the plastic fork).
//
// No network, no secrets, no reading of other entries; stdlib only.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LABEL =
  "Parking Meter, c. 2024. Citizens fed it coins and prayed for more time. It never forgave anyone.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

// The sealed gate requires UTF-8 text of 1 to 200 characters, not only
// white space, on a single line. Fail loudly here rather than shipping a
// file the gate would refuse.
if (LABEL.length < 1 || LABEL.length > 200) {
  throw new Error(`label must be 1-200 characters, got ${LABEL.length}`);
}
if (LABEL.trim().length === 0) {
  throw new Error("label must not be only white space");
}
if (LABEL.includes("\n") || LABEL.includes("\r")) {
  throw new Error("label must be a single line");
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, LABEL, "utf8");

// Read back and re-check what actually landed on disk.
const written = readFileSync(OUT_FILE, "utf8");
if (written !== LABEL) {
  throw new Error("output file does not match the label");
}
