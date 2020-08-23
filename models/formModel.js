const mongoose=require('mongoose')

var formSchema = mongoose.Schema({
    fromEmail:{
        type:String
    },
    toEmail:{
        type:String
    },
    content:{
        type:String
    },
    status:{
        type:String,
        default:"none"
    }
})

module.exports=mongoose.model("form",formSchema);