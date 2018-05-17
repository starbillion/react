import React, { PropTypes } from 'react';
import {
    Card, CardTitle, CardSubtitle, CardBlock,
    Button, Form, FormGroup, Label, Input, FormText, FormFeedback,
    InputGroup, InputGroupAddon, InputGroupButton,
    Col, Row, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router';
import { createApp, saveApp } from '../../../../actions/appsActions';
import { style } from '../style.css';

import IconFace from 'react-icons/lib/md/face';
import IconHome from 'react-icons/lib/md/home';
import IconMap from 'react-icons/lib/md/map';
import IconAudio from 'react-icons/lib/md/headset';
import IconMessage from 'react-icons/lib/md/message';
import IconMenu from 'react-icons/lib/md/menu';
import IconInfo from 'react-icons/lib/md/info';

const ViewHeader = () => (
    <div className="view-header">
        <header className="title text-white">
            <h1 className="h4 text-uppercase">Add some spice.</h1>
            <p className="mb-0"><b>Step 3 of 3</b>: Spice up your tour with a cover photo.</p>
        </header>
    </div>
);

const ViewContent = ({ children }) => (
    <div className="view-content view-components">
        {children}
    </div>
);

class CoverTourPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rSelected: 2,
            isIphone: true,
            file: '', imagePreviewUrl: '',
            modal: false,
            modalClass: '',
            visible: false,
            showinfo: true,
            fullscreen: false,
            error: ""
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeCheckBoxChange = this.onChangeCheckBoxChange.bind(this);

    }

    uploadCoverPhoto(e) {

        e.preventDefault();

          var file =  e.target.files[0];
          var reader = new FileReader();
          var url = reader.readAsDataURL(file);

        reader.onloadend = () => {
            this.setState({
                coverFile: file,
                coverImageUrl: reader.result
            });
        }
        //reader.readAsDataURL(file)
    }

    onSubmit = (e) => {
        e.preventDefault();

        var file_data = this.state.coverFile;
        var form_data = new FormData();
        form_data.append('fileName', file_data);
        this.props.newApp["cover_image"] = file_data;
        this.props.newApp["showinfo"] = this.state.showinfo;
        this.props.newApp["fullscreen"] = this.state.fullscreen;
        this.props.saveApp(this.props.newApp, data => {
            if (data && data.status != "failed") {

                browserHistory.push(`/apps/${data.id}/edit`);
            } else {
                //TODO need to show error popup
                this.setState({ modal: true, error: data.error });
            }

        });
    }
    toggle = (e, str) => {
        this.setState({
            modal: !this.state.modal
        })
    }
    onCancel = (e) => {
        e.preventDefault();
        this.context.router.push('/apps/new/2');
    }
    onChangeCheckBoxChange(e) {
        this.setState({ [e.target.name]: e.target.checked });
    }
    componentDidMount() {
        console.log("inside component did mount", this.props);
        if (!this.props.newApp) {
            this.context.router.push('/apps');
            return;
        }
    }
    render() {
        return (
            <div className="step-1 view">
                <ViewHeader />
                <ViewContent>
                    <Card className="mb-4">
                        <CardBlock>
                            <Row className="mb-4">
                                <div className="col-sm-8">
                                    <h6 className="mb-4 text-uppercase">App Creation</h6>
                                    <Form onSubmit={this.onSubmit}>
                                        <Card className="mb-0">
                                            <CardBlock>
                                                <FormGroup row>
                                                    <Col sm={12}>
                                                        <div className="cover new-app-screens">
                                                            <div className="device-app-wrapper">
                                                                <div id="device-new-3" className={(this.state.isIphone) ? 'iphone' : 'ipad'}>
                                                                    <div id="devicetop" className="iphone-speaker">
                                                                    </div>
                                                                    <div id="screen-new-3" className={(this.state.isIphone) ? 'iphone-screen' : 'ipad-screen'}>
                                                                        <div className="header">
                                                                            <div className="text-center" style={{ color: "#262626", fontSize: 14 }}>
                                                                                {this.state.rSelected === 2 &&
                                                                                    <span>Welcome</span>
                                                                                }
                                                                                {this.state.rSelected === 3 &&
                                                                                    <span>Maps</span>
                                                                                }
                                                                                {this.state.rSelected === 4 &&
                                                                                    <span>Tours</span>
                                                                                }
                                                                                {this.state.rSelected === 5 &&
                                                                                    <span>Content</span>
                                                                                }
                                                                                {this.state.rSelected === 1 &&
                                                                                    <span>More</span>
                                                                                }
                                                                                <IconFace size="16" color="#262626" className="profile" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="footer">
                                                                            <div className={(this.state.rSelected === 2) ? 'active-tab home-tab tab' : 'home-tab tab'}>
                                                                                <IconHome size="16" color="#868686" />
                                                                            </div>
                                                                            <div className={(this.state.rSelected === 3) ? 'active-tab map-tab tab' : 'map-tab tab'}>
                                                                                <IconMap size="16" color="#868686" />
                                                                            </div>
                                                                            <div className={(this.state.rSelected === 4) ? 'active-tab tour-tab tab' : 'tour-tab tab'}>
                                                                                <IconAudio size="16" color="#868686" />
                                                                            </div>
                                                                            <div className={(this.state.rSelected === 5) ? 'active-tab content-tab tab' : 'content-tab tab'}>
                                                                                <IconMessage size="16" color="#868686" />
                                                                            </div>
                                                                            <div className={(this.state.rSelected === 1) ? 'active-tab menu-tab tab' : 'menu-tab tab'}>
                                                                                <IconMenu size="16" color="#868686" />
                                                                            </div>
                                                                        </div>
                                                                        <div className={(this.state.rSelected === 2) ? 'selected home' : 'home'}>
                                                                            <div className="screen-wrapper">
                                                                                {console.log(this.state)}
                                                                                {this.props.newApp && this.state.fullscreen &&
                                                                                    <div style={{height: '100%', position: 'relative'}}>
                                                                                        <img src="/images/tour-cover.png"  style={{ height: '100%' }} />
                                                                                        <img src={this.state.coverImageUrl} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} />
                                                                                    </div>
                                                                                }
                                                                                {this.props.newApp && !this.state.fullscreen &&
                                                                                    <div style={{height: '100%', position: 'relative'}}>
                                                                                        <img src="/images/tour-cover.png"  style={{ height: 120, width: '100%', position: 'absolute', top: 0, right: 0, left: 0 }} />
                                                                                        <img src={this.state.coverImageUrl} style={{ height: 120, width: '100%', position: 'absolute', top: 0, right: 0, left: 0 }} />
                                                                                    </div>
                                                                                }
                                                                                {this.props.newApp && !this.state.showinfo &&
                                                                                    <IconInfo size="20" style={{ position: 'absolute', right: 10, bottom: 10, zIndex: 100 }} />
                                                                                }
                                                                                {this.props.newApp && this.state.showinfo &&
                                                                                    <div className="showinfo" style={{ maxHeight: 120, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, background: 'rgba(0,0,0,0.3)' }}>
                                                                                        <h1>{this.props.newApp.title}</h1>
                                                                                        <h2>{this.props.newApp.description.substring(0, 30)}</h2>
                                                                                        <span className="read-more">Read More</span>
                                                                                    </div>
                                                                                }
                                                                                <div className="body">
                                                                                </div>
                                                                            </div>
                                                                            <div className="edit-hover-image">
                                                                                <p>Change the cover image</p>
                                                                                <Input type="file" name="url" className="custom-file-input" id="examplePassword" onChange={(e) => this.uploadCoverPhoto(e)} />
                                                                                <span className="custom-file-control"></span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <a href="#">
                                                                        <div id="button" onClick={this.ipadSwitch}>
                                                                            <div id="button-square">
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </FormGroup>
                                            </CardBlock>
                                        </Card>
                                        <hr />
                                        {
                                            /*
                                            <Card className="mb-5">
                                                <CardBlock>   
                                                    <p>Cover image: 640 px wide by 240 px tall</p>
                                                    <img src={this.state.iconImageUrl} />
    
                                                    <p>Icon: 120 px wide by 100 px tall</p>
                                                    <img src={this.state.coverImageUrl} />
    
                                                </CardBlock>
                                            </Card>
                                            */
                                        }
                                        <FormGroup row>
                                            <Col sm={12} className="">
                                                <Button color="primary" className="float-right">Submit</Button>{' '}
                                                <Button className="float-left" onClick={this.onCancel}>Back</Button>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </div>
                                <div className="col-sm-4">
                                    <h6 className="right-title">Branding your tour.</h6>
                                    <Card className="mb-5">
                                        <CardBlock>
                                            <div><input type="checkbox" checked={this.state.showinfo} name="showinfo" onChange={this.onChangeCheckBoxChange} /> Show Info </div>
                                            <div><input type="checkbox" checked={this.state.fullscreen} name="fullscreen" onChange={this.onChangeCheckBoxChange} /> Fullscreen </div>

                                        </CardBlock>
                                    </Card>
                                    Make your tour stand out with a branding that matches your quality.
                                    <br /><br />
                                    Add a cover photo and profile picture that makes you stand apart from the crowd.
                                    <br /><br />
                                    <Button className="float-left">Skip For Now</Button>
                                </div>
                            </Row>
                        </CardBlock>
                    </Card>
                </ViewContent>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.state.modalClass}>
                    <ModalHeader toggle={this.toggle}>Failed To Create App</ModalHeader>
                    <ModalBody>
                        {this.state.error}
                    </ModalBody>
                </Modal>
            </div>
        )
    }
};

CoverTourPage.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        newApp: state.apps.newApp
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createApp, saveApp }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CoverTourPage);
