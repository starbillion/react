import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import {
    Button,
    Card, CardBlock, CardTitle,
    Form, FormGroup, Col, Label, Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Row, Progress, Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { createTour, loadCategories, loadLanguages, saveTour } from '../../../../actions/tourActions';
import IconAudio from 'react-icons/lib/md/headset';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const renderMarkers = (data) => {
  return (
      <div>
            {data.map(function(item, index) {
                return
                {item.stops.map(function(stop, index) {
                    return (
                        <Marker
                            title={'The marker`s title will appear as a tooltip.'}
                            name={'SOMA'}
                            position={{lat: stop.latitude, lng: stop.longitude}} />
                    )
                })}
            })}
        </div>
  )
};

class MapsTour extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tourMapsData: []
        }
    }
  
    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

        this.setState({tourMapsData : nextProps.mapsData});

    }

    static defaultProps = {
        center: {lat: -0.168373, lng: 51.530636},
        zoom: 5
    };

    render() {
       const mapsData = this.state.tourMapsData;
       const MarkerData = mapsData.map((item) => {
            if (item.stops) {
                return item.stops.map((stop) => 
                    <Marker position={{lat: stop.latitude, lng: stop.longitude}} />
                );
            }
        });

        return (
           <Map
                google={window.google} 
                zoom={14}
                initialCenter = {this.props.center}>
                    {MarkerData}
            </Map>
        )
    }
}


MapsTour.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps )(MapsTour);
