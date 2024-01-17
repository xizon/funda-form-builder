/*

Example:
================================================

<FormContainer
    formContent={<>
        <div>
            <input type="text" name="name1" />
            <input type="text" name="name2" />
            <input type="text" name="name3" required data-required-title={t('字段3')} /> 
            <button tabIndex={-1} type="button" id="app-btn-delete">Delete</button>
            <button tabIndex={-1} type="submit" id="app-btn-save" className="btn btn-primary">Save</button>
        </div>
    </>}
    submitAutoAction={true}  // At least one button type requires `submit` to be valid
    submittedReset={false}
    data={someStateData}
    btnParams={[
        { id: 'app-btn-delete' },
        { id: 'app-btn-save' }
    ]}
    lang={{
        success: t('操作成功！'),
        empty: t('不能为空。')
    }}
    rmSpecialCharactersField={[
        'name1'
    ]}
    customValidation={[
        {
            fieldName: 'name3',
            reg: /^\s*$/, // is blank
            errorMessage: t('字段3') + t('不能为空。')
        }
    ]}
    onSubmit={async (currentBtnId: string, formdata: any, success: boolean, incomingData: any ) => {
        console.log('--> onSubmit: ', {
            'current button ID: ': currentBtnId,
            'submit formdata: ': formdata,
            'success: ': success
        });
    
        if (success) {
            
            const myData = typeof incomingData !== 'undefined' ? incomingData : '99999';

            if ( currentBtnId === 'app-btn-delete' ) {
                // do something...
                const res = await ServiceName.serviceMethord(formdata);
                ...
            }

            if ( currentBtnId === 'app-btn-save' ) {
                // do something...
                const res = await ServiceName.serviceMethord2(formdata);
                ...
            }  
        }

    }}
/>




<FormContainer.OptBtn
    lang={{
        label: t('删除'),
        confirm: t('确认'),
        cancel: t('取消'),
        tip: t('确定删除?'),
        ok: t('删除成功!')
    }}
    className="btn btn-danger btn-sm"
    icon={<><i className="fa-regular fa-trash-can"></i></>}
    fetchFuncAsync={new DataService()}
    fetchFuncMethod="delete"
    fetchFuncMethodParams={[objectId]}
    onSuccess={(res, targetId) => {
        if (res && res.code === 0) {
            document.querySelector(`.demolist [data-slug="${targetId}"]`).style.display = 'none';
        }
    }}
/>

*/

import { useEffect, useRef } from "react";
import { serializeArray } from '../../utils/formdata';
import { isEmpty } from "../../utils/validate";
import { rmSpec } from "../../utils/format-string";
import useEnterKeyDispatchTabListener from '../../utils/hooks/useEnterKeyDispatchTabListener';
import io from '../../utils/custom/io';

import OptBtn from './OptBtn';


interface BtnParamsConfig {
	id?: string;
	fetch?: any[] | boolean | null;
}

type FormContainerProps = {
    formContent?: React.ReactNode;
    btnParams: BtnParamsConfig[];
    lang?: any;
    customValidation?: any[];
    rmSpecialCharactersField?: string[];
    watchField?: string[];
    submittedReset?: boolean;
    submitAutoAction?: boolean;
    successInfoEnabled?: boolean;
    /** 
     * Incoming data, you can set the third parameter of `onSubmit`.
     * 
     * It will be used when the value or content does not change when switching routes 
     * and needs to re-render the component or get the request. */
    data?: any;
    onSubmit?: (currentBtnId: string, formdata: any, success: boolean, incomingData: any) => void;
};

const FormContainer = (props: FormContainerProps) => {


    const {
        formContent,
        lang,
        btnParams,
        customValidation,
        rmSpecialCharactersField,
        watchField,
        submittedReset,
        submitAutoAction,
        data,
        successInfoEnabled,
        onSubmit
    } = props;

    const SUCCESS_INFO_ENABLED = typeof successInfoEnabled === 'undefined' ? false : successInfoEnabled;
    const formRef = useRef<any>(null);


    // control focus switching using keyboard
    useEnterKeyDispatchTabListener({
        system: '__useEnterKeyDispatchTabListener_form',
        ctrl: false
    });


    function errSet(info: string) {


        // Core Communication
        io('BRIDGE_ALERT', {process: 0, info: info});

        // reset button status
        submitBtnStatus(true, false);

    }

    function submitBtnStatus(success: boolean, currentBtnId: string | boolean) {

        const _btnStatus = (el: any) => {
            if (el !== null) {
                const btnLabel: any = typeof el.dataset.value === 'undefined' ? el?.innerHTML : el.dataset.value;
                if (typeof el.dataset.value === 'undefined') el.dataset.value = btnLabel;
            
                if (!success) {
                    el.classList.add('disabled', 'app-button-state--waiting');
                    el.disabled = true;
            
                } else {

                    setTimeout(() => {
                        enableBtn(el);
                    }, 1000);

                }
            } 
        };

        for (const item of btnParams) {
            if ( currentBtnId === item.id ) {
                _btnStatus(document.getElementById(currentBtnId) as HTMLButtonElement);
            }

            if ( currentBtnId === false ) {
                _btnStatus(document.getElementById(item.id as string) as HTMLButtonElement);
            }
        } 

    }

    function enableBtn(el: HTMLButtonElement) {
        el.classList.remove('disabled', 'app-button-state--waiting');
        el.disabled = false;
    }



    async function handleSubmit(e: any) {
        e.preventDefault();
        const currentBtnId = e.currentTarget.id;

        const formData: any = {};
        const fieldsData: any = serializeArray(formRef.current);
        let fieldsCheck: boolean = true;
        let customFieldsCheck: boolean = true;


        // Step 1: button status
        //-------------
        submitBtnStatus(false, currentBtnId);



        // Step 2: Remove all special characters
        //-------------
        if (Array.isArray(rmSpecialCharactersField)) {
            fieldsData.forEach((item: any) => {
                rmSpecialCharactersField.forEach((fieldName: any) => {
                    if (item.name === fieldName) item.value = rmSpec(item.value);
                });
            });
        }


        // Step 3: fields check
        //-------------
        // required fields
        const emptyFieldsCheck = fieldsData.every((item: any, index: number) => {

            if (item.name !== null && item.name !== '') {
                formData[item.name] = item.value;

                const _field = formRef.current.querySelector('[name="' + item.name + '"]');
                const fieldRequired = _field.getAttribute('required');
                if (fieldRequired !== null && fieldRequired !== 'false') {
                    if (item.value === '' || isEmpty(item.value)) {
                
                        const _label = _field.dataset.requiredTitle;
                        errSet(`${_label}${lang.empty}`);
                        return false;
                    }
                }
            }

            return true;
        });


        //  custom validation
        if (Array.isArray(customValidation)) {
            customFieldsCheck = customValidation.every((item: any) => {
                const _field = document.querySelector('[name="'+item.fieldName+'"]') as HTMLFormElement;
                
                if (_field !== null && item.reg !== '') {
                    if ( item.reg.test(_field.value) ) {
                        errSet(item.errorMessage);
                        return false;
                    }
                }
                return true;
            });
        }

        //  merged result
        fieldsCheck = [emptyFieldsCheck, customFieldsCheck].every((item: boolean) => {
            return item;
        });


        // Step 4: everything is ok  
        //-------------
        if (fieldsCheck) {

            // Core Communication
            if (SUCCESS_INFO_ENABLED) io('BRIDGE_ALERT', {process: 0, info: lang.success});
            

            // reset fields
            if (submittedReset) formRef.current.reset();

            // reset button status
            submitBtnStatus(true, currentBtnId);

        }

        //callback
        onSubmit?.(currentBtnId, formData, fieldsCheck, data);

    }


    function btnsInit(allExist: boolean) {
        if (allExist) return;

        const _allExist = btnParams.every((item: any) => {
            const btnId: string = item.id;
            const $btn: any =  document.getElementById(btnId);

            if ( $btn !== null) {
                // Remove event listeners from Element
                // !!! Required when mounting .js separately
                const $newBtn = $btn.cloneNode(true);
                $btn.parentNode.replaceChild($newBtn, $btn);

                //
                $newBtn.removeEventListener('click', handleSubmit);
                $newBtn.addEventListener('click', handleSubmit);
                return true;
            } else {
                return false;
            }

        });    

        // prevent any button is null
        setTimeout(() => {
            btnsInit(_allExist);
        }, 0);
    }
    

    useEffect(() => {

        //  button initilization
        //-----    
        btnsInit(false);

        
        //  watch custom fields
        //-----   
        const listener = (e: any) => { };

        if (Array.isArray(watchField)) {
            watchField.forEach((elName: string) => {
                (formRef.current.querySelector('[name="' + elName + '"]') as HTMLElement).addEventListener("keyup", listener);
            });
        }


        // Remove the global list of events, especially as scroll and interval.
        //--------------
        return () => {

            //
            if (Array.isArray(watchField)) {
                watchField.forEach((elName: string) => {
                    (formRef.current.querySelector('[name="' + elName + '"]') as HTMLElement).removeEventListener("keyup", listener);
                });
            }

            //
            btnParams.forEach(async (item: any) => {
                const btnId: string = item.id;
                const $btn: any = document.getElementById(btnId);
                if ( $btn !== null ) {
                    $btn.removeEventListener('click', handleSubmit);
                    enableBtn($btn);
                }
            


            });  


        };

    }, [data]);


    return (
        <div className="app-form-container">

            {/*<!-- Form elements are here -->*/}
            {submitAutoAction ? <>
                <form ref={formRef}>
                    {formContent}
                </form>
            </> : <>
            <div ref={formRef}>
                    {formContent}
                </div>
            </>}


        </div>

        
    );
}




export default Object.assign(FormContainer, {
    OptBtn: OptBtn
});

  