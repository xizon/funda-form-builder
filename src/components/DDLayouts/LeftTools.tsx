import { useState, useCallback } from "react";
// i18n
import { withTranslation } from 'react-i18next';


// store
import { useDispatch } from "react-redux";
import sortableDataActions from "../../store/actions/sortableDataActions";
import { saveSortableData } from '../../helpers/saveSortableData';

// bootstrap components
import Textarea from 'funda-ui/Textarea';
import ModalDialog from 'funda-ui/ModalDialog';


import { getSortableData } from '../../helpers/getSortableData';
import { saveToDatabase } from '../../helpers/saveSortableData';



const LeftTools = (props: any) => {

    const {
        t,
        callbackModeChange,
        callbackTempChange,
        tempListData
    } = props;

    // Avoid loading templates from being contaminated
    const immutableTempListData = JSON.parse(JSON.stringify(tempListData));


    const [previewCodeShow, setPreviewCodeShow] = useState<boolean>(false);
    const [previewMode, setPreviewMode] = useState<boolean>(false);

    const [loadTempShow, setLoadTempShow] = useState<boolean>(false);
    const [loadTempCloseModalFunc, setLoadTempCloseModalFunc] = useState<Function | null>(null);
    const [saveShow, setSaveShow] = useState<boolean>(false);


    // Get store (sortable data)
    const dispatch = useDispatch();
    const updateSortableDataStore = useCallback((newData: any[]) => {
        dispatch(sortableDataActions(newData));
    }, []);


    function handleSaveToDatabase(e: React.MouseEvent) {
        e.preventDefault();
        saveToDatabase(updateSortableDataStore);
        setSaveShow(true);
    }



    function handleLoadTemp(e: React.MouseEvent) {
        e.preventDefault();
        setLoadTempShow(true);
    }


    function handleSelectTemp(e: React.MouseEvent, data: any[]) {
        e.preventDefault();
        setLoadTempShow(false);

        loadTempCloseModalFunc?.();

        // change default data
        callbackTempChange?.(data);

        // reset the default value state to ensure that other operations are not affected
        setTimeout(() => {
            callbackTempChange?.(null); 
        }, 0);
    }



    function handlePreviewCode(e: React.MouseEvent) {
        e.preventDefault();
        setPreviewCodeShow(true);
    }



    function handleChangeMode(e: React.MouseEvent) {
        e.preventDefault();
        setPreviewMode((prevState) => {
            const res = !prevState;
            callbackModeChange?.(res);
            return res;
        });
    }

    function handleResetSortableData(e: React.MouseEvent) {
        e.preventDefault();

        if (window.confirm(t('确定清空数据？'))) {

            // update columns and rows data
            updateSortableDataStore([]);

            // save latest data here
            saveSortableData([]);
        }
    }


    return (
        <>
            {/*<!-- BUTTONS -->*/}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 me-2">

                <li className={`nav-item ${previewMode ? 'active' : ''}`}>
                    <button tabIndex={-1} className={`btn ${previewMode ? 'btn-info' : 'btn-success'} btn-sm me-2`} onClick={handleChangeMode}>

                        {previewMode ? <>
                            <svg width="13px" height="13px" viewBox="0 -0.5 21 21">
                                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g transform="translate(-99.000000, -400.000000)" fill="#ddd">
                                        <g transform="translate(56.000000, 160.000000)">
                                            <path d="M61.9,258.010643 L45.1,258.010643 L45.1,242.095788 L53.5,242.095788 L53.5,240.106431 L43,240.106431 L43,260 L64,260 L64,250.053215 L61.9,250.053215 L61.9,258.010643 Z M49.3,249.949769 L59.63095,240 L64,244.114985 L53.3341,254.031929 L49.3,254.031929 L49.3,249.949769 Z">

                                            </path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <span className="text-white"> {t('编辑模式')} </span>
                        </> : <>
                            <svg fill="#ddd" width="13px" height="13px" viewBox="0 0 467.4 467.4">
                                <g>
                                    <polygon points="236.182,15 236.182,85 306.183,85 	" />
                                    <path d="M197.289,347.5H71.182v-30h120.641c-0.03-1.009-0.07-2.016-0.07-3.033c0-13.036,2.472-25.506,6.968-36.967H71.182v-30
h145.855c18.622-21.177,45.899-34.566,76.248-34.566c9.671,0,19.03,1.361,27.897,3.898V115h-115V0h-185v415h257.885
C240.927,409.631,209.537,382.988,197.289,347.5z M71.182,177.5h200v30h-200V177.5z"/>
                                    <path d="M374.87,374.838c-5.988,8.071-13.142,15.225-21.213,21.213l71.349,71.349l21.213-21.213L374.87,374.838z" />
                                    <path d="M293.286,242.934c-39.443,0-71.533,32.089-71.533,71.533S253.843,386,293.286,386s71.533-32.09,71.533-71.533
S332.729,242.934,293.286,242.934z"/>
                                </g>
                            </svg>
                            <span className="text-white"> {t('预览')} </span>
                        </>}



                    </button>

                </li>
                <li className="nav-item">
                    <button tabIndex={-1} className="btn btn-danger btn-sm me-2" onClick={handleResetSortableData}>
                        <svg width="13px" height="13px" viewBox="0 0 24 24" >
                            <path fill="none" stroke="#ddd" strokeWidth="2" d="M10,4 C10,2.8954305 10.8954305,2 12,2 C13.1045695,2 14,2.8954305 14,4 L14,10 L20,10 L20,14 L4,14 L4,10 L10,10 L10,4 Z M4,14 L20,14 L20,22 L12,22 L4,22 L4,14 Z M16,22 L16,16.3646005 M8,22 L8,16.3646005 M12,22 L12,16.3646005" />
                        </svg>
                        <span className="text-white"> {t('重置')} </span>

                    </button>
                </li>
                <li className="nav-item">
                    <button tabIndex={-1} className="btn btn-secondary btn-sm me-2" onClick={handlePreviewCode}>

                        <svg width="13px" height="13px" viewBox="0 0 1024 1024"><path d="M135.460571 18.285714h600.137143c67.949714 0 123.099429 53.613714 123.099429 119.954286v623.250286c0 21.650286-12.361143 51.565714-27.794286 67.291428l-111.030857 112.201143c-15.36 15.579429-45.348571 28.16-67.437714 28.16H142.116571c-67.876571 0-123.099429-53.76-123.099428-120.027428V134.729143C19.017143 70.144 71.021714 18.285714 135.460571 18.285714zM672.182857 899.657143l115.785143-117.101714c3.584-3.657143 7.094857-12.434286 7.094857-18.139429V138.166857a58.514286 58.514286 0 0 0-59.465143-57.490286H145.700571a62.756571 62.756571 0 0 0-63.122285 62.756572v705.682286c0 31.744 26.624 57.636571 59.465143 57.636571h512.731428a28.745143 28.745143 0 0 0 17.408-7.168z m-8.411428-217.819429l131.949714 1.462857c17.481143 0 31.744 13.897143 31.817143 31.232a31.451429 31.451429 0 0 1-31.817143 31.158858l-131.949714-1.462858c-7.826286 0-13.897143 5.851429-13.897143 13.165715v150.162285a31.451429 31.451429 0 0 1-31.817143 31.158858 31.451429 31.451429 0 0 1-31.817143-31.158858v-150.162285c0-41.910857 34.669714-75.556571 77.531429-75.556572z m-340.992-136.045714a26.404571 26.404571 0 0 1-18.797715 44.982857 26.624 26.624 0 0 1-18.724571-7.606857L162.230857 461.531429a26.404571 26.404571 0 0 1 0-37.449143L285.257143 302.372571c10.24-10.166857 27.209143-10.166857 37.522286 0 10.313143 10.24 10.313143 26.404571 0 37.449143L218.697143 442.806857 322.779429 545.645714z m232.082285-205.970286a26.404571 26.404571 0 0 1 0-37.449143c10.313143-10.166857 27.282286-10.166857 37.595429 0l123.026286 121.709715a26.404571 26.404571 0 0 1 0 37.449143L592.457143 583.168a26.624 26.624 0 0 1-18.797714 7.606857 26.404571 26.404571 0 0 1-18.797715-45.056L659.017143 442.806857 554.861714 339.821714zM505.417143 261.12c13.531429 4.973714 20.48 19.894857 16.091428 33.938286L406.966857 608.036571a26.916571 26.916571 0 0 1-34.011428 15.945143 26.185143 26.185143 0 0 1-16.237715-34.011428l114.541715-312.978286a26.916571 26.916571 0 0 1 34.157714-15.872z" fill="#ddd" /></svg>
                        <span className="text-white"> {t('模板数据')} </span>

                    </button>
                </li>

                <li className="nav-item">
                    <button tabIndex={-1} className="btn btn-primary btn-sm me-2" onClick={handleSaveToDatabase}>
                        {t('保存到数据库')}
                    </button>
                </li>


                <li className="nav-item">
                    <button tabIndex={-1} className="btn btn-link btn-sm me-2" onClick={handleLoadTemp}>
                        {t('加载模板')}
                    </button>
                </li>
            </ul>
            {/*<!-- /BUTTONS -->*/}


            {/*<!-- NOTIFICATION -->*/}
            <div className="app-builder-header__notify"></div>
            {/*<!-- /NOTIFICATION -->*/}


            {/*<!-- CODE PREVIEW -->*/}
            <ModalDialog
                show={previewCodeShow}
                maxWidth="1200px"
                protectFixedViewport={false}
                heading={t('模板数据')}
                closeBtnClassName="btn btn-secondary"
                closeBtnLabel={t('取消')}
                onClose={(e) => {

                    // Modifying React State can ensure that the window content is updated in real time
                    setTimeout(() => {
                        setPreviewCodeShow(false);
                    }, 350);

                }}
            >
                <Textarea
                    wrapperClassName=""
                    value={JSON.stringify(getSortableData())}
                    rows={12}
                    onFocus={(e) => {
                        e.target.select();
                    }}
                />

            </ModalDialog>
            {/*<!-- /CODE PREVIEW -->*/}



            {/*<!-- LOAD TEMPLATE -->*/}
            <ModalDialog
                show={loadTempShow}
                protectFixedViewport={false}
                heading={t('选择模板')}
                closeBtnClassName="btn btn-secondary"
                closeBtnLabel={t('取消')}
                onOpen={(e, closewin) => {
                    setLoadTempCloseModalFunc(() => closewin);
                }}
                onClose={(e) => {

                    // Modifying React State can ensure that the window content is updated in real time
                    setTimeout(() => {
                        setLoadTempShow(false);
                    }, 350);

                }}
            >
                <div className="list-group" id="app-list-group-searched">
                    {immutableTempListData ? immutableTempListData.map((item: any, i: number) => {
                        return <a 
                        key={i} 
                        href="#" 
                        className={`list-group-item d-flex justify-content-between align-items-start list-group-item-action`} style={{ border: 'none', borderBottom: i < immutableTempListData.length - 1 ? '1px dotted rgba(0,0,0,.1)' : 'none' }}
                        onClick={(e: React.MouseEvent) => {
                            handleSelectTemp(e, item.data);
                        }}
                        >
                            <div className="ms-2 me-auto">
                                <div>{item.tempName}</div>
                            </div>
                        </a>;
                    }) : null}

                </div>

            </ModalDialog>
            {/*<!-- /LOAD TEMPLATE -->*/}


            {/*<!-- SAVE -->*/}
            <ModalDialog
                show={saveShow}
                autoClose={3000}
                protectFixedViewport={false}
                heading={t('提示')}
                onClose={(e) => {

                    // Modifying React State can ensure that the window content is updated in real time
                    setTimeout(() => {
                        setSaveShow(false);
                    }, 350);

                }}
            >
                <div className="text-center text-black mb-3">
                    <svg height="65px" width="65px" viewBox="0 0 1024 1024"><path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#4CAF50" /><path d="M738.133333 311.466667L448 601.6l-119.466667-119.466667-59.733333 59.733334 179.2 179.2 349.866667-349.866667z" fill="#CCFF90" /></svg> <br />
                    {t('保存成功！')}

                </div>


            </ModalDialog>
            {/*<!-- /SAVE -->*/}


        </>
    );

}


export default withTranslation()(LeftTools);


