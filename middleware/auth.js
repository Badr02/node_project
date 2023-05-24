import jwt from "jsonwebtoken";

export const adminAuth = (req, res, next) => {
    const { token } = req.cookies;
    try{
        const decoded = jwt.verify(token, process.env.jwtSecret);
        req.user = decoded;
        if(req.user.userType == "admin"){
            next();
        } else {
            return res.send("You don't have permission to access this page");
        }
    } catch(error) {
        return res.redirect('/login');
    }
};

export const studentAuth = (req, res, next) => {
    const { token } = req.cookies;
    try{
        const decoded = jwt.verify(token, process.env.jwtSecret);
        req.user = decoded;
        if(req.user.userType == "student"){
            next();
        } else {
            return res.send("You don't have permission to access this page");
        }
    } catch(error) {
        return res.redirect('/login');
    }
};