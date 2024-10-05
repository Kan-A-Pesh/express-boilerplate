import { Request, Response } from "express";
import Status from "interfaces/status";

export default function (req: Request, res: Response) {
    Status.send(req, res, {
        status: 204,
    });
}
