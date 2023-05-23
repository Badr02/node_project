import subject from "../models/subjects.js";
import department from "../models/department.js";
import doctor from "../models/doctors.js";

export const index = async (req, res) => {
    const admin = req.user;
    const subjects = await subject.find()
    .populate('previousReq')
    .populate('department').lean();
    res.render('admin/subjects/index', { subjects, admin });
}

export const create = async (req, res) => {
    const departments = await department.find().lean();
    const subjects = await subject.find().lean();
    const doctors = await doctor.find().lean();
    const admin = req.user;
    res.render('admin/subjects/create', { departments, subjects, doctors, admin });
}

export const store = async (req, res) => {
    const admin = req.user;
    const { name, code, department, previousReq, doctor } = req.body;
    await subject.create({ name, code, department, previousReq, doctor });
    res.redirect('/admin/subjects');
}

export const edit = async (req, res) => {
    const admin = req.user;
    const { id } = req.params;
    const subjectToEdit = await subject.findById(id)
    .populate('previousReq')
    .populate('department')
    .populate('doctor').lean();
    const departments = await department.find().lean();
    const subjects = await subject.find({ _id: { $ne: id } }).lean();
    const doctors = await doctor.find().lean();
    res.render('admin/subjects/edit', { subject: subjectToEdit, departments, subjects, doctors, admin });
}

export const update = async (req, res) => {
    const admin = req.user;
    const { name, code, department, previousReq, doctor } = req.body;
    const { id } = req.params;
    if(doctor === undefined){
        await subject.findByIdAndUpdate(id, { $unset: { doctor : 1 }});
        res.redirect('back');
    } else {
        await subject.findByIdAndUpdate(id, { $set: { name, code, department, previousReq, doctor } });
        res.redirect('/admin/subjects');
    }
}

export const deleteOne = async (req, res) => {
    const admin = req.user;
    const { id } = req.params;
    await subject.findByIdAndDelete(id);
    res.redirect('/admin/subjects');
}

export const attendance = async (req, res) => {
    const admin = req.user;
    const { id } = req.params;
    const subjects = await subject.findById(id)
    .populate('students').lean();
    console.log(subjects);
    res.render('admin/subjects/attendance', {admin, subjects});
}

