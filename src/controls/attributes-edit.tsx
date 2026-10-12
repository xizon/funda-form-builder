/**
 * @link to: src/components/ElementsEdit/index.tsx
 */

import { ControlTypes } from '../data/dd-control-types';


// attributes for edit (Module Fields (per column))
//-----------
import attrsFormElementsInput from './form-elements/Input/_attrs_';
import attrsFormElementsRadio from './form-elements/Radio/_attrs_';
import attrsContentElementsTableList from './content-elements/TableList/_attrs_';

// attributes for edit (Section (row))
//-----------
import attrsSectionElement from './section-element/_attrs_';




const fieldsAttributesEdit = (
    type: string,
    args: any,
    fieldIndex: number,
    autoSaveFunc: any,
    closeFunc: any,
    t: any,
    formdata: any
) => {

    let editPanel: any = null;
    switch (type) {

        // =============== (form elements) input =================
        case ControlTypes.FORM_INPUT:
            editPanel = attrsFormElementsInput({ args, autoSaveFunc, closeFunc, fieldIndex, t, formdata });
            break;

        // =============== (form elements) radio =================
        case ControlTypes.FORM_RADIO:
            editPanel = attrsFormElementsRadio({ args, autoSaveFunc, closeFunc, fieldIndex, t, formdata });
            break;

        // =============== (content elements) table list =================
        case ControlTypes.CONTENT_LIST:
            editPanel = attrsContentElementsTableList({ args, autoSaveFunc, closeFunc, fieldIndex, t, formdata });
            break;



    }
    
    return formdata === null ? editPanel.outComponent() : editPanel.callbackFieldsName;

};


const sectionAttributesEdit = (
    args: any,
    autoSaveFunc: any,
    closeFunc: any,
    t: any,
    formdata: any
) => {

    const editPanel: any = attrsSectionElement({ args, autoSaveFunc, closeFunc, t, formdata });
    return formdata === null ? editPanel.outComponent() : editPanel.callbackFieldsName;

};



export {
    fieldsAttributesEdit,
    sectionAttributesEdit
}