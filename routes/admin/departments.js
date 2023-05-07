import { Router } from "express";
import { index, create, store } from "../../controllers/departments.js";

const router = new Router();

router.get('/departments', index);
router.get('/departments/create', create);
router.post('/departments', store);

export default router;