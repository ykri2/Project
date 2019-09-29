import React from 'react';
import PropTypes from 'prop-types';

import BarGraph from './Graph/BarChart';
import { getSumYears } from '../resources/summarizeYear';

/** 
 * Graph component 
 * 
 **/

class GraphComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            disable_btn: 1,
            pivot: 9,

            currXlabel: 'DATO',
            currYlabel: 'BELOP',
            current_data: this.props.downpayments.slice(0,9),
            all_data: this.props.downpayments,


            current_bars: ['innbetaling', 'total', 'renter'],
        }

        this.setComboOne = this.setComboOne.bind(this)
        this.setComboTwo = this.setComboTwo.bind(this)
        this.setComboThree = this.setComboThree.bind(this)

        this.goForward = this.goForward.bind(this)
        this.goBackward = this.goBackward.bind(this)

    }


    
    
   


    render() {

      const downpayments = this.state.current_data;
      const disable_btn = this.state.disable_btn;
      const pivot = this.state.pivot;

      console.log(downpayments)

      return (
        <div className="graph_wrapper">
            <div className="main_button_row"> 
              <button className="main_upper_btn" disabled={ downpayments !== undefined ? false : disable_btn === 1 ? true : false } onClick={this.setComboOne.bind(this)}> 
                  <p>INNBETALINGER {'&'} RENTER</p>
              </button>
              <button className="main_upper_btn" disabled={ downpayments !== undefined ? false : disable_btn === 2 ? true : false } onClick={this.setComboTwo.bind(this)}> 
                  <p>INNBETALINGER {'&'} TOTAL</p>
              </button>
              <button className="main_upper_btn" disabled={ downpayments !== undefined ? false : disable_btn === 3 ? true : false } onClick={this.setComboThree.bind(this)}> 
                  <p> ÅRLIG OPPSUMMERING </p>
              </button>
            </div>
            <BarGraph  w={450} h={400} d={downpayments} yaxis_label={this.state.currYlabel} xaxis_label={this.state.currXlabel} bars={this.state.current_bars} />
            <div className="main_button_row"> 
              <button className="main_upper_btn" disabled={ downpayments !== undefined ? false 
                : pivot <= (downpayments.length - 1)
                
                } onClick={this.goBackward.bind(this)}> 
                  <p> {'<---'} </p>
              </button>
              <button className="main_upper_btn" disabled={ downpayments !== undefined ? false 
                : pivot >= (this.state.all_data.length - 1)
                
                } onClick={this.goForward.bind(this)}> 
                  <p> {'--->'} </p>
              </button>
            </div>
        </div>
        )
    }

    setComboOne() {
      const new_current_bars = ['innbetaling', 'total', 'renter']
      
      let all_data = this.props.downpayments;

      this.setState({
        current_bars: new_current_bars,
        currXlabel: 'DATO',
        disable_btn: 1,
        all_data: all_data,
        current_data: all_data.slice(0, 9)
      })
    }
  
    setComboTwo() {
      const new_current_bars = ['innbetaling', 'total']

      let all_data = this.props.downpayments;

      this.setState({
        current_bars: new_current_bars,
        currXlabel: 'DATO',
        disable_btn: 2,
        all_data: all_data,
        current_data: all_data.slice(0, 9)
      })
    }
  
    setComboThree() {
      const new_current_bars = ['betalt', 'restgjeld', 'renter']

      getSumYears(this.state.all_data, (years) => {

        this.setState({
          current_bars: new_current_bars,
          currXlabel: 'AAR',
          disable_btn: 3,
          all_data: years,
          pivot: 4,
          current_data: years.slice(0, 4)
        })
      })
    }

    goForward() {

      const all_data = this.state.all_data;
      const currXlabel = this.state.currXlabel;
      let pivot = this.state.pivot;

      if(currXlabel === "AAR") {
        pivot = pivot + 4;

        if(pivot > all_data.length - 1) {
          this.setState({
            current_data: all_data.slice(((all_data.length - 1) - 4), all_data.length - 1),
            pivot: all_data.length - 1
          })
        } else {
          this.setState({
            current_data: all_data.slice(pivot - 4, pivot),
            pivot: pivot
          })
        }
      } else {
        pivot = pivot + 9;

        if(pivot > all_data.length - 1) {
          this.setState({
            current_data: all_data.slice(((all_data.length - 1) - 9), all_data.length - 1),
            pivot: all_data.length - 1
          })
        } else {
          this.setState({
            current_data: all_data.slice(pivot - 9, pivot),
            pivot: pivot
          })
        }
      }

    }

    goBackward() {

      const all_data = this.state.all_data;
      const currXlabel = this.state.currXlabel;
      let pivot = this.state.pivot;

      if(currXlabel === "AAR") {
        pivot = pivot - 4;

        if(pivot <= 0) {
          this.setState({
            current_data: all_data.slice(0, 4),
            pivot: 4
          })
        } else {
          this.setState({
            current_data: all_data.slice(pivot - 4, pivot),
            pivot: pivot
          })
        }
      } else {
        pivot = pivot - 9;

        if(pivot <= 0) {
          this.setState({
            current_data: all_data.slice(0, 9),
            pivot: 9
          })
        } else {
          this.setState({
            current_data: all_data.slice(pivot - 9, pivot),
            pivot: pivot
          })
        }
      }

    }

}

export default GraphComponent;