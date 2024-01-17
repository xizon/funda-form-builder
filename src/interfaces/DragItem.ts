import React from 'react';

export interface DragItem {
    id: string;
    sectionArgs?: any;
    renderComponentData: React.ReactNode | any[];
    columnsData?: any[];
    moduleTitle?: string;
    moduleFields?: any[];
    left: number;
    top: number;
    index?: number;
}
