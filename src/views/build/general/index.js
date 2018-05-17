import React, { Component } from 'react';
import screenfull from 'screenfull';
import {Link} from 'react-router';

import {
    Button, ButtonGroup,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Progress, Modal, CardTitle, Row, ModalHeader, ModalBody,
    InputGroup, InputGroupAddon, Input, Card, CardBlock,
    Form, FormGroup, Label, FormText, FormFeedback,
    InputGroupButton, Col, Alert, ButtonToolbar,
    ButtonDropdown
} from 'reactstrap';

import {bindActionCreators} from 'redux';

import IconFace from 'react-icons/lib/md/face';
import IconChat from 'react-icons/lib/fa/comments-o';
import IconHome from 'react-icons/lib/md/home';
import IconMap from 'react-icons/lib/md/map';
import IconAudio from 'react-icons/lib/md/directions-walk';
import IconMessage from 'react-icons/lib/md/message';
import IconMenu from 'react-icons/lib/md/menu';
import IconInfo from 'react-icons/lib/md/info';
import IconLocation from 'react-icons/lib/md/location-city';
import IconEvent from 'react-icons/lib/md/event';
import IconPicture from 'react-icons/lib/md/photo';
import IconEye from 'react-icons/lib/md/remove-red-eye';
import IconNewEvent from 'react-icons/lib/md/event-available';
import IconPictures from 'react-icons/lib/md/photo-library';
import IconShare from 'react-icons/lib/md/share';
import IconQuestion from 'react-icons/lib/fa/question-circle';

import { updateApp, loadAppInfo, loadAppMore, loadAllAppTypes } from '../../../actions/appsActions';

import { loadTour, loadToursMap } from '../../../actions/tourActions';

import { connect } from 'react-redux';
import './style.css'

class General extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isIphone: true,
            rSelected: 0,
            tour: null,
            generalInfo: null,
            tabSelected: 0
        };

        this.cancelBtnClick = this.cancelBtnClick.bind(this);
    }

    cancelBtnClick() {
        // check state and go to /apps/id/edit page
    }

    componentDidMount() {
        this.props.loadToursMap(this.props.router.params.id);
        this.props.loadAppMore(this.props.router.params.id);
        this.props.loadAppInfo(this.props.router.params.id);
        this.props.loadAllAppTypes();
    }

    onAppUpdate = (e) => {
        e.preventDefault();
        if (this.state.title.trim() == "") {
            this.setState({ visible: true });
        } else {
            let appData = this.state.tour; 
            appData.title = this.state.title;
            appData.description = this.state.description;
            appData.language_id = this.state.language_id;
            appData.price = this.state.price;
            appData.appType = this.state.tour.type_id;
           
            this.props.updateApp(this.context.router.params.id, appData);

            this.setState({ modal: false });
        }
    }

    handleClick = (index, e) => {
        let c = e.currentTarget.className;
        e.preventDefault();
        e.stopPropagation();

        this.setState({
            tabSelected: (c.indexOf('selected') >= 0) ? '' : index
        })
    }

    render() {
        const loadLanguages = this.props.languages;
        const loadCategories = this.props.categories;
        const appTypes = this.props.appTypes;
        let tour = this.props.generalInfo;

        return <div className="general build">
                <header className="mail-head d-flex align-items-center justify-content-between p-4 animated fadeIn">
                    <h6 className="text-uppercase">INFORMATION</h6>
                    <div className="right-elems ml-auto d-flex">
                        <Button className="mr-3" onClick={this.cancelBtnClick}><b>EXIT BUILDER</b></Button>
                        <Button color="info" className="mr-3"><b>SAVE</b></Button>
                        <Button color="primary"><b>SAVE &amp; EXIT</b></Button>
                    </div>
                </header> 
                <div className="build-wrapper animated fadeInRightBig">
                    <Row>
                        <div className="col-sm-12">
                            <div className="mb-5">
                                <ButtonGroup className="mb-3 general-tab-menu">
                                    <Button className={(this.state.tabSelected === 0) ? 'active': ''} onClick={this.handleClick.bind(this, 0)}>APP INFO</Button>
                                    <Button className={(this.state.tabSelected === 1) ? 'active': ''} onClick={this.handleClick.bind(this, 1)}>WELCOME SCREEN</Button>
                                    <Button className={(this.state.tabSelected === 2) ? 'active': ''} onClick={this.handleClick.bind(this, 2)}>BRANDING</Button>
                                </ButtonGroup>
                            </div>
                            {   
                                this.state.tabSelected === 0 &&
                                <Form onSubmit={this.onAppUpdate}>
                                    <FormGroup row>
                                        <Label for="appTypes" sm={3}>App Type</Label>
                                        <Col sm={9}>
                                            <Input type="select" name="type_id" value={this.state.type_id} onChange={this.onSelectChange} >
                                                {appTypes.map(function (item, index) {
                                                    return <option key={item.id} value={item.id}>{item.title}</option>
                                                })}
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={3}>Title</Label>
                                        <Col sm={9}><Input type="text" id="title" placeholder="Name your tour." value={this.state.title} name="title" onChange={this.onInputChange} /></Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleSearch" sm={3}>Description</Label>
                                        <Col sm={9}><Input type="text" id="exampleDescription" value={this.state.description} placeholder="Describe your tour." name="description" onChange={this.onInputChange} /></Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleNumber" sm={3}>Language</Label>
                                        <Col sm={9}>
                                            <Input type="select" name="language_id" onChange={this.onSelectChange} value={this.state.language_id} >
                                                {loadLanguages.map(function (item, index) {
                                                    return <option key={item.id} value={item.id}>{item.display_name}</option>
                                                })}
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleDate" sm={3}>Price</Label>
                                        <Col sm={9}>
                                            <Input type="select" name="price" onChange={this.onSelectChange} value={this.state.price}>
                                                <option value="0.0">Free</option>
                                                <option>0.49</option>
                                                <option>0.99</option>
                                                <option>1.49</option>
                                                <option>1.99</option>
                                                <option>2.99</option>
                                                <option>3.99</option>
                                                <option>4.99</option>
                                                <option>5.99</option>
                                                <option>6.99</option>
                                                <option>7.99</option>
                                                <option>8.99</option>
                                                <option>9.99</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col sm={12} className="">
                                            <Button color="primary">Update</Button>{' '}
                                        </Col>
                                    </FormGroup>
                                </Form>
                            }
                            {   
                                this.state.tabSelected === 1 &&
                                <Row>
                                    <div className="col-sm-12">
                                        <h6 className="right-title">Branding your tour.</h6>
                                        <Card className="mb-5">
                                            <CardBlock>
                                                <div><input type="checkbox" checked={this.state.showinfo} name="showinfo" onChange={this.onChangeCheckBoxChange} /> Show Info </div>
                                                <div><input type="checkbox" checked={this.state.fullscreen} name="fullscreen" onChange={this.onChangeCheckBoxChange} /> Fullscreen </div>

                                            </CardBlock>
                                        </Card>
                                        Make your tour stand out with a branding that matches your quality.
                                        <br /><br />
                                        Add a cover photo and profile picture that makes you stand apart from the crowd.
                                        <br /><br />
                                        <Button color="primary">Update</Button>{' '}
                                    </div>
                                </Row>
                            }
                            {   
                                this.state.tabSelected === 2 &&
                                <div>
                                    <div className="icon shadow"></div>
                                </div>
                            }
                        </div>
                    </Row>
                </div>
            </div>
    }
};

function mapStateToProps(state, ownProps) {
  return {
    generalInfo: state.apps.generalInfo,
    more: state.apps.more,
    tourMapsData: state.tours.mapsData,
    categories: state.apps.categories,
    languages: state.apps.languages,
    appTypes : state.apps.appTypes
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadTour, loadAppInfo, loadToursMap, loadAppMore, updateApp, loadAllAppTypes}, dispatch)
}

General.contextTypes = {
  router: React.PropTypes.object.isRequired
};

General.propTypes = {
  loadTour: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(General);
