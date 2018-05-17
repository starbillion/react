import React, { Component } from 'react';

import {Link} from 'react-router';

import {
    Button, ButtonGroup,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Progress, Modal, Card, CardBlock, CardTitle, Row, ModalHeader, ModalBody,
    InputGroup, InputGroupAddon, Input
} from 'reactstrap';
// styling
import './style.css';
import IconFace from 'react-icons/lib/md/face';
import IconHome from 'react-icons/lib/md/home';
import IconMap from 'react-icons/lib/md/map';
import IconAudio from 'react-icons/lib/md/headset';
import IconMessage from 'react-icons/lib/md/message';
import IconMenu from 'react-icons/lib/md/menu';
import IconInfo from 'react-icons/lib/md/info';
import { loadTour, loadToursMap } from '../../../actions/tourActions';
import { connect } from 'react-redux';
import MapsTour from './maps/MapTour';
import AudioTourList from './audioList/audioTourList';
import {bindActionCreators} from 'redux';

import IconEvent from 'react-icons/lib/md/event';
import IconPicture from 'react-icons/lib/md/photo';
import IconEye from 'react-icons/lib/md/remove-red-eye';
import IconNewEvent from 'react-icons/lib/md/event-available';
import IconPictures from 'react-icons/lib/md/photo-library';
import IconLocation from 'react-icons/lib/md/location-city';
import IconShare from 'react-icons/lib/md/share';
import IconQuestion from 'react-icons/lib/fa/question-circle';

class PreviewTour extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rSelected: 2,
            tour: null,
            isIphone: true,
            tourMapsData : []
        };

    	this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

        this.props.loadTour(this.props.router.params.id).then(
          (res) => this.setState({ tour: res.data }),
          (err) => this.setState({ tours: [] })
        );
    }

    ipadSwitch = (e) => {
        e.preventDefault();
        if (this.state.isIphone){
            this.setState({isIphone: false})
        } else {
            this.setState({isIphone: true})
        }
    }

    onRadioBtnClick(rSelected) {
        //this.setState({ rSelected });
        this.setState({
            rSelected: rSelected
        })
    }

    componentDidMount() {
        this.props.loadToursMap(this.props.router.params.id);
    }

    componentWillReceiveProps(nextProps) {

        this.setState({tourMapsData : nextProps.tourMapsData});

    }

    render() {
        return (
        	<div className="preview">
		        <Link className="btn btn-primary exit-button" to={'apps/' + this.props.router.params.id + '/edit'}>EXIT PREVIEW</Link>
		        <div className="device-wrapper">
		            <div id="device-0" className={(this.state.isIphone) ? 'iphone' : 'ipad'}>
		                <div id="devicetop" className="iphone-speaker">
		                </div>
		                <div id="screen-0" className={(this.state.isIphone) ? 'iphone-screen' : 'ipad-screen'}>
		                    <div className="header">
		                        <div className="text-center" style={{color: "#262626", fontSize: 14}}>
								    {this.state.rSelected === 2 &&
								        <span>Welcome</span>
								    }
								    {this.state.rSelected === 3 &&
								        <span>Maps</span>
								    }
								    {this.state.rSelected === 4 &&
								        <span>Tours</span>
								    }
								    {this.state.rSelected === 5 &&
								        <span>Content</span>
								    }
								    {this.state.rSelected === 1 &&
								        <span>More</span>
								    }
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
							 <div className={`map ${(this.state.rSelected === 1) ? 'selected': ''}`}>
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
		                    <div className={`map ${(this.state.rSelected === 3) ? 'selected': ''}`}>
	                            <div className="screen-wrapper"><MapsTour mapsData={this.state.tourMapsData}/>
	                            </div>
		                    </div>
							<div className={`audio ${(this.state.rSelected === 4) ? 'selected': ''}`}>
								<div className="screen-wrapper">
									<AudioTourList />
								</div>
		                    </div>
		                    <div className={`interact ${(this.state.rSelected === 5) ? 'selected': ''}`}>
		                    </div>
		                    <div className={(this.state.rSelected === 2) ? 'selected home': 'home'}>
		                    	<div className="screen-wrapper">
								    {this.state.tour && this.state.tour.fullscreen &&
								    		<img src={this.state.tour.cover_image} style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}} />
								    }
								    {this.state.tour && !this.state.tour.fullscreen &&
								        <img src={this.state.tour.cover_image} style={{height: 120, position: 'absolute', top: 0, right: 0, left: 0}} />
								    }
								    {this.state.tour && !this.state.tour.showinfo &&
								        <IconInfo size="20" style={{position: 'absolute', right: 10, bottom: 10, zIndex: 100}} />
								    }
								    {this.state.tour && this.state.tour.showinfo &&
								        <div className="showinfo" style={{height: 120, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, background: 'rgba(0,0,0,0.4)'}}>
								        	<h1>{this.state.tour.title}</h1>
								        	<h2>{this.state.tour.description.substring(0,30)}</h2>
								        	<span className="read-more">Read More</span>
								       	</div>
								    }
								    <div className="body">
								    {this.state.tour && this.state.tour.tours.length > 1 &&
								    	<div className="text-center"><Button style={{padding: 5, margin: '10px auto', background: '#262626', borderColor: '#262626', color: '#fff', fontSize: '0.75rem'}}>BUY ALL TOURS</Button></div>
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
								    	<Button style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px auto', padding: 0, background: '#55b0f7', borderColor: '#55b0f7', color: '#fff'}}>
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
	        </div>
        )
    }
}


function mapStateToProps(state, ownProps) {
	return {
		tourMapsData: state.tours.mapsData,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ loadTour, loadToursMap }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(PreviewTour);


PreviewTour.contextTypes = {
  router: React.PropTypes.object.isRequired
}

PreviewTour.propTypes = {
  loadTour: React.PropTypes.func.isRequired
}

