import React,{PropTypes} from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    CardGroup, Card, CardBlock, CardTitle, Row, Progress,
    Nav, NavItem, NavLink, FormGroup, Label, Col, Input
} from 'reactstrap';
import {
    BarChart, Bar, Tooltip
} from 'recharts';
import { Link, IndexLink } from 'react-router';

// icons
import IconDatabase from 'react-icons/lib/fa/database';
import IconProduct from 'react-icons/lib/fa/cube';
import IconDownload from 'react-icons/lib/fa/download';
import IconProfit from 'react-icons/lib/fa/credit-card';
import IconFacebook from 'react-icons/lib/fa/facebook-square';
import IconTwitter from 'react-icons/lib/fa/twitter-square';
import {getHeatMapData} from '../../../../actions/analyticsActions';
import { loadTours } from '../../../../actions/tourActions';
import Map from 'google-maps-react';
import HeatMap from './HeatmapLayer'
import map from 'lodash.map';

import '../style.css';

const ViewHeader = () => (
    <div className="view-header">
        <header className="text-white">
            <h1 className="h5 title text-uppercase">Analytics</h1>
            <p className="mb-0 subtitle">One of our main goals to create additional revenue for you. Here is where you can see the result of our mission.</p>
        </header>
    </div>
);

const ViewContent = ({ children }) => (
    <div className="view-content view-components">
        {children}
    </div>
);


class HeatmapDetails extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          mapHidden: false,
          layerHidden: false,
          addressPoints: []
      };

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
    var gradient = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ];

    return (
        <div className="view">
            <ViewHeader />
            <ViewContent>
              {/* widget set - 1 */}
              <Card>
                  <CardBlock>
                      <Nav pills>
                          <NavItem>
                              <Link to="/analytics" className="nav-link">In App Purchases</Link>
                          </NavItem>
                          <NavItem>
                              <Link to="/analytics/downloads" className="nav-link">App Downloads</Link>
                          </NavItem>
                          <NavItem>
                              <Link to="/analytics/engagement" className="nav-link">Engagement</Link>
                          </NavItem>
                          <NavItem>
                              <Link to="/analytics/heatmap" className="nav-link active">Heat Map</Link>
                          </NavItem>
                      </Nav>
                  </CardBlock>
              </Card>
              <Card>
                  <CardBlock>
                      <FormGroup row>
                          <Label for="exampleNumber" sm={3}>Selected Tour:</Label>
                          <Col sm={9}>
                            {this.props.tours.length > 0 &&
                                <Input type="select" name="category_id" onChange={this.onChange.bind(this)}>
                                   {this.props.tours.map(function (item, index) {
                                        return <option key={item.id} value={item.id}>{item.title}</option>
                                    })}
                                </Input>
                            }
                          </Col>
                      </FormGroup>
                  </CardBlock>
              </Card>
              <Card className="google-map-card">
                <CardBlock>

                  <div className="maps-wrapper">
                    { this.state.addressPoints.length > 0 && this.props.tours.length > 0 &&
                      <Map google={window.google} className="google-map" initialCenter={this.state.addressPoints[0]} clickableIcons={false} zoom={20  }>
                          <HeatMap
                            gradient={gradient}
                            radius={20}
                            opacity={0.3}
                            positions={this.state.addressPoints}
                          />
                      </Map>
                    }
                    { this.state.addressPoints.length == 0 && this.props.tours.length > 0 &&
                      <div>No Pings Exist</div>
                    }
                  </div>
                </CardBlock>
              </Card>
            </ViewContent>
        </div>
    );
  }
}

HeatmapDetails.propTypes = {
  apps: PropTypes.array,
  tours: PropTypes.array,
  getHeatMapData: React.PropTypes.func.isRequired,
};

HeatmapDetails.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(HeatmapDetails);