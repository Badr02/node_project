import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    const { token } = req.cookies;
    try{
        const decoded = jwt.verify(token, process.env.jwtSecret);
        req.user = decoded;
        next();
    } catch {
        return res.redirect('/login');
    }
};