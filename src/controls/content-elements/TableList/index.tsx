// i18n
import { withTranslation } from 'react-i18next';


// bootstrap components
import Table from 'funda-ui/Table';

// component styles
import 'funda-ui/Table/index.css';


const ControlTableList = (props: any) => {

    const {
        t,
        args
    } = props;


    const {
        title,
        inputData,
        styles,
        desc,
    } = args;


    return (
        <>


            {title !== '' ? <div className="app-builder-section__item__label">
                {title}
            </div> : null}

            {typeof inputData !== 'undefined' && inputData !== '' ? <Table
                tableClassName={`table ${styles === 'dark' ? 'table-dark' : ''} table-striped`}
                bordered={true}
                data={inputData}
            /> : null}



            {desc !== '' ? <div className="app-builder-section__item__desc">
                {desc}
            </div> : null}



        </>
    );

}


export default withTranslation()(ControlTableList);


