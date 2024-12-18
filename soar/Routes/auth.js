const express = require(`express`)
const User = require("../Models/User");
const bycrypt = require(`bcryptjs`)
const jwt = require(`jsonwebtoken`)

const router = express.Router();


router.post(`/register`, async(req, res)=>{
    const {name, email, password, role, schoolId} = req.body;

    try{
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);

        const user = new User({name, email, password:hashedPassword, role, schoolId})
        await user.save();

        res.status(201).json({message: "user created successfully"});

    }catch(e){
        res.status(400).json({error: e.message});
    }
})

router.post(`/login`, async(req, res)=> {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:'invalid email'});

        const validpswd = await bycrypt.compare(password, user.password);
        if(!validpswd) return res.status(400).json({message: 'invalid password'});

        const token = jwt.sign(
            {id: user._id, role: user.role, schoolId: user.schoolId},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )
        
        res.json({token})
    }catch(e){
        res.status(401).json({error:e.message})
    }
})

module.exports = router;