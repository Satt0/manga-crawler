var cache = require("memory-cache");

const getFromCache=(key)=>{
    return cache.get(key)
}


const putToCache=(key,value)=>{
    cache.put(key,value)
}

module.exports={getFromCache,putToCache}