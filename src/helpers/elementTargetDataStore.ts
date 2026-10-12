
export function getElementTargetDataStore() {
    const _val = localStorage.getItem('ELEMENT_DATA');
    return _val !== null ? JSON.parse(_val) : null;
}

export function updateElementTargetDataStore(_id: string | null, _fields: any[], _section: any) {

    const res = {
        state: {
            elementTargetData: {
                data: {
                    id: _id,
                    fields: _fields,
                    section: _section
                }
            }
        }
    };

    localStorage.setItem('ELEMENT_DATA', JSON.stringify(res));

    return res;
}


export function destroyElementTargetDataStore() {
    localStorage.removeItem('ELEMENT_DATA');
}


