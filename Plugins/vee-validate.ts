import { defineRule } from 'vee-validate';
import { required, email, min, confirmed } from '@vee-validate/rules';
import { extend } from 'vee-validate';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('confirmed', confirmed);

defineRule('uniquePassword', value => {
    const usedPassword = ['password123','12345678','qwertyuiop','mamamama'];
    if (usedPassword.includes(value)) {
        return 'password is not unique';
    }
    return true;
});