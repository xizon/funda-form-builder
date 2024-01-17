const io = require('./io');

const sessionExpiresAction = (data) => {
    if ( typeof data === 'undefined' ) return;

    // If the session expires, the backend will return a grpc error
    // User needs to log in again
    if ( data.toString() === 'Error' ) {
        
        // Core Communication
        io('BRIDGE_ALERT', {process: 1, modal: 1, info: '登录状态已过期，或服务出现错误无法执行数据库方法，请重新登录或联系管理员。 <br /><a href="#" id="app-err-server-back" class="btn btn-primary btn-sm mt-2">重新登录</a>'});
    }
}

// node & browser
module.exports = sessionExpiresAction;


