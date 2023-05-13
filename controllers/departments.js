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

export const edit = async (req, res) => {
    const { id } = req.params;
    const departmentToEdit = await department.findById(id).lean()
    res.render('admin/departments/edit', { department: departmentToEdit });
}

export const update = async (req, res) => {
    const { name, code } = req.body;
    const { id } = req.params;
    await department.findByIdAndUpdate(id, { $set: { name, code }} );
    res.redirect('/admin/departments');
}

export const deleteOne = async (req, res) => {
    const { id } = req.params;
    await department.findByIdAndDelete(id);
    res.redirect('/admin/departments');
}