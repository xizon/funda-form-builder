const getSessionId = require('./get-session-id');

/**
 * Core Communication with socket.io
 * 
 * @param {String} event 
 * @param {*} data 
 * @param {Function} callback 
 */
const io = (event, data, callback = () => void(0)) => {
    const appId = window.location.href.split('//')[1].split('/')[1];
    const sendData = {
        appId: appId,
        sid: getSessionId(),
        data: data
    };

    if ( ! window['CORE_PROGRAM'] ) {
        console.warn('You are currently in the "independent debugging" state and have not been mounted under the CORE PROGRAM. The io interface cannot be triggered, and the information will be output using the "console" panel.');

        console.log('\x1b[36m%s\x1b[0m', `${JSON.stringify(sendData)}`);
    } else {
        if ( typeof window.io !== 'undefined' ) {
            const serverPort = window['WEBSOCKET_SERVER_PORT'];
            const socket = window.io(typeof serverPort !== 'undefined' ? `${window.location.hostname}:${serverPort}` : window.location.host);
            socket.emit(event, sendData, callback);
        } else {
            console.warn('The io interface does not exist, please make sure "socket.io.min.js" has been loaded in CORE PROGRAM.');
            
        }
    }

}

// node & browser
module.exports = io;
