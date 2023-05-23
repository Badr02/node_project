import student from "../models/students.js";
import bcrypt from "bcryptjs";


export const index = async (req, res) => {
    const admin = req.user;
    const students = await student.find().lean();
    res.render('admin/students/index', { students, admin });
}

export const create = (req, res) => {
    const admin = req.user;
    res.render('admin/students/create', { admin });
}

export const store = async (req, res) => {
    const { academicNumber, name, username, password } = req.body;
    const admin = req.user;
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    await student.create ({ academicNumber, name, username, password: encryptedPassword});
    res.redirect('/admin/students' );
}

export const edit = async (req, res) => {
    const admin = req.user;
    const { id } = req.params;
    const studentToEdit = await student.findById(id).lean()
    res.render('admin/students/edit', { student: studentToEdit, admin });
}

export const update = async (req, res) => {
    const { academicNumber, name, username, password } = req.body;
    const admin = req.user;
    const { id } = req.params;
    if (password == ""){
        await student.findByIdAndUpdate(id, { $set: { academicNumber, name, username }} );
    } else {
        const salt = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(password, salt);
        await student.findByIdAndUpdate(id, { $set: { academicNumber, name, username, password: encryptedPassword }} );
    }
    res.redirect('/admin/students');
}

export const deleteOne = async (req, res) => {
    const { id } = req.params;
    const admin = req.user;
    await student.findByIdAndDelete(id);
    res.redirect('/admin/students');
}