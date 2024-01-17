import { updateModuleFieldsSortNo, updateSectionSortNo } from '../computeds/updateSortNo';
import { getSortableData } from './getSortableData';


export function saveSortableData(data: any) {

    // updata sort no
    updateSectionSortNo(data);
    updateModuleFieldsSortNo(data);

    localStorage.setItem('DD_SORTABLE_DATA', JSON.stringify(data));
    console.log('--> save sortable data successfully!');

    //
    const _div = (document.querySelector('.app-builder-header__notify') as HTMLElement);
    _div.innerHTML = 'saved!';

    setTimeout(() => {
        _div.innerHTML = '';
    }, 3000);
}




export function saveToDatabase(storeCallback: any) {

    const items = getSortableData();

    // do something with

    // update columns and rows data
    storeCallback(items);

   
}