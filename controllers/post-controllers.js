const header = "bh-blog";
const posts = [];

const {getAllPosts, insertPost} = require("../services/db-service");

module.exports = class PostController {
  post(req, res) {
    if(req.body.postTitle === "" || req.body.postContent === ""){
        res.redirect("/new_post?validate=true");
        return;
      }
    const { postTitle, postContent } = req.body;
    const author = req.session.username;
    const created_at = Date.now();
    const id = Math.floor(Math.random() * 10000);

    insertPost(author,created_at,postTitle,postContent)
    .then(res.redirect("/admin"))
    .catch(res.redirect("/new_post?validate=true"))
  }

  get(req, res) {
      const validation = req.query.validate;
    res.render("new_post", {
      header: header,
      username: req.session.username,
      validation
    });
  }

  getPostList(req, res) {
    getAllPosts().then(postList =>{
      res.render("postlist", {
        header: header,
        postList
      });
    })

  }
};