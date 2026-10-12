import React, { useState, useId } from 'react';
import { useDrag } from 'react-dnd';
import type { DropResult } from '../../interfaces/DropResult';

import useLongPress from '../../utils/hooks/useLongPress';
import { ItemTypes } from '../../data/dd-item-types';

import guid from '../../utils/guid';

type DDHandleModuleProps = {
    left?: number;
    top?: number;
    subTitle?: string;
    index: number;
    itemType: string;
    moduleSlug: string;
    moduleFields?: any[];
};


export default function DDHandleModule(props: DDHandleModuleProps) {

    const {
        left,
        top,
        subTitle,
        index,
        itemType,
        moduleSlug,
        moduleFields
    } = props;

  

    const uniqueID = `app-builder-draggable__item-module` + useId().replace(/\:/g, "-");
    const _left = typeof left === 'undefined' ? 0 : left;
    const _top = typeof top === 'undefined' ? 0 : top;

    const _renderComponent: any = (preview: boolean = false) => {
        
        if (!preview) {
            return <div className={`app-builder-draggable-view app-builder-draggable-view--module ${targetShow}`}>
                {/* PREVIEW SCREENSHOT */}
            </div>;
        } else {
            {/* PREVIEW EDIT AREA */}
            return moduleSlug;
        }

    };


    // Drag & Drop
    //---------
    const [targetShow, setTargetShow] = useState<string>('');
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ItemTypes.MODULE,
        item: { 
            id: uniqueID, 
            left: _left, 
            top: _top,
            moduleFields: moduleFields,
            moduleTitle: subTitle,
            renderComponentData: _renderComponent(true),
        },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult<DropResult>();  // {dropEffect: 'move', currentItemCoordinate: Array(2), allowedDropEffect: 'any'}
            if (item && dropResult) {
                console.log(`--> ${uniqueID} => `, (dropResult as any).currentItemCoordinate);

                //
                const isDropAllowed = dropResult.allowedDropEffect === 'any';

                // do something before dragging
                // ...

            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), []);

    const targetOpacity = isDragging ? 0.4 : 1;

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

    
    return (
        <>
            <div className="app-builder-draggable" id={uniqueID}>
                {/* <!-- ROW --> */}
                <div className="row">
                    <div className="col-auto">
                        <span className="app-builder-draggable-title">{subTitle}</span>
                    </div>
                    <div className="col-auto app-builder-draggable-handle__wrapper">
                        <span 
                            className="app-builder-draggable-handle" 
                            ref={drag} 
                            {...longPressEvent}
                        >
                            <svg width="15px" height="15px" viewBox="0 0 48 48">
                                <g>
                                    <g>
                                        <rect width="48" height="48" fill="none" />
                                    </g>
                                    <g>
                                        <path fill="#fff" d="M45.4,22.6l-5.9-6a2.1,2.1,0,0,0-2.7-.2,1.9,1.9,0,0,0-.2,3L39.2,22H26V8.8l2.6,2.6a1.9,1.9,0,0,0,3-.2,2.1,2.1,0,0,0-.2-2.7l-6-5.9a1.9,1.9,0,0,0-2.8,0l-6,5.9a2.1,2.1,0,0,0-.2,2.7,1.9,1.9,0,0,0,3,.2L22,8.8V22H8.8l2.6-2.6a1.9,1.9,0,0,0-.2-3,2.1,2.1,0,0,0-2.7.2l-5.9,6a1.9,1.9,0,0,0,0,2.8l5.9,6a2.1,2.1,0,0,0,2.7.2,1.9,1.9,0,0,0,.2-3L8.8,26H22V39.2l-2.6-2.6a1.9,1.9,0,0,0-3,.2,2.1,2.1,0,0,0,.2,2.7l6,5.9a1.9,1.9,0,0,0,2.8,0l6-5.9a2.1,2.1,0,0,0,.2-2.7,1.9,1.9,0,0,0-3-.2L26,39.2V26H39.2l-2.6,2.6a1.9,1.9,0,0,0,.2,3,2.1,2.1,0,0,0,2.7-.2l5.9-6A1.9,1.9,0,0,0,45.4,22.6Z" />
                                    </g>
                                </g>
                            </svg>
                        </span>
                    </div>
                </div>
                {/* <!-- /ROW --> */}

                <div ref={preview} style={{ opacity: targetOpacity }}>
                    {_renderComponent()}
                </div>

            </div>

        </>
    )


}

