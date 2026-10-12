import { useEffect, useState, useCallback } from "react";
import PageLayout from '../PageLayout';

// i18n
import { withTranslation } from 'react-i18next';

import SideMenu from '../SideMenu';
import { 
    GridElem as DDTargetGridElem
} from '../DDTarget';
import { 
    Brand, 
    LeftTools,
    RightTools
} from '../DDLayouts';


import ElementsEdit from "../ElementsEdit";

// store
import { useDispatch } from "react-redux";
import sortableDataActions from "../../store/actions/sortableDataActions";
import { saveSortableData } from '../../helpers/saveSortableData';


type HomepageProps = {
    t: any
    sysConfiguration: any[];
    defaultData?: any[] | null;
    tempListData?: any[] | null;
};



const Homepage = (props: HomepageProps) => {

    const { 
        t, 
        sysConfiguration,
        defaultData,
        tempListData
    } = props;

    const [previewMode, setPreviewMode] = useState<boolean>(false);
    const [currentTempData, setCurrentTempData] = useState<any[] | null>(typeof defaultData === 'undefined' ? null : defaultData);


    // Get store (sortable data)
    const dispatch = useDispatch();
    const updateSortableDataStore = useCallback((newData: any[]) => {
        dispatch(sortableDataActions(newData));
    }, []);


    useEffect(() => {

        if (defaultData !== null && Array.isArray(defaultData)) {
            updateSortableDataStore(defaultData);

            // save latest data here
            saveSortableData(defaultData);
        }


    }, [defaultData]);


    return (
        <>

            <PageLayout pageContent={<>
                <div className="app-builder__wrapper">
                    <nav className="navbar navbar-expand-lg text-white app-builder-header">
                        <div className="container-fluid">
                            {/*----------- BEGIN  Brand   ---------*/}
                            <Brand title={t('表单构建器')} />
                            {/*----------- END Brand   ---------*/}


                            <div className="collapse navbar-collapse">
                                {/*----------- BEGIN  Left Tools   ---------*/}
                                <LeftTools 
                                    callbackModeChange={(previewMode: boolean) => {
                                        setPreviewMode(previewMode);
                                    }} 
                                    callbackTempChange={(tempData: any[]) => {
                                        setCurrentTempData(tempData);
                                    }}
                                    tempListData={tempListData}
                                />
                                {/*----------- END Left Tools   ---------*/}
                            </div>


                            <div className="top-btns ml-lg-auto">
                                {/*----------- BEGIN  Right Tools   ---------*/}
                                <RightTools />
                                {/*----------- END Right Tools   ---------*/}


                            </div>


                        </div>
                    </nav>


                    <div className="container-fluid">

                        <div className="app-builder-main">
                            {/* <!-- ROW --> */}
                            <div className="row h-100">
                                <div className={`app-builder-sidebar text-white h-100 ${!previewMode ? 'edit' : ''}`}>

                                    {/*----------- BEGIN  Sidebar   ---------*/}
                                    <SideMenu
                                        data={sysConfiguration}
                                        navbarClassName="navbar"
                                        childClassName="navbar-nav"
                                    />
                                    {/*----------- END Sidebar   ---------*/}
                                </div>
                                <div className={`app-builder-previewarea col h-100 ${!previewMode ? 'edit' : ''}`}>

                                    {/*----------- BEGIN  Builder Area   ---------*/}
                                    <DDTargetGridElem 
                                        allowedDropEffect="any" 
                                        key={JSON.stringify(currentTempData)}   // !!!IMPORTANT
                                        defaultData={currentTempData} 
                                    />
                                    {/*----------- END Builder Area   ---------*/}

                                </div>
                            </div>
                            {/* <!-- /ROW --> */}

                        </div>


                    </div>


                    {/*----------- BEGIN  ELEMENTS EDIT (ATTRIBUTES AREA)   ---------*/}
                    <ElementsEdit />
                    {/*----------- END ELEMENTS EDIT (ATTRIBUTES AREA)   ---------*/}
                    
    
                </div>{/* /.app-builder__wrapper */}

            </>} />


        </>
    );


}



export default withTranslation()(Homepage);


