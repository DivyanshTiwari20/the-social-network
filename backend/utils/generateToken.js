import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET,
        { expiresIn: "15d",

         });
        
        res.cookie("jwt", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,//15 days is age of cookie
            httpOnly: true,//accessible only by web server to prevent XSS
            sameSite: "strict",//cross-site cookie to prevent CSRF
            secure: process.env.NODE_ENV !== "development",//https 
        });
};

export default generateTokenAndSetCookie;