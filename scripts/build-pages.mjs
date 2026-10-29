import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(repoRoot, "dist", "public");

execFileSync("pnpm", ["exec", "vite", "build", "--base=./"], {
  cwd: repoRoot,
  stdio: "inherit",
});

if (!existsSync(path.join(outputDir, "index.html"))) {
  throw new Error("Vite did not produce dist/public/index.html");
}

for (const entry of ["assets", "api", "manus-routes.json", "index.html"]) {
  const source = path.join(outputDir, entry);
  const destination = path.join(repoRoot, entry);
  rmSync(destination, { recursive: true, force: true });
  cpSync(source, destination, { recursive: true });
}

const indexPath = path.join(repoRoot, "index.html");
let indexHtml = readFileSync(indexPath, "utf8");
indexHtml = indexHtml.replace('src="/api/platform/config.js"', 'src="./api/platform/config.js"');
writeFileSync(indexPath, indexHtml);
writeFileSync(path.join(repoRoot, ".nojekyll"), "");
mkdirSync(path.join(repoRoot, "api", "platform"), { recursive: true });

console.log("GitHub Pages static bundle exported to repository root.");
