import React, { Component, PropTypes } from 'react';
import { logout } from './actions/authActions';
import { connect } from 'react-redux';
import {Link, IndexLink, withRouter} from 'react-router';
import ScrollArea from 'react-scrollbar';
import {
    Button, ButtonGroup
} from 'reactstrap';

import './build.css';
import IconFace from 'react-icons/lib/md/face';
import IconHome from 'react-icons/lib/md/home';
import IconSearch from 'react-icons/lib/md/search';
import IconMap from 'react-icons/lib/md/map';
import IconAudio from 'react-icons/lib/md/directions-walk';
import IconMessage from 'react-icons/lib/md/message';
import IconMenu from 'react-icons/lib/md/menu';
import IconAndroid from 'react-icons/lib/md/android';
import IconApple from 'react-icons/lib/fa/apple';
import IconInfo from 'react-icons/lib/md/info';
import IconBlurOn from 'react-icons/lib/md/blur-on';
import IconZone from 'react-icons/lib/md/settings-input-antenna';
import IconWalk from 'react-icons/lib/md/directions-walk';
import IconAdd from 'react-icons/lib/md/add-box';
import IconPlus from 'react-icons/lib/fa/plus';
import IconRestaurant from 'react-icons/lib/md/local-restaurant';
import IconMore from 'react-icons/lib/md/more';
import IconScreens from 'react-icons/lib/md/view-quilt';

import {
    Card, CardBlock, CardTitle,
    Nav, NavItem, NavLink, CardImg, CardText
} from 'reactstrap';

import {bindActionCreators} from 'redux';

import { loadTours, loadTour } from '../src/actions/tourActions';
import { updateApp, loadAppInfo, loadAppMore, loadAllAppTypes } from '../src/actions/appsActions';

import Tours from '../src/views/build/tours/index';
import More from '../src/views/build/more/index';

class BuildWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navMini: false,
            isIphone: true,
            selected: 0,
            moreData: [],
            generalInfo: null,
            tours: [],
            contentTabSelected: 0
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.handler = this.handler.bind(this);
    }

    componentDidMount() {        
        this.props.loadTours(this.context.router.params.id);
        this.props.loadAppMore(this.props.router.params.id);
        this.props.loadAppInfo(this.props.router.params.id);
    }

    toggleNav = (e) => {
        e.preventDefault();
        this.setState({navMini: !this.state.navMini});
    }
    
    hideNav = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({navMini: false})
    }

    handleLogout = (e) => {
        e.preventDefault();
        this.props.logout();
        this.context.router.push('/pages/signin');
    }

    phoneSwitch = (e) => {
        e.preventDefault();
        if (this.state.isIphone){
            this.setState({isIphone: false})
        } else {
            this.setState({isIphone: true})
        }
    }

    handler(e) {
        var currentLocation = this.props.location.pathname
        var splitUrl = currentLocation.split('/');
        var lastUrl = splitUrl[splitUrl.length-1];
        if(lastUrl == 'more'){
            this.setState({rSelected: 5}, function () {
            });
        }else if(lastUrl == 'tours'){
            this.setState({rSelected: 4}, function () {
            });
        }
    }

    handleClick = (index, e) => {
        let c = e.currentTarget.className;
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            selected: (c.indexOf('selected') >= 0) ? '' : index
        })
    }
    handleOpen = (index, e) => {
        e.stopPropagation();
        this.setState({
            selected: index
        })
    }

    handleContentTab = (index, e) => {
        let c = e.currentTarget.className;
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            contentTabSelected: (c.indexOf('contentTabSelected') >= 0) ? '' : index
        })
    }

    render() {
        let moreData = this.props.moreData;
        let generalInfo = this.props.generalInfo;
        let tours = this.props.tours;
        let navMini = this.state.navMini;
        var currentLocation = this.props.location.pathname
        var splitUrl = currentLocation.split('/');
        var lastUrl = splitUrl[splitUrl.length-1];

        return (
            <div className="builder app-wrapper">
                <div>
                    <nav className={`site-build-nav  ${this.props.mini ? 'mini' : ''}`} role="navigation">
                        <header className="nav-head">
                            <Link to={'/apps/' + this.context.router.params.id + '/build/info'}>
                                <img src="/images/builder.png" />
                            </Link>
                            <div className={`toggle-dot ${this.props.mini ? 'active': ''}`} onClick={this.props.toggleNav}></div>
                        </header>
                        <ScrollArea className="nav-list-container build-primary" horizontal={false} verticalScrollbarStyle={{width: '4px', marginLeft: '10px'}}>
                            <ul className="list-unstyled nav-list clearfix">
                                <li onClick={this.handleClick.bind(this, 0)} className={(this.state.selected === 0) ? 'selected': ''}>
                                    <IndexLink to={'/apps/' + this.context.router.params.id +'/build/info'} activeClassName="active">
                                        <IconInfo size="18" className="icon-dashboard"/>
                                        <span className="name">General Info</span>
                                    </IndexLink>
                                </li>
                                <li onClick={this.handleClick.bind(this, 1)} className={(this.state.selected === 1) ? 'selected': ''}>
                                    <Link to={'/apps/' + this.context.router.params.id +'/build/screens'} activeClassName="active">
                                        <IconScreens size="18"/>
                                        <span className="name">App Screens</span>
                                    </Link>
                                </li>
                                <li onClick={this.handleClick.bind(this, 2)} className={(this.state.selected === 2) ? 'selected': ''}>
                                    <Link to={'/apps/' + this.context.router.params.id +'/build/maps'} activeClassName="active">
                                        <IconMap size="18" />
                                        <span className="name">Maps</span>
                                    </Link>
                                </li>
                                <li onClick={this.handleClick.bind(this, 3)} className={(this.state.selected === 3) ? 'selected': ''}>
                                    <Link to={'/apps/' + this.context.router.params.id +'/build/interact'} activeClassName="active">
                                        <IconMessage size="18"/>
                                        <span className="name">INTERACT</span>
                                    </Link>
                                </li>
                                <li onClick={this.handleClick.bind(this, 4)} className={(this.state.selected === 4) ? 'selected': ''}>
                                    <Link to={'/apps/' + this.context.router.params.id +'/build/beacons'} activeClassName="active">
                                        <IconBlurOn size="18"/>
                                        <span className="name">Beacons</span>
                                    </Link>
                                </li>
                                <li onClick={this.handleClick.bind(this, 6)} className={(this.state.selected === 6) ? 'selected': ''}>
                                    <Link to={'/apps/' + this.context.router.params.id +'/build/tours'} activeClassName="active">
                                        <IconWalk size="18"/>
                                        <span className="name">Tours</span>
                                    </Link>
                                </li>
                                <li onClick={this.handleClick.bind(this, 8)} className={(this.state.selected === 8) ? 'selected': ''}>
                                    <Link to={'/apps/' + this.context.router.params.id +'/build/restaurant'} activeClassName="active">
                                        <IconRestaurant size="18"/>
                                        <span className="name">Restaurant</span>
                                    </Link>
                                </li>
                                <li onClick={this.handleClick.bind(this, 9)} className={(this.state.selected === 9) ? 'selected': ''}>
                                    <Link to={'/apps/' + this.context.router.params.id +'/build/more'} activeClassName="active">
                                        <IconMore     size="18"/>
                                        <span className="name">More</span>
                                    </Link>
                                </li>
                                {}
                            </ul>
                            {/* end scroll-area */}
                        </ScrollArea>
                    </nav>
                </div>
                <div className={`content-container ${navMini ? 'full' : ''}`}>
                    {/* dropshadow for mobile nav triggering */}
                    <div className="build-device-screen">
                        {
                            (this.state.isIphone) ? 
                                <div className="phone-switcharoo">
                                    <IconAndroid size="24" color="#DDDDDD" onClick={this.phoneSwitch}/>
                                    <IconApple size="24" color="#868686" onClick={this.phoneSwitch}/>
                                </div>
                            :
                                <div className="phone-switcharoo">
                                    <IconAndroid size="24" color="#868686" onClick={this.phoneSwitch}/>
                                    <IconApple size="24" color="#DDDDDD" onClick={this.phoneSwitch}/>
                                </div>
                        }
                        {
                            (this.state.isIphone) ? 
                                <div className="iphone-x">
                                    <div className="outer">
                                      <div className="inner">
                                        <div className="clock"></div>
                                        <div className="notch">
                                          <div className="speaker"></div>
                                          <div className="camera"></div>
                                        </div>
                                        <div className="screen-container">
                                            <div className="fullscreen-bg">
                                                <div className="fullscreen-content">
                                                    {
                                                        this.state.selected === 0 &&
                                                            <div>
                                                                <div className="header">
                                                                    <div className="text-center" style={{color: "#262626", fontSize: 14}}>
                                                                        WELCOME
                                                                        <IconFace size="16" color="#262626" className="profile"/>
                                                                    </div>
                                                                </div>
                                                                <div className="home" style={{top: 51, bottom: 36, position: 'absolute', left: 0, right: 0}}>
                                                                    {generalInfo.fullscreen &&
                                                                            <img data-pin-nopin="true" src={generalInfo.cover_image} style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}} />
                                                                    }
                                                                    {!generalInfo.fullscreen &&
                                                                        <img data-pin-nopin="true" src={generalInfo.cover_image} style={{height: 150, position: 'absolute', top: 0, right: 0, left: 0}} />
                                                                    }
                                                                    {!generalInfo.showinfo &&
                                                                        <IconInfo size="20" style={{position: 'absolute', right: 10, bottom: 10, zIndex: 100}} />
                                                                    }
                                                                    {generalInfo.showinfo &&
                                                                        <div className="showinfo" style={{maxHeight: 150, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, background: 'rgba(0,0,0,0.3)'}}>
                                                                            <h1>{generalInfo.title}</h1>
                                                                            <h2>{generalInfo.description.substring(0,30)}</h2>
                                                                            <span className="read-more">Read More</span>
                                                                        </div>
                                                                    }
                                                                    <div className="body">
                                                                        {generalInfo.tours && generalInfo.tours.length > 1 &&
                                                                            <div className="text-center"><Button style={{margin: '5px auto', background: '#262626', borderColor: '#262626', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold'}}>BUY ALL TOURS</Button></div>
                                                                        }
                                                                        {generalInfo.features && generalInfo.features.length > 0 &&
                                                                            <div className="features">
                                                                                {
                                                                                    generalInfo.features.map(function(item, index) {
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
                                                                        {generalInfo.toptour &&
                                                                            <div className="toptour">
                                                                                <IconInfo size="12" color="#fff"/>
                                                                                <div className="toptour-text">
                                                                                    <div className="title">{generalInfo.toptour.title}</div>
                                                                                    {
                                                                                        (generalInfo.toptour.single_credit_amount === '0.0') ? (
                                                                                            <div className="price">FREE</div>
                                                                                        ) : (
                                                                                            <div className="price">{generalInfo.toptour.single_credit_amount}</div>
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    }
                                                    {
                                                        this.state.selected === 8 &&
                                                            <div>
                                                                <div className="header">
                                                                    <div className="text-center" style={{color: "#262626", fontSize: 14}}>
                                                                        RESTAURANT
                                                                        <IconFace size="16" color="#262626" className="profile"/>
                                                                    </div>
                                                                </div>
                                                                <div className="restaurant-build screen">
                                                                    <div className="restaurant-body-build">
                                                                        <Card className="flex-row">
                                                                            <CardBlock>
                                                                                <CardText>BREAKFAST</CardText>
                                                                            </CardBlock>
                                                                        </Card>
                                                                        <Card className="flex-row">
                                                                            <CardBlock>
                                                                                <CardText>PASTA</CardText>
                                                                            </CardBlock>
                                                                        </Card>
                                                                        <Card className="flex-row">
                                                                            <CardBlock>
                                                                                <CardText>PIZZA</CardText>
                                                                            </CardBlock>
                                                                        </Card>
                                                                        <Card className="flex-row">
                                                                            <CardBlock>
                                                                                <CardText>DRINKS</CardText>
                                                                            </CardBlock>
                                                                        </Card>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    }
                                                    {
                                                        this.state.selected === 3 &&
                                                            <div>
                                                                <div className="header">
                                                                    <div className="text-center" style={{color: "#262626", fontSize: 14}}>
                                                                        <IconSearch size="16" color="#262626" className="search"/>
                                                                        INTERACT
                                                                        <IconFace size="16" color="#262626" className="profile"/>
                                                                    </div>
                                                                </div>
                                                                <div className="screen">
                                                                    <div>
                                                                        <ButtonGroup className="interact-tab-menu">
                                                                            <Button className={(this.state.contentTabSelected === 0) ? 'active': ''} onClick={this.handleContentTab.bind(this, 0)}>ALL</Button>
                                                                            <Button className={(this.state.contentTabSelected === 1) ? 'active': ''} onClick={this.handleContentTab.bind(this, 1)}>DISCUSS</Button>
                                                                            <Button className={(this.state.contentTabSelected === 2) ? 'active': ''} onClick={this.handleContentTab.bind(this, 2)}>Q &amp; A</Button>
                                                                            <Button className={(this.state.contentTabSelected === 3) ? 'active': ''} onClick={this.handleContentTab.bind(this, 3)}>MESSAGES</Button>
                                                                        </ButtonGroup>
                                                                        {
                                                                            this.state.contentTabSelected === 1 && 
                                                                                <div className="search-tab-content">
                                                                                </div>
                                                                        }
                                                                        <Button style={{position:'absolute', bottom: '1rem', right: '1rem', background: '#55b0f7', padding: 10, border: 'none', borderRadius: '50%'}}><IconPlus size="16" color="#fff" className="search"/></Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    }
                                                    {
                                                        this.state.selected === 6 &&
                                                            <div>
                                                                <div className="header">
                                                                    <div className="text-center" style={{color: "#262626", fontSize: 14}}>
                                                                        TOURS
                                                                        <IconFace size="16" color="#262626" className="profile"/>
                                                                    </div>
                                                                </div>
                                                                <div className="audio-build screen">
                                                                    <div className="audio-body-build">
                                                                    {
                                                                        tours.map(function(item, index) {
                                                                            return <div key={index}>
                                                                                <Card className="flex-row">
                                                                                    <img src={item.cover_image_url} alt="Card image cap" className="profile-picture" />
                                                                                    <CardBlock>
                                                                                        <CardText  >{item.title}</CardText>
                                                                                        <CardText>
                                                                                            {
                                                                                                item.single_credit_amount == "0.0" || item.single_credit_amount == "0" || item.single_credit_amount == "0.00" ? (
                                                                                                    <span className="badge badge-default">Free</span>
                                                                                                ) : (
                                                                                                    <span className="badge badge-default">${item.single_credit_amount}</span>
                                                                                                )   
                                                                                            }
                                                                                        </CardText>
                                                                                    </CardBlock>
                                                                                </Card>
                                                                            </div>
                                                                        })
                                                                    }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    }
                                                    {
                                                        lastUrl == "more" &&
                                                            <div>
                                                                <div className="header">
                                                                    <div className="text-center" style={{color: "#262626", fontSize: 14}}>
                                                                        MORE
                                                                        <IconFace size="16" color="#262626" className="profile"/>
                                                                    </div>
                                                                </div>
                                                                <div className="screen">
                                                                    {
                                                                        moreData.map(function(item, index){
                                                                            return  <div className="device-inner"  key={item.key}>
                                                                                <ul className="list-unstyled nav-list clearfix" style={{padding: '0px 10px'}}>
                                                                                    <li>
                                                                                        <span className="name">{item.key}</span>
                                                                                    </li>
                                                                                </ul>                                                        
                                                                            </div>
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                    }
                                                </div>
                                                <div className="footer">
                                                    <div className={(this.state.selected === 0) ? 'active-tab home-tab tab' : 'home-tab tab'}>
                                                        <IconHome size="16" color="#868686"/>
                                                        HOME
                                                    </div>
                                                    <div className={(this.state.selected === 2) ? 'active-tab map-tab tab' : 'map-tab tab'}>
                                                        <IconMap size="16" color="#868686"/>
                                                        MAPS
                                                    </div>
                                                    <div className={(this.state.selected ===  6) ? 'active-tab tour-tab tab' : 'tour-tab tab'}>
                                                        <IconAudio size="16" color="#868686"/>
                                                        TOURS
                                                    </div>
                                                    <div className={(this.state.selected === 3) ? 'active-tab content-tab tab' : 'content-tab tab'}>
                                                        <IconMessage size="16" color="#868686"/>
                                                        INTERACT
                                                    </div>
                                                    <div className={(this.state.selected === 9) ? 'active-tab menu-tab tab' : 'menu-tab tab'}>
                                                        <IconMenu size="16" color="#868686"/>
                                                        MORE
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="home-swipe"></div>
                                      </div>
                                    </div>
                                </div>
                            :
                                <div className="pixel-two">
                                    <div className="pixel">
                                        <span>
                                            {
                                                this.state.selected === 0 &&
                                                    <div>
                                                        <div className="header">
                                                            <div className="text-center" style={{color: "#262626", fontSize: 14}}>
                                                                WELCOME
                                                                <IconFace size="16" color="#262626" className="profile"/>
                                                            </div>
                                                        </div>
                                                        <div className="home" style={{top: 35, bottom: 36, position: 'absolute', left: 0, right: 0}}>
                                                            {generalInfo.fullscreen &&
                                                                    <img data-pin-nopin="true" src={generalInfo.cover_image} style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}} />
                                                            }
                                                            {!generalInfo.fullscreen &&
                                                                <img data-pin-nopin="true" src={generalInfo.cover_image} style={{height: 150, position: 'absolute', top: 0, right: 0, left: 0}} />
                                                            }
                                                            {!generalInfo.showinfo &&
                                                                <IconInfo size="20" style={{position: 'absolute', right: 10, bottom: 10, zIndex: 100}} />
                                                            }
                                                            {generalInfo.showinfo &&
                                                                <div className="showinfo" style={{maxHeight: 150, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, background: 'rgba(0,0,0,0.3)'}}>
                                                                    <h1>{generalInfo.title}</h1>
                                                                    <h2>{generalInfo.description.substring(0,30)}</h2>
                                                                    <span className="read-more">Read More</span>
                                                                </div>
                                                            }
                                                            <div className="body">
                                                                {generalInfo.tours && generalInfo.tours.length > 1 &&
                                                                    <div className="text-center"><Button style={{margin: '5px auto', background: '#262626', borderColor: '#262626', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold'}}>BUY ALL TOURS</Button></div>
                                                                }
                                                                {generalInfo.features && generalInfo.features.length > 0 &&
                                                                    <div className="features">
                                                                        {
                                                                            generalInfo.features.map(function(item, index) {
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
                                                                {
                                                                    generalInfo.toptour &&
                                                                    <div className="toptour">
                                                                        <IconInfo size="12" color="#fff"/>
                                                                        <div className="toptour-text">
                                                                            <div className="title">{generalInfo.toptour.title}</div>
                                                                            {
                                                                                (generalInfo.toptour.single_credit_amount === '0.0') ? (
                                                                                    <div className="price">FREE</div>
                                                                                ) : (
                                                                                    <div className="price">{generalInfo.toptour.single_credit_amount}</div>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                            }
                                            {
                                                this.state.selected === 8 &&
                                                    <div>
                                                        <div className="header">
                                                            <div className="text-center" style={{color: "#262626", fontSize: 14}}>
                                                                RESTAURANT
                                                                <IconFace size="16" color="#262626" className="profile"/>
                                                            </div>
                                                        </div>
                                                        <div className="restaurant-build screen">
                                                            <div className="restaurant-body-build">
                                                                <Card className="flex-row">
                                                                    <CardBlock>
                                                                        <CardText>BREAKFAST</CardText>
                                                                    </CardBlock>
                                                                </Card>
                                                                <Card className="flex-row">
                                                                    <CardBlock>
                                                                        <CardText>PASTA</CardText>
                                                                    </CardBlock>
                                                                </Card>
                                                                <Card className="flex-row">
                                                                    <CardBlock>
                                                                        <CardText>PIZZA</CardText>
                                                                    </CardBlock>
                                                                </Card>
                                                                <Card className="flex-row">
                                                                    <CardBlock>
                                                                        <CardText>DRINKS</CardText>
                                                                    </CardBlock>
                                                                </Card>
                                                            </div>
                                                        </div>
                                                    </div>
                                            }
                                            {
                                                this.state.selected === 3 &&
                                                    <div>
                                                        <div className="header">
                                                            <div className="text-center" style={{color: "#262626", fontSize: 14}}>
                                                                INTERACT
                                                                <IconFace size="16" color="#262626" className="profile"/>
                                                            </div>
                                                        </div>
                                                        <div className="screen">
                                                            <ButtonGroup className="interact-tab-menu">
                                                                <Button className={(this.state.contentTabSelected === 0) ? 'active': ''} onClick={this.handleContentTab.bind(this, 0)}>ALL</Button>
                                                                <Button className={(this.state.contentTabSelected === 1) ? 'active': ''} onClick={this.handleContentTab.bind(this, 1)}>SEARCH</Button>
                                                                <Button className={(this.state.contentTabSelected === 2) ? 'active': ''} onClick={this.handleContentTab.bind(this, 2)}>Q &amp; A</Button>
                                                                <Button className={(this.state.contentTabSelected === 3) ? 'active': ''} onClick={this.handleContentTab.bind(this, 3)}>DISCUSS</Button>
                                                            </ButtonGroup>
                                                            {
                                                                this.state.contentTabSelected === 1 && 
                                                                    <div className="search-tab-content">
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
                                            }
                                            {
                                                this.state.selected === 6 &&
                                                    <div>
                                                        <div className="header">
                                                            <div className="text-center" style={{color: "#262626", fontSize: 14}}>
                                                                TOURS
                                                                <IconFace size="16" color="#262626" className="profile"/>
                                                            </div>
                                                        </div>
                                                        <div className="audio-build screen">
                                                            <div className="audio-body-build">
                                                            {
                                                                tours.map(function(item, index) {
                                                                    return <div key={index}>
                                                                        <Card className="flex-row">
                                                                            <img src={item.cover_image_url} alt="Card image cap" className="profile-picture" />
                                                                            <CardBlock>
                                                                                <CardText  >{item.title}</CardText>
                                                                                <CardText>
                                                                                    {
                                                                                        item.single_credit_amount == "0.0" || item.single_credit_amount == "0" || item.single_credit_amount == "0.00" ? (
                                                                                            <span className="badge badge-default">Free</span>
                                                                                        ) : (
                                                                                            <span className="badge badge-default">${item.single_credit_amount}</span>
                                                                                        )   
                                                                                    }
                                                                                </CardText>
                                                                            </CardBlock>
                                                                        </Card>
                                                                    </div>
                                                                })
                                                            }
                                                            </div>
                                                        </div>
                                                    </div>
                                            }
                                            {
                                                lastUrl == "more" &&
                                                    <div>
                                                        <div className="header">
                                                            <div className="text-center" style={{color: "#262626", fontSize: 14}}>
                                                                MORE
                                                                <IconFace size="16" color="#262626" className="profile"/>
                                                            </div>
                                                        </div>
                                                        <div className="screen">
                                                            {
                                                                moreData.map(function(item, index){
                                                                    return  <div className="device-inner"  key={item.key}>
                                                                        <ul className="list-unstyled nav-list clearfix" style={{padding: '0px 10px'}}>
                                                                            <li>
                                                                                <span className="name">{item.key}</span>
                                                                            </li>
                                                                        </ul>                                                        
                                                                    </div>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                            }
                                            <div className="footer">
                                                <div className={(this.state.selected === 0) ? 'active-tab home-tab tab' : 'home-tab tab'}>
                                                    <IconHome size="16" color="#868686"/>
                                                    HOME
                                                </div>
                                                <div className={(this.state.selected === 2) ? 'active-tab map-tab tab' : 'map-tab tab'}>
                                                    <IconMap size="16" color="#868686"/>
                                                    MAPS
                                                </div>
                                                <div className={(this.state.selected ===  6) ? 'active-tab tour-tab tab' : 'tour-tab tab'}>
                                                    <IconAudio size="16" color="#868686"/>
                                                    TOURS
                                                </div>
                                                <div className={(this.state.selected === 3) ? 'active-tab content-tab tab' : 'content-tab tab'}>
                                                    <IconMessage size="16" color="#868686"/>
                                                    INTERACT
                                                </div>
                                                <div className={(this.state.selected === 9) ? 'active-tab menu-tab tab' : 'menu-tab tab'}>
                                                    <IconMenu size="16" color="#868686"/>
                                                    MORE
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                        }                                
                    </div>              
                    <div className="build-page-screen-fixed">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}


BuildWrapper.propTypes = {
  logout: React.PropTypes.func.isRequired
}

BuildWrapper.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadAppInfo, loadAppMore, loadTours, logout }, dispatch)
}

BuildWrapper.propTypes = {
  moreData: PropTypes.array,
  tours: PropTypes.array,
  generalInfo: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    generalInfo: state.apps.generalInfo,
    moreData: state.apps.moreData,
    tours: state.tours.tours
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildWrapper);
