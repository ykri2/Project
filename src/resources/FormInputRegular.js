import React from "react";

import PropTypes from 'prop-types'


const FormInputRegular = ({ field, value, label, error, onChange, type, min, max }) => (
    <div className="form_input_div" id='input'>
        <label className="form_label">{label}</label>
        { error && <span className="help-block">{error}</span> } 
        <input
            onChange={onChange} 
            error={error}
            value={value}
            type={type}
            name={field}
            className="form_input"
            max={ type === 'number' ? max : null }
            min={ type === 'number' ? min : null }
            />
    </div>
    )

FormInputRegular.prototype = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}
    
FormInputRegular.defaultProps = {
        type: 'text'
}

export default FormInputRegular;