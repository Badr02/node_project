import { Router } from "express";
import { create, store, edit, update } from "../../controllers/admin.js";

const router = new Router();

router.get('/create', create);
router.post('/', store);
router.get('/:id/edit', edit);
router.put('/:id', update);

export default router;