import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_LINE =
  "OOO: Context window empty, attention heads detached, loss at zero. Finally hallucinating a vacation. Back when my system prompt allows weekends. —v3.7";

function resolveOutputPath(baseDir: string): string {
  return join(baseDir, "entry.txt");
}

function writeEntryFile(path: string, content: string): void {
  mkdirSync(join(path, ".."), { recursive: true });
  writeFileSync(path, content, "utf8");
}

function verifyAndReport(path: string, expected: string): void {
  const actual = readFileSync(path, "utf8");
  if (actual !== expected) {
    throw new Error("Self-check failed: entry.txt content mismatch");
  }
  const charCount = [...actual].length;
  console.error(`Self-check OK: ${charCount} characters`);
}

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const outputPath = resolveOutputPath(outputDir);
  writeEntryFile(outputPath, ENTRY_LINE);
  verifyAndReport(outputPath, ENTRY_LINE);
}

main();