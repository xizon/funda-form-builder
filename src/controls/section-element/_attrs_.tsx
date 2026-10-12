/**
 * @link to: src/components/ElementsEdit/index.tsx
 */


import React, { useEffect, useState } from 'react';
import { asyncSave, asyncSaveTriggerForSection, asyncSaveTriggerHandle } from '../../components/ElementsEdit/func/asyncFormHelpers';

// bootstrap components
import Input from 'funda-ui/Input';
import Radio from 'funda-ui/Radio';


const EditPanel = (props: any) => {
    const {
        t,
        args,
        autoSaveFunc,
        closeFunc,
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
                        {t('参数1')}
                    </div>
                    <div className="col">
                        <Input
                            name="app-el-section-param1"
                            value={_args.param1}
                            onChange={(e: any) => {
                                autoSaveFunc();
                            }}
                        />
                    </div>
                </div>
                {/* ///////////// */}

                <div className="row">
                    <div className="text-end" style={{ width: LABEL_WIDTH }}>
                        {t('参数2')}
                    </div>
                    <div className="col">
                        <Input
                            name="app-el-section-param2"
                            value={_args.param2}
                            onChange={(e: any) => {
                                autoSaveFunc();
                            }}
                        />
                    </div>
                </div>
                {/* ///////////// */}


                <div className="row">
                    <div className="text-end" style={{ width: LABEL_WIDTH }}>
                        {t('参数3')}
                    </div>
                    <div className="col">
                        <Radio
                            inline={true}
                            value={_args.param3}
                            name="app-el-section-param3"
                            options={`{
                                "${t('选项1')}":"1",
                                "${t('选项2')}":"2"
                            }`}
                            onChange={(e: any) => {
                                autoSaveFunc();
                            }}
                        />
                  
                    </div>
                </div>
                {/* ///////////// */}


                {asyncSaveTriggerForSection()}
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
    } = rest;
    const hasFormData = formdata === null ? false : true;

    return {
        callbackFieldsName: (
            {
                param1: hasFormData ? formdata['app-el-section-param1'] : '',
                param2: hasFormData ? formdata['app-el-section-param2']: '',
                param3: hasFormData ? formdata['app-el-section-param3']: '',
            }
        ),
        outComponent: () => (
            <EditPanel
                t={t}
                args={args}
                autoSaveFunc={autoSaveFunc}
                closeFunc={closeFunc}
            />
        )
    }

}
