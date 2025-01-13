const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel} = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");


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

adminRouter.post("/course", adminMiddleware, async function(req, res){
    const adminId = req.user.Id;

    const { title, description, imageUrl, price } = req.body;

    const course = await courseModel.create({
        title, description, price, imageUrl, 
        creatorId: adminId
    })

    res.json({
        message: "course created",
        courseId: course._id
    })
})

adminRouter.put("/", function(req, res){
    res.json({
        message: "showing"
    })
})

adminRouter.get("/course/bulk", adminMiddleware,async function(req, res) {
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId 
    });

    res.json({
        message: "Course updated",
        courses
    })
})
ffgdbgfbddbbvcvc
module.exports = {
    adminrouter: adminRouter
}
