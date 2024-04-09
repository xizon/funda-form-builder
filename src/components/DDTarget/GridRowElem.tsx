import React, { useEffect, useState, useCallback } from 'react';
import update from 'immutability-helper';
import type { DropTargetItemProps } from '../../interfaces/DropTargetItemProps';

import DDHandleGridRow from '../DDHandleGridRow';

import { ItemTypes } from '../../data/dd-item-types';

// store
import { useDispatch, useSelector } from "react-redux";
import sortableDataActions from "../../store/actions/sortableDataActions";
import { saveSortableData } from '../../helpers/saveSortableData';



export default function GridRowElem(props: DropTargetItemProps) {

    const {
        data,
        defaultSortableData
    } = props;

    const [initDefaultData, setInitDefaultData] = useState<boolean>(false);
    const [sortableData, setSortableData] = useState<any[]>([]);
    const [latestStoreData, setLatestStoreData] = useState<any[]>([]);


    // Get store (sortable data)
    const dispatch = useDispatch();
    const currentStoreData = useSelector((state: any) => state.sortableData.items);
    const updateSortableDataStore = useCallback((newData: any[]) => {
        dispatch(sortableDataActions(newData));
    }, []);



    const moveItem = useCallback((dragIndex: number, hoverIndex: number, allData: any[]) => {

        // sort items
        setSortableData((prevState) =>
          update(prevState, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, prevState[dragIndex]],
            ],
          }),
        )

        // update columns and rows data
        const _sortableData = update(allData, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, (allData as any)[dragIndex]],
            ],
        });
        updateSortableDataStore(_sortableData);

    }, []);

    useEffect(() => {

        console.log('--> currentStoreData: ', currentStoreData);
        setLatestStoreData(currentStoreData);

        // save latest data here
        saveSortableData(currentStoreData);

        // initialize data
        setSortableData(currentStoreData);

    });
    


    useEffect(() => {

        // initialize default data
        if (!initDefaultData && typeof defaultSortableData !== 'undefined' && defaultSortableData) {
            setSortableData(defaultSortableData);
            updateSortableDataStore(defaultSortableData);

            setInitDefaultData(true);
        }

        //
        setSortableData(data);

    }, [data]);

    return (
        <>
            {sortableData.map((item: any, i: number) => (
                <DDHandleGridRow
                    key={item.id + i}  // DO NOT ONLY USE `i` or `item.id `
                    itemType={ItemTypes.GRID_ROW}
                    id={item.id}
                    ratio={item.ratio}
                    sectionArgs={item.sectionArgs}
                    columnsData={typeof currentStoreData[i] !== 'undefined' ? currentStoreData[i].columnsData : item.columnsData}
                    rowIndex={i}
                    latestStoreData={latestStoreData}
                    moveItemEv={moveItem}
                />
            ))}

        </>
    )


}
