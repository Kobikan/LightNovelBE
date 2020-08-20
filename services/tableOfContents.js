const axios = require('axios');
const cheerio = require('cheerio')

const toc = {
  async rln(){
    let list = await axios.get(`https://www.readlightnovel.org/novel-list`)
    return list;
  },
  async chapters(){
    console.log('a')

  },

}
module.exports = toc
