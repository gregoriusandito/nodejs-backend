const Joi = require("joi");
const jwt = require("jsonwebtoken");

const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).max(20).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required(),
    });
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).max(20).required(),
        password: Joi.string().min(6).max(1024).required(),
    });
    return schema.validate(data);
};

// middleware to validate token
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    
    if (!token) 
        return res.status(401).json({ error: "Access denied" });
    
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next(); // to continue the flow
    } catch (err) {
        res.status(400).json({ error: "Token is not valid" });
    }
};


module.exports = {
    registerValidation,
    loginValidation,
    verifyToken
};