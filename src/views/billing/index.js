import React, {PropTypes} from 'react';
import {
    Button, Card, CardBlock, CardTitle, Row, Progress,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import {
    BarChart, Bar, Tooltip
} from 'recharts';
import BillingForm from './billingForm/billingForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { loadBilling, getBllingDetails } from '../../actions/billingActions';
import moment from 'moment';
import {browserHistory} from 'react-router';



import './style.css';

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
            <h1 className="h5 title text-uppercase">Billing</h1>
            <p className="mb-0 subtitle">One of our main goals to create additional revenue for you. Here is where you can see the result of our mission.</p>
        </header>
    </div>
);

class BasicTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        }
        this.getInvoiceData = this.getInvoiceData.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({data : nextProps.data});
    }

    getInvoiceData = (e) => {
        let invoiceId = e.target.parentElement.id;
        this.props.getInvoiceData(invoiceId);
        browserHistory.push('/billing/invoice/' + invoiceId);

    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Month</th>
                        <th>Earnings</th>
                        <th>Billed Amount</th>
                        <th>Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map((item, i) => <tr key={i} id={item.id} onClick={this.getInvoiceData.bind(item.id)}>
                        <th scope="row">{i+1}</th>
                        <td>{moment(item.month).format('MMM YYYY')}</td>
                        <td>${item.monthly_earnings}</td>
                        <td>${item.billed_amount}</td>
                        <td>{item.sales}</td>
                    </tr>)}
                </tbody>
            </table>
)}};

const ViewContent = ({children}) => (
    <div className="view-content view-components billing-account">
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
                    <ModalHeader toggle={this.toggle}>Create a Tour</ModalHeader>
                    <ModalBody>
                        <BillingForm/>
                    </ModalBody> 
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle} className="btn-block">Create Tour</Button>{' '}
                    </ModalFooter>
                </Modal>
                <Button color="primary" className="billing-update" onClick={(e) => this.toggle(e, 'modalFadeInScale')}>Update Billing</Button>
            </div>
        )
    }
}

class Billing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            billingData : []
        }
        this.getInvoiceData =this.getInvoiceData.bind(this);

    }

    componentDidMount() {
        this.props.loadBilling();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({billingData : nextProps.billing});
    }

    getInvoiceData = (invoiceId) => {
        this.props.getBllingDetails(invoiceId);
    }

   render() {
    return(
        <div className="view">
            <ViewHeader/>
            <ViewContent>
                {/* widget set - 1 */}
                <Card className="mb-4">
                    <CardBlock className="table-responsive">
                        <h6 className="mb-4 text-uppercase">Billing</h6>
                        <ModalExample/>
                        <BasicTable getInvoiceData={this.getInvoiceData} data={this.state.billingData}/>
                    </CardBlock>
                </Card>
            </ViewContent>
        </div>
)}};


function mapStateToProps(state, ownProps) {
  return {
    billing: state.billing.data,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadBilling, getBllingDetails }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Billing);
