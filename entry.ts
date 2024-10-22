import app from "./app";
import globals from "./env/env";
import Logger from "./log/logger";

app().listen(globals.env.PORT, () => {
    Logger.info(`entry.ts::[root] | Server is running on port ${globals.env.PORT}`);
});
