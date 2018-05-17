import React, { Component } from 'react';
import screenfull from 'screenfull';
import {Link} from 'react-router';
import {
    Button, ButtonGroup,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Progress, Modal, Card, CardBlock, CardTitle, Row, ModalHeader, ModalBody,
    InputGroup, InputGroupAddon, Input
} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { connect } from 'react-redux';
import './style.css';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div className="profile-screen view">
                <div className="view-header d-flex align-items-center">
                    <header className="text-white">
                        <h1 className="h5 title text-uppercase">John Doe</h1>
                        <p className="mb-0 subtitle text-nowrap">Profile</p>
                    </header>
                </div>
                <div className="view-content mainbody container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 hidden-sm hidden-xs">
                            <Card>
                                <CardBlock>
                                <div className="media">
                                    <div className="media-body">
                                        <h3><strong>Bio</strong></h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel gravida metus, non ultrices sapien. Morbi odio metus, dapibus non nibh id amet.</p>
                                        <hr/>
                                        <h3><strong>Location</strong></h3>
                                        <p>Earth</p>
                                        <hr/>
                                        <h3><strong>Gender</strong></h3>
                                        <p>Unknown</p>
                                        <hr/>
                                        <h3><strong>Birthday</strong></h3>
                                        <p>January 01 1901</p>
                                    </div>
                                </div>
                                </CardBlock>
                            </Card>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                            <Card>
                                <CardBlock>
                                    <span className="pull-left">
                                        <a href="#" className="btn btn-link">Company</a>
                                        <a href="#" className="btn btn-link">Photos <span className="badge">42</span></a>
                                        <a href="#" className="btn btn-link"><i className="fa fa-fw fa-users" aria-hidden="true"></i> Contacts <span className="badge">42</span></a>
                                    </span>
                                </CardBlock>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
export default Profile;