/**
 * @link to: src/components/ElementsEdit/index.tsx
 */

import React, { useEffect, useState } from 'react';
import { asyncSave, asyncSaveTriggerForFields, asyncSaveTriggerHandle } from '../../../components/ElementsEdit/func/asyncFormHelpers';

// bootstrap components
import Input from 'funda-ui/Input';
import Radio from 'funda-ui/Radio';
import DynamicFields from 'funda-ui/DynamicFields';


type DynamicFieldsValueProps = {
    init: React.ReactNode[];
    tmpl: React.ReactNode;
};


const itemNoTran = (num: number) => {
    return (num+1).toString().padStart(2, "0");
};


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

    const [valUpdate, setValUpdate] = useState<number>(0);
    const [valData, setValData] = useState<any>(_args.inputData);
    const [dynamicFieldsValue, setDynamicFieldsValue] = useState<DynamicFieldsValueProps | null>(null);
    const [dynamicFieldsJsonValue, setDynamicFieldsJsonValue] = useState<any[]>([]);
    const [dynamicInit, setDynamicInit] = useState<boolean>(false);


    useEffect(() => {
        asyncSave(autoSaveFunc);

        //initialize JSON value
        if (!dynamicInit) {
            setDynamicInit(true);

            const resList = valData.fields;

            setDynamicFieldsJsonValue(resList.map((item: any, index: number) => {
                return {
                    people_no: itemNoTran(index),
                    people_name: item[1].content,
                    people_address: item[2].content
                };
            }));
            
            //initialize default value
            const tmpl = (val: any, init: boolean = true) => {
                let data: any = null;
                if (init) {
                    const { ...rest } = val;
                    data = rest;
                } else {
                    data = { index: Math.random() };
                }


                return <React.Fragment key={'tmpl-' + data.index}>
                    {/* ///////////// */}

                    <div className="d-table-cell border py-2 px-2" style={{width: '100px'}}>
                        {/* CONTROL */}
                        <Input
                            wrapperClassName="position-relative"
                            value={data.people_name}
                            name="people_name[]"
                            onChange={(e: any) => {
                                autoSaveFunc();
                            }}
                        />
                        {/* /CONTROL */}
                    </div>
                    <div className="d-table-cell border py-2 px-2">
                        {/* CONTROL */}
                        <Input
                            wrapperClassName="position-relative"
                            value={data.people_address}
                            name="people_address[]"
                            onChange={(e: any) => {
                                autoSaveFunc();
                            }}
                        />
                        {/* /CONTROL */}
                    </div>
                    <div className="d-table-cell border py-2 px-2 last" style={{ width: '40px' }}></div>


                    <Input
                        value={data.people_no}
                        tabIndex={-1}
                        wrapperClassName="d-none"
                        name="people_no[]"
                    />


                    {/* ///////////// */}
                </React.Fragment>
            };

            const initData = resList.map((item: any, index: number) => {
                const itemData = {
                    people_no: itemNoTran(index),
                    people_name: item[1].content,
                    people_address: item[2].content
                };


                const { ...rest } = itemData;
                return tmpl({ ...rest, index });
            });

            const tmplData = tmpl(null, false);

            setDynamicFieldsValue({
                init: initData,
                tmpl: tmplData
            });


        }

    }, [valUpdate]);



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
                        {t('模式')}
                    </div>
                    <div className="col">
                        <Radio
                            inline={true}
                            value={_args.styles}
                            name="app-el-styles"
                            options={`{
                                "${t('暗黑模式')}":"dark",
                                "${t('默认')}":"light"
                            }`}
                            onChange={(e: any) => {
                                autoSaveFunc();
                                setValUpdate(Math.random());
                            }}
                        />

                    </div>
                </div>
                {/* ///////////// */}



                <div className="row">
                    <div className="text-end" style={{ width: LABEL_WIDTH }}>
                        {t('列表项')}
                    </div>
                    <div className="col">
                        <DynamicFields
                            key={JSON.stringify(dynamicFieldsJsonValue)} // Trigger child component update when prop of parent changes
                            data={dynamicFieldsValue}
                            maxFields="15"
                            confirmText={t('确定此操作?')}
                            iconAdd={<><span className="d-inline-block pt-2 btn btn-outline-success btn-sm mt-2"><svg width="20px" height="20px" viewBox="0 0 24 28" fill="none"><path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z" fill="#146c43" /></svg> {t('添加')}</span></>}
                            iconRemove={<><div className="position-absolute top-0 end-0 mt-2 mx-2"><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10ZM8 11a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z" fill="#f00" /></svg></div></>}

                            innerAppendClassName="app-div-table d-table w-100"
                            innerAppendCellClassName="d-table-row"
                            innerAppendLastCellClassName="last"
                            innerAppendHideClassName="d-none"
                            innerAppendBodyClassName="app-div-table__body"
                            innerAppendHeadData={[
                                <>{t('姓名')}</>,
                                <>{t('住址')}</>,
                                <>&nbsp;</>
                            ]}
                            innerAppendHeadRowClassName="d-table-row fw-bold bg-light"
                            innerAppendHeadCellClassName="d-table-cell border py-2 px-2"

                        />


                    </div>
                </div>
                {/* ///////////// */}


                <textarea className="d-none" name="app-el-data" value={JSON.stringify(valData)} onChange={(e: any)=> {
                    setValData(valData);
                }} />


                {asyncSaveTriggerForFields(fieldIndex)}
                {asyncSaveTriggerHandle(t('保存'), '', closeFunc)}

            </div>
        </div>
    )

}



export default ({ ...rest }) => {

    const {
        t,
        formdata,
        args,
        autoSaveFunc,
        closeFunc,
        fieldIndex
    } = rest;
    const hasFormData = formdata === null ? false : true;


    const _fieldsData = hasFormData ? typeof formdata['people_name[]'] !== 'undefined' ? formdata['people_name[]'].map((item: string, i: number) => (
        [
            { "cols": 1, "content": itemNoTran(i) },
            { "cols": 1, "content": formdata['people_name[]'][i] },
            { "cols": 1, "content": formdata['people_address[]'][i] }
        ]
    )) : [] : [];

    return {
        callbackFieldsName: (
            {
                name: hasFormData ? formdata['app-el-name'] : '',
                title: hasFormData ? formdata['app-el-title'] : '',
                inputData: hasFormData ? {
                    "headers": [
                        { "type": false, "style": { width: '50px' }, "content": t('编号') },
                        { "type": false, "content": t('姓名') },
                        { "type": false, "content": t('住址') }
                    ],
                    "fields": _fieldsData
                } : {
                    "headers": [
                        { "type": false, "style": { width: '50px' }, "content": t('编号') },
                        { "type": false, "content": t('姓名') },
                        { "type": false, "content": t('住址') }
                    ],
                    "fields": []
                },
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
