const bcrypt = require('bcryptjs')

const pass = async()=>{
    const salt = bcrypt.genSaltSync(10);
    const pass_hash = await bcrypt.hashSync("sikco@1234", salt);
    console.log(pass_hash)
    
}

pass()