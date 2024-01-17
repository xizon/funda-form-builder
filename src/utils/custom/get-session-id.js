const sessionId = () => {
    // return authorization header with JWT(JSON Web Token) token
    let user = JSON.parse(localStorage.getItem('SITE_DATA_AUTH'));

    if (user && user.token) {
        return user.token;
    } else {
        return '';
    }
}


// node & browser
module.exports = sessionId;

