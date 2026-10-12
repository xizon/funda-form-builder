// i18n
import { withTranslation } from 'react-i18next';

// bootstrap components
import Input from 'funda-ui/Input';

const ControlInput = (props: any) => {

    const { 
        t,
        args
     } = props;


     const {
        title,
        name,
        placeholder,
        desc,
        value,
        required,
        disabled
    } = args;

    return (
        <>

            {title !== '' ? <div className="app-builder-section__item__label">
                {title}
            </div> : null}

            <Input
                value={value}
                placeholder={placeholder}
                name={name}
                required={required}
                disabled={disabled}
            />
            
            {desc !== '' ? <div className="app-builder-section__item__desc">
                {desc}
            </div> : null}

        </>
    );

}


export default withTranslation()(ControlInput);


