import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import {
    Button,
    Card, CardBlock, CardTitle,
    Form, FormGroup, Col, Label, Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Row, Progress
} from 'reactstrap';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import IconShare from 'react-icons/lib/md/share';

import { loadSocialMediaTypes } from '../../../../actions/tourActions';

class SocialMedia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalClass: ''
        }
    }

    componentDidMount() {
        this.props.loadSocialMediaTypes();
    }
    toggle = (e, str) => {
        this.setState({
            modal: !this.state.modal,
            modalClass: str
        })
    }

    render() {
         const socialMediaTypes = this.props.socialMediaTypes;
        return (
            <li>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.state.modalClass}>
                    <ModalHeader toggle={this.toggle}>Link a Social Account</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={e => e.preventDefault()} className="p-3">
                            <FormGroup row>
                                <Label for="exampleEmail" sm={3}>Link</Label>
                                <Col sm={9}><Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" /></Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="exampleDate" sm={3}>Type</Label>
                                <Col sm={9}>
                                    <Input type="select" name="select" id="exampleSelect">
                                         {socialMediaTypes.map(function(item, index) {
                                            return <option key={item.id} value={item.id}>{item.title}</option>
                                        })}
                                    </Input>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
                <a onClick={(e) => this.toggle(e, 'modalFadeInScale')}>
                    <IconShare size="16"/><span className="text">Social Media</span>
                </a>
            </li>
        )
    }
}

function mapStateToProps(state, ownProps) {
  return {
    socialMediaTypes: state.tours.socialMediaTypes,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadSocialMediaTypes }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps )(SocialMedia);




