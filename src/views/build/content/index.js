import React, { Component } from 'react';
import screenfull from 'screenfull';
import {Link} from 'react-router';

import {
    Button, ButtonGroup,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Progress, Modal, CardTitle, CardSubtitle, Row, ModalHeader, ModalBody,
    InputGroup, InputGroupAddon, Input, Card, CardBlock,
    Form, FormGroup, Label, FormText, FormFeedback,
     InputGroupButton, Col, Alert
} from 'reactstrap';

import {bindActionCreators} from 'redux';

import IconFace from 'react-icons/lib/md/face';
import IconLogout from 'react-icons/lib/md/power-settings-new';
import IconChat from 'react-icons/lib/fa/comments-o';
import IconMenu from 'react-icons/lib/md/menu';
import IconInfo from 'react-icons/lib/md/info';
import IconMessage from 'react-icons/lib/md/message';
import IconAudio from 'react-icons/lib/md/headset';
import IconHome from 'react-icons/lib/md/home';
import IconLocation from 'react-icons/lib/md/location-city';
import IconEvent from 'react-icons/lib/md/event';
import IconPicture from 'react-icons/lib/md/photo';
import IconMap from 'react-icons/lib/md/map';
import IconEye from 'react-icons/lib/md/remove-red-eye';
import IconNewEvent from 'react-icons/lib/md/event-available';
import IconPictures from 'react-icons/lib/md/photo-library';
import IconShare from 'react-icons/lib/md/share';
import IconQuestion from 'react-icons/lib/fa/question-circle';
import IconEdit from 'react-icons/lib/fa/pencil-square';
import IconCircle from 'react-icons/lib/md/add-circle-outline';

import { connect } from 'react-redux';
import './style.css';

class ContentModule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contentOn: true,
            questionsOn: true,
            allowPosts: true,
            allowAnswers: true,
            messagesOn: true
        };

        this.onContent = this.onContent.bind(this);
        this.onQuestions = this.onQuestions.bind(this);
        this.onAllowPosts = this.onAllowPosts.bind(this);
        this.onAllowUnofficialAnswers = this.onAllowUnofficialAnswers.bind(this);
        this.cancelBtnClick = this.cancelBtnClick.bind(this);
        this.turnMessagesOffandOn = this.turnMessagesOffandOn.bind(this);
    }

    turnMessagesOffandOn() {
        if (this.state.messagesOn) {
            this.setState({
                messagesOn: false
            });
        } else {
            this.setState({
                messagesOn: true
            });
        }
    }

    onContent() {
        if (this.state.contentOn) {
            this.setState({
                allowPosts: false,
                contentOn: false
            });
        } else {
            this.setState({
                contentOn: true
            });
        }
    }

    onQuestions() {
        if (this.state.questionsOn) {
            this.setState({
                allowAnswers: false,
                questionsOn: false
            });
        } else {
            this.setState({
                questionsOn: true
            });
        }
    }

    onAllowPosts() {
        if (this.state.allowPosts) {
            this.setState({
                allowPosts: false
            });
        } else {
            this.setState({
                allowPosts: true
            });
        }
    }

    onAllowUnofficialAnswers() {
        if (this.state.allowAnswers) {
            this.setState({
                allowAnswers: false
            });
        } else {
            this.setState({
                allowAnswers: true
            });
        }
    }

    cancelBtnClick() {
        // check state and go to /apps/id/edit page
    }

    render() {
        return <div className="content-build build">
            <header className="mail-head d-flex align-items-center justify-content-between p-4 animated fadeIn">
                <h6 className="text-uppercase">INTERACT</h6>
                <div className="right-elems ml-auto d-flex">
                    <Button className="mr-3" onClick={this.cancelBtnClick}><b>EXIT BUILDER</b></Button>
                    <Button color="info" className="mr-3"><b>SAVE</b></Button>
                    <Button color="primary"><b>SAVE &amp; EXIT</b></Button>
                </div>
            </header>
            <div className="build-wrapper animated fadeInRightBig">
                <Row className="mb-4">
                    <div className="col-sm-12">
                        <Card>
                            <CardBlock>
                                <CardTitle style={{position: 'relative', display: 'inline-block'}}>
                                    CONTENT
                                    <div className={(this.state.contentOn) ? 'toggle-on toggle switch' : 'toggle switch'} onClick={() => this.onContent()} style={{position: 'absolute'}}>
                                        <div className="toggle-text-off">OFF</div>
                                        <div className="glow-comp"></div>
                                        <div className="toggle-button"></div>
                                        <div className="toggle-text-on">ON</div>
                                    </div>
                                </CardTitle>
                                {
                                    (this.state.contentOn) ?
                                        <Row>
                                            <div className="col-sm-6 col-md-2">
                                                <div className={(this.state.allowPosts) ? 'toggle-on toggle switch' : 'toggle switch'} onClick={() => this.onAllowPosts()}>
                                                    <div className="toggle-text-off">OFF</div>
                                                    <div className="glow-comp"></div>
                                                    <div className="toggle-button"></div>
                                                    <div className="toggle-text-on">ON</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-10 d-flex align-items-center justify-content-between">
                                                <h6 className="mt-2 text-uppercase">Allow Guests to Post</h6>
                                            </div>
                                        </Row>
                                    :
                                        <Row>
                                            <div className="col-sm-12">
                                                <p>Content has been turned off</p>
                                            </div>
                                        </Row>
                                }
                            </CardBlock>
                        </Card>
                    </div>
                </Row>
                <Row className="mb-4">
                    <div className="col-sm-12">
                        <Card>
                            <CardBlock>
                                <CardTitle style={{position: 'relative', display: 'inline-block'}}>
                                    QUESTIONS
                                    <div className={(this.state.questionsOn) ? 'toggle-on toggle switch' : 'toggle switch'} onClick={() => this.onQuestions()} style={{position: 'absolute'}}>
                                        <div className="toggle-text-off">OFF</div>
                                        <div className="glow-comp"></div>
                                        <div className="toggle-button"></div>
                                        <div className="toggle-text-on">ON</div>
                                    </div>
                                
                                </CardTitle>                       
                                {
                                    (this.state.questionsOn) ?
                                        <Row>
                                            <div className="col-sm-6 col-md-2">
                                                <div className={(this.state.allowAnswers) ? 'toggle-on toggle switch' : 'toggle switch'} onClick={() => this.onAllowUnofficialAnswers()}>
                                                    <div className="toggle-text-off">OFF</div>
                                                    <div className="glow-comp"></div>
                                                    <div className="toggle-button"></div>
                                                    <div className="toggle-text-on">ON</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-10 d-flex align-items-center justify-content-between">
                                                <h6 className="mt-2 text-uppercase">Allow Guests To Unofficial Answer</h6>
                                            </div>
                                        </Row>
                                    :
                                        <Row>
                                            <div className="col-sm-12">
                                                <p>Questions has been turned off</p>
                                            </div>
                                        </Row>
                                }
                            </CardBlock>
                        </Card>
                    </div>
                </Row>
                <Row className="mb-4">
                    <div className="col-sm-12">
                        <Card>
                            <CardBlock>
                                <CardTitle style={{position: 'relative', display: 'inline-block'}}>
                                    MESSAGES
                                    <div className={(this.state.messagesOn) ? 'toggle-on toggle switch' : 'toggle switch'} onClick={() => this.turnMessagesOffandOn()} style={{position: 'absolute'}}>
                                        <div className="toggle-text-off">OFF</div>
                                        <div className="glow-comp"></div>
                                        <div className="toggle-button"></div>
                                        <div className="toggle-text-on">ON</div>
                                    </div>
                                
                                </CardTitle>   
                            </CardBlock>
                        </Card>
                    </div>
                </Row>
                <Row className="mb-4">
                    <div className="col-sm-12">
                        <Card>
                            <CardBlock>
                                <CardTitle>
                                    BLOCKED USERS
                                </CardTitle>  
                                <CardSubtitle className="small mb-4 card-subtitle">
                                    Displays the list of people that you banned
                                </CardSubtitle>
                                <Row>
                                    <div className="col-sm-2">
                                        <div style={{borderRadius: '50%', width: '100%', minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                            <IconCircle size="44"/>
                                        </div>
                                    </div>
                                </Row>
                            </CardBlock>
                        </Card>
                    </div>
                </Row>
            </div>
        </div>
    }
};


export default connect(null)(ContentModule);