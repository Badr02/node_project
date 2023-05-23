import doctor from "../models/doctors.js";
import subject from "../models/subjects.js";
import bcrypt from "bcryptjs";

export const index = async (req, res) => {
    const admin = req.user;
    const doctors = await doctor.find().lean();
    res.render('admin/doctors/index', { doctors, admin });
}

export const create = (req, res) => {
    const admin = req.user;
    res.render('admin/doctors/create', { admin });
}

export const store = async (req, res) => {
    const { username, name, password } = req.body;
    const admin = req.user;
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    await doctor.create ({ username, name, password: encryptedPassword});
    res.redirect('/admin/doctors');
}

export const edit = async (req, res) => {
    const { id } = req.params;
    const admin = req.user;
    const doctorToEdit = await doctor.findById(id).lean();
    const subjects = await subject.find({ doctor: id }).lean();
    res.render('admin/doctors/edit', { doctor: doctorToEdit, subjects, admin });
}

export const update = async (req, res) => {
    const { username, name, password } = req.body;
    const admin = req.user;
    const { id } = req.params;
    if (password == ""){
        await doctor.findByIdAndUpdate(id, { $set: { username, name }} );
    } else {
        const salt = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(password, salt);
        await doctor.findByIdAndUpdate(id, { $set: { username, name, password: encryptedPassword }} );
    }
    res.redirect('/admin/doctors');
}

export const deleteOne = async (req, res) => {
    const { id } = req.params;
    const admin = req.user;
    await doctor.findByIdAndDelete(id);
    res.redirect('/admin/doctors');
}
