import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

import {
    ButtonGroup, Button, ButtonToolbar,
    Form, FormGroup, Col, Label, Input,
    Card, CardBlock, CardTitle, Row, Progress, 
    Nav, NavItem, NavLink, CardImg, CardText,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import {
    BarChart, Bar, Tooltip
} from 'recharts';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import { loadTours, loadTour, getTour, loadCategories, loadLanguages, updateTour } from '../../../../actions/tourActions';

// icons
import IconDatabase from 'react-icons/lib/fa/database';
import IconProduct from 'react-icons/lib/fa/cube';
import IconDownload from 'react-icons/lib/fa/download';
import IconProfit from 'react-icons/lib/fa/credit-card';
import IconFacebook from 'react-icons/lib/fa/facebook-square';
import IconTwitter from 'react-icons/lib/fa/twitter-square';
import IconCircle from 'react-icons/lib/md/add-circle-outline';
import IconCreate from 'react-icons/lib/md/create'

class ViewAudioTour extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            tour : this.props.tour
        };
        this.updateTour = this.updateTour.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);

    }

    componentWillReceiveProps(newProps){
        this.setState({tour:newProps.tour})
    }

    updateTour  = (e) => {
         e.preventDefault();
        if(this.state.tour.title.trim() == ""){
            this.setState({visible : true});
        }else{
            this.props.updateTour(this.context.router.params.id, this.state.tour);
            this.setState({modal:false});
        }
    }

    onInputChange(e) {

        let propertyName = [e.target.name];
        let tour = this.state.tour;
        
        tour[propertyName] = e.target.value;
        this.setState({tour : tour})
    }

    onSelectChange(e) {
        this.setState({[e.target.name] : e.target.value})
    }

    render() {
        const loadLanguages = this.props.languages;
        const loadCategories = this.props.categories;

        return (
            <div className="create-popup">
                <Modal isOpen={this.props.properties.isViewModal} toggle={this.props.onToggle} className={this.props.properties.modalClass}>
                    <ModalHeader toggle={this.props.onToggle}>Tour Details</ModalHeader>
                    <ModalBody>
                        <Row>
                            <div className="col-xs-12 col-sm-6">
                                <Form onSubmit={e => e.preventDefault()} className="p-3">
                                    <FormGroup row>
                                        <Label for="title" sm={3}>Title</Label>
                                        <Col sm={9}><Input type="text" name="title" id="title" placeholder="Add title for your tour."  value={this.state.tour.title} onChange={this.onInputChange} /></Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="desc" sm={3}>Description</Label>
                                        <Col sm={9}><Input type="text" name="desc" id="desc" placeholder="Add description for tour." value={this.state.tour.description} onChange={this.onInputChange} /></Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="price" sm={3}>Price</Label>
                                        <Col sm={9}>
                                            <Input type="select" name="price" id="price" onChange={this.onSelectChange}>
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
                                        <Label for="categories" sm={3}>Categories</Label>
                                        <Col sm={9}>
                                            <Input type="select" name="category_id" id="categories" selected={this.props.tour.category ? this.props.tour.category["id"] : ""} onChange={this.onSelectChange} >
                                                 {loadCategories.map(function(item, index) {
                                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                                })}
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="languages" sm={3}>Language</Label>
                                        <Col sm={9}>
                                            <Input type="select" name="language_id" id="languages" selected={this.props.tour.language_id} onChange={this.onSelectChange}>
                                                 {loadLanguages.map(function(item, index) {
                                                                return <option key={item.id} value={item.id}>{item.display_name}</option>
                                                 })}
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <Button color="primary" onClick={(e) => this.updateTour(e)} className="btn-block">Update Tour</Button>{' '}
                                </Form>
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <Link to={'/apps/'+ this.context.router.params.id + '/tours/' + this.state.tour.id + '/stops'} activeClassName="active">
                                    <img src="/images/edit-stop-icon.png" style={{marginBottom: 10}}/>
                                </Link>
                                <Link to={'/apps/'+ this.context.router.params.id + '/tours/' + this.state.tour.id + '/stops'} className="btn btn-block btn-info">Create &amp; Update Stops</Link>{' '}
                            </div>
                        </Row>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

ViewAudioTour.contextTypes = {
  router: React.PropTypes.object.isRequired
}

class AudioTourList extends React.Component {

    constructor(props) {
        super(props);
         this.state = {
            isViewModal: false,
            modalClass: 'preview-app-details',
            allActive: true
        }
        this.toggle = this.toggle.bind(this);
        this.updateTour = this.updateTour.bind(this);
    };

    componentDidMount() {
        this.props.loadTours(this.context.router.params.id);
        this.props.loadCategories();
        this.props.loadLanguages();
    };

    toggle = (e, str, id) => {
        if(!this.state.isViewModal){
            this.props.getTour(this.context.router.params.id, id);
        }

        this.setState({
            isViewModal: !this.state.isViewModal,
            modalClass: str
        });
    }

    toggleNav = (e) => {
        if (this.state.allActive){
            this.setState({
                allActive: false
            });
        } else {
            this.setState({
                allActive: true
            })

        }
    }

    updateTour  = (tourId, tourObj) => {
            this.props.updateTour(tourId, tourObj );
    };

    render() {
        const tours = this.props.tours;
        const _this = this;

        return (
            <div className="return-view">
                    <Row>
                            <div className="nav-container">
                                <Nav pills>
                                    <NavItem>
                                        <NavLink className={this.state.allActive ? 'active' : ''} onClick={this.toggleNav.bind(this)}
onClick={this.toggleNav.bind(this)}>
                                            ALL
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={!this.state.allActive ? 'active' : ''} onClick={this.toggleNav.bind(this)}
onClick={this.toggleNav.bind(this)} >
                                            PURCHASED
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </div>
                            <div className="flex-column audio-body">
                                {this.state.allActive &&
                                    <div>
                                        {tours.map(function(item, index) {
                                            return <div key={index}>
                                                        <Card className="flex-row"  onClick={(e) => _this.toggle(e, 'modalFadeInScale preview-app-details', item.id)} >
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
                                        })}
                                        <ViewAudioTour 
                                            properties={this.state}
                                            onToggle={this.toggle} 
                                            tour={this.props.tour}
                                            categories = {this.props.categories}
                                            languages = {this.props.languages}
                                            updateTour = {this.props.updateTour}
                                            />
                                    </div>
                                }
                                {!this.state.allActive &&
                                 <div>test</div>
                                }
                            </div>        
                    </Row>
            </div>
        );
    }
}

AudioTourList.propTypes = {
  tours: PropTypes.array
};

AudioTourList.contextTypes = {
  router: React.PropTypes.object.isRequired
}


function mapStateToProps(state, ownProps) {
  return {
    tours: state.tours.tours,
    tour: state.tours.tour,
    categories: state.tours.categories,
    languages: state.tours.languages
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateTour, loadTours, loadTour, getTour, loadCategories, loadLanguages }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(AudioTourList, );

