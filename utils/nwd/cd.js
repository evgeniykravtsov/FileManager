import { getNormalizePath } from "../pathOperations/getNormalizePath.js";
import { getCurrentlyWorkingDirectory } from "../pathOperations/path.js";

export const cd = (path) => {
  try {
    const normalizePath = getNormalizePath(path);
    process.chdir(normalizePath);
    process.send(getCurrentlyWorkingDirectory(process.cwd()));
  } catch (e) {
    console.log("Operation failed");
  }
};
