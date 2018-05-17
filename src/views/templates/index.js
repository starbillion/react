import React from 'react';
import {
    Card, CardBlock, CardTitle, Row, Progress
} from 'reactstrap';
import {
    BarChart, Bar, Tooltip
} from 'recharts';


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
            <h1 className="h5 title text-uppercase">Templates</h1>
            <p className="mb-0 subtitle">Create templates to quick start building tours.</p>
        </header>
    </div>
);

const ViewContent = ({children}) => (
    <div className="view-content view-components">
        {children}
    </div>
);

const blocksData = [
    {'uv': 2034, 'sales': 623, 'br': 56, 'ns': 2343},
    {'uv': 2734, 'sales': 1223, 'br': 43, 'ns': 3200},
    {'uv': 2522, 'sales': 723, 'br': 64, 'ns': 3063},
    {'uv': 2944, 'sales': 1043, 'br': 44, 'ns': 3666},
    {'uv': 1822, 'sales': 433, 'br': 74, 'ns': 1909}
];

const BlocksChart = ({dataKey, stroke, fill}) => (
    <BarChart data={blocksData} margin={{top: 0, bottom: 0, right: 0, left: 0}} width={80} height={50} className="mb-3">
        <Tooltip
            labelStyle={{display: 'none'}}
            itemStyle={{fontSize: 10, color: '#fff'}}
            wrapperStyle={{padding: '0 4px', background: 'rgba(40,70,80, .94)', border: 'none'}}/>
        <Bar type='monotone' barSize={6} dataKey={dataKey} stroke={stroke} fill={fill} strokeWidth={1}  fillOpacity=".8"/>
    </BarChart>
);

export default () => (
    <div className="view">
        <ViewHeader/>
        <ViewContent>
            {/* widget set - 1 */}
            <Row className="mb-4">
            </Row>
        </ViewContent>
    </div>
);
