import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

export default function (plop) {
  plop.setActionType("executeScript", (answers) => {
    let { runtime, repository } = answers;
    runtime = runtime.toLowerCase();

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.resolve(__dirname, `./src/${runtime}.js`);
    const command = `${runtime} ${filePath} ${repository}`;

    execSync(command, { stdio: "inherit" });
  });

  plop.setGenerator("select-runtime", {
    description: "Choose the runtime to use (Node or Bun)",
    prompts: [
      {
        type: "list",
        name: "runtime",
        message: "Which runtime do you want to use?",
        choices: ["Node", "Bun"],
      },
      {
        type: "input",
        name: "repository",
        message: "What is the repository name?",
      },
    ],
    actions: [{ type: "executeScript" }],
  });
}
