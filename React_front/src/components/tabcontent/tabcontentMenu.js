import React, { Component } from 'react';
import Dish from '../dish/dish';


class TabContentMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        }
    }

    showDish = (dishs) => {
        var result = null;
        var {dishpicked} = this.props;
        // console.log(dishs);
        if (dishs.length > 0) {
            result = dishs.map((dish, index)=> {
                return (
                    <Dish
                        key={index}
                        dish={dish}
                        dishpicked={dishpicked}
                        handleDishPicked ={this.props.handleDishPicked}
                    />
                )
            })
        }
        return result;
    }

    render() {
     
        var id = this.props.tabdefault;
        // console.log(this.props.tabdefault);
        var dishs=[];
        this.props.data.map((item, index) => {
            // console.log(item);
            if (item.type === id) {
                dishs = item.dishes;
            }
            return true;
        });
        return (
            <div id={id} className="tabcontent">
                {this.showDish(dishs)}
            </div>
        );


    }
}

export default TabContentMenu;
