import React, {PropTypes} from 'react';
import { Card, CardBlock, Form, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { loadAllAppTypes, createApp } from '../../../actions/appsActions';

const ViewHeader = () => (
    <div className="view-header">
        <header className="title text-white">
            <h1 className="h4 text-uppercase">Type of App that You want to Build?</h1>
            <p className="mb-0"><b>Step 1 of 3</b>: Tell us what type of app you want to create.</p>
        </header>
    </div>
);

const ViewContent = ({children}) => (
    <div className="view-content view-components">
        {children}
    </div>
);

export  class FormInputs extends React.Component {

    constructor(props) {
        super(props);
        this.onCardSelect = this.onCardSelect.bind(this);
    }
    
    onCardSelect = (e) => {
        const id = e.target.id;
        this.props.createApp(id);
        e.preventDefault();
        this.context.router.push('/apps/new/2');
    }
    componentDidMount() {
        console.log(this.props);
        // if(!this.props.appTypes || this.props.appTypes.length == 0){
        //     this.context.router.push('/apps');
        // }
    }
    render(){
        
        const appTypes = this.props.appTypes;
        const _parent = this; 

        return(
        <Form onSubmit={e => e.preventDefault()}>
            {   
                appTypes.map(function(item, index) {
                    return <Card className="mb-0" key={index}>
                                <CardBlock onClick={_parent.onCardSelect} id={item.id} >
                                   {item.title}
                                </CardBlock>
                            </Card>
                })
            }
        </Form>
)}};

FormInputs.contextTypes = {
  router: React.PropTypes.object.isRequired
}

class NewApp extends React.Component {
    componentDidMount() {
        this.props.loadAllAppTypes();
    }
    componentWillReceiveProps(nextProps){
        console.log("nextProps...",nextProps);
    }
    createApp(id){
        this.props.createApp({appType : id});
    }
   render() {
    return(
    <div className="view new-tour step-1">
        <ViewHeader/>
        <ViewContent>
            <Card className="mb-4">
                <CardBlock>
                    <Row className="mb-4">
                        <div className="col-sm-8">
                            <h6 className="mb-4 text-uppercase">Select a Type Below</h6>
                            <FormInputs appTypes={this.props.appTypes} createApp={this.createApp.bind(this)} />
                        </div>
                        <div className="col-sm-4">
                            <h6 className="right-title">Type of Tour you want to sell?</h6>

                            Depending on the type you select, some extra features will be available. Start by selecting a type that fits your need.
                            <br/><br/>
                            Don&amp;t worry.  You can change this later.
                        </div>
                    </Row>
                </CardBlock>
            </Card>
        </ViewContent>
    </div>
)}}

NewApp.propTypes = {
  appTypes: PropTypes.array
};

function mapStateToProps(state, ownProps) {
  return {
    apps: state.apps.apps,
    categories: state.apps.categories,
    languages: state.apps.languages,
    appTypes : state.apps.appTypes
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadAllAppTypes, createApp }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(NewApp);

