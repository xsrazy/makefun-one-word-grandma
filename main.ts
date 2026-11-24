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

// Draft word: the plain, obvious one. Grandma sees AI news and texts
// "ROBOT" — short, all caps the way she types, and unmistakably about
// machines. It is the safe first pick; the final word gets weighed
// against the funnier candidates before the entry is frozen.
const WORD = "ROBOT";

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
