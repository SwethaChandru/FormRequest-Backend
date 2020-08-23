const mongoose=require('mongoose')

var UserSchema = mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    name:{
        type:String
    },
    department:{
        type:String
    }
})

module.exports=mongoose.model("User",UserSchema);