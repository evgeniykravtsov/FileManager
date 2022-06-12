import { EOL, cpus, homedir, hostname, arch } from "os";

export const getOsHelpers = (line) => {
  switch (line) {
    case "os --EOL":
      return JSON.stringify(EOL);
    case "os --cpus":
      return cpus().map((elem) => {
        return { model: elem.model, speed: elem.speed / 1000 };
      });
    case "os --homedir":
      return homedir();
    case "os --username":
      return hostname();
    case "os --architecture":
      return arch();
    default:
      return "Operation failed";
  }
};
