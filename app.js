const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars", hbs());
app.set("view engine", "handlebars");
app.use(cookieParser());
app.use(express.static("public"));

const header = "bh-blog";

const postList = [{ 
    author: "admin", 
    date: "2020.01.01",
    title: "Lorem ipsum",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum congue elementum. Quisque non semper risus, bibendum faucibus odio. Ut eu dolor vel erat varius rutrum eu in massa. Aliquam semper, velit eu tempus lobortis, ex justo sagittis sapien, vitae venenatis purus odio sit amet diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus turpis ante, sollicitudin viverra molestie sit amet, lobortis eget purus. Etiam ac ultrices mauris." 
},
{ 
    author: "admin", 
    date: "2020.01.01",
    title: "Lorem ipsum",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum congue elementum. Quisque non semper risus, bibendum faucibus odio. Ut eu dolor vel erat varius rutrum eu in massa. Aliquam semper, velit eu tempus lobortis, ex justo sagittis sapien, vitae venenatis purus odio sit amet diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus turpis ante, sollicitudin viverra molestie sit amet, lobortis eget purus. Etiam ac ultrices mauris." 
},
{ 
    author: "admin", 
    date: "2020.01.01",
    title: "Lorem ipsum",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum congue elementum. Quisque non semper risus, bibendum faucibus odio. Ut eu dolor vel erat varius rutrum eu in massa. Aliquam semper, velit eu tempus lobortis, ex justo sagittis sapien, vitae venenatis purus odio sit amet diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus turpis ante, sollicitudin viverra molestie sit amet, lobortis eget purus. Etiam ac ultrices mauris." 
}];

app.get("/", (req, res) => {
  res.render("postlist", {
    header: header,
    postList: postList
  });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));