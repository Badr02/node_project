import { Router } from "express";
import { index, create, store, edit, update, deleteOne } from "../../controllers/doctors.js";

const router = new Router();

router.get('/doctors', index);
router.get('/doctors/create', create);
router.post('/doctors', store);
router.get('/doctors/:id/edit', edit);
router.put('/doctors/:id', update);
router.delete('/doctors/:id', deleteOne);

export default router;