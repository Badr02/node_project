import { Router } from "express";
import { index, create, store } from "../../controllers/subjects.js";

const router = new Router();

router.get('/subjects', index);
router.get('/subjects/create', create);
router.post('/subjects', store);

export default router;