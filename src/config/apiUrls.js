
const prodUrl = (myProtocol, myHostname, myPort, specifiedPort = '') => {
    if (typeof window !== 'undefined') {
        return window.location.hostname === 'localhost' ? `${myProtocol}://${myHostname}:${myPort}` : `${window.location.protocol}//${window.location.hostname}:${specifiedPort === '' ? window.location.port : specifiedPort}`;
    } else {
        return specifiedPort === '' ? '{reqUrl}' : `{reqUrl}:${specifiedPort}`;
    }
};



const config = {
    /*
     TYPE: Nodejs Services (fixed port:30021)
     ------------------------------------------
    */
     "PLUGIN_RAW_SCRIPT": `${prodUrl('http','192.168.1.170','30021','30021')}/raw-script`,
     "PLUGIN_RAW_STYLES": `${prodUrl('http','192.168.1.170','30021','30021')}/raw-styles`
};

const testConfig = {
    /*
     TYPE: Nodejs Services (fixed port:4001)
     ------------------------------------------
    */
     "PLUGIN_RAW_SCRIPT": "http://localhost:4001/raw-script",
     "PLUGIN_RAW_STYLES": "http://localhost:4001/raw-styles"


};


// Global variables passed from the CORE PROGRAM
const urls = typeof window !== "undefined" && window['NODE_ENV'] && window['NODE_ENV'] === 'production'
    ? config
    : testConfig;

// node & browser
module.exports = urls;

