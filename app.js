const express = require('express');
const bodyParser = require('body-parser');
const createTable = require('./services/createTables');
const scheduled = require('./services/scheduled');
const cors = require('cors');
const app = express();
const port = 3001;


app.use(bodyParser.json())
app.use(cors({origin:true,credentials: true}));
app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.listen(port, () =>{
  createTable.user();
  createTable.novels();
  scheduled.novels();
    console.log(`Example app listening on port ${port}!`);
});
app.use('/book', require('./routes/book'));
app.use('/list', require('./routes/list'));
app.use('/login', require('./routes/login'));
