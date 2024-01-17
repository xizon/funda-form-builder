//initialize state
const initialState = {
    items: [],
};

export default (state = initialState, action) => {
    switch (action.type) {

        case 'SORTABLE_DATA': {
          return { ...state, items: action.payload };
        }   
            
        default:
            return state;
    }
};