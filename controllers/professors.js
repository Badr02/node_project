import professor from "../models/professors.js";

export const index = async (req, res) => {
    const professors = await professor.find().lean();
    res.render('admin/professors/index', { professors });
}

export const create = (req, res) => {
    res.render('admin/professors/create');
}

export const store = async (req, res) => {
    const { username, name, password } = req.body;
    await professor.create ({ username, name, password});
    res.redirect('/admin/professors');
}
