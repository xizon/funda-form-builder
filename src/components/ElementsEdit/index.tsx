import React, { useEffect, useRef, useCallback, useState } from 'react';
import FormContainer from '../FormContainer';
import { ControlTypes } from '../../data/dd-control-types';

// i18n
import { withTranslation } from 'react-i18next';


// store
import { useDispatch, useSelector } from "react-redux";
import sortableDataActions from "../../store/actions/sortableDataActions";
import { saveSortableData } from '../../helpers/saveSortableData';


// add config
import { updateModuleFieldsConfig, updateSectionConfig } from '../../computeds/updateArgs';

//
import {
    fieldsAttributesEdit,
    sectionAttributesEdit
} from '../../controls/attributes-edit';


// get attributes store
import { 
    getElementsEditStatusStore, 
    updateElementsEditStatusStore 
} from '../../helpers/elementsEditStatusStore';

import { 
    getElementTargetDataStore, 
    updateElementTargetDataStore
} from '../../helpers/elementTargetDataStore';


//
import { changeUrlStatus, getParams } from '../../helpers/url';


const ElementsEdit = (props: any) => {

    const {
        t,
    } = props;


    const editRef = useRef<HTMLDivElement>(null);
    const editMaskRef = useRef<HTMLDivElement>(null);
    const [editEnterStatus, setEditEnterStatus] = useState<boolean>(false);
    const [currentFiledData, setCurrentFiledData] = useState<any[]>([]);
    const [currentSectionData, setCurrentSectiondData] = useState<any>(null);


    // Get store (elements edit)
    // 【WARNING】
    // !!!Do not use multiple `dispatch()` at the same time to prevent IE browser crash sometimes.
    const [elementsData, setElementsData] = useState<any>({
        edit: getElementsEditStatusStore() !== null ? getElementsEditStatusStore().state.elementsEditStatus.show : false,
        data: getElementTargetDataStore() !== null ? getElementTargetDataStore().state.elementTargetData.data : {
            id: null,
            fields: [],
            section: null
        }
    });

    // Get store (elements edit)
    const dispatch = useDispatch();
    const currentStoreData = useSelector((state: any) => state.sortableData.items);


    const updateSortableDataStore = useCallback((newData: any[]) => {
        dispatch(sortableDataActions(newData));
    }, []);



    // get current element data
    const __ELEM_ID = elementsData.data?.id;
    let __ELEM_FIELDS = elementsData.data?.fields;
    const __ELEM_SECTION = elementsData.data?.section;


    // Make sure there is an unexpected solution after dragging
    if (typeof __ELEM_FIELDS === 'undefined') __ELEM_FIELDS = [];


    const closeAction = () => {
        // edit status
        updateElementsEditStatusStore(false);
        updateElementTargetDataStore(null, [], null);
        setElementsData({
            data: {
                id: null,
                fields: [],
                section: null
            },
            edit: false
        });


        // restore row and column args
        setCurrentFiledData([]);
        setCurrentSectiondData(null);

        //
        autoSave();

        //
        changeUrlStatus(0);


        //
        setEditEnterStatus(false); 
    };


    const autoSave = () => {
        if (editEnterStatus) {
            [].slice.call(editRef.current?.querySelectorAll('.app-elementsedit-btn-save--auto')).forEach((el: any) => {
                el.click();

                // Only for real-time preview of MODULE
                //@link `src/components/DDTarget/GridColumnElem.tsx`
                changeUrlStatus();
            

            });
            
        }

    };


    function handleClose(e: React.MouseEvent) {
        e.preventDefault();
        closeAction();
    }

    function updateElementData(config: any, type: string) {

        // save config
        const _data = currentStoreData;

        if (type === 'module-fields') {
            updateModuleFieldsConfig(_data, __ELEM_ID, config);
        }


        if (type === 'section') {
            updateSectionConfig(_data, __ELEM_ID, config);
        }



        // update columns and rows data
        updateSortableDataStore(_data);

        // save latest data here
        saveSortableData(_data);

    }

    function handleHashChange() {
        const paramEdit = getParams('edit');

        setElementsData({
            data: getElementTargetDataStore() !== null ? getElementTargetDataStore().state.elementTargetData.data : {
                id: null,
                fields: [],
                section: null
            },
            edit: typeof paramEdit !== 'undefined' && paramEdit != 0 ? true : false
        });

    }



    useEffect(() => {

        window.addEventListener('hashchange', handleHashChange);


        if (elementsData.edit && !editEnterStatus) {

            // initialize Module Fields (per column)
            setCurrentFiledData(__ELEM_FIELDS.map((field: any) => field)); // DO NOT USE `__ELEM_FIELDS` only

            // initialize Section (row)
            setCurrentSectiondData(JSON.parse(JSON.stringify(__ELEM_SECTION))); // DO NOT USE `__ELEM_SECTION` only
            
            // Prevent duplication of code twice
            setEditEnterStatus(true);
            

            console.log('--> element edit data: ', elementsData);
        }



        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        }

    }, [elementsData.data?.id, elementsData.data?.fields]);


    return (
        <>
            <div className={`app-builder-editelement-mask ${elementsData.edit ? 'active' : ''}`} ref={editMaskRef} onClick={handleClose}></div>
            <div className={`app-builder-editelement shadow ${elementsData.edit ? 'active' : ''}`} ref={editRef}>
                <button className={`app-builder-editelement__close ${elementsData.edit ? 'active' : ''}`} tabIndex={-1} onClick={handleClose}>
                    <svg width="35px" height="35px" viewBox="0 0 1024 1024" fill="#000000"><path d="M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6 76-76 177.6-118.4 285.6-118.4 108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4z m0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z" fill="" /><path d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z" fill="" /><path d="M328 340.8l32-31.2 348 348-32 32z" fill="" /></svg>

                </button>

                {/* //=============================
                    // Module Fields (per column)
                    //=============================
                */}
                {__ELEM_SECTION === null ? <>
                    {__ELEM_FIELDS.map((field: any, i: number) => {

                        const _type = field.controlType;
                        const _args = field.args;
                        const _fieldIndex = i;

                        return <div key={'app-form' + i} className="py-3 border-bottom">

                            <FormContainer
                                formContent={<>{fieldsAttributesEdit(_type, _args, _fieldIndex, autoSave, closeAction, t, null)}</>}
                                submitAutoAction={false} // At least one button type requires `submit` to be valid
                                submittedReset={false}
                                data={currentFiledData}
                                btnParams={[
                                    { id: `app-elementsedit-btn-save${_fieldIndex}` }
                                ]}
                                lang={{
                                    success: t('操作成功！'),
                                    empty: t('不能为空。')
                                }}
                                rmSpecialCharactersField={[]}
                                onSubmit={async (currentBtnId: string, formdata: any, success: boolean, incomingData: any) => {
                                    console.log('--> onSubmit: ', {
                                        'current button ID: ': currentBtnId,
                                        'submit formdata: ': formdata,
                                        'success: ': success
                                    });

                                    if (success) {
                                        if (currentBtnId === `app-elementsedit-btn-save${_fieldIndex}`) {

                                            incomingData[_fieldIndex] = {
                                                controlType: _type,
                                                args: fieldsAttributesEdit(_type, _args, _fieldIndex, autoSave, closeAction, t, formdata)
                                            };

                                            updateElementData(incomingData, 'module-fields');

                                        }
                                    }

                                }}
                            />


                        </div>;


                    })}
                </> : null}

                {/* 
                //=============================
                // Section (row)
                //============================= 
                */}
                {__ELEM_SECTION !== null ? <>
                    <div className="py-3 border-bottom">

                        <FormContainer
                            formContent={<>{sectionAttributesEdit(__ELEM_SECTION, autoSave, closeAction, t, null)}</>}
                            submitAutoAction={false} // At least one button type requires `submit` to be valid
                            submittedReset={false}
                            data={currentSectionData}
                            btnParams={[
                                { id: `app-elementsedit-btn-save-section` }
                            ]}
                            lang={{
                                success: t('操作成功！'),
                                empty: t('不能为空。')
                            }}
                            rmSpecialCharactersField={[]}
                            onSubmit={async (currentBtnId: string, formdata: any, success: boolean, incomingData: any) => {
                                console.log('--> onSubmit: ', {
                                    'current button ID: ': currentBtnId,
                                    'submit formdata: ': formdata,
                                    'success: ': success
                                });

                                if (success) {
                                    if (currentBtnId === `app-elementsedit-btn-save-section`) {
                                        
                                        updateElementData(sectionAttributesEdit(incomingData, autoSave, closeAction, t, formdata), 'section');

                                    }
                                }

                            }}
                        />


                    </div>
                </> : null}





            </div>
        </>
    );

}


export default withTranslation()(ElementsEdit);


