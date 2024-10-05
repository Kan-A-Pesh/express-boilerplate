import { NextFunction, Request, Response } from "express";

export default function Route_UnhandledError(req: Request, res: Response, next: NextFunction) {
    throw new Error("This is an unhandled error");
}
