import React from 'react';
import {Link} from 'react-router';
import {
    Form, Input, Label, FormGroup,
    Card, CardBlock
} from 'reactstrap';

import '../style.css';

export default () => (
    <div className="view">
        <div className="view-content view-pages view-session d-flex justify-content-center align-items-center flex-column">
            <Card className="mb-3 form-card">
                <CardBlock>
                    <header className="mb-4 text-center">
                        <Link to="/">
                            <img src="/images/logo.png" />
                        </Link>
                        <p className="mt-4 small">Enter your email address and we'll send you the instructions for resetting the password.</p>
                    </header>
                    <Form action="/">
                        <FormGroup className="mb-4">
                            <Label>Email Address</Label>
                            <Input type="email" placeholder="yourmail@xyz.com"/>
                        </FormGroup>

                        <FormGroup className="text-right">
                            <Link className="btn btn-primary" to="/">Reset Password</Link>{" "}
                        </FormGroup>
                    </Form>
                    <p>Already have an account? <Link to="/pages/signin">Sign In</Link></p>
                </CardBlock>
            </Card>

        </div>
    </div>
)
