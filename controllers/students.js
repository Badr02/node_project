import student from "../models/students.js";

export const index = async (req, res) => {
    const students = await student.find().lean();
    res.render('admin/students/index', { students });
}

export const create = (req, res) => {
    res.render('admin/students/create');
}

export const store = async (req, res) => {
    const { academicNumber, name, username, password } = req.body;
    await student.create ({ academicNumber, name, username, password});
    res.redirect('/admin/students');
}