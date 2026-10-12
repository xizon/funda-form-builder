import { useState, useEffect } from "react";

// i18n
import { withTranslation } from 'react-i18next';

import Homepage from '../Homepage';

// system configuration
import demoMenuListData from '../../data/dd-demo-sidebar-menu';

// demo data
import demoTempListData from '../../data/dd-demo-templist';


// get attributes store
import { 
    destroyElementsEditStatusStore 
} from '../../helpers/elementsEditStatusStore';

import { 
    destroyElementTargetDataStore
} from '../../helpers/elementTargetDataStore';

import { getParams, changeUrlStatusToIndex } from '../../helpers/url';


const PageIndex = (props: any) => {

    const { t } = props;

    const [data, setData] = useState<any[] | null>(null);
    const [configData, setConfigData] = useState<any[]>([]);
    const [tempListData, setTempListData] = useState<any[]>([]);


    /**
     * Set Theme mode for bootstrap
     */
    function setThemeForBsData(val: string, type: string) {
        if (type === 'add') {
            (document.querySelector("html") as any).dataset.bsTheme = val.replace('-mode', '');
        } else {
            delete (document.querySelector("html") as any).dataset.bsTheme;
        }
    }



    useEffect(() => {


        // Initialize attributes edit panel
        //-----
        destroyElementsEditStatusStore();
        destroyElementTargetDataStore();


        // Initialize URL
        const paramEdit = getParams('edit');
        if ( typeof paramEdit !== 'undefined' && paramEdit != 0) {
            changeUrlStatusToIndex();
        }



        // Set current program into IFRAME environment
        //-----
        // theme mode  
        const modeName = localStorage.getItem('SITE_THEME_MODE');
        const darkMode = modeName !== null ? true : false;
        const _darkClassName = 'dark-mode';
        if (darkMode) {
            setThemeForBsData(_darkClassName, 'add');
        } else {
            setThemeForBsData(_darkClassName, 'remove');
        }



        // from database
        setConfigData(demoMenuListData);
        setTempListData(demoTempListData);
        setData(null);


    }, []);

    return (
        <>

            <Homepage 
                sysConfiguration={configData}
                defaultData={data}
                tempListData={tempListData}
            />


        </>
    );


}



export default withTranslation()(PageIndex);


