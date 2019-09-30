import React from 'react';

import FormInputRegular from '../resources/FormInputRegular';
import FormInputDate from '../resources/FormInputDate';
import validateFormInput from '../resources/validateFormInput';

/** 
 * Form component 
 * 
 **/

class FormComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            
            laanebelop: 0,
            years: 0,
            saldoDato: "",

            nominellRente: this.props.nrente,
            terminGebyr: 30,
            utlopsDato: "",
            datoForsteInnbetaling: "",
            ukjentVerdi: "TERMINBELOP",

            errors: {}
        }

        this.cleanForm = this.cleanForm.bind(this)
        this.sendForm = this.sendForm.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    inputValidation(req) {
        const { errors, isValid } = validateFormInput(req);
        if(!isValid) {
            this.setState({ errors })
        } else {
            return isValid
        }
    }

    cleanForm() {
        this.setState({
            isLoading: false,
            laanebelop: 0,
            years: 0,
            saldoDato: "",
            ukjentVerdi: "",
            errors: {}
        })
    }

    addSeperator(date) {
        return date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
    }

    getLastPaymentDate(saldoDato, years) {
        let tempDate = new Date(saldoDato)
        let newDate = this.incrementDate(tempDate, "YEAR", years)
        return this.addSeperator(newDate.toISOString().slice(0,10).replace(/-/g,""));
    }

    getNextPaymentDate(saldoDato, months) {
        let tempDate = new Date(saldoDato)
        let newDate = this.incrementDate(tempDate, "MONTH", months)
        return this.addSeperator(newDate.toISOString().slice(0,10).replace(/-/g,""));
    }

    incrementDate(date, type, amount) {
        let newDate;
        switch(type) {
            case "MONTH":
                newDate = new Date(date.setMonth(date.getMonth() + amount))
                break;
            case "YEAR":
                newDate = new Date(date.setYear(date.getFullYear() + amount))
                break;
            default:
                break;
        }
        return newDate
    }

    sendForm() {
  
        const request = {
            laanebelop: Number(this.state.laanebelop),
            nominellRente: this.state.nominellRente,
            terminGebyr: this.state.terminGebyr,
            utlopsDato: this.getLastPaymentDate(this.state.saldoDato, Number(this.state.years)),
            saldoDato: this.state.saldoDato,
            datoForsteInnbetaling: this.getNextPaymentDate(this.state.saldoDato, 1),
            ukjentVerdi: this.state.ukjentVerdi
        }
        
        if(this.inputValidation(request)) {
            this.props.sendRequest(request)
        } else {
            console.log("Invalid object")
        }
        


    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value })
    }

    render() {
 
        const errors = this.state.errors;

        return (
            <div className='form_component'>
                <form className="form">
                    <h1 className="form_header" > Søk og utforsk ditt lån </h1>
                        
                    <div className="form_row" >
                        <FormInputRegular
                            error={errors.laanebelop}
                            label="Hvor mye vil da låne:"
                            onChange={this.onChange}
                            value={this.state.laanebelop}
                            field= "laanebelop"
                            type="number"
                
                            min={10000}  
                        />

                        <FormInputRegular
                            error={errors.years}
                            label="År til ferdig tilbakebetalt: "
                            onChange={this.onChange}
                            value={this.state.years}
                            field= "years"
                            type="number"
                            max={40}
                            min={2} 
                        />

                        <FormInputDate
                            error={errors.saldoDato}
                            label="Ønsket utbetalingsdato:"
                            onChange={this.onChange}
                            value={this.state.saldoDato}
                            field= "saldoDato"
                            type="date" 
                        />
                    </div>
                        
                    <div className="form_button_row">
                        <div disabled={this.state.isLoading} className="form_btn" onClick={this.cleanForm.bind(this)} >
                            <p className="form_btn_p">TØM SKJEMA</p>
                        </div>
                        <div type="submit" disabled={this.state.isLoading} className="form_btn" onClick={this.sendForm.bind(this)} >
                            <p className="form_btn_p">SØK OM LÅN</p>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default FormComponent;