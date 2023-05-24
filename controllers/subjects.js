import subject from "../models/subjects.js";
import department from "../models/department.js";
import doctor from "../models/doctors.js";
import students from "../models/students.js";

export const index = async (req, res) => {
  const admin = req.user;
  const subjects = await subject
    .find()
    .populate("previousReq")
    .populate("department")
    .lean();
  res.render("admin/subjects/index", { subjects, admin });
};

export const create = async (req, res) => {
  const departments = await department.find().lean();
  const subjects = await subject.find().lean();
  const doctors = await doctor.find().lean();
  const admin = req.user;
  res.render("admin/subjects/create", {
    departments,
    subjects,
    doctors,
    admin,
  });
};

export const store = async (req, res) => {
  const admin = req.user;
  const { name, code, department, previousReq, doctor } = req.body;
  await subject.create({ name, code, department, previousReq, doctor });
  res.redirect("/admin/subjects");
};

export const edit = async (req, res) => {
  const admin = req.user;
  const { id } = req.params;
  const subjectToEdit = await subject
    .findById(id)
    .populate("previousReq")
    .populate("department")
    .populate("doctor")
    .lean();
  const departments = await department.find().lean();
  const subjects = await subject.find({ _id: { $ne: id } }).lean();
  const doctors = await doctor.find().lean();
  res.render("admin/subjects/edit", {
    subject: subjectToEdit,
    departments,
    subjects,
    doctors,
    admin,
  });
};

export const update = async (req, res) => {
  const admin = req.user;
  const { name, code, department, previousReq, doctor } = req.body;
  const { id } = req.params;
  if (doctor === undefined) {
    await subject.findByIdAndUpdate(id, { $unset: { doctor: 1 } });
    res.redirect("back");
  } else {
    await subject.findByIdAndUpdate(id, {
      $set: { name, code, department, previousReq, doctor },
    });
    res.redirect("/admin/subjects");
  }
};

export const deleteOne = async (req, res) => {
  const admin = req.user;
  const { id } = req.params;
  await subject.findByIdAndDelete(id);
  res.redirect("/admin/subjects");
};

export const attendance = async (req, res) => {
  const admin = req.user;
  const { id } = req.params;
  const subjects = await subject.findById(id).populate("students").lean();
  console.log(subjects);
  res.render("admin/subjects/attendance", { admin, subjects });
};

// Student subjects - GET
export const student_subjects_get = async (req, res) => {
  const student = req.user;
  try {
    const subjects = await subject.find({ students: student }).lean();

    res.render("student/index", { subjects });
  } catch (error) {
    // Handle any potential errors
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

// Student subjects register - GET
export const student_subjects_register_get = async (req, res) => {
  const student = req.user;
  try {
    const subjects = await subject.find({ students: { $nin: [student] } }).lean();

    res.render("student/register", { subjects });
  } catch (error) {
    // Handle any potential errors
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

// Student subjects register - POST
export const student_subjects_register_post = async (req, res) => {
  const student = req.user;
  const formData = req.body;

  // Access form data
  const subjects = formData.subject_code;

  // Process the form data
  if (subjects.length < 2) {
    let subject_data = await subject.findOne({ code: subjects });
    if (student[0].passedSubjects.includes(subject_data.previousReq)) {
      await students.findByIdAndUpdate(student.id, {
        $addToSet: { registeredSubjects: subject_data.id },
      });
    }
  } else {
    for (const subject_code of subjects) {
      let subject_data = await subject.findOne({ code: subject_code });
      if (student[0].passedSubjects.includes(subject_data.previousReq)) {
        await students.findByIdAndUpdate(student.id, {
          $addToSet: { registeredSubjects: subject_data.id },
        });
      }
    }
  }

  res.redirect("/student/subjects");
};
