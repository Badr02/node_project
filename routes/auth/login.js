import { Router } from "express";
import { loginPage, login } from "../../controllers/auth.js";

const router = new Router();

router.get('/', loginPage);
router.post('/', login);



export default router;