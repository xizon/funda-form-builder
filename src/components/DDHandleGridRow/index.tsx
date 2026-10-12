import React, { useState, useRef, useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';
import type { DropResult } from '../../interfaces/DropResult';

import useLongPress from '../../utils/hooks/useLongPress';
import type { DragItem } from '../../interfaces/DragItem';
import { ItemTypes } from '../../data/dd-item-types';

import {
    GridColumnElem as DDTargetGridColumnElem
} from '../DDTarget';

// store
import { useDispatch, useSelector } from "react-redux";
import sortableDataActions from "../../store/actions/sortableDataActions";
import { saveSortableData } from '../../helpers/saveSortableData';


// get section args
import { getSectionConfig } from '../../computeds/getArgs';

// destroy target
import { destroySection } from '../../computeds/destroyTarget';
import { diffArray } from '../../computeds/diffArr';


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




type DDHandleGridRowProps = {
    ratio?: number[];
    sectionArgs?: any;
    rowIndex: number;
    id: string;
    itemType: string;
    columnsData?: any[];
    latestStoreData?: any[];
    moveItemEv: (dragIndex: number, hoverIndex: number, allData: any[]) => void;
};



export default function DDHandleGridRow(props: DDHandleGridRowProps) {

    const {
        ratio,
        sectionArgs,
        rowIndex,
        id,
        itemType,
        columnsData,
        latestStoreData,
        moveItemEv
    } = props;


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
    const dragRef = useRef<HTMLButtonElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const [targetShow, setTargetShow] = useState<string>('');
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ItemTypes.GRID_ROW,
        item: {
            id: id,
            index: rowIndex
        },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult<DropResult>();  // {dropEffect: 'move', currentItemCoordinate: Array(2), allowedDropEffect: 'any'}
            if (item && dropResult) {
                console.log(`${id} => `, item.index);

                //
                const isDropAllowed = dropResult.allowedDropEffect === 'any';


            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    }), []);

    const targetOpacity = isDragging ? 0 : 1;

    const onLongPress = () => {
        setTargetShow('dragging showing');
    };

    const onClick = () => void (0);
    const onLeave = () => {
        setTargetShow('');
    }

    const onHover = () => {
        setTargetShow('dragging');
    }

    const longPressEvent = useLongPress(onLongPress, onClick, onLeave, onHover, {
        shouldPreventDefault: true,
        delay: 500,
    });


    //-----
    const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
        accept: ItemTypes.GRID_ROW,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor: any) {
            if (!previewRef.current) {
                return;
            }
            const dragIndex: any = item.index;
            const hoverIndex = rowIndex;

            // console.log('dragIndex: ', dragIndex, ' | hoverIndex: ', hoverIndex);

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = previewRef.current?.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // Time to actually perform the action
            // callback "dragIndex", "hoverIndex" and "latestStoreData"
            moveItemEv(dragIndex, hoverIndex, latestStoreData as []);


            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    })

    //-----
    drag(dragRef);
    drop(preview(previewRef));



    //-----
    function handleDestroy(e: React.MouseEvent, rowId: string) {
        e.preventDefault();


        if (window.confirm()) {

            
            const allSectionParam1s = currentStoreData.map((item: any) => item.sectionArgs.param1);
            destroySection(currentStoreData, rowId);

            const newSectionParam1s = currentStoreData.map((item: any) => item.sectionArgs.param1);
            const destroyIds = diffArray(allSectionParam1s, newSectionParam1s);

            destroyIds.forEach((destroyId: string | number) => {

                // delete from database
                // do something...

            });


            // update columns and rows data
            updateSortableDataStore(currentStoreData);

            // save latest data here
            saveSortableData(currentStoreData);

            // Avoid updating the UI if the store remains unchanged after destroyed
            (document.querySelector(`#${rowId}`) as HTMLElement).style.display = 'none';

          
        }        


    }

    // Edit attributes (Section (row))
    //---------
    function editModeOn(e: React.MouseEvent, targetId: string | null) {
        e.preventDefault();
        e.stopPropagation();

        // get section args
        const latestSectionArgs: any = getSectionConfig(currentStoreData, targetId as string);
        updateElementTargetDataStore(targetId as string, [], latestSectionArgs);


        // 
        updateElementsEditStatusStore(true);

        //
        changeUrlStatus();

    }

    return (
        <>
            <div 
                ref={previewRef} 
                data-index={rowIndex} 
                data-handler-id={handlerId} 
                id={id} 
                style={{ opacity: targetOpacity }} 
            >
                <div className={`app-builder-section container-fluid ${targetShow}`}>
                    <div className="row">

                        {/* OPTIONS */}
                        <div className="app-builder-section-options">


                            <button
                                tabIndex={-1}
                                className="btn btn-sm px-0 app-builder-section-options__destroy"
                                onClick={(e: React.MouseEvent) => {
                                    handleDestroy(e, id);
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
                                    editModeOn(e, id);
                                }}
                            >

                                <svg width="18px" height="18px" viewBox="0 0 1024 1024"><path fill="#000000" d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z" /></svg>

                            </button>


                            <button
                                ref={dragRef}
                                tabIndex={-1}
                                className="btn btn-sm px-0 app-builder-section-options__draggable-handle"
                                {...longPressEvent}
                            >
                                <svg width="15px" height="15px" viewBox="0 0 48 48">
                                    <g>
                                        <g>
                                            <rect width="48" height="48" fill="none" />
                                        </g>
                                        <g>
                                            <path fill="#333" d="M45.4,22.6l-5.9-6a2.1,2.1,0,0,0-2.7-.2,1.9,1.9,0,0,0-.2,3L39.2,22H26V8.8l2.6,2.6a1.9,1.9,0,0,0,3-.2,2.1,2.1,0,0,0-.2-2.7l-6-5.9a1.9,1.9,0,0,0-2.8,0l-6,5.9a2.1,2.1,0,0,0-.2,2.7,1.9,1.9,0,0,0,3,.2L22,8.8V22H8.8l2.6-2.6a1.9,1.9,0,0,0-.2-3,2.1,2.1,0,0,0-2.7.2l-5.9,6a1.9,1.9,0,0,0,0,2.8l5.9,6a2.1,2.1,0,0,0,2.7.2,1.9,1.9,0,0,0,.2-3L8.8,26H22V39.2l-2.6-2.6a1.9,1.9,0,0,0-3,.2,2.1,2.1,0,0,0,.2,2.7l6,5.9a1.9,1.9,0,0,0,2.8,0l6-5.9a2.1,2.1,0,0,0,.2-2.7,1.9,1.9,0,0,0-3-.2L26,39.2V26H39.2l-2.6,2.6a1.9,1.9,0,0,0,.2,3,2.1,2.1,0,0,0,2.7-.2l5.9-6A1.9,1.9,0,0,0,45.4,22.6Z" />
                                        </g>
                                    </g>
                                </svg>
                            </button>




                        </div>
                        {/* /OPTIONS */}

                        {ratio?.map((item: any, i: number) => {
                            const [colNum, colClassName] = item;
                            return <React.Fragment key={'col-' + i}>
                                <DDTargetGridColumnElem 
                                    sectionId={id}
                                    targetClassName={colClassName} 
                                    allowedDropEffect="any" 
                                    columnIndex={i}
                                    rowIndex={rowIndex}
                                    currentColumnData={typeof columnsData !== 'undefined' && (columnsData as any)[i] !== null ? (columnsData as any)[i] : null} 
                                />
                            </React.Fragment>
                        })}
                    </div>
                </div>

            </div>


        </>
    )


}
