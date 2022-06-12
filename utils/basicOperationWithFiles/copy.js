import { copyFile } from "fs/promises";
import { join } from "path";
import { getNormalizePath } from "../pathOperations/getNormalizePath.js";
import { checkFileDestinationPath } from "../pathOperations/checkFileDestinationPath.js";
export const copy = async (oldPath, newPath) => {
  try {
    const normilizeFilePath = getNormalizePath(oldPath);
    const normilizeDestinationPath = checkFileDestinationPath(newPath);

    await copyFile(join(normilizeFilePath), join(normilizeDestinationPath));
  } catch {
    console.log("Operation failed");
  }
};
