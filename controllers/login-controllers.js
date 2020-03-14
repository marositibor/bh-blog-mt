module.exports = class LoginController {
    post(req, res) {
        const loginService = new loginService()
    
        //1. user adatok ellenőrzése
        const user = loginService.getAuthenticatedUser(req.username, req.password);
        if (!user){
            res.send("user not found")
            return;
        }
        
        //2. user session létrehozása ha valid volt az adat
        const session = registerSession(user);
        res.cookie("sessid",session.id);
        //3. átirányítás
        res.redirect("/admin");
    }
}