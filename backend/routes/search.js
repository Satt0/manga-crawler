const router=require('express').Router({mergeParams:true})




router.use((req,res)=>{
    res.send("underconstructions")
})





module.exports=router