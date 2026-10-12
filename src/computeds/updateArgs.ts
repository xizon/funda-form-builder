export function updateModuleFieldsConfig(items: any[], targetId: string, customFields: any = []) {

    // Retrieve each row
    items.forEach((node) => {
        if (node) {

            // Retrieve the elements of each column
            if (Array.isArray(node)) {
                node.forEach((perModule) => {
                    if (targetId === perModule.id) {
                        if (perModule.moduleSlug) {
                            perModule.moduleFields = customFields;
                        }
                    }
                });
            }

            if (node.columnsData && node.columnsData.length > 0) {
                updateModuleFieldsConfig(node.columnsData, targetId, customFields);
            }
        }
    });

    return items;
}




export function updateSectionConfig(items: any[], targetId: string, customSectionArgs: any = null) {

    items.forEach((node) => {
        if (node) {

            if (targetId === node.id) {
                if (node.sectionArgs) {
                    node.sectionArgs = customSectionArgs;
                }
            }
        }
    });

    return items;
}

