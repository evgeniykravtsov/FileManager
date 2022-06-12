import { unlink } from "fs/promises";
import { getNormalizePath } from "../pathOperations/getNormalizePath.js";

export const remove = async (path) => {
  try {
    const normalizePath = getNormalizePath(path);

    unlink(normalizePath);
  } catch {
    console.log("Operation failed");
  }
};
