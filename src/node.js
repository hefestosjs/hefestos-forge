#!/usr/bin/env node

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const executeCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (error) {
    console.log(`Failed to execute ${command}`, error);
    return false;
  }

  return true;
};

const deleteGitFolder = (directory) => {
  const gitDirectory = path.join(directory, ".git");
  const githubDirectory = path.join(directory, ".github");

  if (fs.existsSync(gitDirectory)) execSync(`rm -rf ${gitDirectory}`);
  if (fs.existsSync(githubDirectory)) execSync(`rm -rf ${githubDirectory}`);
};

const repositoryName = process.argv[2];

const gitCloneCommand = `git clone --depth 1 https://github.com/hefestosjs/hefestos-app ${repositoryName}`;
const installDependenciesCommand = `cd ${repositoryName} && npm install`;
const initializeGitCommand = `cd ${repositoryName} && git init`;
const renameGitMainBranchCommand = `cd ${repositoryName} && git branch -M main`;

console.log(`Cloning the repository with name ${repositoryName}`);
const clonedRepository = executeCommand(gitCloneCommand);
if (!clonedRepository) process.exit();

deleteGitFolder(repositoryName);

const initializedGit = executeCommand(initializeGitCommand);
if (!initializedGit) process.exit();

const renamedMainBranch = executeCommand(renameGitMainBranchCommand);
if (!renamedMainBranch) process.exit();

console.log(`Installing dependencies for ${repositoryName}`);
const installedDependencies = executeCommand(installDependenciesCommand);
if (!installedDependencies) process.exit();

console.log("Let's start");
console.log(`cd ${repositoryName}`);
