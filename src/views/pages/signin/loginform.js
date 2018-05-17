import React from 'react';
import TextFieldGroup from '../../../shared/components/textfields/TextFieldGroup';
import { connect } from 'react-redux';
import { login } from '../../../actions/authActions';
import {Link} from 'react-router';
import {
    Form, Input, Label, FormGroup, Button, FormText,
    Card, CardBlock, ModalHeader, ModalBody, Modal, ModalFooter
} from 'reactstrap';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      isLoading: false,
      email: '', 
      password: '', 
      screen_width: 1,
      screen_height: 1,
      showModal: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.redirectionToPages = this.redirectionToPages.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  isValid() {
    const { errors, isValid } = true;

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  redirectionToPages (){
    if(localStorage.companyId){
      this.context.router.push('/')
    }else{
      this.context.router.push('/company')
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });

    const values = {
      "user": {
        "email": this.state.email,
        "password": this.state.password
      }, 
      "client": {
        "screen_width":"1", 
        "screen_height":"1"
      }
    }


    this.props.login(values).then(
      (res) => this.redirectionToPages(),
      (err) => this.handleOpenModal()
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleOpenModal () {
    this.setState({ errors: 'error', isLoading: false });
    this.setState({ showModal: true });
  }

  handleCloseModal () {

    this.setState({ showModal: false });
  }

  render() {
    const { errors, email, password, isLoading } = this.state;


    return (
      <div>
        <Form onSubmit={this.onSubmit}>

           <FormGroup className="mb-4">
              <TextFieldGroup
                field="email"
                label="Email"
                value={email}
                onChange={this.onChange}
              />
            </FormGroup>
          
            <FormGroup className="mb-4">

              <TextFieldGroup
                field="password"
                label="Password"
                value={password}
                onChange={this.onChange}
                type="password"
              />
            </FormGroup>
            <FormGroup className="text-right">
                <Link className="btn btn-info" to="/pages/register">Register</Link>{" "}
                <Button color="primary" disabled={isLoading}>Sign In</Button>
            </FormGroup>
          </Form>
          {
            this.state.isLoading &&
              <div className="loader">
                <div className="loader-icons"></div>
              </div>
          }
          <Modal
            isOpen={this.state.showModal}
            onHide={this.close}
          >
            <ModalHeader toggle={this.toggle}>Warning</ModalHeader>
            <ModalBody><h5>Your email address or password is not correct</h5></ModalBody>
            <ModalFooter>
              <Form onSubmit={e => e.preventDefault()}>
                <button onClick={this.handleCloseModal}>Try again</button>
              </Form>
            </ModalFooter>
          </Modal>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);