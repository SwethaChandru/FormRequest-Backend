var express=require('express');
var router=express.Router();

const notiCon=require('../Controllers/notiControllers');

router.post('/',notiCon.addnoti);
router.get('/:id',notiCon.getnoti);

module.exports=router;