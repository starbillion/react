import React from 'react';
import {Link} from 'react-router';
import {
    Form, Input, Label, FormGroup, Button, FormText,
    Card, CardBlock
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userSignupRequest } from '../../../actions/signupActions';
import IconTwitter from 'react-icons/lib/fa/twitter';
import IconFacebook from 'react-icons/lib/fa/facebook';
import IconGoogle from 'react-icons/lib/fa/google';
import '../style.css';
import TextFieldGroup from '../../../shared/components/textfields/TextFieldGroup';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.onRegisterClick = this.onRegisterClick.bind(this);

        this.state ={
            firstNameError : null,
            lastNameError : null,
            emailAddrError : null,
            passwordError : null,
            rePasswordError : null,
        }
    }

    onInputChange(e) {
        this.setState({[e.target.name] : e.target.value})
    }

    resetErrorMessage(){
        this.setState({
            firstNameError : null,
            lastNameError : null,
            emailAddrError : null,
            passwordError : null,
            rePasswordError : null
        });
    }
    validateForm(){

        // Reset all error messages
        this.resetErrorMessage();

        let isSuccess = true;

        if(!this.state.first_name){
            isSuccess = false;
            this.setState({firstNameError : "First Name Required"})
        }else if(this.state.first_name.trim() == ""){
            isSuccess = false;
            this.setState({firstNameError : "First Name Required"})
        }
        
        if(!this.state.last_name){
            isSuccess = false;
            this.setState({lastNameError : "Last Name is Required"})
        }else if(this.state.last_name.trim() == ""){
            isSuccess = false;
           this.setState({lastNameError : "Last Name is Required"})
        }

        if(!this.state.email){
            isSuccess = false;
            this.setState({emailAddrError : "Email is Required"})
        }else if(this.state.email.trim() == ""){
            isSuccess = false;
           this.setState({emailAddrError : "Email is Required"})
        }

        if(!this.state.password){
            isSuccess = false;
            this.setState({passwordError : "Password is required"})
        }else if(this.state.password.length < 6){
            isSuccess = false;
            this.setState({passwordError : "Password should me minimum 6 character."})
        }
        
        if(!this.state.retypePassword){
            isSuccess = false;
            this.setState({rePasswordError : "Retype Password is required."})
        }else if(this.state.password != this.state.retypePassword){
            isSuccess = false;
            this.setState({rePasswordError : "Password and Retype Password does not match."})
        }

        return isSuccess;
    }

    onRegisterClick(){
        
        let isValidate = this.validateForm();
        const requestData = {
            'first_name' : this.state.first_name,
            'last_name' : this.state.last_name,
            'email' : this.state.email,
            'password' : this.state.password
        }

        if(isValidate){
                this.props.userSignupRequest(requestData);
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
                                <p className="lead">Register to create your app today.</p>
                            </header>
                            <Form action="/">
                                <FormGroup className="mb-4">

                                    <TextFieldGroup
                                        field="first_name"
                                        placeholder="John"
                                        label="First Name"
                                        value={this.state.first_name}
                                        onChange={this.onInputChange}
                                        error={this.state.firstNameError}
                                        />

                                </FormGroup>
                                <FormGroup className="mb-4">
                                    <TextFieldGroup
                                        field="last_name"
                                        placeholder="Doe"
                                        label="Last Name"
                                        value={this.state.last_name}
                                        onChange={this.onInputChange}
                                        error={this.state.lastNameError}
                                        />
                                    
                                </FormGroup>
                                <FormGroup className="mb-4">

                                    <TextFieldGroup
                                        field="email"
                                        placeholder="someone@xyz.com"
                                        label="Email Address"
                                        value={this.state.email}
                                        onChange={this.onInputChange}
                                        error={this.state.emailAddrError}
                                        />
                                    
                                </FormGroup>
                                <FormGroup className="mb-4">
       
                                    <TextFieldGroup
                                        field="password"
                                        placeholder="longsecret"
                                        label="Password"
                                        type="password"
                                        value={this.state.password}
                                        onChange={this.onInputChange}
                                        error={this.state.passwordError}
                                        />

                                    <FormText>Minimum length 6 characters</FormText>
                                </FormGroup>
                                <FormGroup className="mb-5">

                                    <TextFieldGroup
                                        field="retypePassword"
                                        placeholder="samelongsecret"
                                        label="Retype Password"
                                        type="password"
                                        value={this.state.retypePassword}
                                        onChange={this.onInputChange}
                                        error={this.state.rePasswordError}
                                        />
                                
                                </FormGroup>
                                <FormGroup className="text-right">
                                    <Button color="info" block size="lg" onClick={this.onRegisterClick} >Register</Button>
                                </FormGroup>
                            </Form>
                        </CardBlock>
                    </Card>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

Register.contextTypes = {
  userSignupRequest: React.PropTypes.object.isRequired
}

export default connect(null, { userSignupRequest })(Register);