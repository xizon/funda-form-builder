
// import all custom modules
import { components } from '../__custom-modules/_config_';


// store
import { useSelector } from "react-redux";

// get section args
import { getSectionConfig } from '../computeds/getArgs';


// render dynamic component
export default function DynamicBlock(props: any) {

    const {
        sectionId,
        moduleFields,
        moduleSlug,
        moduleTitle
    } = props;


    // Get store (sortable data)
    const currentStoreData = useSelector((state: any) => state.sortableData.items);


    const MoudleComponent = components[moduleSlug];

  
    return (
        <>
    
            <h6 className="app-builder-section__item-moudlename">{moduleTitle} <small style={{opacity: .5, fontSize: '0.75rem', fontWeight: 'normal'}}>{JSON.stringify(getSectionConfig(currentStoreData, sectionId))}</small></h6>
            {typeof MoudleComponent !== 'undefined' ? <MoudleComponent fields={moduleFields} /> : null}

        </>
    );
}