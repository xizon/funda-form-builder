import { useEffect, useState } from "react";


// i18n
import { useTranslation } from 'react-i18next';


type PageLayoutProps = {
    pageContent?: React.ReactNode;
};

const PageLayout = (props: PageLayoutProps) => {

    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState<string | null>('');

    const {
        pageContent
    } = props;


    useEffect(() => {

        //Language
        //-----      
        // Please do not modify the environment variable identifier `SITE_LANG`, it matches the CORE PROGRAM
        const langName = localStorage.getItem('SITE_LANG');
        if (langName !== null) {
            setLanguage(langName);
            i18n.changeLanguage(langName);
        }

    }, [language]);


    return (
        <div className="app-wrapper">


            {/*<!-- PAGE CONTENT -->*/}
            <div className="mt-0 mb-0 position-relative">
                {pageContent}
            </div>
            {/*<!-- /PAGE CONTENT -->*/}

        </div>

    );
}



export default PageLayout;

