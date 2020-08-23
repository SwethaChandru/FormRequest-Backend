var express=require('express');
var router=express.Router();

const userCon=require('../controllers/userControllers');

router.post('/signup',userCon.add);
router.post('/',userCon.adduser);
router.get('/get/:name',userCon.getbyDept);
router.get('/bymail/:mail',userCon.getbyemail);
router.get('/:id',userCon.getuser);



module.exports=router;