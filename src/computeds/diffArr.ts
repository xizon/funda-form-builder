export function diffArray(arr1: any[], arr2: any[]) {
    return arr1
        .concat(arr2)
        .filter(item => !arr1.includes(item) || !arr2.includes(item));
}
