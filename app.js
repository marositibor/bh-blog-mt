const express = require("express");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");


const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', hbs({
  extname: '.handlebars',
  helpers: require('./config/handlebars-helpers')
}));

app.set("view engine", "handlebars");

const LoginController = require("./controllers/login-controllers");
const PostController = require("./controllers/post-controllers");
const authenticator = require("./middlewares/authenticator.js");


const loginContoller = new LoginController;
const postController = new PostController;

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


const header = "bh-blog";

const AUTH_COOKIE = 'ssid'

app.get("/", postController.getPostList);

app.get("/post/:id", postController.getPost)

app.get("/login", loginContoller.get);

app.post("/login", loginContoller.post);

app.get("/admin", authenticator, (req,res) => {
  res.render("dashboard", {
    header: header,
    username: req.session.username
  });
})

app.get("/admin/post_list", authenticator, postController.getPostListAdmin)

app.get("/new_post", authenticator, postController.getNewPost)

app.get("/edit_post/:id", authenticator, postController.getEditPost)

app.post("/new_post", authenticator, postController.validateCreateNewPost, postController.createNewPost)

app.post("/edit_post/:id", authenticator, postController.validateCreateNewPost, postController.editPost)

app.get("/logout", authenticator, loginContoller.logout)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));