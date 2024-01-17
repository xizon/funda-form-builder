/**
 * @link to: src/components/ElementsEdit/index.tsx
 */


import React, { useEffect, useState } from 'react';
import { asyncSave, asyncSaveTriggerForFields, asyncSaveTriggerHandle } from '../../../components/ElementsEdit/func/asyncFormHelpers';

// bootstrap components
import Input from 'funda-ui/Input';
import Radio from 'funda-ui/Radio';


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

    useEffect(() => {
        
    }, []);


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
                        <Radio
                            inline={true}
                            value={_args.value}
                            name="app-el-defaultval"
                            options={`{
                                "A":"A",
                                "B":"B",
                                "AB":"AB",
                                "O":"O",
                                "${t('未知')}":""
                            }`}
                            onChange={(e: any) => {
                                autoSaveFunc();
                            }}
                        />
                  
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
