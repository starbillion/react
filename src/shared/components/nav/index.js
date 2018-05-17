import React from 'react';
import {Link, IndexLink} from 'react-router';
import {Collapse} from 'reactstrap';

// icons
import IconDashboard from 'react-icons/lib/md/dashboard';
import IconWidgets from 'react-icons/lib/md/extension';
import IconChart from 'react-icons/lib/md/insert-chart';
import IconMoney from 'react-icons/lib/md/attach-money';
import IconPages from 'react-icons/lib/md/filter-none';
import IconTable from 'react-icons/lib/md/grid-on';
import IconForm from 'react-icons/lib/md/layers';
import IconDown from 'react-icons/lib/md/chevron-right';
import IconTravel from 'react-icons/lib/md/card-travel';
import IconPayment from 'react-icons/lib/md/payment';
import IconQuestion from 'react-icons/lib/md/live-help';
import IconChat from 'react-icons/lib/md/group';
import IconMessage from 'react-icons/lib/md/question-answer';
import ScrollArea from 'react-scrollbar';

import './style.css';


const NavHead = (props) => (
    <header className="nav-head">
        <Link to="/">
            <img src="/images/logo.png" />
        </Link>
        <div className={`toggle-dot ${props.mini ? 'active': ''}`} onClick={props.toggleNav}></div>
    </header>
);

class NavList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        }
    }
    handleClick = (index, e) => {
        let c = e.currentTarget.className;
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            selected: (c.indexOf('selected') >= 0) ? '' : index
        })
    }
    handleOpen = (index, e) => {
        e.stopPropagation();
        this.setState({
            selected: index
        })
    }


    render() {
        return <ScrollArea className="nav-list-container" horizontal={false} verticalScrollbarStyle={{width: '4px', marginLeft: '10px'}}>
            <ul className="list-unstyled nav-list clearfix">
                <li onClick={this.handleClick.bind(this, 0)} className={(this.state.selected === 0) ? 'selected': ''}>
                    <IndexLink to="/" activeClassName="active">
                        <IconDashboard size="18" className="icon-dashboard"/>
                        <span className="name">Dashboard</span>
                    </IndexLink>
                </li>
                <li><div className="nav-list-title">Build</div></li>
                <li onClick={this.handleClick.bind(this, 1)} className={(this.state.selected === 1) ? 'selected': ''}>
                    <Link to="/apps" activeClassName="active">
                        <IconTravel size="18" />
                        <span className="name">Apps</span>
                    </Link>
                </li>
                <li><div className="nav-list-title">Interaction</div></li>
                
                <li onClick={this.handleClick.bind(this, 2)} className={(this.state.selected === 2) ? 'selected': ''}>
                    <Link to="/discuss" activeClassName="active">
                        <IconChat size="18"/>
                        <span className="name">Discuss</span>
                    </Link>
                </li>
                
                <li onClick={this.handleClick.bind(this, 3)} className={(this.state.selected === 3) ? 'selected': ''}>
                    <Link to="/qanda" activeClassName="active">
                        <IconQuestion size="18"/>
                        <span className="name">Q&amp;A</span>
                    </Link>
                </li>
                
                <li onClick={this.handleClick.bind(this, 4)} className={(this.state.selected === 4) ? 'selected': ''}>
                    <Link to="/messages" activeClassName="active">
                        <IconMessage size="18"/>
                        <span className="name">Messages</span>
                    </Link>
                </li>
                
                <li><div className="nav-list-title">Account</div></li>
                <li onClick={this.handleClick.bind(this, 5)} className={(this.state.selected === 5) ? 'selected': ''}>
                    <Link to="/analytics" activeClassName="active">
                        <IconChart size="18"/>
                        <span className="name">Analytics</span>
                    </Link>
                </li>
                <li onClick={this.handleClick.bind(this, 6)} className={(this.state.selected === 6) ? 'selected': ''}>
                    <Link to="/billing" activeClassName="active">
                        <IconPayment     size="18"/>
                        <span className="name">Billing</span>
                    </Link>
                </li>
                {}
            </ul>
            {/* end scroll-area */}
        </ScrollArea>
    }
}

export default (props) => (
    <nav className={`site-nav ${props.mini ? 'mini' : ''}`} role="navigation">
        <NavHead {...props}/>
        <NavList/>

    </nav>
);
