const cors = require('cors');
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


app.use(cors());

app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000)


Router.routesConfig(app)

app.listen(app.get('port'), () => {
  console.log(`Example app listening at ${app.get('port')}`);
});