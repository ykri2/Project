import React from "react";
import ListItemComponent from '../../resources/ListItemComponent';

/**
 * List component
 *  
 **/
class ListComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          
        }
        
        this.renderListItems = this.renderListItems.bind(this);

    }

    renderListItems(item_list) {

        const all_item_list = item_list.map((item) => {
            return <ListItemComponent downpayment={item} />
        })

        return all_item_list
    }

    render() {

        const downpayments = this.props.downpayments;
        console.log("in list item")
        console.log(downpayments)
        return (
            <div className='list_wrapper'>
                <div className="list_inner_wrapper">
                    {this.renderListItems(downpayments)}
                </div>
            </div>
        )
    }
}

export default ListComponent;