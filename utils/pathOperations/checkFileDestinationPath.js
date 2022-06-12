import { existsSync } from "fs";
import { isAbsolute, resolve } from "path";

export const checkFileDestinationPath = (path) => {
  let correctPath = isAbsolute(path) ? path : resolve(path);
  if (existsSync(correctPath)) {
    throw error;
  }
  return correctPath;
};
