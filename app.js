const express = require("express");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

const LoginController = require("./controllers/login-controllers");
const authenticator = require("./middlewares/authenticator.js");


const loginContoller = new LoginController;

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("handlebars", hbs());
app.set("view engine", "handlebars");

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


const header = "bh-blog";

const AUTH_COOKIE = 'ssid'


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

app.get("/login", loginContoller.get);

app.post("/login", loginContoller.post);

app.get("/admin", authenticator, (req,res) => {
  res.render("dashboard", {
    header: header,
    username: req.session.username
  });
})

app.get("/logout", authenticator, loginContoller.logout)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));