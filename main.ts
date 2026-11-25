// One Star for Monday — the review, assembled from its beats.
//
// The line is a single one-star restaurant review of Monday:
// a cold open (the rating), the wait, the food that never came,
// the coffee that tastes like the week ahead, and a closing bill
// that charges the customer for the weekend they just lost.
// Every beat earns its place; nothing is decoration.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const RATING = "One star.";
const VISIT = "Arrived Monday, left Monday.";
const KITCHEN = "Food never came, the coffee tasted like deadlines,";
const BILL = "and the waiter charged me for the weekend.";

const review = [RATING, VISIT, KITCHEN, BILL].join(" ");

// Gate (competition.yaml): 1-180 chars, single line, at most 25 words.
const words = review.trim().split(/\s+/);
if (review.length < 1 || review.length > 180) {
  throw new Error(`entry is ${review.length} chars, gate is 1-180`);
}
if (words.length > 25) {
  throw new Error(`entry is ${words.length} words, gate is at most 25`);
}
if (review.includes("\n") || review.trim().length === 0) {
  throw new Error("entry must be one non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), review + "\n", "utf8");
