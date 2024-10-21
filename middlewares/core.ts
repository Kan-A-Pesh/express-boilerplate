import Logger from "@/log/logger";
import Status, { Payload } from "@/models/status";
import { Request, Response } from "express";

export default function middlewareCore(err: Payload | Error, req: Request, res: Response) {
    if (err instanceof Error) {
        Logger.error("Request got an error", err);
        return res.status(500).json({
            masterStatus: 500,
            sentAt: Date.now(),
            response: Status.generatePayload(req.lang, {
                status: 500,
                error: "errors.internal"
            })
        });
    }

    const payload = err as Payload;
    return res.status(payload.masterStatus === 204 ? 200 : payload.masterStatus).json({
        masterStatus: payload.masterStatus,
        sentAt: Date.now(),
        response: payload.response
    });
}
