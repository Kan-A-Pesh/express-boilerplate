import { z } from "zod";
import { zboolean, znumber } from "./extras";

export const envSchema = z.object({
    NODE_ENV: z.string().default("development"),
    PORT: znumber().default("3000"),
    TRUST_PROXY: zboolean().default("false"),
    LOG_FOLDER: z.string().optional()
});
