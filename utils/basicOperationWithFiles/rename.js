import { rename as renameFs } from "fs/promises";

import { getNormalizePath } from "../pathOperations/getNormalizePath.js";

export const rename = async (wrongName, goodName) => {
  try {
    const normalizePath = getNormalizePath(wrongName);

    await renameFs(normalizePath, goodName);
  } catch {
    console.log("Operation failed");
  }
};
