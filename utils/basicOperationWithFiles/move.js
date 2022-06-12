import { copyFile } from "fs/promises";
import { join } from "path";
import { getNormalizePath } from "../pathOperations/getNormalizePath.js";
import { checkFileDestinationPath } from "../pathOperations/checkFileDestinationPath.js";
import { remove } from "./remove.js";

export const move = async (oldPath, newPath) => {
  try {
    const normilizeFilePath = getNormalizePath(oldPath);
    const normilizeDestinationPath = checkFileDestinationPath(newPath);

    await copyFile(join(normilizeFilePath), join(normilizeDestinationPath));
    await remove(oldPath);
  } catch {
    console.log("Operation failed");
  }
};
