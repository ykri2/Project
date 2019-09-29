import React from 'react';

/** 
 * Table component 
 * 
 **/

class TableComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          
        }

        this.renderDownpaymentsTableRows = this.renderDownpaymentsTableRows.bind(this)
        this.renderDownpaymentsTableHeader = this.renderDownpaymentsTableHeader.bind(this)

    }

    renderDownpaymentsTableHeader(table_header) {            
      table_header.unshift("BETALING")
      const header_row = table_header.map((head_item, index) => {
        
        return <th key={index} className="table_headers" > {head_item.toUpperCase()} </th> 
        
      })
      
      return header_row
    }
    
    
    renderDownpaymentsTableRows(downpayments) {
        const all_rows = downpayments.map((item, index) => {

          const { restgjeld, dato, innbetaling, gebyr, renter, total } = item
          return (
            <tr key={index} className="table_row">
              <td className="table_data" > <p className="table_data_p"> {index} </p> </td>
              <td className="table_data" > <p className="table_data_p"> {restgjeld.toFixed(2)} </p> </td>
              <td className="table_data" > <p className="table_data_p"> {dato} </p> </td>
              <td className="table_data" > <p className="table_data_p"> {innbetaling.toFixed(2)} </p> </td>
              <td className="table_data" > <p className="table_data_p"> {gebyr} </p> </td>
              <td className="table_data" > <p className="table_data_p"> {renter.toFixed(2)} </p> </td>
              <td className="table_data" > <p className="table_data_p"> {total.toFixed(2)} </p> </td>     
            </tr>
          )
        })

      return all_rows
    }


    render() {

      let downpayments = this.props.downpayments
      let table_headers = Object.keys(downpayments[0])

      return (
          <div className='table_wrapper'>

            <table className="table" >
              <tbody className="table_body">
                  <tr>{ this.renderDownpaymentsTableHeader(table_headers) }</tr>
                  { this.renderDownpaymentsTableRows(downpayments) } 
              </tbody>
            </table>
          </div>
        )
    }
}

export default TableComponent;