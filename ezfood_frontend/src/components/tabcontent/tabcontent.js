import React, { Component } from 'react';
import Dish from '../dish/dish';


class TabContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        }
    }
    showDish = (dishs) => {
        var result = null;
        // console.log(dishs);
        if (dishs.length > 0) {
            result = dishs.map((dish, index)=> {
                return (
                    <Dish
                        key={index}
                        dish={dish}
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
            if (item.name === id) {
                dishs = item.value;
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

export default TabContent;
