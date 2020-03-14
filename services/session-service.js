const sessions = {}

module.exports = class SessionService{

    getSession(sessionId){
        return sessions[sessionId];
    }

    registerSession(user){
        const sessionId = Math.floor(Math.random()*10000)
        sessions[sessionId] = {
            id: sessionId,
            username: user.username
        };
        console.log("registering session" + JSON.stringify(sessions[sessionId]))        
        return sessions[sessionId];
    }

    deleteSession(sessionId){
        delete sessions[sessionId];
        console.log("registered session" + JSON.stringify(sessions))
    }
}