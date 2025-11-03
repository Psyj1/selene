import jwt from "jsonwebtoken";
import userController from "../controllers/userController.js";

const Authorization = (req, res, next) => {
    const authToken = req.headers["authorization"];
    if (authToken != undefined) {
        const bearer = authToken.split(" ");
        const token = bearer[1];
        jwt.verify(token, userController.JWTSecret, (error, data)=>{
            if (error) {
                res.status(401).json({error: "Token invalid"});
            } else{
                req.token = token;
                req.loggedUser = {
                    id: data.id,
                    email: data.email,
                };
                next();
            }
        });
    } else {
        res.status(401).json({ error: "Token Invalid"});
    }
};
export default { Authorization};