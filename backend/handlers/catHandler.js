const axios=require('axios')
const DomParser=require('dom-parser')
const {getFromCache,putToCache}=require('./cache')


exports.getByCategory=async(req,res,next)=>{
    try{
        const {category,page=0}=req.query
        const key=category+page
        const fromCache=getFromCache(key)
        if(fromCache){
            return res.json(fromCache)
        }
        const url=`https://truyentranhlh.net/the-loai/${category}?page=${page}`
        const raw=await axios.get(url).then(({data})=>data)
        const DOM=(new DomParser()).parseFromString(raw).getElementsByClassName('thumb-item-flow col-6 col-md-3')
        const lists=Array.from(DOM).map(e=>{
            const title=e.getElementsByClassName("thumb_attr series-title")[0].textContent.trim()
            const id=e.getElementsByTagName('a')[0].getAttribute('href').split('/')[4]
            const bg=e.getElementsByClassName('content img-in-ratio')[0].getAttribute('data-bg')
            return {title,bg,id}
        })
        putToCache(key,lists)
        return res.json(lists)

    }catch(e){
        next(e)
    }
}
