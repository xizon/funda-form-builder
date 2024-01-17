/**
 * Format language string for options
 * @param {JSON | Array | String} data      - Language string in JSON or Array format.
 * @param {i18next} i18n   - i18next.
 * @returns JSON
 */
function formatLangStringForOptions(odata, i18n) {

    let newData = null;
    const data = typeof odata === 'string' ? JSON.parse(odata) : odata;
    const langName = localStorage.getItem('SITE_LANG');
    if (langName !== null) {
        const trans = i18n.store.data[`${langName === null ? 'zh' : langName}`]?.translation;
        if ( typeof trans !== 'undefined' ) {

            // if is array
            if (Array.isArray(data)) {
                
                newData = data.map((v) => {
                    return {
                        "label": typeof trans[v.label] !== 'undefined' && trans[v.label] !== '' ? trans[v.label] : v.label,
                        "value": v.value,
                        "queryString": v.queryString
                    }
                })
       
            } else {
                newData = {};
                const keys = Object.keys(data);
                const vals = Object.values(data);
                
                keys.forEach( (item, i) => {
                
                    if ( typeof trans[item] !== 'undefined' && trans[item] !== '' ) {
                        newData[trans[item]] = typeof trans[vals[i]] !== 'undefined' && trans[vals[i]] !== '' ? trans[vals[i]] : vals[i];
                    } else {
                        newData[keys[i]] = vals[i];
                    }
                });
            }


            return newData;

        } else {
            return data;
        }
    } else {
        return data;
    }
    
    
}




// node & browser
module.exports = {
    formatLangStringForOptions
}
