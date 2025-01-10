const { Router } = require("express");
const userRouter = Router()
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = "sumit123";

userRouter.post("/signup", async function(req,res){
    const { email, password, firstName, lastName } = req.body; //todo add zod validation

    try{
        await userModel.create({
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

userRouter.post("/signin", async function(req, res){
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email,
        password
    });

    if(user) {
        const token = jwt.sign({
            _id: user._id
        }, JWT_USER_PASSWORD);

        res.json({
            token: token
        })
    } else {
        res.sendStatus(403).json({
            message: "Incorrect concedrials"
        })
    }
    
})

userRouter.get("/purchases", function(req,res){
    res.json({
        msg: "purchased endpoint"
        
    })
})

module.exports = {
    userRouter: userRouter
}