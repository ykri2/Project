import React from 'react';



/** 
 * Header component 
 * 
 **/ 

class HeaderComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          
        }
        

    }

    render() {
        return (
            <div className='header_component'>
               <div className="header_infobox">
                    <p className="ht" >Stacc'in Cash</p>
     
                    <p className="ht_small" >Forbrukslån for folk flest!</p>
                </div>
            </div>
        )
    }
}

export default HeaderComponent;