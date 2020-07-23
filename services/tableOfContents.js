const axios = require('axios');
const cheerio = require('cheerio')

const toc = {
  async books(){
    let list = await axios.get(`https://www.readlightnovel.org/novel-list`)
    console.log(list);
    return list;
  },
  async chapters(){
    console.log('a')

  },

}
module.exports = toc
