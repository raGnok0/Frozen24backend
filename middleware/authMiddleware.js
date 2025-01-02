const Joi = require('joi')

const loginValidation = async(req,res,next)=>{
    const Schema = Joi.object({
        adminUser: Joi.string().min(8).required(),
        password:Joi.string().min(8).required(),
    })

    const {error} = Schema.validate(req.body)
    if(error){
        return res.status(400).json({message:"Bad Request!! from server validation side",error})
    }
    next()
}

module.exports = {
    loginValidation
}