const mongoose=require('mongoose')

var notiSchema = mongoose.Schema({
    userId:{
        type:String
    },
    requestId:{
        type:String
    },
    Date:{
        type:Date,
        default:new Date(),
    },
})

module.exports=mongoose.model("notification",notiSchema);