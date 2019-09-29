import React from "react";
import PropTypes from 'prop-types'


const ListItemComponent = ({ downpayment }) => (
    <div className="list_item" >
        <div className="list_item_row">
            <p className="list_item_p" > Neste faktura: <span className="upper_p_span">{downpayment.total.toFixed(2)}</span>,-   </p>
            <p className="list_item_p" > Fakturadato: <span className="upper_p_span">{downpayment.dato}</span>   </p>
            <p className="list_item_p" > Restgjeld: <span className="upper_p_span">{downpayment.restgjeld.toFixed(2)}</span>,- </p>
        </div>
        <div className="list_item_row">
            <p className="list_item_p_lower" > Din andel: <span className="lower_p_span">{downpayment.innbetaling.toFixed(2)}</span>,-   </p>
            <p className="list_item_p_lower" > Renter: <span className="lower_p_span">{downpayment.renter.toFixed(2)}</span>,-   </p>
            <p className="list_item_p_lower" > Påbelagt gebyr: <span className="lower_p_span">{downpayment.gebyr.toFixed(2)}</span>,-   </p>
            <p className="list_item_p_lower" > Total: <span className="lower_p_span">{downpayment.total.toFixed(2)}</span>,-</p>
        </div>
  
    </div>
    )

ListItemComponent.prototype = {
    downpayment: PropTypes.object.isRequired,

}
    
ListItemComponent.defaultProps = {
    downpayment: {},
}

export default ListItemComponent;