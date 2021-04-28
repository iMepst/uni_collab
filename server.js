//Initialisierung Express
const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));

//Initialisierung body-parser
const bodyParser = require("body-parser");
const { render } = require("ejs");
app.use(bodyParser.urlencoded({ extended: true }));

//Initialisierung express-fileupload
const fileUpload = require('express-fileupload');
app.use(fileUpload());

//Initialisierung cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//Initialisierung EJS
app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");

//Initialisierung sqlite Datenbank
const DATABASE = "user.db"
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(DATABASE);

// Initialisierung express-session
const session = require('express-session');
app.use(session({
    secret: 'example',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

//Server starten
app.listen(3000, function () {
    console.log("server runs on port 3000");
});

//Zugriff auf views - Dateien
app.get("/landingPage", function (req, res) {
    res.sendFile(__dirname + "/views/landingPage.html");
})