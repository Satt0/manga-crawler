const router=require('express').Router({mergeParams:true})
const {getByCategory} = require('../handlers/catHandler')



router.get('/',getByCategory)






module.exports=router