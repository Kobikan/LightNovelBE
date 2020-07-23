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
  async decode(){
    console.log('calling');
    let data = await axios.get('https://www.readlightnovel.org/zhan-long/chapter-942')
    return data;
  },
  async encode(){
    console.log('a')

  },

}
module.exports = read
