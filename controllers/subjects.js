import subject from "../models/subjects.js";
import department from "../models/department.js";

export const index = async (req, res) => {
    const subjects = await subject.find().populate('department').lean();
    res.render('admin/subjects/index', { subjects });
}

export const create = async (req, res) => {
    const departments = await department.find().lean();
    res.render('admin/subjects/create', { departments });
}

export const store = async (req, res) => {
    const { name, code, department } = req.body;
    await subject.create ({ name, code, department});
    res.redirect('/admin/subjects');
}
