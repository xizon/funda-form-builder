/**
 * Flashing highlight form controls
 */
export default function controlHighlight() {
    const formContainer = document.querySelector('.app-form-container');
    const highlightControl = (el: any) => {
        if (el !== null) {
            el.style.boxShadow = 'inset 0px 100vh 0px 0px rgb(255,240,230)';

            setTimeout(() => {
                el.style.boxShadow = 'inset 0px 100vh 0px 0px rgb(255,255,255)';
            }, 200);
            setTimeout(() => {
                el.style.removeProperty('box-shadow');
            }, 250);
        }
    };

    if (formContainer !== null) {
        const inputs = formContainer.querySelectorAll("[name]");
        [].slice.call(inputs).forEach((el: any) => {

            // STEP 1:
            // input, textarea, select
            //----
            if (el.type !== 'radio' && el.type !== 'checkbox') {
                highlightControl(el);
            }
            

            // STEP 2:
            // multifunc select
            //----
            const multifuncSelWrapper = el.closest('.multifunc-select__wrapper');
            if (multifuncSelWrapper !== null) {
                const multipleControl = multifuncSelWrapper.querySelector('.multifunc-select-multi__wrapper .multifunc-select-multi__control-wrapper > div');
                highlightControl(multipleControl);

                const singleControl = multifuncSelWrapper.querySelector('[data-name]');
                highlightControl(singleControl);
            }

            // STEP 3:
            // tag input
            //----
            const tagInputWrapper = el.closest('.tag-input__wrapper');
            if (tagInputWrapper !== null) {
                const tagInputControl = tagInputWrapper.querySelector('.tag-input__control-wrapper > div');
                highlightControl(tagInputControl);
            }


        });
    }
}