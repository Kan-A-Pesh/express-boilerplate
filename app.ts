import globals from "./env/env";
import loadEnv from "./env/loader";
import express from "express";
import cookieParser from "cookie-parser";
import middlewareI18n from "./middlewares/i18n";
import Logger from "./log/logger";
import routes from "./routes";
import { logIncoming, logOutgoing } from "./middlewares/log";
import middlewareCore from "./middlewares/core";

loadEnv();
Logger.init();

const app = express();

app.set("trust proxy", globals.env.TRUST_PROXY ? 1 : 0);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(middlewareI18n);

app.use(logIncoming);
app.use(routes);
app.use(logOutgoing);

app.use(middlewareCore);

app.listen(globals.env.PORT, () => {
    Logger.info(`app.ts::[root] | Server is running on port ${globals.env.PORT}`);
});
