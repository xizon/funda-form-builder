const actionCreators = (itemData) => {

    const action = {
        type: 'SORTABLE_DATA',
        payload: itemData
    }    

    return action;
}

export default actionCreators;
