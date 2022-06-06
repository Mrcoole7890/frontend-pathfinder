var express = require("express");
var app = express();
var bodyParser = require('body-parser');

app.use(express.static("public"));

app.get("/", (req, res) => {
    console.log("user connected");
    res.sendFile("public/index.html", {root: __dirname});
});

app.listen(4200, () => {
    console.log("listening!");
});
