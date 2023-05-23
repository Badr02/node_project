import { Router } from "express";
import { logout } from "../../controllers/auth.js";

const router = new Router();

router.get('/', logout);

export default router;