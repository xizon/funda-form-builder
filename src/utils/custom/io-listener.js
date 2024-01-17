/**
 * Connection listener with socket.io
 * 
 * @param {Array} {event: String, callback: Function}<Array>
 */
/*
Example:

const socket = ioListener([
    {
        event: 'BRIDGE_ALERT',
        callback: (msg, socketInstance) => {
            console.log(msg);
            // do something
        }
    },
    {
        event: 'DISCONNECT',
        callback: (msg, socketInstance) => {
            console.log(msg);
            socketInstance.disconnect();
        }
    }
]);

// socket.disconnect();

*/
const ioListener = (arr) => {

    let socketInstance = null;

    if ( ! window['CORE_PROGRAM'] ) {
        console.warn('You are currently in the "independent debugging" state and have not been mounted under the CORE PROGRAM. The io interface cannot be triggered, and the information will be output using the "console" panel.');
    } else {
        if ( typeof window.io !== 'undefined' ) {
            const serverPort = window['WEBSOCKET_SERVER_PORT'];
            const socket = window.io(typeof serverPort !== 'undefined' ? `${window.location.hostname}:${serverPort}` : window.location.host);

            socketInstance = socket;
            
            arr.forEach((item) => {
                socket.on(item.event, function (msg) {
                    if (typeof item.callback === 'function') item.callback.call(null, msg, socket);
                });
            });

        } else {
            console.warn('The io interface does not exist, please make sure "socket.io.min.js" has been loaded in CORE PROGRAM.');
            
        }
    }

    return socketInstance;

}

// node & browser
module.exports = ioListener;
