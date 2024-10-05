import t from "i18n/translate";
import Logger from "log/logger";
import type { Request, Response } from "express";

export interface StatusPayload {
    status: number;
    error?: string;
    data?: any;
}

export interface GeneratedStatusPayload extends StatusPayload {
    timestamp: number;
    success: boolean;
    translatedError?: string;
}

export default class Status {
    public static send(req: Request, res: Response, status: StatusPayload | StatusPayload[]) {
        const statusList = Array.isArray(status) ? status : [status];
        const lang = req.lang;

        const response = statusList.map((s) => Status.generatePayload(lang, s));
        const hasSameStatus = response.every((r) => r.status === response[0].status);
        const masterStatus = hasSameStatus ? response[0].status : 207;

        res.status(masterStatus === 204 ? 200 : masterStatus).json({
            masterStatus,
            sentAt: Date.now(),
            response,
        });
    }

    public static generatePayload(lang: string, payload: StatusPayload): GeneratedStatusPayload {
        if (payload.error && payload.status < 400) {
            Logger.warn("status.ts::generatePayload | Returning success status with error", payload);
        }

        if (!payload.error && payload.status >= 400) {
            Logger.warn("status.ts::generatePayload | Returning error status without error", payload);
        }

        return {
            ...payload,
            timestamp: Date.now(),
            success: !payload.error,
            translatedError: payload.error ? t(lang, payload.error) : undefined,
        };
    }
}
