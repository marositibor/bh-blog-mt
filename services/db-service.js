const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("blog.db");

module.exports = class {
  static selectAllPosts() {
    return new Promise((resolve, reject) => {
      db.all("SELECT id,title,author,created_at,content,publish from posts", function(
        err,
        results
      ) {
        if (err) {
          console.log(err.message);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static selectPublishedPosts(searchQuery) {

    const select = "SELECT id,title,author,created_at,content,publish from posts WHERE publish = true "
    const search = searchQuery ? "AND (title LIKE ? OR content LIKE ? )" : ""
    const order_by = "ORDER BY created_at DESC "
  
    const sql = select + search + order_by;

    const params = [sql];

    if(searchQuery){
      params.push(["%"+searchQuery+"%","%"+searchQuery+"%"])
    }
    
    return new Promise((resolve, reject) => {
      db.all(...params, function(
        err, 
        results
      ) {
        if (err) {
          console.log(err.message);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static insertPost(post) {
    const sql =
      "INSERT INTO posts(slug,author,created_at,title,content,publish) VALUES (?,?,?,?,?,?)";

    return new Promise(function(resolve, reject) {
      db.run(
        sql,
        [post.slug, post.author, post.created_at, post.title, post.content, post.publish],
        function(err) {
          if (err) {
            console.log(err.message);
            reject(err);
          }
          console.log(`post inserted with id: ${this.lastID}`);
          resolve();
        }
      );
    });
  }

  static selectPostById(id) {
    const sql =
      "SELECT id,slug,title,author,created_at,content,publish from posts WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.get(sql, id, function(err, result) {
        if (err) {
          console.log(err.message);
          reject(err);
        } else {
          if (!result) reject("No such post");
          resolve(result);
        }
      });
    });
  }

  static selectPostBySlug(slug) {
    const sql =
      "SELECT id,slug,title,author,created_at,content,publish from posts WHERE slug = ?";
    return new Promise((resolve, reject) => {
      db.get(sql, slug, function(err, result) {
        if (err) {
          console.log(err.message);
          reject(err);
        } else {
          if (!result) reject("No such post");
          resolve(result);
        }
      });
    });
  }

  static updatePost(post) {
    const sql =
      "UPDATE posts SET slug = ?, title = ?, content = ?, publish = ? WHERE id = ?";

    return new Promise(function(resolve, reject) {
      db.run(
        sql,
        [post.slug, post.title, post.content, post.publish, post.id],
        function(err) {
          if (err) {
            console.log(err.message);
            reject(err);
          }
          console.log(`post(id: ${post.id}) updated`);
          resolve();
        }
      );
    });
  }
};
