import { homedir, EOL } from "os";
import { resolve } from "path";
import { getCurrentlyWorkingDirectory } from "./utils/pathOperations/path.js";
import { getOsHelpers } from "./utils/os/os.js";
import { calculateHash } from "./utils/hash/hash.js";
import { exec } from "child_process";
import { compress } from "./utils/compressionOperation/compress.js";
import { decompress } from "./utils/compressionOperation/decompress.js";
import { cd } from "./utils/nwd/cd.js";
import { read } from "./utils/basicOperationWithFiles/read.js";
import { add } from "./utils/basicOperationWithFiles/add.js";
import { rename } from "./utils/basicOperationWithFiles/rename.js";
import { remove } from "./utils/basicOperationWithFiles/remove.js";
import { copy } from "./utils/basicOperationWithFiles/copy.js";
import { move } from "./utils/basicOperationWithFiles/move.js";

process.on("message", async (msg) => {
  if (msg === "disconnect") {
    process.disconnect();
    return;
  }

  if (msg === "getCurrentlyWorkingDirectory") {
    process.send(getCurrentlyWorkingDirectory(homedir()));
    return;
  }

  switch (true) {
    case msg.startsWith("os "):
      process.send(getOsHelpers(msg));
      break;
    case msg.startsWith("hash "):
      const path = msg.slice(5);
      let hash;
      try {
        hash = await calculateHash(path);
      } catch {
        hash = "Operation failed";
      }
      process.send(hash);
      break;
    case msg.startsWith("ls"):
      exec(msg, (err, stdout, stderr) => {
        process.send(stdout);
        process.send(getCurrentlyWorkingDirectory(process.cwd()));
      });
      break;

    case msg.startsWith("up") || msg === `cd ..`:
      var parentDir = resolve(process.cwd(), "..");
      process.chdir(parentDir);
      process.send(getCurrentlyWorkingDirectory(process.cwd()));
      break;
    case msg.startsWith("compress"):
      const [filePath, destinationPath] = msg.slice(9).split(" ");
      await compress(filePath, destinationPath);
      break;
    case msg.startsWith("decompress"):
      const [filePathDecompress, destinationPathDecompress] = msg
        .slice(11)
        .split(" ");
      await decompress(filePathDecompress, destinationPathDecompress);
      break;
    case msg.startsWith("cd"):
      const pathForCd = msg.slice(3);
      cd(pathForCd);
      break;
    case msg.startsWith("cat "):
      const pathForRead = msg.slice(4);
      await read(pathForRead);
      break;
    case msg.startsWith("add "):
      const pathForCreate = msg.slice(4);
      add(pathForCreate);
      break;
    case msg.startsWith("rename "):
      const [pathForRename, NewFileName] = msg.slice(7).split(" ");
      rename(pathForRename, NewFileName);
      break;
    case msg.startsWith("rm "):
      const pathForRemove = msg.slice(3);
      await remove(pathForRemove);
      break;
    case msg.startsWith("cp "):
      const [pathForCopy, pathToCopy] = msg.slice(3).split(" ");
      await copy(pathForCopy, pathToCopy);
      break;
    case msg.startsWith("mv "):
      const [pathForMove, pathToMove] = msg.slice(3).split(" ");
      await move(pathForMove, pathToMove);
      break;
    default:
      process.send("Invalid input");
  }
});

process.on("error", () => {
  process.send("Operation failed");
});
