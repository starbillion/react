import React, { Component, PropTypes } from 'react';

import {
    Button, ButtonGroup,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Progress, Modal, CardTitle, Row, ModalHeader, ModalBody,
    InputGroup, InputGroupAddon, Input, Card, CardBlock,
    Form, FormGroup, Label, FormText, FormFeedback,
     InputGroupButton, Col, Alert
} from 'reactstrap';

import {bindActionCreators} from 'redux';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';

// icons
import IconDatabase from 'react-icons/lib/fa/database';
import IconProduct from 'react-icons/lib/fa/cube';
import IconDownload from 'react-icons/lib/fa/download';
import IconProfit from 'react-icons/lib/fa/credit-card';
import IconFacebook from 'react-icons/lib/fa/facebook-square';
import IconTwitter from 'react-icons/lib/fa/twitter-square';
import {getHeatMapData} from '../../../actions/analyticsActions';
import { loadTours } from '../../../actions/tourActions';
import Map from 'google-maps-react';

class Maps extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          mapHidden: false,
          layerHidden: false,
          addressPoints: []
      };
      
      this.cancelBtnClick = this.cancelBtnClick.bind(this);
  }

  cancelBtnClick() {
      // check state and go to /apps/id/edit page
  }
   
  onChange(event){
    this.props.getHeatMapData(this.props.router.params.id, event.target.value).then(
        (res) => this.mapPoints(res.data),
        (err) => this.setState({ addressPoints: [] })
      );
  }


  componentDidMount() {
    this.props.loadTours(this.context.router.params.id);
    
  }

  componentWillReceiveProps(nextProps) {
    this.props.getHeatMapData(this.props.router.params.id, nextProps.tours[0].id).then(
        (res) => this.mapPoints(res.data),
        (err) => this.setState({ addressPoints: [] })
      );
  }

  mapPoints(nextProps){
      let adpt =[];
      
      nextProps.forEach(function(values, value){
        adpt.push({lat: values.latitude, lng: values.longitude})
      })

      this.setState({addressPoints:adpt});
  }

  render() {
    return (
        <div className="maps build">
            <header className="mail-head d-flex align-items-center justify-content-between p-4 animated fadeIn">
                <h6 className="text-uppercase">MAPS</h6>
                <div className="right-elems ml-auto d-flex">
                    <Button className="mr-3" onClick={this.cancelBtnClick}><b>EXIT BUILDER</b></Button>
                    <Button color="info" className="mr-3"><b>SAVE</b></Button>
                    <Button color="primary"><b>SAVE &amp; EXIT</b></Button>
                </div>
            </header>    
            <div className="build-wrapper animated fadeInRightBig">
                <Row>
                    <div className="col-sm-12">    
                      <Card className="google-map-card">
                          <CardBlock>

                            <div className="maps-wrapper">
                                <Map google={window.google} className="google-map" initialCenter={this.state.addressPoints[0]} clickableIcons={false} zoom={20  }>
                                </Map>
                            </div>
                          </CardBlock>
                      </Card>
                    </div>
                </Row>
            </div>
        </div>
    );
  }
}

Maps.propTypes = {
  apps: PropTypes.array,
  tours: PropTypes.array,
  getHeatMapData: React.PropTypes.func.isRequired,
};

Maps.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    tours: state.tours.tours
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loadTours, getHeatMapData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Maps);