// i18n
import { withTranslation } from 'react-i18next';


// bootstrap components
import Radio from 'funda-ui/Radio';

const ControlRadio = (props: any) => {

    const {
        t,
        args
    } = props;


    const {
        title,
        name,
        desc,
        value,
    } = args;

    return (
        <>

            {title !== '' ? <div className="app-builder-section__item__label">
                {title}
            </div> : null}

            <Radio
                inline={true}
                value={value}
                name={name}
                options={`{
                        "A":"A",
                        "B":"B",
                        "AB":"AB",
                        "O":"O",
                        "${t('未知')}":""
                    }`}
            />

            {desc !== '' ? <div className="app-builder-section__item__desc">
                {desc}
            </div> : null}



        </>
    );

}


export default withTranslation()(ControlRadio);


