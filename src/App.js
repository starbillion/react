import React from 'react';
import Nav from './shared/components/nav';
import SiteHead from './shared/components/header';
import { logout } from './actions/authActions';
import { connect } from 'react-redux';
import './app.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {navMini: false};

        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleNav = (e) => {
        e.preventDefault();
        this.setState({navMini: !this.state.navMini});
    }
    
    hideNav = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({navMini: false})
    }

    handleLogout = (e) => {
        e.preventDefault();
        this.props.logout();
        this.context.router.push('/pages/signin');
    }

    render() {
        let navMini = this.state.navMini;
        return (
            <div className="app-wrapper">
                <Nav mini={navMini} toggleNav={this.toggleNav}/>
                <div className={`content-container ${navMini ? 'full' : ''}`}>
                    {/* dropshadow for mobile nav triggering */}
                    <div className="menu-dropshadow" style={{display: (navMini ? 'block': 'none')}} onClick={this.hideNav}></div>
                    <SiteHead toggleNav={this.toggleNav} handleLogout={this.handleLogout}/>
                    {this.props.children}
                </div>
            </div>
        )
    }
}


App.propTypes = {
  logout: React.PropTypes.func.isRequired
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { logout })(App);
