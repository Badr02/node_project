import doctor from "../models/doctors.js";
import student from "../models/students.js";
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
        // const loggedUser = await admin.findOne({ username });
        if (!checkInfo(res, loggedUser, password)) {
            res.render('auth/login', { message });
        } else {
            res.send("alright");
        }

    } else if (userType == "doctor") {
        const loggedUser = await doctor.findOne({ username });
        if (!checkInfo(res, loggedUser, password)) {
            res.render('auth/login', { message });
        } else {
            res.send("alright");
        }

    } else if (userType == "student") {
        const loggedUser = await student.findOne({ username });
        if (!checkInfo(res, loggedUser, password)) {
            res.render('auth/login', { message });
        } else {
            res.send("alright");
        }
    }
}

const checkInfo = (res, loggedUser, password) => {
    if (loggedUser == null) {
        return false;
    } else {
        if (!bcrypt.compareSync(password, loggedUser.password)) {
            return false;
        } else {
            const data = {
                _id: loggedUser._id,
                username: loggedUser.username
            };
            const encoded = jwt.sign(data, process.env.jwtSecret)
            res.cookie("data", encoded);
            return true;
        }
    }
}

