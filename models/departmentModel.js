const mongoose=require('mongoose')

var DeptSchema = mongoose.Schema({
    deptName:{
        type:String
    }
})

module.exports=mongoose.model("department",DeptSchema);