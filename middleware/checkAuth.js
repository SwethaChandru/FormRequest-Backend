const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(' ')[1];
        console.log(token);
        jwt.verify(token,"secret_this_should_be_longer");
        console.log(token);
        next();
    }
    catch(error)
    {
        console.log(error);
        res.status(401).json({messgae:"auth----failed"});
    }
}
