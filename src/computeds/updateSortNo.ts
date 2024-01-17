export function updateModuleFieldsSortNo(items: any[], sortNoKey: string = 'sortNo') { 

    // Retrieve each row
    items.forEach((node) => {
        if (node) {

            // Retrieve the elements of each column
            if (Array.isArray(node)) {
                node.forEach((perModule) => {
                    if (perModule.moduleSlug) {
                        const _targetCols = node;
                        _targetCols.forEach((item: any, j: number) => {
                            if (item.moduleFields) {
                                const _targetFields = Array.isArray(item.moduleFields) ? item.moduleFields : [];
                                _targetFields.forEach((field: any, k: number) => {
                                    if (field.args) {
                                        field.args[sortNoKey] = `${j+1}.${k+1}`;
                                    }
                                });
                            }
                        });
                    }
                });
            }

            if (node.columnsData && node.columnsData.length > 0) {
                updateModuleFieldsSortNo(node.columnsData, sortNoKey);
            }
        }
    });

    return items;
}




export function updateSectionSortNo(items: any[], sortNoKey: string = 'sortNo') {

    items.forEach((node, j) => {
        if (node) {
            if (node.sectionArgs) {
                node.sectionArgs[sortNoKey] = `${j+1}`;
            }
        }
    });

    return items;
}
