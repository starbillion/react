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
            <h1 className="h5 title text-uppercase">Profit</h1>
            <p className="mb-0 subtitle">One of our main goals to create additional revenue for you. Here is where you can see the result of our mission.</p>
        </header>
    </div>
);

const ViewContent = ({children}) => (
    <div className="view-content view-components">
        {children}
    </div>
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
