/**
 * Wrap global event listeners
 * 
 * @param {?String|?Array} event 
 * @param {?Function} fn
 */

/*
Usage:

const test1 = eventWrapper('mousemove', () => {
    console.log('test1');
});
const test2 = eventWrapper(['scroll', 'touchmove'], () => {
    console.log('test2');
});

document.addEventListener('mousemove', test1);
window.addEventListener('scroll', test2);
window.addEventListener('touchmove', test2);


//
console.log(getEventListeners());
removeEventListeners();


*/

const eventGlobalVar = 'SITE_EVENT_LISTENERS';

const eventWrapper = (event, fn) => {
    const _name = `n-${Math.random()}`.replace(/\./g, '');
    if (typeof window[eventGlobalVar] !== 'undefined') {
        if (Array.isArray(event)) {
            event.forEach((e) => {
                window[eventGlobalVar].push({ "name": `${_name}-${e}`, "event": e, "fn": fn });
            });
        } else {
            window[eventGlobalVar].push({ "name": `${_name}-${event}`, "event": event, "fn": fn });
        }
    } else {
        if (Array.isArray(event)) {
            event.forEach((e) => {
                window[eventGlobalVar] = [{ "name": `${_name}-${e}`, "event": e, "fn": fn }];
            });
        } else {
            window[eventGlobalVar] = [{ "name": `${_name}-${event}`, "event": event, "fn": fn }];
        }
       
        
    }
    return fn;
}

const getEventListeners = () => {

    if (window[eventGlobalVar] !== 'undefined' && Array.isArray(window[eventGlobalVar])) {
        return window[eventGlobalVar];
    }

    return [];
}

const removeEventListeners = () => {
    getEventListeners().forEach((ev) => {
        document.removeEventListener(ev.event, ev.fn);
        window.removeEventListener(ev.event, ev.fn);
        window[eventGlobalVar] = getEventListeners().filter((item) => item.name !== ev.name);
    });
}


// node & browser
module.exports = {
    eventWrapper,
    getEventListeners,
    removeEventListeners
};
