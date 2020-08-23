form=require('../models/formModel');
User=require('../models/userModel');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports.getnotidetail=(req,res)=>{
    console.log("enter noti detail");
    form.aggregate([
        { $match: { _id: ObjectId(req.params.reqid)}, },
        //{ $addFields: { email: { $toObjectId: '$email' } } },
        {
          $lookup: {
            from: 'users',
            localField: 'toEmail',
            foreignField: 'email',
            as: 'requests'
          }
        },
        { $unwind: '$requests' },
      ]).exec((err,docs)=>{
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            res.send(docs);
        }  
      })  
}

module.exports.getapprovemsg=(req,res)=>{
    console.log("enter approve msg");
    User.aggregate([
        { $match: { _id: ObjectId(req.params.id)}, },
        //{ $addFields: { email: { $toObjectId: '$email' } } },
        {
          $lookup: {
            from: 'forms',
            localField: 'email',
            foreignField: 'fromEmail',
            as: 'requests'
          }
        },
        { $unwind: '$requests' },
        {$match:{'requests.status':"approve"}},
      ]).exec((err,docs)=>{
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            res.send(docs);
        }  
      })  
}


module.exports.getrejectmsg=(req,res)=>{
    console.log("enter reject msg");
    User.aggregate([
        { $match: { _id: ObjectId(req.params.id)}, },
        //{ $addFields: { email: { $toObjectId: '$email' } } },
        {
          $lookup: {
            from: 'forms',
            localField: 'email',
            foreignField: 'fromEmail',
            as: 'requests'
          }
        },
        { $unwind: '$requests' },
        {$match:{'requests.status':"reject"}},
      ]).exec((err,docs)=>{
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            res.send(docs);
        }  
      })
}


module.exports.reject=(req,res)=>{
    console.log("enter reject");
    form.findByIdAndUpdate(req.body.id,
        {
            $set:{ "status": req.body.status} 
        },
        {
            upsert:true,new:true
        },
        function(err,updateddocs){
            if(err)
            {
                console.log(err);
                console.log("error updating video");
            }
            else
            {
                res.json(updateddocs);
            }
        })
}

module.exports.getothermsg=(req,res)=>{
    User.aggregate([
        { $match: { department: req.params.name}, },
        //{ $addFields: { email: { $toObjectId: '$email' } } },
        {
          $lookup: {
            from: 'forms',
            localField: 'email',
            foreignField: 'toEmail',
            as: 'requests'
          }
        },
        { $unwind: '$requests' },
        {$match:{'requests.status':"none"}},
      ]).exec((err,docs)=>{
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            res.send(docs);
        }  
      })
}

module.exports.getmessage=(req,res)=>{
    console.log("enter aggregate function");
    User.aggregate([
        { $match: { _id: ObjectId(req.params.id)}, },
        //{ $addFields: { email: { $toObjectId: '$email' } } },
        {
          $lookup: {
            from: 'forms',
            localField: 'email',
            foreignField: 'toEmail',
            as: 'requests'
          }
        },
        { $unwind: '$requests' }
      ]).exec((err,docs)=>{
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            res.send(docs.requests);
            
        }  
      })
}

module.exports.addform=(req,res)=>{
    User.find({email:{ $in: [ req.body.fromMail, req.body.toemail ] }},(err,docs)=>{
        if(err){
            res.status(401).json({
                success:"true",
                message:"DB error"
            })
        }
        else{
            console.log(docs);
            if(docs===null){
                res.send({
                    message:"null"
                })
            }
            else{
                if(docs.length===2){
                    if(docs[0].department===docs[1].department)
                    {
                        res.status(401).json({
                            success:"false",
                            message:"both user belong to same department"
                        })
                    }
                    else{
                        const newForm=new form({
                            fromEmail:req.body.fromMail,
                            toEmail:req.body.toemail,
                            content:req.body.message
                        })
                        newForm.save((err,docs)=>{
                            if(err)
                            {
                                res.status(401).json({
                                    success:"true",
                                    message:"DB error"
                                })
                            }
                            else{
                                res.status(200).json({
                                    success:"true",
                                    message:"sucessfully added"
                                })
                            }
                        })
                    }     
                } 
                else
                {
                    console.log("entered wanted else block");
                    if(docs[0].email===req.body.fromMail){
                        res.status(401).json({
                            success:"false",
                            message:"to mail not found"
                        })
                    }
                    if(docs[0].email===req.body.toemail){
                        res.status(401).json({
                            success:"false",
                            message:"from email not found"
                        })
                    }
                }
            }
        }
    })
}