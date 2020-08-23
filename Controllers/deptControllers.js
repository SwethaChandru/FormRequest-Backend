const department=require('../models/departmentModel');

module.exports.addDept=(req,res)=>{
    console.log("enter add dept");
    department.findOne({deptName:req.body.name},(err,docs)=>{
        if(err)
        {
            res.status(401).json({
                success:false,
                message:'DB error'
            });
        }
        else
        {
            if(docs===null)
            {
                const dept=new department({
                    deptName:req.body.name
                })
                dept.save((err,docs)=>{
                    if(err)
                    {
                        res.status(401).json({
                            success:false,
                            message:'DB error'
                        });
                    }
                    else{
                        res.status(200).json({
                            success:true,
                            message:'department successfully added'
                        });
                    }
                })
            }
            else{
            res.status(401).json({
                success:false,
                message:'department name already present'
            });
        }
    }
})
}

module.exports.getdept=(req,res)=>{
    department.find({},(err,docs)=>{
        if(err){
            res.status(401).json({
                success:false,
                message:'DB error'
            });
        }
        else
        {
            res.send(docs);
        }
    })
}