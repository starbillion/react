import React, { PropTypes } from 'react';
import {
    Card, CardBlock,
    Button, Form, FormGroup, Label, Input, FormText, FormFeedback,
    InputGroup, InputGroupAddon, InputGroupButton,
    Col, Row, Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadCategories, loadLanguages, createApp } from '../../../../actions/appsActions';

const ViewHeader = () => (
    <div className="view-header">
        <header className="title text-white">
            <h1 className="h4 text-uppercase">Welcome. Let&apos;s get started</h1>
            <p className="mb-0"><b>Step 2 of 3</b>: Tell us a bit about your App guide.</p>
        </header>
    </div>
);

const ViewContent = ({ children }) => (
    <div className="view-content view-components">
        {children}
    </div>
);

class NewAppPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            title: "",
            category_id: "",
            language_id: "",
            price: "0.0",
            description: "",
            starttime: "",
            endtime: "",
            appType: "",

        }


        if (props.languages && props.languages.length != 0
            && props.categories && props.categories.length != 0) {

            this.state.category_id = props.categories[0].id;
            this.state.language_id = props.languages[0].id;

        }



        this.onDismiss = this.onDismiss.bind(this);
        this.onTourSubmit = this.onTourSubmit.bind(this);
        this.onTourCancel = this.onTourCancel.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    onDismiss() {
        this.setState({ visible: false });
    }
    componentDidMount() {
        console.log("inside component did mount", this.props);
        if (!this.props.newApp) {
            this.context.router.push('/apps');
            return;
        }

        if (this.props.newApp.description) {
            this.setState({ description: this.props.newApp.description });
        }
        if (this.props.newApp.title) {
            this.setState({ title: this.props.newApp.title });
        }
    }
    onTourSubmit = (e) => {
        e.preventDefault();
        if (this.state.title.trim() == "") {
            this.setState({ visible: true });
        } else {
            const appData = {
                "title": this.state.title,
                "description": this.state.description,
                "language_id": this.state.language_id,
                "category_id": this.state.category_id,
                "price": this.state.price,
                "starttime": this.state.starttime,
                "endtime": this.state.endtime,
                "appType": this.props.newApp.appType
            }
            this.props.createApp(appData);
            this.context.router.push('/apps/new/3');
        }
    }

    onTourCancel = (e) => {
        e.preventDefault();
        this.context.router.push('/apps/new');
    }

    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSelectChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const loadLanguages = this.props.languages;
        const loadCategories = this.props.categories;
        return (
            <div className="view new-tour step-1">
                <ViewHeader />
                <ViewContent>
                    <Card className="mb-4">
                        <CardBlock>
                            <Row className="mb-4">
                                <div className="col-sm-8">
                                    <h6 className="mb-4 text-uppercase">Tour Creation</h6>
                                    <Alert color="danger" className="text-center" isOpen={this.state.visible} toggle={this.onDismiss}>
                                        Form is not complete.
                                    </Alert>
                                    <Form onSubmit={this.onTourSubmit}>
                                        <FormGroup row>
                                            <Label for="exampleEmail" sm={3}>Title</Label>
                                            <Col sm={9}><Input type="text" id="title" placeholder="Name your tour." value={this.state.title} name="title" onChange={this.onInputChange} /></Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleSearch" sm={3}>Description</Label>
                                            <Col sm={9}><Input type="text" id="exampleDescription" value={this.state.description} placeholder="Describe your tour." name="description" onChange={this.onInputChange} /></Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleNumber" sm={3}>Category</Label>
                                            <Col sm={9}>
                                                <Input type="select" name="category_id" onChange={this.onSelectChange} >
                                                    {loadCategories.map(function (item, index) {
                                                        return <option key={item.id} value={item.id}>{item.name}</option>
                                                    })}
                                                </Input>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleNumber" sm={3}>Language</Label>
                                            <Col sm={9}>
                                                <Input type="select" name="language_id" onChange={this.onSelectChange} >
                                                    {loadLanguages.map(function (item, index) {
                                                        return <option key={item.id} value={item.id}>{item.display_name}</option>
                                                    })}
                                                </Input>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleDate" sm={3}>Price</Label>
                                            <Col sm={9}>
                                                <Input type="select" name="price" onChange={this.onSelectChange} >
                                                    <option value="0.0">Free</option>
                                                    <option>0.49</option>
                                                    <option>0.99</option>
                                                    <option>1.49</option>
                                                    <option>1.99</option>
                                                    <option>2.99</option>
                                                    <option>3.99</option>
                                                    <option>4.99</option>
                                                    <option>5.99</option>
                                                    <option>6.99</option>
                                                    <option>7.99</option>
                                                    <option>8.99</option>
                                                    <option>9.99</option>
                                                </Input>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col sm={12} className="">
                                                <Button color="primary" className="float-right" >Next</Button>{' '}
                                                <Button className="float-left" onClick={this.onTourCancel}>Back</Button>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </div>

                                <div className="col-sm-4">
                                    <h6 className="right-title">Tourize your Tour.</h6>

                                    You’re on your way to creating an extremely useful, wonderfully eco-friendly, and pleasantly elegant mobile guide. With Tourize, we take the effort out with our builder.
                                <br /><br />
                                    With a few short steps you are on your way to making income from your tour without having to be there!
                            </div>
                            </Row>
                        </CardBlock>
                    </Card>
                </ViewContent>
            </div>
        )
    }
};

NewAppPage.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        categories: state.apps.categories,
        languages: state.apps.languages,
        newApp: state.apps.newApp
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createApp }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAppPage);
