import { Router } from "express";
import { index, create, store, edit, update, deleteOne } from "../../controllers/departments.js";

const router = new Router();

router.get('/departments', index);
router.get('/departments/create', create);
router.post('/departments', store);
router.get('/departments/:id/edit', edit);
router.put('/departments/:id', update);
router.delete('/departments/:id', deleteOne);

export default router;