import department from "../models/department.js";

export const index = async (req, res) => {
    const departments = await department.find().lean();
    res.render('admin/departments/index', { departments });
}

export const create = (req, res) => {
    res.render('admin/departments/create');
}

export const store = async (req, res) => {
    const { name, code } = req.body;
    await department.create ({ name, code });
    res.redirect('/admin/departments');
}
