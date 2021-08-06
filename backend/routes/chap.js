const router=require('express').Router({mergeParams:true})
const Handler=require('../handlers/chapHandler')


router.use('/list',Handler.getAllChap)// req.query={name}
router.use('/',Handler.getSingleChapImages)// req.query={name,chap}
module.exports=router