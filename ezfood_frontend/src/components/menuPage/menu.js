import React, { Component } from 'react';

import {NavLink} from 'react-router-dom';
import ListOrder from './listOrder';
import { Route, Switch } from 'react-router-dom';
import KhaiVi from './khaiVi'
import DoUong from './doUong'
import MonChinh from './monChinh'
import TrangMieng from './trangMieng'
class Menu extends Component {
  render() {
    return (
      <div id="wrap">
        <div className="left_tap">
          <div className="tab">
            <ul id="left_ul">
              <li> <NavLink className="tabNavLinks btn" exact to="/menu/khaiVi" activeClassName = "active">Khai vị</NavLink></li>
              <li> <NavLink className="tabNavLinks btn"  to="/menu/doUong" >Đồ uống</NavLink></li>
              <li> <NavLink className="tabNavLinks btn" to="/menu/monChinh" > Món chính</NavLink></li>
              <li>  <NavLink className="tabNavLinks btn"  to="/menu/tranMieng" >Tráng miệng</NavLink></li>
            </ul>
            <Switch>
            <Route path="/menu/khaiVi" component={KhaiVi} />
            <Route path="/menu/doUong" component={DoUong} />
            <Route path="/menu/monChinh" component={MonChinh} />
            <Route path="/menu/trangMieng" component={TrangMieng} />
            <Route path="/menu" component={KhaiVi} />
            </Switch>
          </div>
        </div>
        <ListOrder />
      </div>

    );
  }
}

export default Menu;
