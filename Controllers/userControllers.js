const bcrypt=require('bcrypt');
const User=require('../models/userModel');
const jwt=require('jsonwebtoken');

module.exports.getuser=(req,res)=>{
    User.find({_id:req.params.id},(err,docs)=>{
        if(err)
        {
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

module.exports.getbyDept=(req,res)=>{
    User.find({department:req.params.name},(err,docs)=>{
        if(err)
        {
            res.status(401).json({
                success:false,
                message:'DB error'
            });
        }
        else{
            res.send(docs)
        }
    })
}

module.exports.getbyemail=(req,res)=>{
    console.log("enter by mail");
    User.find({email:req.params.mail},(err,docs)=>{
        if(err)
        {
            res.send(err);
        }
        else{
            res.send(docs);
        }
    })
}

module.exports.add=(req,res)=>{
    console.log("enter signup");
    User.findOne({email:req.body.email},(err,docs)=>{
        if(err){
            res.status(401).json({
                success:false,
                message:'DB error'
            });
        }
        else{
            if(docs===null){
                bcrypt.hash(req.body.password,10)
                .then(hash=>{
                    const user=new User({
                        email:req.body.email,
                        password:hash,
                        name:req.body.name,
                        department:req.body.department
                    });
                    user.save((err,items)=>{
                        if(err)
                        {
                            res.status(401).json({
                                success:false,
                                message:'DB error'
                            });
                        }
                        else
                        {
                            res.status(200).json({
                                success:true,
                                message:'succesfully sign up'
                            });
                        }
                    })
                    .catch(err=>{
                        res.status(500).json({
                        error:err
                    })
                })
            })
        }
        else
        {
            res.status(401).json({
                success:false,
                message:"email already present"
            })
        }
    }
})
}

module.exports.adduser=(req,res)=>{
    console.log("enter login user");
    let fetchedUser;
    User.findOne({email:req.body.email}).then(user=>{
        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:"email not present"
            });
        }
        fetchedUser=user;
        return bcrypt.compare(req.body.password,user.password);
    })
    .then(result=>{
        if(!result)
        {
            return res.status(401).json({
               success:false,
               message:"invalid password "
            })
        }
        else
        {
            const token=jwt.sign({},'secret_this_should_be_longer',{expiresIn:'1h'});
            res.status(200).json({
            success:true,
            id:fetchedUser._id,
            token:token
        });
        }
        
    })
    .catch(err=>{
        console.log(err);
        return res.status(401).json({
            success:false,
            message:"Auth failed"
        });
    });
}