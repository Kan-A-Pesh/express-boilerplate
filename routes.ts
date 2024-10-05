import { Router } from "express";
import Route_Error from "./routes/error";
import Route_Index from "./routes/index";
import Route_UnhandledError from "./routes/unhandled";

const router = Router();

router.get("/", Route_Index);
router.get("/error", Route_Error);
router.get("/unhandled", Route_UnhandledError);

export default router;
