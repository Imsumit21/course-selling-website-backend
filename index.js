const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://ajaxfc69:9XgaHHJi567vtucD@cluster0.lbobc.mongodb.net/udemy-app")


const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/vi/course", courseRouter);
app.use("/api/v1/admin", adminRouter);  


app.listen(3000);