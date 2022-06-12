import * as fs from "fs";
import { createBrotliCompress } from "zlib";
import { getNormalizePath } from "../pathOperations/getNormalizePath.js";
import { checkFileDestinationPath } from "../pathOperations/checkFileDestinationPath.js";

export const compress = async (filePath, destinationPath) => {
  try {
    const normilizeFilePath = getNormalizePath(filePath);
    const normilizeDestinationPath = checkFileDestinationPath(
      destinationPath
    );

    const compressFile = fs.createReadStream(normilizeFilePath);
    const out = fs.createWriteStream(normilizeDestinationPath);

    const brotli = createBrotliCompress();

    compressFile.pipe(brotli).pipe(out);
  } catch {
    console.log("Operation failed");
  }
};
