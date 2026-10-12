import React from 'react';
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client';
import {
    // IMPORTANT NOTE:  
    // Please do not use `BrowserRouter`, otherwise routing will not be available in the CORE PROGRAM
    HashRouter as Router
} from "react-router-dom";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'



// i18n
import './lang/i18n';

import RoutesConfig from './router/routes-config';

// store
import { makeStore } from "./store/createStore";

import './index.scss';

// console.log('makeStore(): ', makeStore().getState()); 
/*
{
    "sortableData": {
        "items": []
    }
}
*/


// error handler (!!! REQUIRED !!!)
const { name } = require('../package.json');
(window as any)[`PLUGIN_HANDLE_ERR_${name}`] = () => {
    // This is the default homepage URL of the project, BUT you cannot use `/` (because if the child projects all use routing, 
    // it will actually only change the hash after being mounted to the CORE PROGRAM, and the routing will still take effect. 
    // To prevent routing conflicts, you cannot use a single slash. )
    // At least it must be a URL with parameters, such as `/index-project-1`, `/index-project-2/0/-1`, `/index-project3`
    location.hash = `/page-form-builder-index`;
}


//
const root = createRoot(
    document.getElementById('root') as HTMLDivElement
);
root.render(
    <React.StrictMode>

        <Provider store={makeStore()}>
            <DndProvider backend={HTML5Backend}>
                <Router>
                    <RoutesConfig />
                </Router>
            </DndProvider>
        </Provider>


    </React.StrictMode>
);