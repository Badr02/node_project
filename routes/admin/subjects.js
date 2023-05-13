import { Router } from "express";
import { index, create, store, edit, update, deleteOne } from "../../controllers/subjects.js";

const router = new Router();

router.get('/subjects', index);
router.get('/subjects/create', create);
router.post('/subjects', store);
router.get('/subjects/:id/edit', edit);
router.put('/subjects/:id', update);
router.delete('/subjects/:id', deleteOne);

export default router;