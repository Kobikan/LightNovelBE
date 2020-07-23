const express = require('express');
const bodyParser = require('body-parser');
const createTable = require('./services/createTables');
const app = express();
const port = 3000;


app.use(bodyParser.json())
app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.listen(port, () =>{
    createTable.user();
    console.log(`Example app listening on port ${port}!`);
});
app.use('/book', require('./routes/book'));
app.use('/list', require('./routes/list'));
