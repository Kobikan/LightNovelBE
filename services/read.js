const axios = require('axios');
const cheerio = require('cheerio')

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}
const read = {
  async chapter(link, chapterNumber){
    let data = await axios.get(link + "/chapter-" + chapterNumber)
    return data;
  },
  async toc(link){
    let data = await axios.get(link)
    return data;
  },
}
module.exports = read
