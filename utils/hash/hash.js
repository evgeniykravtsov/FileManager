import * as fs from "fs";
import { getNormalizePath } from "../pathOperations/getNormalizePath.js";
import { createHash } from "crypto";
export const calculateHash = async (path) => {
  return new Promise((resolve, reject) => {
    let correctPath = getNormalizePath(path);

    const hash = createHash("sha256");
    const stream = fs.createReadStream(correctPath);
    stream.on("error", (err) => reject("Operation failed"));
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolve(hash.digest("hex")));
  });
};
