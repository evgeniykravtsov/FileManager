import * as fs from "fs";
import { getNormalizePath } from "../pathOperations/getNormalizePath.js";

export const read = async (path) => {
  try {
    const pathFileForRead = getNormalizePath(path);
    const readableStream = fs.createReadStream(pathFileForRead, "utf8");

    readableStream.on("error", function () {
      console.log("Operation failed");
    });

    readableStream.on("data", (chunk) => {
      console.log(chunk);
    });
  } catch {
    console.log("Operation failed");
  }
};
