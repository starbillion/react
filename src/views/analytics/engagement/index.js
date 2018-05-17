import React, {PropTypes} from 'react';
import {
    CardGroup, Card, CardBlock, CardTitle, Row, Progress,
    Nav, NavItem, NavLink
} from 'reactstrap';
import {
     AreaChart, Area, Tooltip, XAxis, YAxis, Legend, ResponsiveContainer
} from 'recharts';
import {Link, IndexLink} from 'react-router';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { loadEngagements } from '../../../actions/analyticsActions';

// icons
import IconDatabase from 'react-icons/lib/fa/database';
import IconProduct from 'react-icons/lib/fa/cube';
import IconDownload from 'react-icons/lib/fa/download';
import IconProfit from 'react-icons/lib/fa/credit-card';
import IconFacebook from 'react-icons/lib/fa/facebook-square';
import IconChart from 'react-icons/lib/md/insert-chart';

import moment from 'moment';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';


const ViewHeader = () => (
    <div className="view-header">
        <header className="text-white">
            <h1 className="h5 title text-uppercase">Analytics</h1>
            <p className="mb-0 subtitle">One of our main goals to create additional revenue for you. Here is where you can see the result of our mission.</p>
        </header>
    </div>
);

const ViewContent = ({children}) => (
    <div className="view-content view-components">
        {children}
    </div>
);

class Engagement extends React.Component {

    constructor(props) {
        super(props);

         this.state = {
            engagementData : [],
            salesCount : 0,
            forecastCount : 0,
            pageViewsCount : 0,
            startDate: moment().startOf('month'),
            endDate: moment().endOf('month')
        }

        this.engagementsData = this.engagementsData.bind(this);
        this.calculateSales = this.calculateSales.bind(this);
        this.calculateForecast = this.calculateForecast.bind(this);
        this.calculatePageViews = this.calculatePageViews.bind(this);

    }

    componentDidMount() {
        this.props.loadEngagements();
    }

    calculateSales(data){

        let monthDays = moment().daysInMonth();
        let currentDay = moment().date();
        let count = 0;

        data.forEach(function (value, index ) {
            if(moment(value.created_at).date() < currentDay){
                count = count + value.engagements;
            }
        });

        this.setState({salesCount : Math.round(count)});

    }

    calculateForecast(data){

        let monthDays = moment().daysInMonth();
        let currentDay = moment().date();
        let count = 0;

        if (data && data.length > 0){
            data.forEach(function (value, index ) {
                if(moment(value.created_at).date() < currentDay){
                    count = count + value.engagements;
                }
            });
        }

        let avgForeCast =(count/currentDay) * monthDays;

        this.setState({forecastCount : Math.round(avgForeCast)});
    }
    
    calculatePageViews(data){

    }

    engagementsData(data){

        let engagementsDataArray = [];

        let pushedDate = {};

        var currentDate = new Date();
        var totalNumberOfDaysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        for (var xx = 1; xx <= totalNumberOfDaysInMonth; xx++){
            var found = false;

                if (data && data.length > 0){
                    data.forEach(function (value, index ) {

                        if (new Date(value.created_at).getDate() == xx){
                            found = true;
                        }

                        let createdDate = moment(value.created_at).utc().format('DD MMM YYYY'); 
                        let count = 0;
                        if(pushedDate[createdDate] != createdDate){

                            for(var i = 0; i < data.length; i++){

                                let nextDate = moment(data[i].created_at).utc().format('DD MMM YYYY')
                                if(createdDate === nextDate){
                                    count++;
                                }

                            }
                            
                            pushedDate[createdDate] = createdDate;

                            const engagements = {
                                'created_at' : moment(value.created_at).utc().format('DD MMM YYYY'),
                                'client' : value.created_at,
                                'engagements' : count,
                                'id' : value.id
                            };

                            engagementsDataArray.push(engagements);
                        }
                    });
                }

                if (!found) {
                    let newDate = moment(new Date(currentDate.getFullYear(), currentDate.getMonth(), xx)).utc().format('DD MMM YYYY');
                    pushedDate[newDate] = newDate;
                    const engagements = {
                        'created_at' : newDate,
                        'engagements' : 0
                    };

                    engagementsDataArray.push(engagements)
                }
        }
                

        let _sortedDates = engagementsDataArray.sort(function(a, b){
            const ba = moment(a.created_at).format('X')-moment(b.created_at).format('X');
            return ba;
        });
        
        this.setState({engagementData : _sortedDates});
        
        this.calculateForecast(engagementsDataArray);
        this.calculateSales(engagementsDataArray);
    }

    componentWillReceiveProps(nextProps) {
        this.engagementsData(nextProps.engagements);
    }

    handleStartChange(date) {
        this.setState({
          startDate: date
        });
    }

    handleEndChange(date) {
        this.setState({
          endDate: date
        });
    }

    render() {
        return (
            <div className="view">
                <ViewHeader/>
                <ViewContent>
                    {/* widget set - 1 */}
                    <Card style={{overflow: 'visible'}}>
                        <CardBlock>
                            <Nav pills>
                            <NavItem>
                                <Link to="/analytics" className="nav-link">In App Purchases</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/analytics/downloads" className="nav-link">App Downloads</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/analytics/engagement" className="nav-link active">Engagement</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/analytics/heatmap" className="nav-link">Heat Map</Link>
                            </NavItem>
                            </Nav>
                            <div className="dates-wrapper">
                                <DatePicker selected={this.state.startDate} onChange={this.handleStartChange} className="wrap-dates"/>
                                <DatePicker selected={this.state.endDate} onChange={this.handleEndChange} className="wrap-dates"/>
                            </div>
                        </CardBlock>
                    </Card>

                    <CardGroup className="sales-card mb-4">
                        <Card style={{'flex': '3 0 0'}}>
                            <CardBlock>
                                <CardTitle className="text-uppercase h6">Engagement Statistics</CardTitle>
                                <div className="small mb-4 card-subtitle">Showing post count over time</div>
                                <div style={{width: '100%', height: '280px'}}>
                                    <ResponsiveContainer>
                                        <AreaChart data={this.state.engagementData}  margin={{top: 10, right: 10, left: -15, bottom: 0}}>  
                                              <defs>
                                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                  <stop offset="5%" stopColor="#3f51b5" stopOpacity={0.8}/>
                                                  <stop offset="95%" stopColor="#3f51b5" stopOpacity={0.5}/>
                                                </linearGradient>
                                              </defs> 
                                            <XAxis dataKey="created_at"/>
                                            <Tooltip labelStyle={{display: 'none'}}/>
                                            <Area dataKey="engagements" type="monotone" stroke="#3f51b5" fillOpacity={1} fill="url(#colorUv)" />
                                        </AreaChart>     
                                    </ResponsiveContainer>    
                                </div>
                            </CardBlock>
                        </Card>
                        <Card>
                            <CardBlock>
                                <h6 className="text-uppercase title font-weight-bold small">Posts</h6>
                                <h4 className="font-weight-normal mb-0"><IconChart size="16" color="orange"/>{this.state.salesCount}</h4>
                            </CardBlock>
                            <CardBlock>
                                <h6 className="text-uppercase title font-weight-bold small text-nowrap">Forecast</h6>
                                <h4 className="font-weight-normal mb-0"><IconChart size="16" color="orange"/>{this.state.forecastCount}</h4>
                            </CardBlock>
                        </Card>
                    </CardGroup>
                </ViewContent>
            </div>
        )
    }
}

Engagement.propTypes = {
  engagements: PropTypes.array
};

function mapStateToProps(state, ownProps) {
  return {
    engagements: state.analytics.engagements
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadEngagements}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Engagement);

