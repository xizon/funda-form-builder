import React from 'react';
// i18n
import { withTranslation } from 'react-i18next';

import Control from '../controls';


const ModuleDefaultElem3 = (props: any) => {

    const {
        t,
        fields
    } = props;

    return (
        <>


            {/* CONTROL */}
            {fields && fields?.map((item: any, i: number) => {
                return (
                    <Control
                        key={i}
                        controlType={item.controlType}
                        args={item.args}
                    />
                )

            })}
            {/* /CONTROL */}


        </>
    );

}


export default withTranslation()(ModuleDefaultElem3);


