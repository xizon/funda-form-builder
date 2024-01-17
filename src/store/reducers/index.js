import { combineReducers } from 'redux';
import sortableDataReducer from './sortableDataReducer';
import elementsEditReducer from './elementsEditReducer';
import elementTargetDataReducer from './elementTargetDataReducer';

export default combineReducers({
    sortableData: sortableDataReducer,
    elementsEditStatus: elementsEditReducer,
    elementTargetData: elementTargetDataReducer,
    
});

//@link to: `src/index.tsx`, src/store/createStore.js`