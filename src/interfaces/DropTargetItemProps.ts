export interface DropTargetItemProps {
    sectionId?: string;
    defaultData?: any[] | null;
    defaultSortableData?: any;
    allowedDropEffect: string;
    targetClassName?: string;
    currentColumnData?: any;
    sortableData?: any[];
    columnIndex?: number;
    rowIndex?: number;
    data?: any;
}
