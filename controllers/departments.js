import department from "../models/department.js";

export const index = async (req, res) => {
    const admin = req.user;
    const departments = await department.find().lean();
    res.render('admin/departments/index', { departments, admin  });
}

export const create = (req, res) => {
    const admin = req.user;
    res.render('admin/departments/create', { admin } );
}

export const store = async (req, res) => {
    const { name, code } = req.body;
    const admin = req.user;
    await department.create ({ name, code });
    res.redirect('/admin/departments');
}

export const edit = async (req, res) => {
    const { id } = req.params;
    const admin = req.user;
    const departmentToEdit = await department.findById(id).lean()
    res.render('admin/departments/edit', { department: departmentToEdit, admin});
}

export const update = async (req, res) => {
    const { name, code } = req.body;
    const { id } = req.params;
    const admin = req.user;
    await department.findByIdAndUpdate(id, { $set: { name, code }} );
    res.redirect('/admin/departments');
}

export const deleteOne = async (req, res) => {
    const { id } = req.params;
    const admin = req.user;
    await department.findByIdAndDelete(id);
    res.redirect('/admin/departments');
}