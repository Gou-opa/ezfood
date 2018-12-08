/*
*   author @Van Long
*/

import React, { Component } from 'react';
import TableNumber from './tableNumber';
import Sale from './sale';
import Chart from './chart';
import LeftTable from './leftTable';
import History from './history';
import 'react-table/react-table.css'
// boostrap table
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import { Container, Row } from 'reactstrap';

class DashBoard extends Component {

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <TableNumber />
                    <Sale />
                    <Chart />
                </Row>
                <Row>
                    <LeftTable />
                    <History />
                </Row>
           </Container>

        );
    }
}

export default DashBoard;
