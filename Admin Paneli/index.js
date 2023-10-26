const express = require("express");

const app = express();

const path = require("path");


app.set("view engine", "ejs");
app.use("/static", express.static("public"));
app.use(express.urlencoded({extended: false}));



const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");


app.use(express.static("node_modules"));
app.use(express.static("public"));


app.use(adminRoutes);
app.use(userRoutes);



app.listen(3000, function() {
    console.log("listening on port 3000");
});