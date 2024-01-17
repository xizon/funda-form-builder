import { NavLink } from "react-router-dom";

// i18n
import { withTranslation } from 'react-i18next';

const PageNoMatch = (props: any) => {

    const { t } = props;

    return (
        <>
            <p className="app-404-err">
                <svg className="me-2" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                    <g clip-path="url(#clip0_949_22799)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.82664 2.22902C10.7938 0.590326 13.2063 0.590325 14.1735 2.22902L23.6599 18.3024C24.6578 19.9933 23.3638 22 21.4865 22H2.51362C0.63634 22 -0.657696 19.9933 0.340215 18.3024L9.82664 2.22902ZM10.0586 7.05547C10.0268 6.48227 10.483 6 11.0571 6H12.9429C13.517 6 13.9732 6.48227 13.9414 7.05547L13.5525 14.0555C13.523 14.5854 13.0847 15 12.554 15H11.446C10.9153 15 10.477 14.5854 10.4475 14.0555L10.0586 7.05547ZM14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18Z" fill="#000000" />
                    </g>
                    <defs>
                        <clipPath id="clip0_949_22799">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>

                {t('由于您操作过快导致页面匹配错误')}，
                <NavLink
                    data-err-btn="true"
                    tabIndex={-1}
                    to={`/`}
                >
                    {t('重新加载')}
                </NavLink>
            </p>
        </>
    );

}


export default withTranslation()(PageNoMatch);


