import React from 'react';
// i18n
import { withTranslation } from 'react-i18next';

import Control from '../controls';


const ModuleDefaultElem = (props: any) => {

    const {
        t,
        fields
    } = props;

    return (
        <>


            {/* CONTROL */}
            {fields && fields?.map((item: any, i: number) => {
                const _bgColor = item.args.styles;
                return (
                    <div key={i} className={`rounded-2 ${_bgColor ? 'p-3' : ''}`} style={{ background: _bgColor}}>

                        <Control
                            controlType={item.controlType}
                            args={item.args}
                        />

                    </div>
                )

            })}
            {/* /CONTROL */}


        </>
    );

}


export default withTranslation()(ModuleDefaultElem);


