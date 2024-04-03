export const phoneNumberReg = /^[0-9]{10}$/;
export const emailRegx = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordReg =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[(!@#%^*)()])(?=.{7,})/;

export function allowsOnlyNumeric(e) {
    const re = /^[0-9\b]+$/;
    if (!re.test(e.key)) {
        e.preventDefault();
    }
}