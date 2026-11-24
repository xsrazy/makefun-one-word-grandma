// One Word From Grandma — make.fun bounty u-0xkianno-one-word-from-grandma-f04bed16
//
// The entry is exactly one word: the single word grandma would text about
// AI. The program writes that word, and nothing else, to entry.txt in the
// output directory.
//
// Gate (competition.yaml): /output/entry.txt must be UTF-8 text of 1 to 30
// characters, not only white space. No trailing newline, no punctuation,
// no commentary — the word alone, so the judge reads exactly the entry.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The word: WITCHCRAFT. Grandma's verdict on a machine that talks back,
// types essays and paints pictures is not a technical term — it is
// witchcraft, typed in all caps the way she types everything. It beats
// the candidates weighed against the judge's criteria, in their order:
//
// - ROBOT (the draft): the obvious pick, clearly about machines, but flat
//   and unfunny, and the least fresh word in the field.
// - COOKIES (food redirect): very grandma, but says nothing about AI.
// - THEGOOGLE: a classic grandma-ism, but it is about Google, not AI.
// - CHATGBT (her typo of ChatGPT): AI-tied and fresh, but a typo carries
//   no warmth and the joke needs decoding.
// - BEEPBOOP (robot sound): funny and machine-tied, but a sound effect
//   more than a word she would text.
// - SKYNET: too nerdy, not her voice. SCARY / WHAT / HUH: generic,
//   they would fit any subject at all.
//
// WITCHCRAFT is warm and a little baffled, funny with no caption, tied
// to the mysterious machine, and fresher than the obvious picks — while
// still the exact word a grandmother would send her grandchild.
const WORD = "WITCHCRAFT";

// Gate guard: one word, 1-30 characters, no whitespace at all. Fail
// loudly here rather than ever writing an invalid entry.
if (WORD.length < 1 || WORD.length > 30 || /\s/.test(WORD)) {
  throw new Error(
    `Invalid entry word (must be one word, 1-30 chars): ${JSON.stringify(WORD)}`,
  );
}

// The harness runs the program in a sandbox whose output directory is
// /output. Both env names seen across the make.fun kits are honoured so
// a local run can point elsewhere either way; a blank value falls back
// to /output.
const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR?.trim() ||
  process.env.OUTPUT_DIR?.trim() ||
  "/output";
const outputPath = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, WORD, "utf8");

// Self-verification: read the file back and confirm it holds exactly the
// word, byte for byte. A stray newline or extra byte would still pass
// the gate's length check but would change what the judge reads, so
// refuse to exit cleanly unless the file matches exactly.
const written = readFileSync(outputPath, "utf8");
if (written !== WORD) {
  throw new Error(
    `Verification failed: expected exactly ${JSON.stringify(WORD)}, got ${JSON.stringify(written)}`,
  );
}

console.log(`Wrote entry ${JSON.stringify(WORD)} to ${outputPath}`);
