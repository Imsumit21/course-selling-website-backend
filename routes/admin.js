const { Router } = require("express");
const adminRouter = Router();
const { adminModel} = require("../db");
const jwt = require("jsonwebtoken");
const JWT_ADMIN_PASSWORD = "13324jrbkwf";

adminRouter.post("/signup", async function(req,res){

    const { email, password, firstName, lastName } = req.body; //todo add zod validation

    try{
        await adminModel.create({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        })
    } catch(e){
        res.json({
            message:"signup failed try after some time"
        })
    }

    res.json({
        message: "signup succeeded"
    })
    
})

adminRouter.post("/signin", async function(req, res){
    const { email, password } = req.body;

    const admin = await adminModel.findOne({
        email,
        password
    });

    if(admin) {
        const token = jwt.sign({
            _id: admin._id
        }, JWT_ADMIN_PASSWORD);

        res.json({
            token: token
        })
    } else {
        res.sendStatus(403).json({
            message: "Incorrect concedrials"
        })
    }

})

adminRouter.post("/course", function(req, res){
    res.json({
        message: "course endpoint"
    })
})

adminRouter.put("/", function(req, res){
    res.json({
        message: "showing"
    })
})

adminRouter.get("/bulk", function(req, res){
    res.json({
        message: "signin endpoint"
    })
})

module.exports = {
    adminrouter: adminRouter
}