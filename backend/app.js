const app=require('express')()
const cors=require('cors')
const logger=require('morgan')

// routing declare
const chapRouter=require('./routes/chap')
const catRouter=require('./routes/categories')
const inforRouter=require('./routes/information')

// middleware
app.use(cors())
app.use(logger('dev'))

// routes
app.use('/chap',chapRouter)
app.use('/category',catRouter)
app.use('/information',inforRouter)



// error handler
app.use((err,req,res,next)=>{
    res.status(404).json({error:err.message})
})

const PORT=process.env.PORT || 3003
app.listen(PORT,()=>{
    console.log("🚀 server started at",PORT);
})