import React, { useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { snapToGrid as doSnapToGrid } from '../../computeds/snapToGrid';
import type { DragItem } from '../../interfaces/DragItem';
import type { DropTargetItemProps } from '../../interfaces/DropTargetItemProps';
import { ItemTypes } from '../../data/dd-item-types';

import { 
    GridRowElem as DDTargetGridRowElem
} from '../DDTarget';

// store
import { useDispatch, useSelector } from "react-redux";
import sortableDataActions from "../../store/actions/sortableDataActions";
import { saveSortableData } from '../../helpers/saveSortableData';
import { getSortableData } from '../../helpers/getSortableData';

import guid from '../../utils/guid';


export default function GridElem(props: DropTargetItemProps) {

    const {
        defaultData,
        allowedDropEffect
    } = props;

    const detailID = guid();
    const [rowsData, setRowsData] = useState<any[]>([]);


    // Get store (sortable data)
    const dispatch = useDispatch();
    const currentStoreData = useSelector((state: any) => state.sortableData.items);
    const updateSortableDataStore = useCallback((newData: any[]) => {
        dispatch(sortableDataActions(newData));
    }, []);

    
    // Drag & Drop
    //---------
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.SECTION,  // [ItemTypes.SECTION, ItemTypes.MODULE, ...]
        drop(item: DragItem, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset() as {
                x: number
                y: number
            };

            // const getDDHandleModule = monitor.getItem();  // {id: 'app-builder-draggable__item-grid-r1-', left: 0, top: 0, renderComponentData: xxx}
            // item => {id: 'app-builder-draggable__item-grid-r1-', left: 0, top: 0, renderComponentData: xxx}

            // connect component from drag action
            const _gridData = {
                ratio: item.renderComponentData,
                sectionArgs: item.sectionArgs,
                id: item.id + detailID,    // !!!IMPORTANT: The ID must be unique, it will affect the component's key
                columnsData: typeof item.columnsData !== 'undefined' ? item.columnsData : (item.renderComponentData as any).map((item: any, i: number) => null)
            };

            setRowsData((prevState) => [...prevState, _gridData]);
            

            // update rows data
            const latestStoreData = [...currentStoreData, _gridData];
            updateSortableDataStore(latestStoreData);

            // save latest data here
            saveSortableData(latestStoreData);
            


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
    }), [allowedDropEffect, currentStoreData])

    const isActive = canDrop && isOver;


    //
    return (
        <>
            <div 
                className={`app-builder-previewarea__preview ${isActive ? 'active' : ''}`} 
                ref={drop}
            >

                {/*----------- BEGIN  Builder Area   ---------*/}
                {(getSortableData() === null || (getSortableData() as any).length === 0 ) && defaultData === null ? <>
                <div className="app-builder-previewarea__nopreview  d-flex align-items-center justify-content-center h-100">
                    <svg width="150px" height="150px" viewBox="0 0 24 24" className="app-builder-section__nodata-icon">
                        <g>
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path fillRule="nonzero" fill="#ddd" d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
                        </g>
                    </svg>
                </div>

                </> : null}

                
                <DDTargetGridRowElem 
                    defaultSortableData={defaultData}
                    allowedDropEffect="any" 
                    data={rowsData} 
                />
                {/*----------- END Builder Area   ---------*/}
                
            </div>

        </>
    )


}


