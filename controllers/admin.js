import admin from "../models/admin.js";
import bcrypt from "bcryptjs";

export const create = (req, res) => {
    res.render('admin/admin/create');
}

export const store = async (req, res) => {
    const { username, name, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    await admin.create ({ username, name, password: encryptedPassword});
    res.redirect('/login');
}

export const edit = async (req, res) => {
    const { id } = req.params;
    const adminToEdit = await admin.findById(id).lean();
    res.render('admin/admin/edit', { admin: adminToEdit });
}

export const update = async (req, res) => {
    const { username, name, password } = req.body;
    const { id } = req.params;
    if (password == ""){
        await admin.findByIdAndUpdate(id, { $set: { username, name }} );
    } else {
        const salt = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(password, salt);
        await admin.findByIdAndUpdate(id, { $set: { username, name, password: encryptedPassword }} );
    }
    res.redirect('back');
}
