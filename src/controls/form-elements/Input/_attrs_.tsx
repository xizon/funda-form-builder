/**
 * @link to: src/components/ElementsEdit/index.tsx
 */


import React, { useEffect, useState } from 'react';
import { asyncSave, asyncSaveTriggerForFields, asyncSaveTriggerHandle } from '../../../components/ElementsEdit/func/asyncFormHelpers';

// bootstrap components
import Input from 'funda-ui/Input';
import Switch from 'funda-ui/Switch';
import MultiFuncSelect from 'funda-ui/MultiFuncSelect';

// component styles
import 'funda-ui/MultiFuncSelect/index.css';


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
                        {t('标题')}
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
                        {t('控件名(英文)')}
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
                        {t('默认值')}
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
                        {t('必填')}
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
                        {t('背景色')}
                    </div>
                    <div className="col">
                        <MultiFuncSelect
                            value={valStyles}
                            placeholder={t('请选择')}
                            options={[
                                {
                                    "label": t('爱丽丝蓝'),
                                    "value": "aliceblue",
                                    "queryString": ""
                                },
                                {
                                    "label": t('古董白'),
                                    "value": "antiquewhite",
                                    "queryString": ""
                                },
                                {
                                    "label": t('浅灰'),
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
                {asyncSaveTriggerHandle(t('保存'), '', closeFunc)}
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
