var express=require('express');
var router=express.Router();

const formCon=require('../controllers/formControllers');


router.post('/',formCon.addform);
router.get('/reject/:id',formCon.getrejectmsg)
router.get('/approve/:id',formCon.getapprovemsg);
router.get('/:id',formCon.getmessage);
router.get('/bydept/:name',formCon.getothermsg);
router.get('/noti/:reqid',formCon.getnotidetail);
router.put('/reject',formCon.reject);

module.exports=router;