const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("blog.db");

module.exports = class {
  static selectAllPosts() {
    return new Promise((resolve, reject) => {
      db.all("SELECT id,title,author,created_at,content from posts", function(
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
      "INSERT INTO posts(author,created_at,title,content) VALUES (?,?,?,?)";

    return new Promise(function(resolve, reject) {
      db.run(sql, [post.author, post.created_at, post.title, post.content], function(err) {
        if (err) {
          console.log(err.message);
          reject(err);
        }
        console.log(`post inserted with id: ${this.lastID}`);
        resolve();
      });
    });
  }

  static selectPost(id) {
    const sql =
      "SELECT id,title,author,created_at,content from posts WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.get(sql, id, function(err, result) {
        if (err) {
          console.log(err.message);
          reject(err);
        } else {
          if(!result) reject(err);
          resolve(result);
        }
      });
    });
  }
};
