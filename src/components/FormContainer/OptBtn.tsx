import { useState } from "react";


// bootstrap components
import ModalDialog from 'funda-ui/ModalDialog';


import io from '../../utils/custom/io';


type OptBtnProps = {
    className?: string;
    lang?: any;
    icon?: React.ReactNode;
    fetchFuncAsync?: any;
    fetchFuncMethod?: string;
    fetchFuncMethodParams?: any[];
    closeBtnClassName?: string;
    submitBtnClassName?: string;
    submitBtnIcon?: string;
    onSuccess?: (data: any, targetId: string) => void;
};



const OptBtn = (props: OptBtnProps) => {

    const { 
        className,
        lang,
        icon,
        fetchFuncAsync,
        fetchFuncMethod,
        fetchFuncMethodParams,
        closeBtnClassName,
        submitBtnClassName,
        submitBtnIcon,
        onSuccess
    } = props;

    const _params: any[] = fetchFuncMethodParams || [];
    const incomingData: string = (_params).join(',');
    const [show, setShow] = useState<boolean>(false);
    const [targetId, setTargetId] = useState<string>('');


    async function fetchData(params: any) {
        if (typeof fetchFuncAsync === 'object') {
            const response: any = await fetchFuncAsync[`${fetchFuncMethod}`](...params.split(','));
            return response;
        } else {
            return {};
        }
    }

    return (
        <>
            <button tabIndex={-1} type="button" data-target-id={incomingData} className={className || ''} onClick={(e: any) => {
                e.preventDefault();
                setShow(true);
                setTargetId(e.currentTarget.dataset.targetId);
            }}>{icon ? icon : null}  {lang.label}</button>

            <ModalDialog
                show={show}
                data={`${targetId}`}
                triggerClassName=""
                triggerContent=""
                closeBtnClassName={closeBtnClassName || "btn btn-link text-decoration-none"}
                closeBtnLabel={lang.cancel}
                submitBtnClassName={submitBtnClassName || "btn btn-primary"}
                submitBtnLabel={<><span dangerouslySetInnerHTML={{
                    __html: `${submitBtnIcon ? submitBtnIcon : ''}`,
                }}></span> {lang.confirm}</>}
                onClose={(e) => {

                    setTimeout(() => {
                        setShow(false);
                    }, 350);
                }}
                onSubmit={async (e: any, closewin: Function, data: any) => {

                    const response: any = await fetchData(data as string);

                     //server error
                     if (response.code < 0) {
                        // Core Communication
                        io('BRIDGE_ALERT', { process: 0, info: response.message });

                    } else {
                        onSuccess?.(response, data);

                        closewin();
                        e.target.disabled = false;
                        e.target.innerHTML = `${submitBtnIcon ? submitBtnIcon : ''} ${lang.confirm}`

                        // Core Communication
                        io('BRIDGE_ALERT', { process: 0, info: lang.ok });

                    }

                }}
            >
                {lang.tip}

            </ModalDialog>

        </>
    );

}



export default OptBtn;


