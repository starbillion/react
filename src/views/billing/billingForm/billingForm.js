import React from 'react';
import {
    Row, Button, Form, FormGroup, Label, Input, FormText, FormFeedback,
    InputGroup, InputGroupAddon, InputGroupButton,
    Col
} from 'reactstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class BillingForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return (
            <div>
            <Row>  
                <Label for="exampleEmail" sm={3}>Recipient</Label>
                <Col sm={9}><Input type="text" name="recipient" id="recipient" placeholder="stripe key" disabled /></Col>
            </Row>
            <p className="mt-2">
                To update the billing, submit the form below
            </p>
            <Form onSubmit={e => e.preventDefault()} className="p-3">
                <FormGroup row>
                    <Label for="exampleEmail" sm={3}>Bank Account</Label>
                    <Col sm={9}><Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" /></Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleSearch" sm={3}>Routing</Label>
                    <Col sm={9}><Input type="search" name="search" id="exampleSearch" placeholder="type your search here."/></Col>
                </FormGroup>
            </Form>
            </div>
        )

    }
}




export default BillingForm;
