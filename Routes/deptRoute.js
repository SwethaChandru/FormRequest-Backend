var express=require('express');
var router=express.Router();

const deptCon=require('../controllers/deptControllers');

router.post('/',deptCon.addDept);
router.get('/',deptCon.getdept);

module.exports=router;