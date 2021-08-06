const axios = require("axios");
const DomParser = require("dom-parser");
const {getFromCache,putToCache}=require('./cache')

exports.getSingleChapImages = async (req, res, next) => {
  try {
    // ---

    const { name, chap } = req.query;
    const key=name+chap
    const fromCache=getFromCache(key)
    if(fromCache){
      return res.json(fromCache)
    }
    const url = `https://truyentranhlh.net/truyen-tranh/${name}/${chap}`;
    const data = await axios.get(url).then(({ data }) => data);
    const DOM = new DomParser()
      .parseFromString(data)
      .getElementById("chapter-content");
    // ---
    const listOfImages = Array.from(DOM.getElementsByTagName("img"));
    const chaps = listOfImages.map((e) => {
      return e.getAttribute("data-src");
    });
    putToCache(key,{chaps:chaps})
    // ---
    res.json({ chaps: chaps });
  } catch (e) {
    next(e);
  }
};
exports.getAllChap = async (req, res, next) => {
  try {
    const { name } = req.query;
    const key=name
    const fromCache = getFromCache(key);
    if (fromCache) {
      return res.json({ list: fromCache });
    }
    const chapList = await getFromServerChap({ name });
    putToCache(key,chapList)
    return res.json({ list: chapList });
  } catch (e) {
    next(e);
  }
};


const getFromServerChap = async ({ name }) => {
  const url = `https://truyentranhlh.net/truyen-tranh/${name}`;
  const data = await axios.get(url).then(({ data }) => data);
  const DOM = new DomParser()
    .parseFromString(data)
    .getElementsByClassName("list-chapters at-series")[0];
  const chapList = Array.from(DOM.getElementsByTagName("a")).map((e) => {
    const raw = e.getAttribute("href");
    const [name, chap] = raw.split("/").splice(4);
    const title = e
      .getElementsByClassName("chapter-name text-truncate")[0]
      .textContent.trim();
    return { name, chap, title };
  });
  return chapList;
};
