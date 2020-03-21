const header = "bh-blog";

const {
  selectAllPosts,
  insertPost,
  selectPost
} = require("../services/db-service");

module.exports = class PostController {
  createNewPost(req, res) {
    console.log(req.validationMessage);
    if(req.validationMessage){
      res.redirect("/new_post?validate="+req.validationMessage)
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
      .catch(() => res.redirect("/new_post?validate=true"));
  }

  getNewPost(req, res) {
    const validation = req.query.validate;
    res.render("new_post", {
      header: header,
      validation
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
      res.redirect("/admin");
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
    const invalidFields = [];
    if(req.body.postTitle == undefined || req.body.postTitle == "" ){
      invalidFields.push("Title is required!")
    }

    if(req.body.postContent == undefined || req.body.postContent =="" ){
      invalidFields.push("Content is required!")
    }
    
    if(invalidFields.length > 1){
      req.validationMessage = "Fill all required fields!"
      next();
    }

    req.validationMessage = invalidFields[0];
    next(); 
  }
  

};
