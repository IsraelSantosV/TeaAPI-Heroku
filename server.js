const express = require ('express');
const routes = require('./routes/tea');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');

require('dotenv').config();

const app = express();
app.use(helmet());
app.use(compression());

app.use(express.json());
app.use('/', routes);

app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/index.html");
});

mongoose.connect(
    process.env.MONGODB_URI,
    function (err) {
      if (err) return console.log("Error: ", err);
      console.log(
        "MongoDB Connection -- Ready state is:",
        mongoose.connection.readyState
      );
    }
  );


app.listen(process.env.PORT || 3000);