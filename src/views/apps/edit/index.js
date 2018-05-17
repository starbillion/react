import React from 'react';

import {Link} from 'react-router';

import {
    AreaChart, Area,
    PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Sector,
    ResponsiveContainer,
    LineChart, Line,
    BarChart, Bar
} from 'recharts';

import {
    CardGroup,  CardTitle, CardSubtitle, Card, CardBlock, Row, Button, 
	Modal, ModalHeader, ModalBody, ModalFooter, Progress
} from 'reactstrap';

import { connect } from 'react-redux';

// icons
import IconDollar from 'react-icons/lib/fa/dollar';
import IconTrendUp from 'react-icons/lib/md/trending-up';
import IconLevelUp from 'react-icons/lib/fa/level-up';
import IconLevelDown from 'react-icons/lib/fa/level-down';
import IconAndroid from 'react-icons/lib/fa/android';
import IconCardTravel from 'react-icons/lib/md/card-travel';
import IconDvr from 'react-icons/lib/md/dvr';
import IconBalance from 'react-icons/lib/md/account-balance';
import IconDot from 'react-icons/lib/md/fiber-manual-record';
import IconCircle from 'react-icons/lib/md/add-circle-outline';
import IconCreate from 'react-icons/lib/md/create'

import { loadApp, deleteApp } from '../../../actions/appsActions';

// styling
import './style.css';


class ModalConfirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalClass: ''
        }
    }

    toggle = (e, str) => {
        this.setState({
            modal: !this.state.modal,
            modalClass: str
        })
    }

	confirm = () => {
		this.props.onAppDelete();
    }

	closePopup = () => {
        this.setState({
            modal: false,
        })
    }

    render() {
        return (
            <div className="create-popup">
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.state.modalClass}>
                    <ModalHeader toggle={this.toggle}>Delete App</ModalHeader>
                    <ModalBody>
							Are yu sure you want to delete this app ?
                    </ModalBody>
                    <ModalFooter>
                            <Button color="primary" onClick={(e) => this.confirm()} className="btn-md">Yes</Button>{' '}
                            <Button color="danger" className="btn-md" onClick={this.closePopup} >No</Button>{' '}
                    </ModalFooter>
                </Modal>
				<Button color="danger" className="btn-block" onClick={(e) => this.toggle(e, 'modalFadeInScale')} >Delete</Button>{' '}
            </div>
        )
    }
}

ModalConfirmation.contextTypes = {
  router: React.PropTypes.object.isRequired
}

class EditAppPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          app: null
        };
        this.props.loadApp(this.props.router.params.id).then(
          (res) => this.setState({ app: res.data }),
          (err) => this.setState({ apps: [] })
        );
    }

	onAppDelete = () => {
		  this.props.deleteApp(this.state.app);
    }

    render() {
        let app = this.state.app;
    	
    	var el = null;
		
		if (this.state.app) {
	        el = (
		        <div className="view">
			        <div className="view-header">
				        <div className="d-flex align-items-center">
				            <header className="text-white">
				                <h1 className="h5 title text-uppercase">{app.title}</h1>
				                <p className="mb-0 subtitle tour-desc">{app.description}</p>
				                <p className="mb-0 subtitle tour-elips">... read more</p>
				            </header>
				        </div>
				    </div>
				    <div className="view-content view-dashboard">
				        <Row>
				            {/* blocks */}
							<div className="col-sm-6">
				                <Card className="mb-4">
				                    <CardBlock>
										<div className="h4 text-uppercase text-bold mb-4">{app.title} 
										{
											app.price === '0.0' || app.price === '0' || app.price === '0.00' ? (
												<div className="badge badge-default float-right">Free</div>
											) : (
												<div className="badge badge-default float-right">{app.price}</div>
											)	
										}
										</div>
										<div  style={{height: 300, backgroundSize: 'cover', backgroundPosition: '50%', backgroundRepeat: 'no-repeat', backgroundImage: `url(${app.cover_image})`}}>
										</div>
									</CardBlock>
								</Card>
							</div>
							<div className="col-sm-6">
                                <Card className="mb-4">
                                    <CardBlock>
                                        <CardTitle className="text-uppercase small font-weight-bold">Publish</CardTitle>
{
    /*
                                        <CardSubtitle className="small font-weight-bold">Here is where you can preview or publish your app directly to Tourize or to the appstore.</CardSubtitle>

                                        <div className="mt-4 mb-4">
                                            publish to the app store via <img src="/images/logo-icon.png" style={{width: '30px'}}/>
                                        </div>
                                        <div className="mb-4 mt-4">
                                            It looks like your guide is not published yet.
                                        </div>
    */
}
                                        <Button color="primary" className="btn-block p-4">Publish</Button>{' '}
                                    </CardBlock>
                                </Card>
	                            {/* blocks */}
                                <Card className="mb-4">
                                    <CardBlock>
                                        <CardTitle className="text-uppercase small font-weight-bold">App Manager</CardTitle>
                                        <Row>
                                            <div className="col-sm-12">
	                                            <div className="mb-4 mt-4">
	                                                Masterpiece still in progress? Continue building your App!
	                                            </div>
                                                <div className="mb-4">
                                                    <Link to={'/apps/'+ app.id + '/build/info'}  className="btn btn-block btn-info" style={{width: '100%'}}>Build</Link>{' '}
                                                </div>
										        <Row>
													<div className="col-sm-6">
                                                    <Link to={'/apps/'+ app.id + '/preview'}  className="btn btn-block text-primary" style={{background: '#fff'}}>Preview</Link>{' '}
		                                        	</div>
													<div className="col-sm-6">
														<ModalConfirmation onAppDelete = {this.onAppDelete} />
													</div>
												</Row>  
                                            </div>
                                        </Row>
                {
                    /*
                                        <Row>
                                            <div className="col-sm-6">
                                                <Card className="mb-4">
                                                    <CardBlock>
                                                        <CardTitle className="text-uppercase small font-weight-bold">Promote</CardTitle>
                                                        <div className="d-flex align-items-center">
                                                            <p>
                                                                Access to posters, emails, and more to promote your guide
                                                            </p>
                                                        </div>
                                                    </CardBlock>
                                                </Card>
                                            </div>
                                            <div className="col-sm-6">
                                                <Card className="mb-4">
                                                    <CardBlock>
                                                        <CardTitle className="text-uppercase small font-weight-bold">Notifications</CardTitle>
                                                        <div className="d-flex align-items-center">
                                                            <p>
                                                                Access to posters, emails, and more to promote your guide
                                                            </p>
                                                        </div>
                                                    </CardBlock>
                                                </Card>
                                            </div>
                                        </Row>
                    */
                }
                                    </CardBlock>
                                </Card>
				            </div>
				        </Row>
				    </div>	
			    </div>
	        )
	    }
        return el;
    }
}

export default connect(null, { loadApp, deleteApp})(EditAppPage);

EditAppPage.propTypes = {
  loadApp: React.PropTypes.func.isRequired
}


