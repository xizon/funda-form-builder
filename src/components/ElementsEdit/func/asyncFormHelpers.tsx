import React from 'react';

export const asyncSave = (cb: Function) => {
    setTimeout(() => {
        cb();
    }, 500);
};


export const asyncSaveTriggerForFields = (index: number, label: string = '', extClassName: string = 'd-none', closeFunc: Function = () => void(0)) => {
    return <button tabIndex={-1} type="button" id={`app-elementsedit-btn-save${index}`} className={`app-elementsedit-btn-save--auto position-fixed bottom-0 end-0 my-3 mx-3 btn btn-primary ${extClassName}`}>{label}</button>;
};

export const asyncSaveTriggerForSection = (label: string = '', extClassName: string = 'd-none', closeFunc: Function = () => void(0)) => {
    return <button tabIndex={-1} type="button" id={`app-elementsedit-btn-save-section`} className={`app-elementsedit-btn-save--auto position-fixed bottom-0 end-0 my-3 mx-3 btn btn-primary ${extClassName}`}>{label}</button>;
};


export const asyncSaveTriggerHandle = (label: string = '', extClassName: string = 'd-none', cb: Function = () => void(0)) => {
    return <button onClick={(e: React.MouseEvent) => {
        cb();
    }} tabIndex={-1} type="button" className={`position-fixed bottom-0 end-0 my-3 mx-3 btn btn-primary ${extClassName}`}>{label}</button>;
};

