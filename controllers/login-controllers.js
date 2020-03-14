const header = "bh-blog";
const AUTH_COOKIE = 'ssid'

const SessionService = require("../services/session-service");
const sessionService = new SessionService;

const users = [
  {
    username: "admin",
    password: "admin"
  }
];

module.exports = class LoginController {
    post(req, res) {    
        //1. user adatok ellenőrzése
        const user = users.find(
          user => user.username === req.body.username && user.password === req.body.password
        );

        if (!user){
            const error = "Error: invalid credentials";
            res.redirect("/login?error=" + error);
            return;
        }
        
        //2. user session létrehozása ha valid volt az adat
        const session = sessionService.registerSession(user);
        res.cookie(AUTH_COOKIE,session.id);

        //3. átirányítás
        res.redirect("/admin");
    }

    get(req,res) {
        const {error,message} = req.query;
        res.render("login", {
          header: header,
          error: error,
          message: message
        })
      }

    logout(req,res) {
      const message = "Logout successfull!";
      res.clearCookie(AUTH_COOKIE);
      sessionService.deleteSession(req.session.id);
      res.redirect("/login?message="+message)
    }
}



