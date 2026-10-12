const io = require('./io');

const sessionExpiresAction = (data) => {
    if ( typeof data === 'undefined' ) return;

    // If the session expires, the backend will return a grpc error
    // User needs to log in again
    if ( data.toString() === 'Error' ) {
        
        // Core Communication
        io('BRIDGE_ALERT', {process: 1, modal: 1, info: 'Session expired, or a server error prevented the database operation. Please sign in again or contact the administrator. <br /><a href="#" id="app-err-server-back" class="btn btn-primary btn-sm mt-2">Sign in again</a>'});
    }
}

// node & browser
module.exports = sessionExpiresAction;


