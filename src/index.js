#!/usr/bin/env node

const { execSync } = require("node:child_process");
const args = process.argv.slice(2);

const isCommandAvailable = (command) => {
  try {
    execSync(`command -v ${command}`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
};

const runtime = isCommandAvailable("node") ? "bunx" : "npx";
const fullCommand = `${runtime} plop ${args.join(" ")}`;

try {
  execSync(fullCommand, { stdio: "inherit", shell: true });
} catch (error) {
  process.exit(1);
}
