import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router'
import screenfull from 'screenfull';
import { Link } from 'react-router';

import {
    Button, ButtonGroup,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Progress, Modal, CardTitle, Row, ModalHeader, ModalBody,
    InputGroup, InputGroupAddon, Input, Card, CardBlock,
    Form, FormGroup, Label, FormText, FormFeedback,
    InputGroupButton, Col, Alert, ModalFooter
} from 'reactstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadAppMore } from '../../../actions/appsActions';
import './style.css'

class More extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          moreData: [],
          showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.saveAndExit = this.saveAndExit.bind(this);
    }

    componentDidMount() {
        this.props.loadAppMore(this.props.router.params.id);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
        this.state.rSelected = 4;
    }
  
    handleCloseModal () {
        this.setState({ showModal: false });
    }

    save = (e) => {
        e.preventDefault();
        alert('more_save');
        // this.context.router.push('/apps/'+this.props.router.params.id+'/edit');
    }

    saveAndExit = (e) => {
        e.preventDefault();
        this.context.router.push('/apps/'+this.props.router.params.id+'/edit');
    }
    
    render() {
        let moreData = this.props.moreData;

        var el = null;

        if (moreData) {
            el = (
                <div className="more build">
                    <header className="mail-head d-flex align-items-center justify-content-between p-4 animated fadeIn">
                        <h6 className="text-uppercase">MORE</h6>
                        <div className="ml-auto d-flex">
                            <Button className="mr-3" onClick={this.handleOpenModal}><b>EXIT BUILDER</b></Button>
                              <Modal
                                isOpen={this.state.showModal}
                                onHide={this.close}
                              >
                                <ModalHeader toggle={this.toggle}>Alarm</ModalHeader>
                                <ModalBody><h2>Are you sure you want to leave?</h2></ModalBody>
                                <ModalFooter>
                                  <Form onSubmit={e => e.preventDefault()}>
                                    <button onClick={this.saveAndExit}>Yes</button>
                                    <button onClick={this.handleCloseModal}>No</button>
                                  </Form>
                                </ModalFooter>
                            </Modal>
                            <Button color="info" className="mr-3" onClick={this.save, this.props.handler}><b>SAVE</b></Button>
                            <Button color="primary" onClick={this.saveAndExit}><b>SAVE &amp; EXIT</b></Button>
                        </div>
                    </header>
                    <div className="build-wrapper animated fadeInRightBig">
                        <h6 className="mb-4 text-uppercase">SOCIAL MEDIA ACCOUNTS</h6>
                        <Row>
                            <div className="col-sm-6 col-md-9 app-more">
                                {   
                                    moreData.map(function(item, index){
                                        var external = 'False';
                                        if(item.external) external = 'True';
                                        return  <div key={item.key}>
                                                    <div className="col-md-3">{item.key}</div>
                                                    <div className="col-md-7">{item.value}</div>
                                                    <div className="col-md-1">{external}</div>
                                                </div>
                                    }) 
                                }                                
                            </div>
                        </Row>
                    </div>
                </div>
            )
        }
        return el;
    }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadAppMore }, dispatch)
}

More.propTypes = {
  moreData: PropTypes.array
};

More.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    moreData: state.apps.moreData
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(More));