/**
 * @link to: src/components/ElementsEdit/index.tsx
 */


import React, { useEffect, useState, useMemo } from 'react';
import { asyncSave, asyncSaveTriggerForFields, asyncSaveTriggerHandle } from '../../../components/ElementsEdit/func/asyncFormHelpers';

// bootstrap components
import Input from 'funda-ui/Input';
import Switch from 'funda-ui/Switch';
import MultiFuncSelect from 'funda-ui/MultiFuncSelect';

// component styles
import 'funda-ui/MultiFuncSelect/index.css';

// DO NOT move `useMemo` to component
// !!! Prevent the "input associated with the component" from being restored when "useState()" is changed
function HideInputMemo(props: any) {
    const { saveFunc, value, id, name } = props;
    return useMemo(() => {
        return <>
            <Input
                tabIndex={-1}
                wrapperClassName="d-none"
                id={id}
                name={name}
                value={value}
                onChange={(e: any) => {
                    saveFunc?.();
                }}
            />

        </>


    }, [value]);
}


const EditPanel = (props: any) => {
    const {
        t,
        args,
        autoSaveFunc,
        closeFunc,
        fieldIndex,
    } = props;

    const LABEL_WIDTH = '150px';
    const _args = typeof args === 'undefined' || args === null ? '' : args;

    //
    const [valRequired, setValRequired] = useState<string>(typeof _args.required !== 'undefined' ? (_args.required ? 'true' : 'false') : 'false');
    const [valStyles, setValStyles] = useState<string>(typeof _args.styles !== 'undefined' ? _args.styles : '');



    useEffect(() => {
        asyncSave(autoSaveFunc);
    }, [valRequired, valStyles]);


    return (
        <div className="row">
            <div className="col-12 col-md-10">


                <div className="row">
                    <div className="text-end" style={{ width: LABEL_WIDTH }}>
                        {t('Title')}
                    </div>
                    <div className="col">
                        <Input
                            name="app-el-title"
                            value={_args.title}
                            onChange={(e: any) => {
                                autoSaveFunc();
                            }}
                        />
                    </div>
                </div>
                {/* ///////////// */}

                <div className="row">
                    <div className="text-end" style={{ width: LABEL_WIDTH }}>
                        {t('Control name (English)')}
                    </div>
                    <div className="col">
                        <Input
                            name="app-el-name"
                            value={_args.name}
                            onChange={(e: any) => {
                                autoSaveFunc();
                            }}
                        />
                    </div>
                </div>
                {/* ///////////// */}



                <div className="row">
                    <div className="text-end" style={{ width: LABEL_WIDTH }}>
                        {t('Default value')}
                    </div>
                    <div className="col">
                        <Input
                            name="app-el-defaultval"
                            value={_args.value}
                            onChange={(e: any) => {
                                autoSaveFunc();
                            }}
                        />
                    </div>
                </div>
                {/* ///////////// */}


                <div className="row">
                    <div className="text-end" style={{ width: LABEL_WIDTH }}>
                        {t('Required')}
                    </div>
                    <div className="col">
                        <Switch
                            value="ok"
                            checked={_args.required}
                            onChange={(e: any, val: boolean) => {
                                setValRequired(val ? 'true' : 'false');
                            }}
                        />

                        <input type="hidden" name="app-el-required" value={valRequired} />
                    </div>
                </div>
                {/* ///////////// */}





                <div className="row">
                    <div className="text-end" style={{ width: LABEL_WIDTH }}>
                        {t('Background color')}
                    </div>
                    <div className="col">
                        <MultiFuncSelect
                            value={valStyles}
                            placeholder={t('Please select')}
                            options={[
                                {
                                    "label": t('Alice Blue'),
                                    "value": "aliceblue",
                                    "queryString": ""
                                },
                                {
                                    "label": t('Antique White'),
                                    "value": "antiquewhite",
                                    "queryString": ""
                                },
                                {
                                    "label": t('Light Gray'),
                                    "value": "gainsboro",
                                    "queryString": ""
                                }
                            ]}
                            onChange={(e: any, e2: any, val: any) => {
                                setValStyles(val.value);
                            }}
                        />
                        <input type="hidden" name="app-el-styles" value={valStyles} />
                    </div>
                </div>
                {/* ///////////// */}

                {asyncSaveTriggerForFields(fieldIndex)}
                {asyncSaveTriggerHandle(t('Save'), '', closeFunc)}
            </div>
        </div>
    )

}



export default ({...rest}) => {

    const {
        t,
        formdata,
        args,
        autoSaveFunc,
        closeFunc,
        fieldIndex
    } = rest;
    const hasFormData = formdata === null ? false : true;
   
    return {
        callbackFieldsName: (
            {
                name: hasFormData ? formdata['app-el-name'] : '',
                title: hasFormData ? formdata['app-el-title']: '',
                value: hasFormData ? formdata['app-el-defaultval']: '',
                required: hasFormData ? (formdata['app-el-required'] === 'true' ? true : false) : false,
                styles: hasFormData ? formdata['app-el-styles'] : '',
            }
        ),
        outComponent: () => (
            <EditPanel
                t={t}
                args={args}
                autoSaveFunc={autoSaveFunc}
                closeFunc={closeFunc}
                fieldIndex={fieldIndex}
            />
        )
    }

}
