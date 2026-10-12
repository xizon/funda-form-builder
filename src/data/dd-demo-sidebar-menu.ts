import i18next from '../lang/i18n';
import { ItemTypes } from './dd-item-types';
import { ControlTypes } from './dd-control-types';

const data = [
    {
        title: i18next.t('布局'),
        icon: `<svg fill="#333" width="14px" height="14px" viewBox="0 0 32 37" version="1.1"><path d="M0 26.016v-20q0-2.496 1.76-4.256t4.256-1.76h20q2.464 0 4.224 1.76t1.76 4.256v20q0 2.496-1.76 4.224t-4.224 1.76h-20q-2.496 0-4.256-1.76t-1.76-4.224zM4 26.016q0 0.832 0.576 1.408t1.44 0.576h20q0.8 0 1.408-0.576t0.576-1.408v-20q0-0.832-0.576-1.408t-1.408-0.608h-20q-0.832 0-1.44 0.608t-0.576 1.408v20zM8 24v-4h4v4h-4zM8 18.016v-4h4v4h-4zM8 12v-4h4v4h-4zM14.016 24v-4h4v4h-4zM14.016 18.016v-4h4v4h-4zM14.016 12v-4h4v4h-4zM20 24v-4h4v4h-4zM20 18.016v-4h4v4h-4zM20 12v-4h4v4h-4z"></path> </svg>`,
        link: '#',
        active: true,
        children: [
            {
                title: '',
                link: -1,
                type: ItemTypes.SECTION,
                subTitle: i18next.t('比例'),
                ratio: [[12, 'col-12']],
                sectionArgs: {
                    param1: "",
                    param2: "test",
                    param3: "2"
                }
            }, 
            {
                title: '',
                link: -1,
                type: ItemTypes.SECTION,
                subTitle: i18next.t('比例'),
                ratio: [[6, 'col-12 col-md-6'], [6, 'col-12 col-md-6']],
                sectionArgs: {
                    param1: "",
                    param2: "test",
                    param3: "2"
                }
            },
            {
                title: '',
                link: -1,
                type: ItemTypes.SECTION,
                subTitle: i18next.t('比例'),
                ratio: [[2, 'col-12 col-md-2'], [2, 'col-12 col-md-2'], [8, 'col-12 col-md-8']],
                sectionArgs: {
                    param1: "",
                    param2: "test",
                    param3: "2"
                }
            },
        ]
    },
    {
        title: i18next.t('模块'),
        icon: `<svg fill="#333" width="18px" height="18px" viewBox="0 0 24 24"><path d="m3.553 18.895 4 2a1.001 1.001 0 0 0 .894 0L12 19.118l3.553 1.776a.99.99 0 0 0 .894.001l4-2c.339-.17.553-.516.553-.895v-5c0-.379-.214-.725-.553-.895L17 10.382V6c0-.379-.214-.725-.553-.895l-4-2a1 1 0 0 0-.895 0l-4 2C7.214 5.275 7 5.621 7 6v4.382l-3.447 1.724A.998.998 0 0 0 3 13v5c0 .379.214.725.553.895zM8 12.118l2.264 1.132-2.913 1.457-2.264-1.132L8 12.118zm4-2.5 3-1.5v2.264l-3 1.5V9.618zm6.264 3.632-2.882 1.441-2.264-1.132L16 12.118l2.264 1.132zM8 18.882l-.062-.031V16.65L11 15.118v2.264l-3 1.5zm8 0v-2.264l3-1.5v2.264l-3 1.5zM12 5.118l2.264 1.132-2.882 1.441-2.264-1.132L12 5.118z"/></svg>`,
        link: '#',
        active: true,
        children: [
            {
                title: '',
                link: -1,
                type: ItemTypes.MODULE,
                subTitle: i18next.t('数据块（表单1）'),
                moduleSlug: 'module_default_elem',
                moduleFields: [
                    {
                        controlType: ControlTypes.FORM_INPUT,
                        args: {
                            name: '',
                            title: i18next.t('标题'),
                            value: 'test',
                        }
                    },
                ]
            },
            {
                title: '',
                link: -1,
                type: ItemTypes.MODULE,
                subTitle: i18next.t('数据块（表单2）'),
                moduleSlug: 'module_default_elem2',
                moduleFields: [
                    {
                        controlType: ControlTypes.FORM_INPUT,
                        args: {
                            name: '',
                            title: '',
                            value: '',
                            required: true,
                            styles: ''
                        }
                    },
                    {
                        controlType: ControlTypes.FORM_RADIO,
                        args: {
                            name: '',
                            title: '',
                            value: '',
                        }
                    },
                ]
            },
            {
                title: '',
                link: -1,
                type: ItemTypes.MODULE,
                subTitle: i18next.t('数据块（表格内容）'),
                moduleSlug: 'module_default_elem3',
                moduleFields: [
                    {
                        controlType: ControlTypes.CONTENT_LIST,
                        args: {
                            inputData: {
                                "headers": [
                                    {"type": false, "style": {width: '50px'}, "content": i18next.t('编号') },
                                    {"type": false, "content": i18next.t('姓名') },
                                    {"type": false, "content": i18next.t('住址') }
                                ],
                                "fields": []
                            },
                            title: '',
                            styles: 'light'
                        }
                    },
                ]
            },
        ]
    }
];

export default data;
 
