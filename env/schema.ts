import { z } from "zod";
import { zboolean, znumber } from "./extras";

export const envSchema = z.object({
    PORT: znumber().default("3000"),
    TRUST_PROXY: zboolean().default("false"),
    LOG_FOLDER: z.string().default("./logs"),
});
