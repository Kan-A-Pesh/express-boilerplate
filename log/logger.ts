import path from "path";
import globals from "../env/env";
import { appendFile, appendFileSync } from "fs";

export default class Logger {
    public static logfile: string;

    public static init() {
        Logger.logfile = path.resolve(globals.env.LOG_FOLDER, `log-${new Date().toISOString().replace(/:/g, "-")}.log`);
        appendFileSync(Logger.logfile, `# LOGFILE: ${Logger.logfile}\n`);
        Logger.debug("Logger initialized with file", Logger.logfile);
    }

    public static prefix() {
        return new Date().toISOString();
    }

    public static log(...data: any[]) {
        console.log(Logger.prefix(), "\x1b[32m[LOG]  \x1b[0m", ...data);
        appendFile(Logger.logfile, `${Logger.prefix()} [LOG]  ${data.map((d) => d.toString()).join(" ")}\n`, () => {});
    }

    public static error(...data: any[]) {
        console.error(Logger.prefix(), "\x1b[31m[ERROR]\x1b[0m", ...data);
        appendFile(Logger.logfile, `${Logger.prefix()} [ERROR] ${data.map((d) => d.toString()).join(" ")}\n`, () => {});
    }

    public static warn(...data: any[]) {
        console.warn(Logger.prefix(), "\x1b[33m[WARN] \x1b[0m", ...data);
        appendFile(Logger.logfile, `${Logger.prefix()} [WARN]  ${data.map((d) => d.toString()).join(" ")}\n`, () => {});
    }

    public static info(...data: any[]) {
        console.info(Logger.prefix(), "\x1b[36m[INFO] \x1b[0m", ...data);
        appendFile(Logger.logfile, `${Logger.prefix()} [INFO]  ${data.map((d) => d.toString()).join(" ")}\n`, () => {});
    }

    public static debug(...data: any[]) {
        console.debug(Logger.prefix(), "\x1b[34m[DEBUG]\x1b[0m", ...data);
        appendFile(Logger.logfile, `${Logger.prefix()} [DEBUG] ${data.map((d) => d.toString()).join(" ")}\n`, () => {});
    }

    public static writeRaw(data: string) {
        appendFile(Logger.logfile, data + "\n", () => {});
    }
}
