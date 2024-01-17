export function destroySection(items: any[], targetId: string) {

    items.forEach((node, i) => {
        if (node) {
            if (targetId === node.id) {
                items.splice(i, 1);
            }
        }
    });
    return items;
}




export function destroyModule(items: any[], targetId: string) {

    // Retrieve each row
    items.forEach((node) => {
        if (node) {

            // Retrieve the elements of each column
            if (Array.isArray(node)) {
                node.forEach((perModule, i) => {
                    if (targetId === perModule.id) {
                        node.splice(i, 1);
                    }
                });
            }

            if (node.columnsData && node.columnsData.length > 0) {
                destroyModule(node.columnsData, targetId);
            }
        }
    });

    return items;
}

