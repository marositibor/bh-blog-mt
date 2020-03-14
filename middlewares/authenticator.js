const SessionService = require("../services/session-service");
const sessionService = new SessionService;
const AUTH_COOKIE = 'ssid'


module.exports = function(req,res,next) {
    const authCookie = req.cookies[AUTH_COOKIE]

    const session = sessionService.getSession(authCookie);
    
    if(!session){
        const error = "Error: login required";
        res.redirect("/login?error=" + error);
        return
    }

    req.session = session
    next()
}