//initialize state
const initialState = {
    data: {
        id: null,
        fields: [],
        section: null
    }
};

export default (state = initialState, action) => {
    switch (action.type) {

        case 'ELEMENT_DATA': {
            return {
                ...state,
                data: action.payload
            };
        }

        default:
            return state;
    }
};