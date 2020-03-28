const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('blog.db')

db.serialize(function () {
    
    db.run("CREATE TABLE IF NOT EXISTS posts (id integer primary key autoincrement,slug text NOT NULL UNIQUE, author text, created_at integer, content text, title text, publish boolean DEFAULT FALSE)");
    
    db.run(`INSERT INTO posts(slug,author,created_at,title,content,publish) VALUES ('new-post-title1','admin',${new Date("1995-01-17T03:24:00").getTime()},'New post Title','Valami valami valami',TRUE)`);
    db.run(`INSERT INTO posts(slug,author,created_at,title,content,publish) VALUES ('new-post-title5','admin',${new Date("1995-01-17T03:24:00").getTime()},'New post Title','Valami valami valami',TRUE)`);
    db.run(`INSERT INTO posts(slug,author,created_at,title,content,publish) VALUES ('new-post-title3','admin',${new Date("1995-02-17T03:24:00").getTime()},'New post Title','Valami valami valami',TRUE)`);
    db.run(`INSERT INTO posts(slug,author,created_at,title,content,publish) VALUES ('new-post-title','admin',${new Date("1995-12-17T03:24:00").getTime()},'New post Title','Valami valami valami',TRUE)`);
    db.run(`INSERT INTO posts(slug,author,created_at,title,content,publish) VALUES ('new-post-title2','admin',${new Date("1995-12-17T03:24:00").getTime()},'New post Title','Valami valami valami',TRUE)`);
    db.run(`INSERT INTO posts(slug,author,created_at,title,content,publish) VALUES ('new-post-title7','admin',${new Date("1995-12-17T03:24:00").getTime()},'New post Title','Valami valami valami',TRUE)`);
    db.run(`INSERT INTO posts(slug,author,created_at,title,content,publish) VALUES ('my-draft','admin',${new Date("2005-12-17T03:24:00").getTime()},'My Draft Title','Draft draft draft',FALSE)`);
    db.run(`INSERT INTO posts(slug,author,created_at,title,content,publish) VALUES ('new-post-title6','admin',${new Date("2007-07-17T03:24:00").getTime()},'New post Title','Valami valami valami',TRUE)`);
    db.run(`INSERT INTO posts(slug,author,created_at,title,content,publish) VALUES ('new-post-title4','admin',${new Date("2013-01-17T03:24:00").getTime()},'New post Title','Valami valami valami',TRUE)`);

});