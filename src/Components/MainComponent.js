import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { ActionOne } from '../Actions/ActionOne';

import TableComponent from './Containers/TableComponent';
import FormComponent from './FormComponent';
import GraphComponent from './Containers/GraphComponent';
import ListComponent from './Containers/ListComponent';

/* eslint import/no-webpack-loader-syntax: off */
import Loader from '-!react-svg-loader!../resources/circles.svg';
import Moneytree from '-!react-svg-loader!../resources/tree.svg';


/**
 * Main component
 * 
 **/

class MainComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      showForm: false,
      showGraph: false,
      showTable: true,
      showList: false,


      current_req: {},
      typeOfLoan: undefined,
      loanSelected: false,
      nrente: 3,

    }

    this.openFormComponent = this.openFormComponent.bind(this)
    this.sendRequest = this.sendRequest.bind(this)

    this.openGraphComponent = this.openGraphComponent.bind(this)
    this.openTableComponent = this.openTableComponent.bind(this)
    this.openListComponent = this.openListComponent.bind(this)

    this.renderDisplayComponent = this.renderDisplayComponent.bind(this)

  } 
  
  openFormComponent() {
    this.setState({
      showForm: !this.state.showForm
    })
  }

  openGraphComponent() {
    this.setState({
      showGraph: true,
      showTable: false,
      showList: false,
    })
  }

  openTableComponent() {
    this.setState({
      showGraph: false,
      showTable: true,
      showList: false
    })
  }

  openListComponent() {

    this.setState({
      showGraph: false,
      showTable: false,
      showList: true
    })
  }

  sendRequest(req) {

    this.setState(() => {
      return {
        current_req: req,
        showForm: false
      }})

    this.props.actionOne(req)

  }

  renderDisplayComponent(downpayments) {
    const { showGraph, showTable, showList } = this.state;

    if(showGraph === true && (showTable === false && showList === false)) {
      return (
        <GraphComponent downpayments={downpayments.innbetalinger} />
      )
    }
    else if(showList === true && (showGraph === false && showTable === false)) {
      return (
        <ListComponent downpayments={downpayments.innbetalinger} />
      )
    } 
    else {
      return (
        <TableComponent downpayments={downpayments.innbetalinger} />
        )
    }
  }

  selectBolig() {
    this.setState({
      typeOfLoan: "BOLIG",
      loanSelected: true,
      nrente: 3,

    })
  }

  selectForbruks() {
    this.setState({
      typeOfLoan: "FORBURKS",
      loanSelected: true,
      nrente: 12
    })
  }

  render() {

    const typeOfLoan = this.state.typeOfLoan;
    const loanSelected = this.state.loanSelected;
    const nrente = this.state.nrente;
    const downpayments = this.props.contents.nedbetalingsplan;
    const isLoading = this.props.loading;


      
    return (
        <div className="main_component">
            { loanSelected === false 
              ?
              <div className="main_upper_div">
                <div className="main_button_row">
                  <div className="main_type_btn" id="type_btn_one" onClick={this.selectBolig.bind(this)}> 
                    <p> BOLIGLÅN </p>
                  </div>
                  <div className="main_type_btn" id="type_btn_two" onClick={this.selectForbruks.bind(this)}> 
                    <p> FORBRUKSLÅN </p>
                  </div>
                </div>

              </div>
              :
              <div className="main_upper_div">
                <div className="main_button_row">
                  <div className="main_upper_btn" onClick={this.openFormComponent.bind(this)}> 
                    <p> { this.state.showForm !== false ? "LUKKE LÅNESKJEMA" : "ÅPNE LÅNESKJEMA" } </p>
                  </div>
                </div>

                {
                  this.state.showForm !== true ?
                  <div className="main_button_row"> 
                    <button className="main_upper_btn" disabled={ downpayments === undefined ? true : this.state.showTable === true ? true : false } onClick={this.openTableComponent.bind(this)}> 
                      <p>TABLE</p>
                    </button>
                    <button className="main_upper_btn" disabled={ downpayments === undefined ? true : this.state.showList === true ? true : false } onClick={this.openListComponent.bind(this)}> 
                      <p>LIST</p>
                    </button>
                    <button className="main_upper_btn" disabled={ downpayments === undefined ? true : this.state.showGraph === true ? true : false} onClick={this.openGraphComponent.bind(this)}> 
                      <p>GRAPH</p>
                    </button>
                  </div>
                  :
                  <FormComponent sendRequest={this.sendRequest.bind(this)} nrente={nrente} /> 
                }
                
              </div>
              
            }
              <div className="main_lower_div">
                { 
                  downpayments === undefined
                      ?
                      
                      isLoading !== true ?
                        <div className="main_lower_empty_wrapper">
                          <div className="moneytree_wrapper">
                            <Moneytree className="moneytree" width="140px" height="140px" />
                          </div>
                        </div> 
                      :
                      <div className="loading_svg_container">
                        <Loader fill="#91baa4" />
                      </div>
                      
                      :
                        <div className="wrapper">
                        
                          <div className="information_box">
                            <div className="information_box_row"> 
                              <p className="information_box_p">Beløp: <span className="ibxp_color_span">  {this.state.current_req.laanebelop} </span>,-  </p>
                              <p className="information_box_p">Rente: <span className="ibxp_color_span">  {this.state.current_req.nominellRente}% </span> </p>
                              <p className="information_box_p">Første utebetaling: <span className="ibxp_color_span">  {this.state.current_req.saldoDato} </span> </p>
                            </div>
                            <div className="information_box_row"> 
                              <p className="information_box_p">Første tilbakebetaling: <span className="ibxp_color_span"> {this.state.current_req.datoForsteInnbetaling} </span> </p>
                              <p className="information_box_p">Termin gebyr: <span className="ibxp_color_span"> {this.state.current_req.terminGebyr},- </span> </p>
                              <p className="information_box_p">Siste betalingsdato: <span className="ibxp_color_span"> {this.state.current_req.utlopsDato} </span> </p>
                            </div>
                          </div>

                          {
                            this.renderDisplayComponent(downpayments)
                          }
                        </div>
                }
            </div>
          </div>
    );
  
  }


}

MainComponent.propTypes = {

};

MainComponent.defaultProps = {

};


function mapStateToProps(state, props) {
  return {
    contents: state.ReducerOne.contents,
    loading: state.ReducerOne.fetching
  };
}


const mapDispatchToProps = (dispatch) => ({
  actionOne: bindActionCreators(ActionOne, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
