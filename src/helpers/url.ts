
import guid from '../utils/guid';

export function changeUrlStatus(status: string | number = guid()) {
    location.hash = '/page-form-builder-index?edit=' + status;
}


export function changeUrlStatusToIndex() {
    location.hash = '/page-form-builder-index';
}


export function getParams(key: string) {
    const url = window.location.href;
    const param: any = url.split(`${key}=`)[1];
    return param;
}




