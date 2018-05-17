import React, { Component } from 'react';
import screenfull from 'screenfull';
import {Link} from 'react-router';
import {
    Button, ButtonGroup,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Progress, Modal, Card, CardBlock, CardTitle, Row, ModalHeader, ModalBody,
    InputGroup, InputGroupAddon, Input
} from 'reactstrap';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {bindActionCreators} from 'redux';

import IconNotification from 'react-icons/lib/md/notifications-none';
import IconFullScreen from 'react-icons/lib/md/crop-free';
import IconFace from 'react-icons/lib/md/face';
import IconMail from 'react-icons/lib/md/mail';
import IconSecurity from 'react-icons/lib/md/security';
import IconHelp from 'react-icons/lib/md/help';
import IconLogout from 'react-icons/lib/md/power-settings-new';
import IconDownload from 'react-icons/lib/md/cloud-download';
import IconCake from 'react-icons/lib/md/cake';
import IconSent from 'react-icons/lib/fa/paper-plane-o';
import IconDraft from 'react-icons/lib/fa/pencil';
import IconChat from 'react-icons/lib/fa/comments-o';
import IconTrash from 'react-icons/lib/fa/trash-o';
import IconLabel from 'react-icons/lib/md/lens';
import IconBack from 'react-icons/lib/md/arrow-back';
import IconForward from 'react-icons/lib/md/arrow-forward';
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
import IconPlay from 'react-icons/lib/fa/play-circle-o';



import { connect } from 'react-redux';
import { loadTour, loadToursStops } from '../../../actions/tourActions';
import { logout } from '../../../actions/authActions';
import './style.css';

class BuildStop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navOpen: false, 
            modal: false, 
            rSelected: 4, 
            stops: null, 
            isIphone: true
        };

        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.cancelBtnClick = this.cancelBtnClick.bind(this);

        let _this = this;

        this.props.loadToursStops(this.props.router.params.id, this.props.router.params.tour_id).then(
          (res) => _this.setState({ stops: res }),
          (err) => _this.setState({ stops: [] })
        );
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

    cancelBtnClick = (e) => {
        e.preventDefault();
        this.context.router.push('/apps/'+this.props.router.params.id+"/build");
    }


    onRadioBtnClick(rSelected) {
        //this.setState({ rSelected });
        this.setState({
            rSelected: rSelected
        })
    }

    render() {
        let navOpen = this.state.navOpen ? 'open': '';

        let tour = this.state.stops;
        
        var el = null;
        
        if (this.state.stops) {

            let stops = this.state.stops.stops;
            
            el = (
                <div className="view-mail">
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal} size="lg">
                        <ModalHeader toggle={this.toggleModal}>Edit Tour</ModalHeader>
                        <ModalBody>
                            <Input className="mb-2" placeholder="Make a name"  value={tour.title} />
                            <Input className="mb-2" placeholder="What are you about?" value={tour.description}/>
                            <Editor
                                wrapperStyle={{border: '1px solid #efefef', padding: '1rem'}}
                                editorStyle={{'minHeight': '12em'}}
                                toolbarStyle={{'fontSize': '12px'}}
                            />
                        </ModalBody>
                    </Modal>
                    <header className="mail-head d-flex align-items-center justify-content-between p-4">
                        <Link to="/" style={{marginTop: '-.4rem'}} className="hidden-sm-down">
                            <img src="/images/logo.png" style={{height: '34px'}}/>
                        </Link>
                        <IconMenu size="24" color="#3f51b5" className="hidden-md-up mr-3" onClick={this.toggleNav}/>
                        <div className="right-elems ml-auto d-flex">
                            <Button className="mr-3" onClick={this.cancelBtnClick}><b>CANCEL</b></Button>
                            <Button color="primary" className="mr-3"><b>SAVE</b></Button>
                            <Button color="info"><b>SAVE &amp; EXIT</b></Button>
                        </div>
                    </header>

                    <div className="stops-wrapper">
                        <Row>   
                            <div className="col-xs-12 col-sm-6">
                                <div className="edit-stop-list">

                                    {stops.map(function(item, index) {
                                        return <div className="list-item-stop" key={item.id}>
                                                    <div className="content">
                                                        <h6>{item.id} {item.stop_title}</h6>
                                                        <p><i className="fa fa-user"></i> {item.stop_description}</p>
                                                    </div>
                                                    <div className="image" style={{backgroundImage: 'url('+ item.cover_photo_url +')', backgroundSize:"cover", backgroundPosition: "50%"}}>
                                                    </div>
                                                </div>
                                    })}
                                </div>
                            </div>
                            <div className="center-device">
                                <div id="device" className={(this.state.isIphone) ? 'iphone' : 'ipad'}>
                                    <div id="devicetop" className="iphone-speaker">
                                    </div>
                                    <div id="screen" className={(this.state.isIphone) ? 'iphone-screen' : 'ipad-screen'}>
                                        <div className="header">
                                            <div className="text-center" style={{color: "#262626", fontSize: 14}}>
                                                {tour.title}
                                                <IconFace size="16" color="#262626" className="profile"/>
                                            </div>
                                        </div>
                                        <div className="footer">
                                            <div className={(this.state.rSelected === 2) ? 'active-tab home-tab tab' : 'home-tab tab'}>
                                                <IconHome size="16" color="#868686" onClick={() => this.onRadioBtnClick(2)}/>
                                            </div>
                                            <div className={(this.state.rSelected === 3) ? 'active-tab map-tab tab' : 'map-tab tab'}>
                                                <IconMap size="16" color="#868686" onClick={() => this.onRadioBtnClick(3)}/>
                                            </div>
                                            <div className={(this.state.rSelected === 4) ? 'active-tab tour-tab tab' : 'tour-tab tab'} onClick={() => this.onRadioBtnClick(4)}>
                                                <IconAudio size="16" color="#868686" onClick={() => this.onRadioBtnClick(4)}/>
                                            </div>
                                            <div className={(this.state.rSelected === 5) ? 'active-tab content-tab tab' : 'content-tab tab'}>
                                                <IconMessage size="16" color="#868686" onClick={() => this.onRadioBtnClick(5)}/>
                                            </div>
                                            <div className={(this.state.rSelected === 1) ? 'active-tab menu-tab tab' : 'menu-tab tab'}>
                                                <IconMenu size="16" color="#868686" />
                                            </div>
                                        </div>
                                        <div className={(this.state.rSelected === 4) ? 'selected home': 'home'}>
                                            <div className="home-cover" style={{backgroundImage: `url(${tour.cover_image})`}}>
                                            </div>
                                            <div className="purchased-body">
                                                <Row>   
                                                    <div className="col-12" style={{overflow: 'hidden'}}>
                                                        <div className="purchased-title">
                                                            {tour.title}
                                                        </div>
                                                        <p className="purchased-desc" style={{fontSize: '0.5rem'}}>{tour.description.substring(1,130)}... Read more</p>
                                                    </div>
                                                </Row>
                                            </div>
                                            <div className="button-mask">
                                                <Button color="primary" onClick={this.toggle}>Map View</Button>
                                                <Button color="primary" onClick={this.toggle}>Download</Button>
                                            </div>
                                            <div className="stop-list">
                                                <ul>
                                                    {stops.map(function(item, index) {
                                                            return <li key={item.id} className="stops-list"><div>{index + 1}. </div><div className="ml10 mrAuto"> {item.stop_title} </div><div className="ml10"><IconPlay size="24" color="orange"/></div></li>
                                                    })}

                                                </ul>
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
                            </div>
                        </Row>
                    </div>
                </div>
            )
        }
        return el;
    }
};



function mapStateToProps(state, ownProps) {
  return {
    tourMapsData: state.tours.mapsData,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadTour, logout, loadToursStops }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(BuildStop);

BuildStop.contextTypes = {
  router: React.PropTypes.object.isRequired
}

BuildStop.propTypes = {
  loadTour: React.PropTypes.func.isRequired,
  loadToursStops: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired
}

