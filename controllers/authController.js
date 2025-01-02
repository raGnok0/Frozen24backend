const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')
const {db} = require('../firebase')

const login = async(req,res)=>{
    try{
        const {adminUser,password} = req.body
        const user = db.collection('Admin')
        const snapshot = await user.where('adminUser','==',adminUser).get()
        if(snapshot.empty){
            return res.status(401).json({message:"invalid credentials error in the controller"})
        }
        const userDoc = snapshot.docs[0]
        const userData = userDoc.data()

        const passwordMatch = await bcrypt.compare(password,userData.password)
        if(!passwordMatch){
            return res.status(401).json({message:"password not matched"})
        }
        const jwtToken = jwt.sign({admin:userData.adminUser},process.env.JWT_SECRET,{expiresIn:'24h'})
        res.status(201).json({
            message:"Login success",
            success:true,
            jwtToken,
            admin:userData.adminUser
        })

    }catch(err){
        console.log("login error",err)
        res.status(500).json({message:"internal server error"})
    }
}

module.exports = {
    login
}