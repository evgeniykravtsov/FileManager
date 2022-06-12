import { writeFile } from "fs";

export const add = async (fileName) => {
  try {
    writeFile(fileName, "", () => {});
  } catch (e) {
    console.log("Operation failed");
  }
};
