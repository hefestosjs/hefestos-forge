module.exports = (plop) => {
	plop.setActionType("executeScript", (answers, config, plop) => {
		const { execSync } = require("node:child_process");

		let { runtime, repository } = answers;
		runtime = runtime.toLowerCase();

		const command = `${runtime} ./src/${runtime}.js ${repository}`;
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
};
