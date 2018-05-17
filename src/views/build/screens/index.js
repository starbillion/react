import React, { Component, PropTypes } from 'react';
import screenfull from 'screenfull';
import { Link } from 'react-router';
import ScreenList from './dnd/screenlist'

import {
    Button, ButtonGroup,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Progress, Modal, CardTitle, Row, ModalHeader, ModalBody,
    InputGroup, InputGroupAddon, Input, Card, CardBlock,
    Form, FormGroup, Label, FormText, FormFeedback,
     InputGroupButton, Col, Alert, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge
} from 'reactstrap';

import IconHome from 'react-icons/lib/md/home';
import IconMap from 'react-icons/lib/md/map';
import IconWalk from 'react-icons/lib/md/directions-walk';
import IconMessage from 'react-icons/lib/md/message';
import IconMenu from 'react-icons/lib/md/menu';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { loadScreens, loadAppScreens } from '../../../actions/screensActions';
import './style.css';

class Screens extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rSelected: 0,
            screens: [],
            appScreens: []
        };
        this.cancelBtnClick = this.cancelBtnClick.bind(this);
    }

    componentDidMount() {
        this.props.loadScreens();
        this.props.loadAppScreens(this.props.router.params.id);
    }

    cancelBtnClick() {
        // check state and go to /apps/id/edit page
    }
    
    render() {
        let appScreens = this.props.appScreens;
        let screens = this.props.screens;
        
        var title = [], name = [], remain_name = [];
        var k = 0;
        appScreens.map(function(item, index){
            title[index] = item.title;
        });
        screens.map(function(item, index){
            name[index] = item.name;
        });

        for(var i = 0; i < name.length; i++){            
            for(var j = 0; j < title.length; j++){
                if(name[i] == title[j])
                    break;

                if(name[i] != title[j] && j == title.length - 1){
                    remain_name[k] = name[i];
                    k = k + 1;
                }
            }
        }

        return <div className="screens build">
            <header className="mail-head d-flex align-items-center justify-content-between p-4 animated fadeIn">
                <h6 className="text-uppercase">SCREENS</h6>
                <div className="right-elems ml-auto d-flex">
                    <Button className="mr-3" onClick={this.cancelBtnClick}><b>EXIT BUILDER</b></Button>
                    <Button color="info" className="mr-3"><b>SAVE</b></Button>
                    <Button color="primary"><b>SAVE &amp; EXIT</b></Button>
                </div>
            </header> 
            <div className="build-wrapper animated fadeInRightBig">
                <Row>
                    <ScreenList screens = {remain_name} appScreens = {title}/>
                </Row>
            </div>
        </div>
    }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadScreens, loadAppScreens }, dispatch)
}

Screens.propTypes = {
  screens: PropTypes.array,
  appScreens: PropTypes.array
};

Screens.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    screens: state.screens.screens,
    appScreens: state.screens.appScreens
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Screens);