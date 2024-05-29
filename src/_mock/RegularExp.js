export const phoneNumberReg = /^[0-9]{10}$/;
export const emailRegx = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordReg =/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export function allowsOnlyNumeric(e) {
    const re = /^[0-9\b]+$/;
    if (!re.test(e.key)) {
        e.preventDefault();
    }
}

export function allowsOnlyNumericOnly3Digit(e) {
    const re = /^[0-9\b]+$/;

    // Prevent the input value
    if (!re.test(e.key) || (e.target.value.length >= 3 && e.key !== 'Backspace')) {
        e.preventDefault();
    }
}