import React, {PropTypes} from 'react';

import {
    ButtonGroup, Button, ButtonToolbar, Card, CardBlock, CardTitle, Row, Progress, Nav, NavItem, NavLink
} from 'reactstrap';
import {
    BarChart, Bar, Tooltip
} from 'recharts';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import { loadApps } from '../../../actions/appsActions';

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
            <h1 className="h5 title text-uppercase">Messages</h1>
            <p className="mb-0 subtitle">Privately chat with your visitors.</p>
        </header>
    </div>
);

const ViewContent = ({children}) => (
    <div className="view-content view-components">
        {children}
    </div>
);

class Message extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadApps();
    }

    render() {
        const apps = this.props.apps;
        return (
            <div className="view">
                <ViewHeader/>
                <ViewContent>
                    {/* widget set - 1 */}
                    <Row className="white p-3">
                        <div className="col-2 mb-5"> 
                            <Nav pills className="flex-column">
                            <NavItem>
                                <NavLink href="#" className="active">All Apps</NavLink>
                            </NavItem>
                            {apps.map(function(item, index) {
                                return <NavItem key={index}>
                                            <NavLink href="#">{item.title}</NavLink>
                                        </NavItem>
                            })}
                            </Nav>        
                        </div>
                        <div className="col-10 mb-5">
                            <div className="row">
                                <a href="#" className="thumbnail col-1 tablet-hide p-2">
                                    <img src="https://decorator.io/modulr/webroot/media/nouser.png" />
                                </a>
                                <div className="col-11 p-a">
                                    <p className="lh-12 p-t-lg">
                                    <a href="#" className="text-teal text-strong hover-text-underline">Some Dude</a>
                                    </p>
                                    <p className="lh-12"><span>2 min ago</span></p>
                                </div>
                            </div>

                            <div className="row p-2">
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                </p>
                            </div>
                            <div className="row p-2 mt-2">
                                <a href="#" className="btn btn-default text-success">
                                    <i className="fa fa-lg fa-angle-up"></i> 255
                                </a>
                                <a href="#" className="btn btn-default text-danger">
                                    <i className="fa fa-lg fa-angle-down"></i> 13
                                </a>
                                <div className="pull-right">
                                    <a href="#" className="btn fill-transparent hover-fill-disable text-gray hover-text-teal">
                                        <i className="fa fa-exclamation-triangle"></i> Report
                                    </a>
                                    <a href="#" className="btn fill-transparent hover-fill-disable text-gray hover-text-teal -padding-right">
                                        <i className="fa fa-reply"></i> Reply
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Row>
                </ViewContent>
            </div>
        )
    }
}

Message.propTypes = {
  apps: PropTypes.array
};

function mapStateToProps(state, ownProps) {
  return {
    apps: state.apps.apps
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadApps }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Message);

