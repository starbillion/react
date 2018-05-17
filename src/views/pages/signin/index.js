import React from 'react';
import {Link} from 'react-router';
import {
    Form, Input, Label, FormGroup, Button, FormText,
    Card, CardBlock
} from 'reactstrap';
import IconTwitter from 'react-icons/lib/fa/twitter';
import IconFacebook from 'react-icons/lib/fa/facebook';
import IconGoogle from 'react-icons/lib/fa/google';
import LoginForm from './loginform';
import '../style.css';

export default () => (
    <div className="view">
        <div className="view-content view-pages view-session d-flex justify-content-center align-items-center flex-column">
            <Card className="mb-3 form-card">
                <CardBlock>
                    <header className="mb-5">
                        <Link to="/">
                            <img src="/images/logo.png" />
                        </Link>
                        <p className="lead">Sign In to continue</p>
                    </header>
                    <LoginForm />
                </CardBlock>
            </Card>
        </div>
    </div>
)
