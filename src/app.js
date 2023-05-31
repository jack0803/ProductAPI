const express = require('express');
const indexRoute = require('./routers/index.js');
const productRoute = require('./routers/product.js');
const app = express()
const port = process.env.PORT || 3000
const bodyparser = require('body-parser')

// parse application/json
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
  }));
app.use(express.json())
app.use(indexRoute);


app.listen(port,() =>{
    console.log('server started! ' + port);
})