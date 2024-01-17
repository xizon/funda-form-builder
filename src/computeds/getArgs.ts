

export function getModuleFieldsConfig(_items: any[], _targetId: string) {

    let resValue: any[] = [];

    function returnModuleFieldsConfig(items: any[], targetId: string) {

        const retrieveModuleFieldsConfig = (items: any[], targetId: string) => {
            // Retrieve each row
            items.forEach((node) => {
                if (node) {

                    // Retrieve the elements of each column
                    if (Array.isArray(node)) {
                        node.forEach((perModule) => {
                            if (targetId === perModule.id) {
                                if (perModule.moduleSlug) {
                                    resValue = perModule.moduleFields;
                                }
                            }
                        });
                    }

                    if (node.columnsData && node.columnsData.length > 0) {
                        retrieveModuleFieldsConfig(node.columnsData, targetId);
                    }
                }
            });

        };
        retrieveModuleFieldsConfig(items, targetId);


    };

    returnModuleFieldsConfig(_items, _targetId);
    return resValue;

}

export function getSectionConfig(items: any[], targetId: string) {

    let resValue: any = null;

    items.forEach((node) => {
        if (node) {

            if (targetId === node.id) {
                if (node.sectionArgs) {
                    resValue = node.sectionArgs;
                }
            }
        }
    });

    return resValue;
}

