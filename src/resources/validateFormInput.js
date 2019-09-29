import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateFormInput = (req) => {
    
    let errors = {};
    
    let saldoDato = new Date(req.saldoDato);
    let today = new Date()

    let end_year = new Date(req.utlopsDato)
    let year = Number(end_year.getFullYear())
    let today_year = (today.getFullYear())

    if(Number(req.laanebelop) <= 0) {
        errors.laanebelop = 'Noe galt med beløp';
    }

    if(saldoDato <= today) {
        errors.saldoDato = 'Noe galt med dato';
    }

    if(year - today_year < 2 || year - today_year > 40) {
        errors.years = 'Noe galt med år';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export default validateFormInput;
