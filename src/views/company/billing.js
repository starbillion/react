import React from 'react';
import {Link} from 'react-router';
import {
    Form, Input, Label, FormGroup, Button, FormText,
    Card, CardBlock
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IconTwitter from 'react-icons/lib/fa/twitter';
import IconFacebook from 'react-icons/lib/fa/facebook';
import IconGoogle from 'react-icons/lib/fa/google';
import './style.css';

import { addBillingRequest } from '../../actions/signupActions';


class CompanyBilling extends React.Component {

    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.onAddBillClick = this.onAddBillClick.bind(this);
    }

    onInputChange(e) {
        this.setState({[e.target.name] : e.target.value})
    }

    onAddBillClick(){

        addBillingRequest(this.state);
        
    }
    render() {
        return (
            <div className="view">
                <div className="view-content view-pages view-session d-flex justify-content-center align-items-center flex-column">
                    <Card className="mb-3 form-card">
                        <CardBlock>
                            <header className="mb-5">
                                <Link to="/">
                                    <img src="/images/logo.png" />
                                </Link>
                                <p className="lead">Billing</p>
                            </header>
                            <Form action="/">
                                <FormGroup className="mb-4">
                                    <Label>Currency</Label>
                                    <Input type="text" name ="currency" placeholder="Currency" onKeyUp={this.onInputChange} required />
                                </FormGroup>
                                <FormGroup className="mb-4">
                                    <Label>Country</Label>
                                    <Input type="text"  name ="country" placeholder="Country" onKeyUp={this.onInputChange}  required />
                                </FormGroup>
                                 <FormGroup className="mb-4">
                                    <Label>Bank Account</Label>
                                    <Input type="text"  name ="bank_account" placeholder="Bank Account" onKeyUp={this.onInputChange}  required />
                                </FormGroup>
                                <FormGroup className="mb-4">
                                    <Label>Routing Number</Label>
                                    <Input type="text"  name ="routing_number" placeholder="Routing Number" onKeyUp={this.onInputChange}  required />
                                </FormGroup>
                                <FormGroup>
                                    <Button color="primary" size="lg" style={{float: 'left'}} onClick={this.onAddBillClick} >Skip</Button>
                                    <Button color="info" size="lg" style={{float: 'right'}} onClick={this.onAddBillClick} >Add Billing Account</Button>
                                </FormGroup>
                            </Form>
                        </CardBlock>
                    </Card>
                </div>
            </div>
        )
    }
}

export default CompanyBilling;