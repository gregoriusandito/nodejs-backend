const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const apiRoutes = require("./routes/index");
const port = process.env.PORT || 8080;
const authRoutes = require("./routes/auth");
const { verifyToken } = require("./utils/validation");


dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGO_DB_CONFIG, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection

if(!db)
    console.log("Error connecting to DB (MongoDB)")
else
    console.log("Successfully connected to DB (MongoDB)")

app.use("/api/auth", authRoutes);

app.use("/api/user", verifyToken, apiRoutes)

app.get("/", (req, res) => res.send("Hello World! - Created by Gregorius Andito H"))


app.listen(port, () => {
    console.log("Running backend service on port: " + port)
})