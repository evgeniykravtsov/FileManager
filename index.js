import * as readline from "readline";
import { homedir } from "os";
import { fork } from "child_process";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let userName = "";
try {
  userName = process.argv.slice(2)[0].split("=")[1] || "Unknown user";
} catch {
  userName = "Unknown user";
}

const childProcess = fork(process.cwd() + "/forkedProcess.js", {
  cwd: homedir(),
});

childProcess.on("spawn", () => {
  console.log(`Welcome to the File Manager, ${userName}!`);
  childProcess.send("getCurrentlyWorkingDirectory");
});

childProcess.on("message", (msg) => {
  console.log(msg);
});

const goodbyeText = `Thank you for using File Manager, ${userName}!`;

rl.on("close", (_) => {
  console.log(goodbyeText);
  childProcess.send("disconnect");
});

rl.on("line", (line) => {
  if (line.startsWith(".exit")) {
    console.log(goodbyeText);
    childProcess.send("disconnect");

    process.exit();
  }

  childProcess.send(line);
});
