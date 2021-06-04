const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserAuth = require("../model/auth/userAuthModel");
const { registerValidation, loginValidation } = require("../utils/validation");

router.post("/register", async (req, res) => {
    const { error } = registerValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const isUserNameExist = await UserAuth.findOne({ username: req.body.username });
    
    if (isUserNameExist)
        return res.status(400).json({ error: "Username already exists" });

    const isEmailExist = await UserAuth.findOne({ email: req.body.email });
    
    if (isEmailExist)
        return res.status(400).json({ error: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const userAuth = new UserAuth({
        username: req.body.username,
        email: req.body.email,
        password: password,
    });

    try {
        const savedUser = await userAuth.save();
        return res.json({ error: null, data: savedUser });
    } catch (err) {
        console.log(err)
        return res.status(400).json({ err });
    }
});

router.post("/login", async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) 
        return res.status(400).json({ error: error.details[0].message });
    
    const userAuth = await UserAuth.findOne({ username: req.body.username });
    if (!userAuth) 
        return res.status(400).json({ error: "Username is wrong" });

    const validPassword = await bcrypt.compare(req.body.password, userAuth.password);
    if (!validPassword)
        return res.status(400).json({ error: "Password is wrong" });

    const token = jwt.sign({
            email: userAuth.email,
            id: userAuth._id,
        },
        process.env.TOKEN_SECRET
    );
    
    res.json({
        error: null,
        data: {
            message: "Login successful",
            token
        },
    });
});

module.exports = router;