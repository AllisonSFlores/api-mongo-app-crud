const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Router = require('./Router/routes');

require('dotenv').config()
const uri = process.env.DBURL;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('conectado a mongodb'))
  .catch(e => console.log('error de conexión', e))


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Origin, Accept, Authorization, Content-Type, X-Requested-With, Range');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  } else {
    return next();
  }
});

app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000)


Router.routesConfig(app)

app.listen(app.get('port'), () => {
  console.log(`Example app listening at ${app.get('port')}`);
});