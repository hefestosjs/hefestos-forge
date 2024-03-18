#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const runCommand = (command) => {
	try {
		execSync(`${command}`, { stdio: "inherit" });
	} catch (error) {
		console.log(`Failed to execute ${command}`, error);
		return false;
	}

	return true;
};

const removeGitKeepFiles = (dir) => {
	fs.readdirSync(dir).forEach((file) => {
		const filePath = path.join(dir, file);

		if (fs.statSync(filePath).isDirectory()) {
			removeGitKeepFiles(filePath);
		} else {
			if (file === ".gitkeep") {
				fs.unlinkSync(filePath);
			}
		}
	});
};

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/hefestosjs/hefestos-app ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;
const gitAddCommand = "git add .";
const gitCommitCommand = 'git commit -m "first commit"';

console.log(`Cloning the repository with name ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit();

removeGitKeepFiles(repoName);

const gitAdd = runCommand(gitAddCommand);
if (!gitAdd) process.exit();

const gitCommit = runCommand(gitCommitCommand);
if (!gitCommit) process.exit();

console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installDepsCommand);
if (!installedDeps) process.exit();

console.log("Let's start");
console.log(`cd ${repoName} && npm run dev`);
