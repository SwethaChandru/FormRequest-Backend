notification=require('../models/notificationModel');

module.exports.addnoti=(req,res)=>{
    console.log("enter notii");
    let noti=new notification({
        userId:req.body.userid,
        requestId:req.body.reqid
    })
    noti.save((err,docs)=>{
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send(docs);
        }
    })
}

module.exports.getnoti=(req,res)=>{
    notification.find({userId:req.params.id}).sort({Date: -1}).exec(function(err, cursor){
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send(cursor);
        }
    })
}
