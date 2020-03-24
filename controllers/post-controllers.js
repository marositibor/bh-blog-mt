const header = "bh-blog";

const {
  selectAllPosts,
  insertPost,
  selectPost
} = require("../services/db-service");

module.exports = class PostController {
  createNewPost(req, res) {
    console.log(req.form);

    if(!req.form.isValid){
      res.sendStatus(400);
      return;
    }

    const title = req.body.postTitle;
    const content = req.body.postContent;
    const author = req.session.username;

    const post = {
      author,
      title,
      content,
      created_at: Date.now()
    }

    insertPost(post)
      .then(() => res.redirect("/admin"))
  }

  getNewPost(req, res) {
    res.render("new_post", {
      header: header,
    });
  }

  getPostList(req, res) {
    selectAllPosts().then(postList => {
      res.render("postlist", {
        header: header,
        postList
      });
    });
  }

  getPost(req, res) {
    if (!req.params.id) {
      res.redirect("/");
      return;
    }
    selectPost(req.params.id)
      .then(post => {
        res.render("post", {
          header: header,
          post
        });
      })
      .catch(() => {
        res.sendStatus(404);
      })
  }

  validateCreateNewPost(req,res,next){
    req.form = {};
    const invalidFields = [];
    if(req.body.postTitle == undefined || req.body.postTitle == "" ){
      invalidFields.push("Title is required!")
    }

    if(req.body.postContent == undefined || req.body.postContent =="" ){
      invalidFields.push("Content is required!")
    }

    if(invalidFields.length == 0){
      req.form.isValid = true;
      next();
    } else {
      req.form.isValid = false;
      req.form.validationMessage = invalidFields;
      next
    }
  }
  

};
