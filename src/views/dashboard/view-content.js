import React, {PropTypes} from 'react';
import {
    AreaChart, Area,
    PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Sector,
    ResponsiveContainer
} from 'recharts';
import {
    CardGroup, Card, CardSubtitle, CardBlock, CardTitle, Row, Button
} from 'reactstrap';

// icons
import IconDollar from 'react-icons/lib/fa/dollar';
import IconTrendUp from 'react-icons/lib/md/trending-up';
import IconLevelUp from 'react-icons/lib/fa/level-up';
import IconLevelDown from 'react-icons/lib/fa/level-down';
import IconAndroid from 'react-icons/lib/fa/android';
import IconCardTravel from 'react-icons/lib/md/card-travel';
import IconDvr from 'react-icons/lib/md/dvr';
import IconBalance from 'react-icons/lib/md/account-balance';
import IconDot from 'react-icons/lib/md/fiber-manual-record';
import IconApple from 'react-icons/lib/fa/apple';
import IconMobile from 'react-icons/lib/fa/mobile';

// Tour Actions
import { connect } from 'react-redux';
import { loadCategories, loadLanguages } from '../../actions/tourActions';
import { loadAllDashboardData } from '../../actions/dashboardActions';

import moment from 'moment';

// Sales Chart
// -----------
const salesData = [
      {name: 'Jun', iphone: 200, android: 200},
      {name: 'Jul', iphone: 150, android: 198},
      {name: 'Aug', iphone: 150, android: 200},
      {name: 'Sep', iphone: 145, android: 308},
      {name: 'Oct', iphone: 180, android: 200},
      {name: 'Nov', iphone: 290, android: 300},
      {name: 'Dec', iphone: 390, android: 300},
];

const SalesDataChart = ({data}) => (

    <ResponsiveContainer>
        <AreaChart data={data} margin={{top: 10, right: 10, left: -15, bottom: 0}}>
            <XAxis dataKey="key" axisLine={false} fontSize={10} tickLine={false} padding={{left: 0, right: 5}}/>
            <YAxis fontSize={10} axisLine={false} tickLine={false}/>
            <CartesianGrid stroke="#eee" vertical={false}/>
            <Tooltip wrapperStyle={{borderColor: '#eee'}}/>
            <Legend />
            <Area type='monotone' dataKey='ios' stackId="1" strokeWidth={2} stroke="#3f51b5" fill='#3f51b5' fillOpacity=".8" />
            <Area type='monotone' dataKey='android' stackId="1" strokeWidth={2} stroke="#ef6c00" fill='#ef6c00'  fillOpacity=".8"/>
        </AreaChart>
    </ResponsiveContainer>
);


// Blocks Chart
// ------------
const blocksData = [
    {'uv': 2034, 'sales': 623, 'br': 56, 'ns': 2343},
    {'uv': 2734, 'sales': 1223, 'br': 43, 'ns': 3200},
    {'uv': 2522, 'sales': 723, 'br': 64, 'ns': 3063},
    {'uv': 2944, 'sales': 1043, 'br': 44, 'ns': 3666},
    {'uv': 1822, 'sales': 433, 'br': 74, 'ns': 1909}
];

const BlocksChart = ({data, dataKey, stroke, fill}) => (
    <ResponsiveContainer>
        <AreaChart data={data.purchases} margin={{top: 0, bottom: 0, right: 0, left: 0}}>
            <Tooltip
                labelStyle={{display: 'none'}}
                itemStyle={{fontSize: 10, color: '#fff'}}
                wrapperStyle={{padding: '0 4px', background: 'rgba(40,70,80, .94)', border: 'none'}}/>

            <XAxis dataKey="date"/>
            <Area type='monotone' dataKey={dataKey} stroke={stroke} fill={fill} strokeWidth={2}  fillOpacity=".8"/>
        </AreaChart>
    </ResponsiveContainer>
);


const MonthDownloadChart = ({data, dataKey, stroke, fill}) => (
    <ResponsiveContainer>
        <AreaChart data={data.downloads} margin={{top: 0, bottom: 0, right: 0, left: 0}}>
            <Tooltip
                labelStyle={{display: 'none'}}
                itemStyle={{fontSize: 10, color: '#fff'}}
                wrapperStyle={{padding: '0 4px', background: 'rgba(40,70,80, .94)', border: 'none'}}/>

            <XAxis dataKey="date"/>
            <Area type='monotone' dataKey={dataKey} stroke={stroke} fill={fill} strokeWidth={2}  fillOpacity=".8"/>
        </AreaChart>
    </ResponsiveContainer>
);


// Traffic Source Chart
// --------------------
const trafficSourceData = [
    {name: 'Direct', value: 23}, {name: 'Referral', value: 8},
    {name: 'Organic', value: 44}, {name: 'Social', value: 25}
];
const trafficSourceColors = ['#448AFF', '#00E676', '#7C4DFF', '#40C4FF'];

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent} = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.name}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" fontSize={12}>
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

class TrafficSourceChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {activeIndex: 0}
    }
    onPieEnter = (data, index) => {
        this.setState({
            activeIndex: index,
        });
    }
    render() {
        return (
            <ResponsiveContainer>
                <PieChart onMouseEnter={this.onPieEnter}>
                    <Pie
                        data={trafficSourceData}
                        activeIndex={this.state.activeIndex} activeShape={renderActiveShape}
                        outerRadius={90}
                        innerRadius={70} paddingAngle={4}>
                        { trafficSourceData.map((entry, index) => <Cell fill={trafficSourceColors[index]} key={index}/>) }
                    </Pie>
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        );
    }
}


const TransactionTableData = [
    {date: '22 Mar',  name: 'John Doe','earnings': '$304', status: 'pending'},
    {date: '12 Feb', name: 'Maria Smith','earnings': '$834', status: 'done'},
    {date: '28 Jan', name: 'Sofia Andre',  'earnings': '$943', status: 'done'},
    {date: '03 May', name: 'Jean Wilkinson', 'earnings': '$1234', status: 'pending'},
    {date: '10 Mar', name: 'Alisha Seth', 'earnings': '$534', status: 'done'}
];

const TransactionTable = ({data}) => (
    <table className="table">
        <tbody>
            {data.map((item, i) => <tr key={i}>
                <td className="d-flex flex-column">
                    <strong>{item.buyer.first_name} {item.buyer.last_name}</strong>
                    <small>{moment(item.created_at).format('YYYY MMM')}</small>
                </td>
                <td className="align-middle">${item.price}</td>
                <td className="align-middle text-nowrap">
                    {item.client === 'ios' &&
                        <IconApple size="16" color="#262626"/>
                    }
                    {item.client === 'android' &&
                        <IconAndroid size="16" color="#262626"/>
                    }
                    {item.client !== 'ios' && item.client !== 'android' &&
                        <IconMobile size="16" color="#262626"/>
                    }
                </td>
            </tr>)}
        </tbody>
    </table>
);

const ContentTable = ({data}) => (
    <table className="table">
        <tbody>
            {data.map((item, i) => <tr key={i}>
                <td className="d-flex flex-column">
                    <strong>{item.user.first_name} {item.user.last_name}</strong>
                    <small>{moment(item.created_at).format('YYYY MMM')}</small>
                </td>
                <td className="align-middle">{item.app.title}</td>
                <td className="align-middle text-nowrap">
                    {item.description.substring(0, 10) + '...'}
                </td>
            </tr>)}
        </tbody>
    </table>
);

// Sales Card
// ----------
const SalesCard = ({data}) => (
    <CardGroup className="sales-card mb-4">
        <Card style={{'flex': '3 0 0'}}>
            <CardBlock>
                <CardTitle className="text-uppercase h6">In App Purchases Statistics</CardTitle>
                <div className="small mb-4 card-subtitle">Growth over time</div>
                <div style={{width: '100%', height: '280px'}}>
                    <SalesDataChart data={data.chart}/>
                </div>
            </CardBlock>
        </Card>
        <Card>
            <CardBlock>
                <h6 className="text-uppercase title font-weight-bold small">Net Income</h6>
                <h4 className="font-weight-normal mb-0"><IconDollar size="16" color="#00c853"/>{data.netincome}</h4>
            </CardBlock>
            <CardBlock>
                <h6 className="text-uppercase title font-weight-bold small text-nowrap">Forecast Income</h6>
                <h4 className="font-weight-normal mb-0"><IconDollar size="16" color="#00c853"/>{data.forcast}</h4>
            </CardBlock>
        </Card>
    </CardGroup>
);

class ViewContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboardData : this.props.dashboardData
        }

        this.viewAllContent = this.viewAllContent.bind(this);
        this.viewAllTransactions = this.viewAllTransactions.bind(this);
    }

    componentDidMount() {
        this.props.loadCategories();
        this.props.loadLanguages();
        this.props.loadAllDashboardData();
    }

    viewAllContent = (e) => {
        e.preventDefault();
        this.context.router.push('/content');
    }

    viewAllTransactions = (e) => {
        e.preventDefault();
        this.context.router.push('/analytics');
    }

    render (){
        let contentData = [];
        let transactionData = [];
        let purchaseData = 0;
        let downloadData = 0;
        
        if(this.props.dashboardData.content){
            contentData = this.props.dashboardData.content
        }

        if(this.props.dashboardData.order){
            transactionData = this.props.dashboardData.order
        }        

        if(this.props.dashboardData.purchases){
            this.props.dashboardData.purchases.forEach(function(e, i){
                if (e.purchase > 0){
                    purchaseData = purchaseData + e.purchase;
                }
            });
        }

        if(this.props.dashboardData.downloads){
            this.props.dashboardData.downloads.forEach(function(e, i){
                if (e.download > 0){
                    downloadData = downloadData + e.download;
                }
            });
        }


        return (
            <div className="view-content view-dashboard">
                <SalesCard data={this.props.dashboardData} />

                <Row>
                    {/* blocks */}
                    <div className="col-sm-4">
                        <Card className="mb-4">
                            <CardBlock>
                                <CardTitle className="text-uppercase small font-weight-bold">App Downloads</CardTitle>
                                <CardSubtitle className="text-uppercase small font-weight-bold" style={{opacity: 0.2}}>(This Month)</CardSubtitle>
                                <div className="d-flex align-items-center">
                                    <h3 className="mr-2 font-weight-normal">{downloadData}</h3>
                                    {
                                        /*
                                    <div className="small">
                                        <IconLevelDown size="14"/><span className="badge badge-danger">-28%</span>
                                    </div>
                                        */
                                    }
                                </div>
                            </CardBlock>
                            <div style={{width: '100%', height: '60px'}}>
                                <MonthDownloadChart data={this.props.dashboardData} dataKey="download" stroke="#ef6c00" fill="#ef6c00"/>
                            </div>
                        </Card>
                        <Card className="mb-4">
                            <CardBlock>
                                <CardTitle className="text-uppercase small font-weight-bold">In App Purchases</CardTitle>
                                <CardSubtitle className="text-uppercase small font-weight-bold" style={{opacity: 0.2}}>(This Month)</CardSubtitle>
                                <div className="d-flex align-items-center">
                                    <h3 className="mr-2 font-weight-normal">{purchaseData}</h3>
                                    {
                                        /*
                                    <div className="small">
                                        <IconLevelUp size="14"/><span className="badge badge-success">+8%</span>
                                    </div>
                                        */
                                    }
                                </div>
                            </CardBlock>
                            <div style={{width: '100%', height: '60px'}}>
                                <BlocksChart data={this.props.dashboardData} dataKey="purchase" stroke="#ef6c00" fill="#ef6c00"/>
                            </div>
                        </Card>
                    </div>
                    {/* traffic source */}
                    <div className="mb-4 col-sm-4">
                        <Card>
                            <CardBlock className="table-responsive">
                                <CardTitle className="text-uppercase h6">Latest Transactions</CardTitle>
                                <div className="small mb-4 card-subtitle"><Button color="primary" size="sm" onClick={this.viewAllTransactions}>View all</Button></div>
                                <TransactionTable data={transactionData}/>
                            </CardBlock>
                        </Card>
                    </div>
                    {/* traffic source */}
                    <div className="mb-4 col-sm-4">
                        <Card>
                            <CardBlock className="table-responsive">
                                <CardTitle className="text-uppercase h6">Latest Content</CardTitle>
                                <div className="small mb-4 card-subtitle"><Button color="primary" size="sm" onClick={this.viewAllContent}>View all</Button></div>
                                <ContentTable data={contentData}/>
                            </CardBlock>
                        </Card>
                    </div>
                </Row>

            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.tours.categories,
    languages: state.tours.languages,
    dashboardData : state.dashboard.data
  }
}

ViewContent.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default connect(mapStateToProps, { loadCategories, loadLanguages, loadAllDashboardData  })(ViewContent);
