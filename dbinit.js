const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('blog.db')

db.serialize(function () {
    
    db.run("CREATE TABLE IF NOT EXISTS posts (id integer primary key autoincrement, author text, created_at text, content text, title text)");
    
    db.run("INSERT INTO posts(author,created_at,title,content) VALUES ('admin','1000','New post Title','Valami valami valami')");

});