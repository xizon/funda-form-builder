const actionCreators = (id, fields, section) => {

    const action = {
        type: 'ELEMENT_DATA',
        payload: {
            id,
            fields,
            section
        }
    }    

    return action;
}

export default actionCreators;
