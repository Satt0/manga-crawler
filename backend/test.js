const axios =require('axios')
const DomParser=require('dom-parser')

const url='https://truyentranhlh.net/the-loai/co-dai'

async function Crawl(){
    const data =await axios.get(url).then(({data})=>data)
    const DOM=(new DomParser()).parseFromString(data).getElementsByClassName("filter-type unstyled clear row")[0]

    const list=DOM.getElementsByTagName('a')
    const category=Array.from(list).map(e=>({name:e.textContent,id:e.getAttribute('href').split('/')[4]}))
    console.log(category);
}
Crawl()