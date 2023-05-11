import { Router } from "express";
import { index, create, store } from "../../controllers/professors.js";

const router = new Router();

router.get('/professors', index);
router.get('/professors/create', create);
router.post('/professors', store);

export default router;