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
import { createCompanyRequest } from '../../actions/signupActions';

import TextFieldGroup from '../../shared/components/textfields/TextFieldGroup';


class Company extends React.Component {

    constructor(props) {
        super(props);

         this.state ={
            companyError : null,
            descriptionError : null,
            company_name : "",
            company_description : ""
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.onCreateCompanyClick = this.onCreateCompanyClick.bind(this);
    }
    onInputChange(e) {
        this.setState({[e.target.name] : e.target.value})
    }

    valdateForm(){

        // Reset all error messages
        this.resetErrorMessage();

        let isSuccess = true;

        if(!this.state.company_name){
            isSuccess = false;
            this.setState({companyError : "Company Name is Required"})
        }else if(this.state.company_name.trim() == ""){
            isSuccess = false;
            this.setState({companyError : "Company Name is Required"})
        }
        return isSuccess;
    }

    resetErrorMessage(){
        this.setState({
            companyError : null
        });
    }

    onCreateCompanyClick(){

        let isValidate = this.valdateForm();

        const requestData = {
            "company_name" :  this.state.company_name,
            "company_description" :  this.state.company_description
        }

        if(isValidate){
            createCompanyRequest(requestData);
        }
        
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
                                <p className="lead">Create Company.</p>
                            </header>
                            <Form action="/">
                                <FormGroup className="mb-4">
                                     <TextFieldGroup
                                        field="company_name"
                                        placeholder="Company Name"
                                        label="Company Name"
                                        value={this.state.company_name}
                                        onChange={this.onInputChange}
                                        error={this.state.companyError}
                                        />
                                </FormGroup>
                                <FormGroup className="mb-4">

                                    <TextFieldGroup
                                        field="company_description"
                                        placeholder="Company Description"
                                        label="Company Description"
                                        value={this.state.company_description}
                                        onChange={this.onInputChange}
                                        error={this.state.descriptionError}
                                        />
                                </FormGroup>
                                <FormGroup className="text-right">
                                    <Button color="info" block size="lg" onClick={this.onCreateCompanyClick} >Create Company</Button>
                                </FormGroup>
                            </Form>
                        </CardBlock>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Company;