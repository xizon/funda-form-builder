
// i18n
import { withTranslation } from 'react-i18next';

const Brand = (props: any) => {

    const { 
        t,
        title
     } = props;

    return (
        <>
            <h1 className="navbar-brand me-3 fs-6 ms-2 m-0 p-0 app-builder-brand">{title}</h1>
        </>
    );

}

export default withTranslation()(Brand);
