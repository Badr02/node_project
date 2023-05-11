import { Router } from "express";
import { index, create, store } from "../../controllers/students.js";

const router = new Router();

router.get('/students', index);
router.get('/students/create', create);
router.post('/students', store);

export default router;