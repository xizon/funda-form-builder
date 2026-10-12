/**
 * Convert database string to component format
 * @param {String} str 
 * @returns {String} such as: 1,SYS TEM,2,POIW
 */
function databaseToComponentValue(str) {
    const res = str.match(/[^\[]+(?=(\[ \])|\])/g);
    return res === null ? '' : res.join(',').replace(/\,+$/, '');
}

/**
 * Convert component value to database string
 * @param {String} str 
 * @returns {String} such as: [1][SYS TEM][2][POIW]
 */
function componentValueToDatabase(str) {
    if ( str.length === 0 ) return '';
    return str.split(',').map((v) => `[${v}]`).join('');
}

// node & browser
module.exports = {
    databaseToComponentValue,
    componentValueToDatabase
};

