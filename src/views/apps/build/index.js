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

import {bindActionCreators} from 'redux';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import IconFace from 'react-icons/lib/md/face';
import IconLogout from 'react-icons/lib/md/power-settings-new';
import IconChat from 'react-icons/lib/fa/comments-o';
import IconMenu from 'react-icons/lib/md/menu';
import IconInfo from 'react-icons/lib/md/info';
import IconMessage from 'react-icons/lib/md/message';
import IconAudio from 'react-icons/lib/md/headset';
import IconHome from 'react-icons/lib/md/home';
import IconLocation from 'react-icons/lib/md/location-city';
import IconEvent from 'react-icons/lib/md/event';
import IconPicture from 'react-icons/lib/md/photo';
import IconMap from 'react-icons/lib/md/map';
import IconEye from 'react-icons/lib/md/remove-red-eye';
import IconNewEvent from 'react-icons/lib/md/event-available';
import IconPictures from 'react-icons/lib/md/photo-library';
import IconShare from 'react-icons/lib/md/share';
import IconQuestion from 'react-icons/lib/fa/question-circle';
import IconEdit from 'react-icons/lib/fa/pencil-square';

import { connect } from 'react-redux';


import AudioTour from './audioTour/audioTour';
import AudioTourList from './audioTour/audioTourList';
import SocialMedia from './socialMedia/socialMedia';
import MapTour from './mapTour/mapTour';

import './style.css';
import { updateApp, loadAppMore, loadAllAppTypes } from '../../../actions/appsActions';
import { loadTour, loadToursMap } from '../../../actions/tourActions';
import { logout } from '../../../actions/authActions';

class Build extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navOpen: false, 
            modal: false, 
            rSelected: 2, 
            tour: null, 
            isRequiredphone: true,
            tourMapsData : [],
            more: null,
            showinfo: true,
            fullscreen: false,
            isIphone: true
        };

        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onAppUpdate = this.onAppUpdate.bind(this);
        this.onChangeCheckBoxChange = this.onChangeCheckBoxChange.bind(this);

        this.props.loadTour(this.props.router.params.id).then(
          (res) => this.setState({ tour: res.data, title : res.data.title,  description : res.data.description, category_id : res.data.category_id, price : res.data.price, langauge_id : res.data.langauge_id, type_id : res.type_id, showinfo : res.showinfo, fullscreen : res.fullscreen}),
          (err) => this.setState({ tour: [] })
        );
    }

    componentDidMount() {
        this.props.loadToursMap(this.props.router.params.id);
        this.props.loadAppMore(this.props.router.params.id);
        this.props.loadAllAppTypes();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({tourMapsData : nextProps.tourMapsData, more: nextProps.more});
    }

    toggleNav = () => {
        this.setState({
            navOpen: !this.state.navOpen
        })
    }

    toggleModal = () => {
        this.setState({modal: !this.state.modal})
    }

    ipadSwitch = (e) => {
        e.preventDefault();
        if (this.state.isIphone){
            this.setState({isIphone: false})
        } else {
            this.setState({isIphone: true})
        }
    }

    handleLogout = (e) => {
        e.preventDefault();
        this.props.logout();
        this.context.router.push('/pages/signin');
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
            appData.category_id = this.state.category_id;
            appData.price = this.state.price;
            appData.appType = this.state.tour.type_id;
            appData.showinfo = this.state.tour.showinfo;
            appData.fullscreen = this.state.tour.fullscreen;
           
            this.props.updateApp(this.context.router.params.id, appData);

            this.setState({ modal: false });
        }
    }

    onRadioBtnClick(rSelected) {
        this.setState({
            rSelected: rSelected
        })
    }
    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSelectChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onChangeCheckBoxChange(e) {
        this.setState({ [e.target.name]: e.target.checked });
    }
    render() {
        let navOpen = this.state.navOpen ? 'open': '';

        let tour = this.state.tour;
        
        var el = null;
        const loadLanguages = this.props.languages;
        const loadCategories = this.props.categories;
        const appTypes = this.props.appTypes;

        if (this.state.tour) {
            el = (
                <div className="view-mail">
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal} size="lg">
                        <ModalHeader toggle={this.toggleModal}>Edit Tour</ModalHeader>
                        <ModalBody>
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
                                            <Label for="exampleNumber" sm={3}>Category</Label>
                                            <Col sm={9}>
                                                <Input type="select" name="category_id" value={tour.category_id} onChange={this.onSelectChange} >
                                                    {loadCategories.map(function (item, index) {
                                                        return <option key={item.id} value={item.id}>{item.name}</option>
                                                    })}
                                                </Input>
                                            </Col>
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
                                        <Card className="mb-5">
                                            <CardBlock>
                                                <div><input type="checkbox" checked={this.state.showinfo} name="showinfo" onChange={this.onChangeCheckBoxChange} /> Show Info </div>
                                                <div><input type="checkbox" checked={this.state.fullscreen} name="fullscreen" onChange={this.onChangeCheckBoxChange} /> Fullscreen </div>

                                            </CardBlock>
                                        </Card>
                                        <FormGroup row>
                                            <Col sm={12} className="">
                                                <Button color="primary" className="float-right" >Update</Button>{' '}
                                            </Col>
                                        </FormGroup>
                                    </Form>



                            {/* <Editor
                                wrapperStyle={{border: '1px solid #efefef', padding: '1rem'}}
                                editorStyle={{'minHeight': '12em'}}
                                toolbarStyle={{'fontSize': '12px'}}
                            /> */}
                        </ModalBody>
                    </Modal>
                    <header className="mail-head d-flex align-items-center justify-content-between p-4">
                        <IconMenu size="24" color="#3f51b5" className="hidden-md-up mr-3" onClick={this.toggleNav} />
                        <Link to="/" style={{marginTop: '-.4rem'}} className="hidden-sm-down">
                            <img src="/images/logo.png" style={{height: '34px'}}/>
                        </Link>


{
    /*
                        <form className="col-6 col-md-6 ml-auto mail-search">
                            <input type="text" placeholder="Search this tour..." className="form-control"/>
                        </form>
    */
}        

                        <div className="right-elems ml-auto d-flex">

                            <div className="wrap profile">
                                <UncontrolledDropdown>
                                    <DropdownToggle tag="div">
                                        <IconFace size="36" color="#3f51b5"/>
                                    </DropdownToggle>
                                    <DropdownMenu right style={{minWidth: '12rem'}}>
                                        <DropdownItem header>Cash Out: $993.4</DropdownItem>
                                        <DropdownItem divider/>
                                        <DropdownItem><IconFace size="16"/>&emsp;<a href="#">Profile</a></DropdownItem>
                                        <div className="text-right ml-3 mr-3 mt-2"><Button block color="info" size="sm" onClick={this.handleLogout}><IconLogout size="15"/>&emsp;Logout</Button></div>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>
                        </div>
                    </header>

                    <nav className={`email-nav p-4 ${navOpen}`}>
                        <h6 className="mb-3 small text-muted">Features</h6>
                        <ul className="list-unstyled">
                            <li><a onClick={this.toggleModal}><IconInfo size="16"/><span className="text">General Info</span></a></li>
                            <AudioTour/>
                            <SocialMedia/>
                        </ul>
                    </nav>
                {
                    /*
                    <nav className={`activity-nav p-4 ${navOpen}`}>

                        <h6 className="mb-3 small text-muted">Activity</h6>
                        <ul className="list-unstyled">
                            <li>
                                <div className="d-flex align-items-center">
                                    <h3 className="mr-2 font-weight-normal"><IconChat size="24"/></h3>
                                    <div className="small">
                                        2 edits were made by Andrew Heil
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    */
                }

                    <div className="email-content-wrapper">
                        <article id="devices">
                            <ButtonGroup className="d-flex">
                              <Button color="primary" onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>Home</Button>
                              <Button color="primary" onClick={() => this.onRadioBtnClick(3)} active={this.state.rSelected === 3}>Map</Button>
                              <Button color="primary" onClick={() => this.onRadioBtnClick(4)} active={this.state.rSelected === 4}>Audio Tours</Button>
                              <Button color="primary" onClick={() => this.onRadioBtnClick(5)} active={this.state.rSelected === 5}>Interact</Button>
                              <Button color="primary" onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>More</Button>
                            </ButtonGroup>
                            <div id="device" className={(this.state.isIphone) ? 'iphone' : 'ipad'}>
                                <div id="devicetop" className="iphone-speaker">
                                </div>
                                <div id="screen" className={(this.state.isIphone) ? 'iphone-screen' : 'ipad-screen'}>
                                    <div id="device-menu" className={(this.state.rSelected === 1) ? 'selected': ''}>
                                        <div className="shadow" onClick={() => this.onRadioBtnClick(2)}></div>
                                        <ul className="list-group">
                                            <li className="list-group-item"><a href="#n"><IconInfo size="16"/><span className="ml-2">General Info</span></a></li>
                                            <li className="list-group-item"><a href="#n"><IconAudio size="16"/><span className="ml-2">Audio Tour</span></a></li>
                                            <li className="list-group-item"><a href="#n"><IconMessage size="16"/><span className="ml-2">Interact</span></a></li>
                                            <li className="list-group-item"><a href="#n"><IconLocation size="16"/><span className="ml-2">Visit</span></a></li>
                                            <li className="list-group-item"><a href="#n"><IconEvent size="16"/><span className="ml-2">Calendar</span></a></li>
                                            <li className="list-group-item"><a href="#n"><IconPicture size="16"/><span className="ml-2">Exhibits</span></a></li>
                                            <li className="list-group-item"><a href="#n"><IconMap size="16"/><span className="ml-2">Map</span></a></li>
                                            <li className="list-group-item"><a href="#n"><IconEye size="16"/><span className="ml-2">On View</span></a></li>
                                            <li className="list-group-item"><a href="#n"><IconNewEvent size="16"/><span className="ml-2">Upcoming</span></a></li>
                                            <li className="list-group-item"><a href="#n"><IconPictures size="16"/><span className="ml-2">Fixed Collection</span></a></li>
                                            <li className="list-group-item"><a href="#n"><IconShare size="16"/><span className="ml-2">Social Media</span></a></li>
                                        </ul>
                                    </div>
                                    <div className="header">
                                        <div className="text-center" style={{color: "#262626", fontSize: 14}}>
                                            TOURS
                                            <IconFace size="16" color="#262626" className="profile"/>
                                        </div>
                                    </div>
                                    <div className="footer">
                                        <div className={(this.state.rSelected === 2) ? 'active-tab home-tab tab' : 'home-tab tab'} onClick={() => this.onRadioBtnClick(2)}>
                                            <IconHome size="16" color="#868686" onClick={() => this.onRadioBtnClick(2)}/>
                                        </div>
                                        <div className={(this.state.rSelected === 3) ? 'active-tab map-tab tab' : 'map-tab tab'} onClick={() => this.onRadioBtnClick(3)}>
                                            <IconMap size="16" color="#868686" onClick={() => this.onRadioBtnClick(3)}/>
                                        </div>
                                        <div className={(this.state.rSelected === 4) ? 'active-tab tour-tab tab' : 'tour-tab tab'} onClick={() => this.onRadioBtnClick(4)}>
                                            <IconAudio size="16" color="#868686" onClick={() => this.onRadioBtnClick(4)}/>
                                        </div>
                                        <div className={(this.state.rSelected === 5) ? 'active-tab content-tab tab' : 'content-tab tab'} onClick={() => this.onRadioBtnClick(5)}>
                                            <IconMessage size="16" color="#868686" onClick={() => this.onRadioBtnClick(5)}/>
                                        </div>
                                        <div className={(this.state.rSelected === 1) ? 'active-tab menu-tab tab' : 'menu-tab tab'} onClick={() => this.onRadioBtnClick(1)}>
                                            <IconMenu size="16" color="#868686" />
                                        </div>
                                    </div>
                                    <div className={`map ${(this.state.rSelected === 3) ? 'selected': ''}`}>
                                        <MapTour mapsData={this.state.tourMapsData}/>
                                    </div>
                                    <div className={`audio ${(this.state.rSelected === 4) ? 'selected': ''}`}>
                                        <AudioTourList />
                                    </div>
                                    <div className={`interact ${(this.state.rSelected === 5) ? 'selected': ''}`}>
                                    </div>
                                    <div className={(this.state.rSelected === 2) ? 'selected home': 'home'}>
                                        <div className="screen-wrapper">
                                            {this.state.tour && this.state.tour.fullscreen &&
                                                    <img src={this.state.tour.cover_image} style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}} />
                                            }
                                            {this.state.tour && !this.state.tour.fullscreen &&
                                                <img src={this.state.tour.cover_image} style={{height: 150, position: 'absolute', top: 0, right: 0, left: 0}} />
                                            }
                                            {this.state.tour && !this.state.tour.showinfo &&
                                                <IconInfo size="20" style={{position: 'absolute', right: 10, bottom: 10, zIndex: 100}} />
                                            }
                                            {this.state.tour && this.state.tour.showinfo &&
                                                <div className="showinfo" style={{maxHeight: 150, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, background: 'rgba(0,0,0,0.3)'}}>
                                                    <h1>{this.state.tour.title}</h1>
                                                    <h2>{this.state.tour.description.substring(0,30)}</h2>
                                                    <span className="read-more">Read More</span>
                                                </div>
                                            }
                                            <div className="body">
                                                {this.state.tour && this.state.tour.tours.length > 1 &&
                                                    <div className="text-center"><Button style={{margin: '15px auto', background: '#262626', borderColor: '#262626', color: '#fff', fontSize: '1.2rem'}}>BUY ALL TOURS</Button></div>
                                                }
                                                {this.state.tour && this.state.tour.features.length > 0 &&
                                                    <div className="features">
                                                        {
                                                            this.state.tour.features.map(function(item, index) {
                                                                return <div key={index} className="feature">
                                                                    <img src={item.cover_image_url}/>
                                                                    <p className="title">{item.title}</p>
                                                                    {
                                                                        (item.single_credit_amount === '0.0') ? (
                                                                            <p className="price">FREE</p>
                                                                        ) : (
                                                                            <p className="price">{item.single_credit_amount}</p>
                                                                        )
                                                                    }
                                                                </div>
                                                            })
                                                        }
                                                    </div>
                                                }
                                                {this.state.tour && this.state.tour.toptour &&
                                                    <Button style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px auto', background: '#55b0f7', borderColor: '#55b0f7', color: '#fff'}}>
                                                        <IconInfo size="12" color="#fff" style={{marginLeft: 15}}/>
                                                        <div style={{display: 'flex', flex: 1, flexDirection: 'column', textAlign: 'left', marginLeft: 15, fontSize: 12}}>
                                                            <div style={{flex: 1}}>{this.state.tour.toptour.title}</div>
                                                            {
                                                                (this.state.tour.toptour.single_credit_amount === '0.0') ? (
                                                                    <div className="price">FREE</div>
                                                                ) : (
                                                                    <div className="price">{this.state.tour.toptour.single_credit_amount}</div>
                                                                )
                                                            }
                                                        </div>
                                                    </Button>
                                                }
                                            </div>
                                        </div>
                                        <div className="edit-click" onClick={this.toggleModal}>
                                            <IconEdit size="48" color="#3f51b5"/>
                                            <h2>Edit</h2>
                                        </div>
                                    </div>
                                </div>
                                <a href="#">
                                    <div id="button" onClick={this.ipadSwitch}>
                                        <div id="button-square">
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </article>                    
                    </div>

                </div>
            )
        }
        return el;
    }
};

function mapStateToProps(state, ownProps) {
  return {
    more: state.apps.more,
    tourMapsData: state.tours.mapsData,
    categories: state.apps.categories,
    languages: state.apps.languages,
    appTypes : state.apps.appTypes
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadTour, logout, loadToursMap, loadAppMore, updateApp, loadAllAppTypes}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Build);



Build.contextTypes = {
  router: React.PropTypes.object.isRequired
};

Build.propTypes = {
  loadTour: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired
};

