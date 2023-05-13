import { Router } from "express";
import { index, create, store, edit, update, deleteOne } from "../../controllers/students.js";

const router = new Router();

router.get('/students', index);
router.get('/students/create', create);
router.post('/students', store);
router.get('/students/:id/edit', edit);
router.put('/students/:id', update);
router.delete('/students/:id', deleteOne);

export default router;