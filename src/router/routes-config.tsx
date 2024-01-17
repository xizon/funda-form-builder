import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import PageNoMatch from '../components/PageNoMatch';
import PageIndex from '../components/PageIndex';


//
// Avoid ERROR: NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.
// replace the fragment with a <div> instead. like this:  return <div><Routes>...</Routes></div>;
const routesConfig = () => {
    return <div>
        <Routes>

            <Route
                path="/404"
                element={<Navigate to="/error-page" />}
            />
            <Route
                path="/"
                element={<Navigate to="/page-form-builder-index" />}
            />
            <Route path="/page-form-builder-index" element={<PageIndex />} />
            <Route path="*" element={<PageNoMatch />} />

        </Routes>
    </div>;

}


export default routesConfig;
