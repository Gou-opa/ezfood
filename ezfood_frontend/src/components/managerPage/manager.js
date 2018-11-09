import React, { Component } from 'react';

import { NavLink , Switch, Route} from 'react-router-dom';
import ListOrder from '../menuPage/listOrder';
import TangMot from './tangmot';
class Manager extends Component {
    render() {
        return (
            <div id="wrap">
                <div className="left_tap">
                    <div className="tab">
                        <ul id="left_ul">
                            <li> <NavLink className="tabNavLinks btn" exact to="/manager/tang1" activeClassName="active">Tầng 1</NavLink></li>
                            <li> <NavLink className="tabNavLinks btn" to="/manager/tang2" >Tầng 2</NavLink></li>
                            <li> <NavLink className="tabNavLinks btn" to="/manager/tang3 "> Tầng 3</NavLink></li>
                            <li>  <NavLink className="tabNavLinks btn" to="/manager/tang4" >Tầng 4</NavLink></li>
                        </ul>
                        <Switch>
                        <Route path="/manager/tang1" component={TangMot} />
                        <Route path="/manager/tang2" component={TangMot} />
                        <Route path="/manager/tang3" component={TangMot} />
                        <Route path="/manager/tang4" component={TangMot} />
                        <Route path="/manager" component={TangMot} />
                        </Switch>
                    </div>
                </div>

                <ListOrder/>
            </div>




        );
    }
}

export default Manager;
