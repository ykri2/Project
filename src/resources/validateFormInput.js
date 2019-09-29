import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateFormInput = (req) => {
    
    let errors = {};
    
    let saldoDato = new Date(req.saldoDato);
    let today = new Date()


    if(Number(req.laanebelop) <= 0) {
        errors.laanebelop = 'Noe galt med beløp';
    }

    if(saldoDato <= today) {
        console.log("lololool")
        errors.saldoDato = 'Noe galt med dato';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export default validateFormInput;
