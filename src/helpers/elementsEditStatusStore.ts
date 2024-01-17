
export function getElementsEditStatusStore() {
    const _val = localStorage.getItem('ELEMENTS_EDIT');
    return _val !== null ? JSON.parse(_val) : null;
}

export function updateElementsEditStatusStore(val: boolean) {

    const res = {
        state: {
            elementsEditStatus: {
                show: val
            }
        }
    };

    localStorage.setItem('ELEMENTS_EDIT', JSON.stringify(res));

    return res;
}



export function destroyElementsEditStatusStore() {
    localStorage.removeItem('ELEMENTS_EDIT');
}
