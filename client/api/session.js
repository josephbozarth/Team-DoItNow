
function getToken() {
    return window.sessionStorage.agilityToken;
}

function isLoggedIn() {
    return window.sessionStorage.agilityToken && window.sessionStorage.agilityToken.length > 0;
}

function signOn(login) {
    window.sessionStorage.agilityUser = JSON.stringify(login);
    window.sessionStorage.agilityToken = login.token;
    
    window.location = '/app/dashboard';
}

function signOff() {
    window.sessionStorage.agilityUser = null;
    window.sessionStorage.agilityToken = null;
    window.location = '/';
}

function getSessionUser() {
    return JSON.parse(window.sessionStorage.agilityUser);
}

module.exports = {
    getToken, getSessionUser, isLoggedIn, signOn, signOff
}