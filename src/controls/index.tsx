/**
 * @link to: src/_custom_/modules/module_xxxxxxx.tsx
 */


import React from 'react';
import { ControlTypes } from '../data/dd-control-types';


// import all controls (include form elements and content elements)
import ControlInput from './form-elements/Input';
import ControlRadio from './form-elements/Radio';
import ControlTableList from './content-elements/TableList';


type ControlProps = {
    controlType: string;
    args?: any;
};


export default function Control(props: ControlProps) {

    const {
        controlType,
        args
    } = props;
    

    let control: React.ReactNode = null;
    switch (controlType) {

        // =============== (form elements) input =================
        case ControlTypes.FORM_INPUT:
            control = <ControlInput 
                            args={args} 
                        />;
            break;

        // =============== (form elements) radio =================
        case ControlTypes.FORM_RADIO:
            control = <ControlRadio 
                            args={args} 
                        />;
            break;


        // =============== (content elements) table list =================
        case ControlTypes.CONTENT_LIST:
            control = <ControlTableList 
                            args={args} 
                        />;
            break;

    }

    return control;

}

