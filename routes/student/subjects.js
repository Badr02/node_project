import { Router } from "express";
import { student_subjects_get, student_subjects_register_get, student_subjects_register_post } from "../../controllers/subjects.js";

const router = new Router();

router.get('/subjects', student_subjects_get);
router.get('/register', student_subjects_register_get);
router.post('/register', student_subjects_register_post);

export default router;