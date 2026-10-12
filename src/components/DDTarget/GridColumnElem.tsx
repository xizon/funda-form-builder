import React, { useState, useCallback, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { snapToGrid as doSnapToGrid } from '../../computeds/snapToGrid';
import type { DragItem } from '../../interfaces/DragItem';
import type { DropTargetItemProps } from '../../interfaces/DropTargetItemProps';
import { ItemTypes } from '../../data/dd-item-types';


import DynamicBlock from '../../modules';


// store
import { useDispatch, useSelector } from "react-redux";
import sortableDataActions from "../../store/actions/sortableDataActions";
import { saveSortableData } from '../../helpers/saveSortableData';

import guid from '../../utils/guid';


// destroy target
import { destroyModule } from '../../computeds/destroyTarget';

// get section args
import { getSectionConfig } from '../../computeds/getArgs';




// get attributes store
import { 
    getElementsEditStatusStore, 
    updateElementsEditStatusStore 
} from '../../helpers/elementsEditStatusStore';

import { 
    updateElementTargetDataStore
} from '../../helpers/elementTargetDataStore';

//
import { changeUrlStatus } from '../../helpers/url';


export default function GridColumnElem(props: DropTargetItemProps) {

    const {
        sectionId,
        targetClassName,
        allowedDropEffect,
        currentColumnData,
        columnIndex,
        rowIndex,
    } = props;

    const [reRenderCurPage, setReRenderCurPage] = useState<string>(guid());
    const [columnPerItemId, setColumnPerItemId] = useState<string>(guid());
    const [colsData, setColsData] = useState<any[]>(Array.isArray(currentColumnData) ? currentColumnData : [currentColumnData]);

    // Get store (sortable data)
    const dispatch = useDispatch();
    const currentStoreData = useSelector((state: any) => state.sortableData.items);
    const updateSortableDataStore = useCallback((newData: any[]) => {
        dispatch(sortableDataActions(newData));
    }, []);


    // Get store (elements edit)
    // 【WARNING】
    // !!!Do not use multiple `dispatch()` at the same time to prevent IE browser crash sometimes.
    const elementsEditStatus = getElementsEditStatusStore() !== null ? getElementsEditStatusStore().state.elementsEditStatus.show : false;



    // Drag & Drop
    //---------
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.MODULE,
        drop(item: DragItem, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset() as {
                x: number
                y: number
            };

            //
            setColumnPerItemId(guid());


            // connect component from drag action
            const _controlData = {
                id: item.id + columnPerItemId,
                moduleFields: item.moduleFields,
                moduleSlug: item.renderComponentData,
                moduleTitle: item.moduleTitle
            };


            // support multiple colomns
            setColsData((prevState) => {
                let _data = [...prevState, _controlData];
                
                _data = _data.filter(Boolean);  //remove 'null' values

                // update columns data
                currentStoreData?.forEach((item: any, dataIndex: number) => {
                    if (dataIndex === rowIndex) {
                        item.columnsData[columnIndex as number] = _data;
                    }

                });

                updateSortableDataStore(currentStoreData);

                // save latest data here
                saveSortableData(currentStoreData);


                return _data;
            });


            // calculate coordinates
            let left = Math.round(item.left + delta.x);
            let top = Math.round(item.top + delta.y);
            const [leftRes, topRes] = doSnapToGrid(left, top);


            return {
                currentItemCoordinate: [leftRes, topRes],
                allowedDropEffect
            };
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }), [allowedDropEffect, currentStoreData, columnPerItemId, reRenderCurPage])

    const isActive = canDrop && isOver;





    // Edit attributes  (Module Fields (per column))
    //---------
    function editModeOn(e: React.MouseEvent, targetId: string | null, fields: any[], section: any) {
        e.preventDefault();
        e.stopPropagation();


        updateElementTargetDataStore(targetId as string, fields, section);


        // 
        updateElementsEditStatusStore(true);

        //
        changeUrlStatus();

    }


    //-----
    function handleDestroy(e: React.MouseEvent, rowId: string) {
        e.preventDefault();

        if (window.confirm()) {
            
            destroyModule(currentStoreData, rowId);

            // update columns and rows data
            updateSortableDataStore(currentStoreData);

            // save latest data here
            saveSortableData(currentStoreData);


            // Avoid updating the UI if the store remains unchanged after destroyed
            (document.querySelector(`#${rowId}`) as HTMLElement).style.display = 'none';


             // Only for real-time preview of MODULE
             //@link `src/components/DDTarget/GridColumnElem.tsx`
             changeUrlStatus();
             setTimeout(() => {
                changeUrlStatus(0);
             }, 0);
          
        }        


    }


    function handleHashChange() {

        // Only for real-time preview of MODULE
        setReRenderCurPage(guid());

    }



    useEffect(() => {

        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        }

    }, []);


    //
    return (
        <>


            {/*----------- BEGIN  Builder Area   ---------*/}
            <div
                className={`app-builder-columnarea__preview ${targetClassName} ${isActive ? 'active' : ''}`}
                data-grid={`${targetClassName}`}
                ref={drop}
            >

                {(colsData.length === 1 && colsData[0] === null) || (colsData.length === 0) ? <>
                    <svg width="60px" height="60px" viewBox="0 0 24 24" className="app-builder-section__nodata-icon">
                        <g>
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path fillRule="nonzero" fill="#ddd" d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
                        </g>
                    </svg>
                </> : null}

                {colsData.map((colCmponentData: any, i: number) => {
                    if (colCmponentData === null) return null;

                    const sectionConfig = getSectionConfig(currentStoreData, sectionId as string);

                    // do something...
                    // const myparam3 = sectionConfig === null ? 1 : sectionConfig.param3;
                    

                    return <div key={`${colCmponentData?.id} + ${i}`} className={`app-builder-section__item`} id={colCmponentData?.id}>
                        {/* PREVIEW EDIT AREA */}

                        {/* OPTIONS */}
                        <div className="app-builder-section__item-options">


                            <button
                                tabIndex={-1}
                                className={`btn btn-sm px-0 app-builder-section__item-options__destroy ${elementsEditStatus ? 'edit-disabled' : ''}`}
                                onClick={(e: React.MouseEvent) => {
                                    handleDestroy(e, colCmponentData?.id);
                                }}
                            >

                                <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none">
                                    <path d="M10 11V17" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14 11V17" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4 7H20" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                            </button>



                            <button
                                tabIndex={-1}
                                className={`btn btn-sm px-0 app-builder-section__item-options__edit ${elementsEditStatus ? 'edit-disabled' : ''}`}
                                onClick={(e) => {
                                    editModeOn(e, colCmponentData?.id, colCmponentData?.moduleFields, null);
                                }}
                            >

                                <svg width="18px" height="18px" viewBox="0 0 1024 1024"><path fill="#000000" d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z" /></svg>

                            </button>

                        </div>
                        {/* /OPTIONS */}





                        {/* MODULE */}
                      <DynamicBlock
                            sectionId={sectionId}
                            moduleFields={colCmponentData?.moduleFields}
                            moduleSlug={colCmponentData?.moduleSlug}
                            moduleTitle={colCmponentData?.moduleTitle}
                        />
                        {/* /MODULE */}
                    </div>;

                })}


            </div>
            {/*----------- END Builder Area   ---------*/}


        </>
    )


}


