import React, { Component } from 'react';
import screenfull from 'screenfull';
import {Link} from 'react-router';

import {
    Button, ButtonGroup,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Progress, Modal, CardTitle, Row, ModalHeader, ModalBody,
    InputGroup, InputGroupAddon, Input, Card, CardBlock,
    Form, FormGroup, Label, FormText, FormFeedback,
     InputGroupButton, Col, Alert
} from 'reactstrap';

import {Table, Th, Thead} from 'reactable';     
import {bindActionCreators} from 'redux'; 
import { connect } from 'react-redux';
import './style.css'

// icons
import IconCircle from 'react-icons/lib/md/add-circle-outline';

const revenueTableData = [];
/*
    {checked: true, name: '15-Jan-2016', protocol: 8403, zone: 820, floor: 334, added: '15-Jan-2016'},
    {checked: true, name: '16-Jan-2016', protocol: 6454, zone: 550, floor: 234, added: '16-Jan-2016'},
    {checked: true, name: '17-Jan-2016', protocol: 8473, zone: 749, floor: 245, added: '17-Jan-2016'},
    {checked: true, name: '18-Jan-2016', protocol: 9203, zone: 230, floor: 454, added: '18-Jan-2016'},
    {checked: true, name: '19-Jan-2016', protocol: 1420, zone: 30, floor: 57, added: '19-Jan-2016'},
    {checked: true, name: '20-Jan-2016', protocol: 4859, zone: 90, floor: 30, added: '20-Jan-2016'},
    {checked: true, name: '21-Jan-2016', protocol: 4453, zone: 720, floor: 334, added: '21-Jan-2016'},
    {checked: true, name: '22-Jan-2016', protocol: 6454, zone: 550, floor: 234, added: '22-Jan-2016'},
    {checked: true, name: '23-Jan-2016', protocol: 8473, zone: 749, floor: 245, added: '23-Jan-2016'},
    {checked: true, name: '24-Jan-2016', protocol: 7645, zone: 230, floor: 454, added: '24-Jan-2016'},
    {checked: true, name: '25-Jan-2016', protocol: 1420, zone: 30, floor: 57, added: '25-Jan-2016'},
    {checked: true, name: '26-Jan-2016', protocol: 859, zone: 25, floor: 15, added: '26-Jan-2016'}
]*/


class Beacons extends Component {
    constructor(props) {
        super(props);

        this.state = {
            creatable: true
        };
        this.cancelBtnClick = this.cancelBtnClick.bind(this);
    }

    cancelBtnClick() {
        // check state and go to /apps/id/edit page
    }

    render() {
        return <div className="beacons build">
            <header className="mail-head d-flex align-items-center justify-content-between p-4 animated fadeIn">
                <h6 className="text-uppercase">BEACONS</h6>
                <div className="right-elems ml-auto d-flex">
                    <Button className="mr-3" onClick={this.cancelBtnClick}><b>EXIT BUILDER</b></Button>
                    <Button color="info" className="mr-3"><b>SAVE</b></Button>
                    <Button color="primary"><b>SAVE &amp; EXIT</b></Button>
                </div>
            </header>
            <div className="build-wrapper animated fadeIn">
                <h6 className="mb-4 text-uppercase">ZONES</h6>
                <Row>
                    <div className="col-sm-6 col-md-2 new-tour">
                        <Card className="mb-4">
                            <CardBlock>
                                <div className="d-flex align-items-center justify-content-center" onClick={(e) => this.toggle(e, 'modalFadeInScale')}>
                                    <IconCircle size="44"/>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <p className="info mb-0">New Zone</p>
                                    </div>
                                </div>
                            </CardBlock>
                        </Card>
                    </div>
                </Row>
                <Row>
                    <div className="col-sm-12">
                        <div className="beacons-table linked-rows">
                            <Card className="mb-4">
                                <CardBlock className="table-responsive">
                                    <h6 className="mb-4 text-uppercase">BEACONS</h6>
                                    <div>
                                        <Button color="primary" size="md" onClick={this.viewAllTransactions} className="mb-4">Add Beacon</Button>
                                    </div>
                                    <Table className="table" data={revenueTableData} sortable={true} itemsPerPage={5} pageButtonLimit={5}>
                                        <Thead>
                                            <Th column="checked">
                                                <span>
                                                    <input type="checkbox" className="checkbox-control" checked={this.state.creatable} onChange={this.toggleCreatable}/>
                                                </span>
                                            </Th>
                                            <Th column="name"><span>Beacon Name</span></Th>
                                            <Th column="protocol"><span>Protocol</span></Th>
                                            <Th column="zone"><span>Zone</span></Th>
                                            <Th column="floor"><span>Floor</span></Th>
                                            <Th column="added"><span>Date Added</span></Th>
                                        </Thead>
                                    </Table>
                                </CardBlock>
                            </Card>
                        </div>    
                    </div>
                </Row>    
            </div>
        </div>
    }
};


export default connect(null)(Beacons);