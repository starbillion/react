import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import {
    Button,
    Card, CardBlock, CardTitle,
    Modal, ModalHeader, ModalBody, ModalFooter, Row, Progress
} from 'reactstrap';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import OwnerSelect from './owner/ownerSelect';

// styling
import './style.css';

import { loadApps, createApp, loadAppUsers, loadCategories, loadLanguages } from '../../../actions/appsActions';

import IconCircle from 'react-icons/lib/md/add-circle-outline';
import IconCreate from 'react-icons/lib/md/create'

// icons
import IconDatabase from 'react-icons/lib/fa/database';
import IconProduct from 'react-icons/lib/fa/cube';
import IconDownload from 'react-icons/lib/fa/download';
import IconProfit from 'react-icons/lib/fa/credit-card';
import IconFacebook from 'react-icons/lib/fa/facebook-square';
import IconTwitter from 'react-icons/lib/fa/twitter-square';

const ViewHeader = () => (
    <div className="view-header">
        <header className="text-white">
            <h1 className="h5 title text-uppercase">Apps</h1>
            <p className="mb-0 subtitle">Welcome to your Tour Manager!</p>
        </header>
    </div>
);

const ViewContent = ({children}) => (
    <div className="view-content view-components">
        {children}
    </div>
);

class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalClass: ''
        }

        this.newSecondPage = this.newSecondPage.bind(this);
    }

    newSecondPage  = (e) => {
        e.preventDefault();
        this.context.router.push('/apps/new');
    }

    toggle = (e, str) => {
        this.setState({
            modal: !this.state.modal,
            modalClass: str
        })
    }

    render() {
        return (
            <div className="create-popup">
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.state.modalClass}>
                    <ModalHeader toggle={this.toggle}>Create an App!</ModalHeader>
                    <ModalBody>
                        Creating a Tour like you were walking in front of someone.  Apps include content, maps. schedules and other bits of data to give the tourist the best experience.  Upon publishing, this tour will be what the tourist downlaods and interacts.
                    </ModalBody>
                    <ModalFooter>
                        <OwnerSelect owner = {this.props.users}/>
                    </ModalFooter>
                    <ModalFooter>
                            <Button color="primary" onClick={this.newSecondPage} className="btn-block">Create App</Button>{' '}
                    </ModalFooter>
                </Modal>
                <div className="mt-3 linker">
                    <div className="d-flex align-items-center justify-content-center" onClick={(e) => this.toggle(e, 'modalFadeInScale')}>
                        <IconCircle size="44"/>
                        <div className="d-flex align-items-center justify-content-center">
                            <p className="info mb-0">Create a new App</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ModalExample.contextTypes = {
  router: React.PropTypes.object.isRequired
}

class AppsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoading: true
        };
    }
    
    componentDidMount() {
        this.props.loadApps().then(this.setState({ isLoading: false }));
        this.props.loadAppUsers();
        this.props.loadCategories();
        this.props.loadLanguages();
    }

    render() {
      const apps = this.props.apps;
      const users = this.props.users;
        return (
            <div className="view">
                <ViewHeader/>
                <ViewContent>
                    {/* widget set - 1 */}
                    <Row>
                        <div className="col-sm-6 col-md-2 new-tour">
                            <Card className="mb-4">
                                <CardBlock>
                                    <ModalExample users={this.props.users} />
                                </CardBlock>
                            </Card>
                        </div>
                        {   

                            apps.map(function(item, index) {
                                return <div className="mb-4 col-sm-6 col-md-2 existing-tour" key={index}>
                                    <Card style={{background: `url(${item.cover_image})`}}>
                                        <CardBlock>
                                            <Link to={'/apps/'+ item.id + '/edit'}>
                                            </Link>
                                        </CardBlock>
                                    </Card>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <div className="d-flex align-items-center justify-content-center title">
                                            <p className="info">{item.title}</p>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </Row>
                </ViewContent>
                {
                    (this.state.isLoading) ?
                      <div className="loader">
                        <div className="loader-icons"></div>
                      </div>
                    :
                      <a></a>
                }
            </div>
        )
    }
}

AppsPage.propTypes = {
  apps: PropTypes.array
};

function mapStateToProps(state, ownProps) {
  return {
    apps: state.apps.apps,
    users: state.apps.users
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createApp, loadApps, loadCategories, loadLanguages, loadAppUsers }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(AppsPage);


