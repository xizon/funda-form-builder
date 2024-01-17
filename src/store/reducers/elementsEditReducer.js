//initialize state
const initialState = {
    show: false,
};

export default (state = initialState, action) => {
    switch (action.type) {

        case 'ELEMENTS_EDIT': {
          return { show: !state.show };
        }   
            
        default:
            return state;
    }
};