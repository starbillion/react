import React, { Component } from 'react';
import screenfull from 'screenfull';
import {Link} from 'react-router';
import AudioTourList from './list/list';

import {
    Button, ButtonGroup,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Progress, Modal, CardTitle, Row, ModalHeader, ModalBody,
    InputGroup, InputGroupAddon, Input, Card, CardBlock,
    Form, FormGroup, Label, FormText, FormFeedback,
     InputGroupButton, Col, Alert
} from 'reactstrap';

import {bindActionCreators} from 'redux';
import IconFace from 'react-icons/lib/md/face';
import IconHome from 'react-icons/lib/md/home';
import IconMap from 'react-icons/lib/md/map';
import IconAudio from 'react-icons/lib/md/directions-walk';
import IconMessage from 'react-icons/lib/md/message';
import IconMenu from 'react-icons/lib/md/menu';

import { connect } from 'react-redux';

//styles
import './style.css'

class Tours extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isIphone: true
        };
        this.cancelBtnClick = this.cancelBtnClick.bind(this);
    }

    componentDidMount() {
    }
    
    cancelBtnClick() {
        // check state and go to /apps/id/edit page
    }
    
    render() {
        return <div className="build-tours build">
            <header className="mail-head d-flex align-items-center justify-content-between p-4 animated fadeIn">
                <h6 className="text-uppercase">TOURS</h6>
                <div className="right-elems ml-auto d-flex">
                    <Button className="mr-3" onClick={this.cancelBtnClick}><b>EXIT BUILDER</b></Button>
                    <Button color="info" className="mr-3"><b>SAVE</b></Button>
                    <Button color="primary"><b>SAVE &amp; EXIT</b></Button>
                </div>
            </header>
            <div className="build-wrapper animated fadeInRightBig">
                <Row>
                    <div className="col-sm-12">
                        <div className="audio-build">
                            <AudioTourList/>   
                        </div>
                    </div>
                </Row>
            </div>
        </div>
    }
};


export default connect(null)(Tours);