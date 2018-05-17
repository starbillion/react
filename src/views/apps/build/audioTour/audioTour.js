import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import {
    Button,
    Card, CardBlock, CardTitle,
    Form, FormGroup, Col, Label, Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Row, Progress, Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { createTour, loadCategories, loadLanguages, saveTour } from '../../../../actions/tourActions';

import IconAudio from 'react-icons/lib/md/headset';

class AudioTour extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalClass: '',
            visible: false,
            title : "",
            category_id: "",
            language_id: "",
            price: "0.0",
        }
        this.createTour = this.createTour.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    onDismiss() {
        this.setState({ visible: false });
    }

    componentDidMount() {
        this.props.loadCategories();
        this.props.loadLanguages();
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.languages && nextProps.languages.length != 0
            && nextProps.categories && nextProps.categories.length != 0) {

            this.state.category_id = nextProps.categories[0].id;
            this.state.language_id = nextProps.languages[0].id;

        }
    }
    toursPage  = (e) => {
         e.preventDefault();
        this.context.router.push('/tours/new/2');
    }

    createTour  = (e) => {
         e.preventDefault();

         const requestData = {
            "title" : this.state.title,
            "description" : this.state.description,
            "single_credit_amount" : this.state.price,
            "category_id" : this.state.category_id,
            "language_id" : this.state.language_id
         };

        if(this.state.title.trim() == ""){
            this.setState({visible : true});
        }else{
            this.props.saveTour(requestData, this.context.router.params.id);
            this.setState({modal:false});
        }
        
    }

    onInputChange(e) {
        this.setState({[e.target.name] : e.target.value})
    }

    onSelectChange(e) {
        this.setState({[e.target.name] : e.target.value})
    }

    toggle = (e, str) => {
        this.setState({
            modal: !this.state.modal,
            modalClass: str
        })
    }

    render() {
       
        const loadLanguages = this.props.languages;
        const loadCategories = this.props.categories;
       
        return (
            <li>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.state.modalClass}>
                    <ModalHeader toggle={this.toggle}>Create a Tour</ModalHeader>
                    <ModalBody>
                        <Form className="p-3">
                            <FormGroup row>
                                <Label for="title" sm={3}>Title</Label>
                                <Col sm={9}><Input type="text" name="title" id="title" placeholder="Title for tour." onKeyUp={this.onInputChange} /></Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="desc" sm={3}>Description</Label>
                                <Col sm={9}><Input type="text" name="description" id="desc" placeholder="Description for tour." onKeyUp={this.onInputChange} /></Col>
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
                                    <Input type="select" name="category_id" id="categories" onChange={this.onSelectChange}>
                                        {loadCategories.map(function(item, index) {
                                            return <option key={item.id} value={item.id}>{item.name}</option>
                                        })}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="language" sm={3}>Language</Label>
                                <Col sm={9}>
                                    <Input type="select" name="language_id" id="language" onChange={this.onSelectChange}>
                                        {loadLanguages.map(function(item, index) {
                                             return <option key={item.id} value={item.id}>{item.display_name}</option>
                                         })}
                                    </Input>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>    
                    <ModalFooter>
                        <Button color="primary" onClick={(e) => this.createTour(e)} className="btn-block">Create Tour</Button>{' '}
                    </ModalFooter>
                </Modal>
                <a onClick={(e) => this.toggle(e, 'modalFadeInScale')}>
                    <IconAudio size="16"/><span className="text">Audio Tour</span>
                </a>
            </li>
        )
    }
}

AudioTour.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.tours.categories,
    languages: state.tours.languages
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createTour , loadCategories, loadLanguages, saveTour }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps )(AudioTour);


