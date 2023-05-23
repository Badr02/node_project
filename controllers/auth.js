import doctor from "../models/doctors.js";
import student from "../models/students.js";
import admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginPage = async (req, res) => {
    const message = ""
    res.render('auth/login', { message });
}

export const login = async (req, res) => {
    const { username, password, userType } = req.body;
    const message = "The username or the password isn't correct"
    if (userType == "admin") {
        const loggedUser = await admin.findOne({ username });
        if (!checkInfo(res, loggedUser, password, "admin")) {
            res.render('auth/login', { message });
        } else {
            res.redirect('/admin/departments');
        }

    } else if (userType == "doctor") {
        const loggedUser = await doctor.findOne({ username });
        if (!checkInfo(res, loggedUser, password, "doctor")) {
            res.render('auth/login', { message });
        } else {
            res.send("alright");
        }

    } else if (userType == "student") {
        const loggedUser = await student.findOne({ username });
        if (!checkInfo(res, loggedUser, password, "student")) {
            res.render('auth/login', { message });
        } else {
            res.send("alright");
        }
    }
}

const checkInfo = (res, loggedUser, password, userType) => {
    if (loggedUser == null) {
        return false;
    } else {
        if (!bcrypt.compareSync(password, loggedUser.password)) {
            return false;
        } else {
            const data = {
                _id: loggedUser._id,
                username: loggedUser.username,
                name: loggedUser.name,
                userType: userType
            };
            const encoded = jwt.sign(data, process.env.jwtSecret)
            res.cookie("token", encoded);
            return true;
        }
    }
}

export const logout = async (req, res) => {
    res.cookie("token", null);
    res.redirect('/login');
}
