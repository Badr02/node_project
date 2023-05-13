import doctor from "../models/doctors.js";
import subject from "../models/subjects.js";

export const index = async (req, res) => {
    const doctors = await doctor.find().lean();
    res.render('admin/doctors/index', { doctors });
}

export const create = (req, res) => {
    res.render('admin/doctors/create');
}

export const store = async (req, res) => {
    const { username, name, password } = req.body;
    await doctor.create ({ username, name, password});
    res.redirect('/admin/doctors');
}

export const edit = async (req, res) => {
    const { id } = req.params;
    const doctorToEdit = await doctor.findById(id).lean();
    const subjects = await subject.find({ doctor: id }).lean();
    res.render('admin/doctors/edit', { doctor: doctorToEdit, subjects });
}

export const update = async (req, res) => {
    const { username, name, password } = req.body;
    const { id } = req.params;
    if (password == ""){
        await doctor.findByIdAndUpdate(id, { $set: { username, name }} );
    } else {
        await doctor.findByIdAndUpdate(id, { $set: { username, name, password }} );
    }
    res.redirect('/admin/doctors');
}

export const deleteOne = async (req, res) => {
    const { id } = req.params;
    await doctor.findByIdAndDelete(id);
    res.redirect('/admin/doctors');
}
