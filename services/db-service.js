const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("blog.db")

module.exports = class {
    static getAllPosts(){
        return new Promise((resolve, reject) => {
            db.all("SELECT id,title,author,created_at,content from posts", function(err, results) {
              if (err) {
                console.log(err.message);
                reject(err);
              } else {
                resolve(results);
              }
            });
          });
    }

    static insertPost(author,created_at,title,content){
        const sql = "INSERT INTO posts(author,created_at,title,content) VALUES (?,?,?,?)";

        return new Promise(function (resolve,reject) {
            db.run(sql, [author,created_at,title,content], function (err) {
                if (err) {
                    console.log(err.message);
                    reject(err);
                }
                console.log(`post inserted with id: ${this.lastID}`);
                resolve()
                })
        })
    }
}
