const express = require("express");
const bodyParser = require("body-parser"); 
const app = express();
const cors = require('cors');

const port = 3000

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require("./routes/knight.route")(app);

app.listen(port);


