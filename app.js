const express = require("express");

const app = express();

app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    // res.render
    res.render("index");
})
app.get("/playList", function (req, res) {
    res.render("playList");
})
app.get("*", function (req, res) {
    res.render("404");
})

app.listen(process.env.PORT || 3000, () => {
    console.log("server is running");
})