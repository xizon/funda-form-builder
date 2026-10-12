export function getSortableData() {
    return JSON.parse(localStorage.getItem('DD_SORTABLE_DATA') as never);
}
