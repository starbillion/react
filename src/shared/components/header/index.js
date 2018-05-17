import React from 'react';
import screenfull from 'screenfull';
import {
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Button, Progress
} from 'reactstrap';

// icons
import IconNotification from 'react-icons/lib/md/notifications-none';
import IconFullScreen from 'react-icons/lib/md/crop-free';
import IconSearch from 'react-icons/lib/md/search';
import IconFace from 'react-icons/lib/md/face';
import IconMail from 'react-icons/lib/md/mail';
import IconSecurity from 'react-icons/lib/md/security';
import IconHelp from 'react-icons/lib/md/help';
import IconLogout from 'react-icons/lib/md/power-settings-new';
import IconDownload from 'react-icons/lib/md/cloud-download';
import IconCake from 'react-icons/lib/md/cake';
import IconMenu from 'react-icons/lib/md/menu';

import {Link} from 'react-router';

// style
import './style.scss';


export default (props) => (
    <header className="site-head d-flex align-items-center justify-content-between">
        <div className="wrap mr-4">
            <IconMenu size="24" color="#fff" onClick={props.toggleNav} style={{cursor: 'pointer'}}/>
        </div>


{
    /*
        <form className="col-7 col-sm-8 col-md-7 p-0 site-search">
            <IconSearch color="#515151" size="22"/>
            <input type="text" placeholder="Search your tours
            ..." className="form-control"/>
        </form> 
    */
}

        <div className="right-elems ml-auto d-flex">

{
    /*

            <div className="wrap notify hidden-sm-down">
                <UncontrolledDropdown>
                    <DropdownToggle tag="div">
                        <IconNotification size="22" color="#fff"/>
                        <span className="badge badge-danger">1</span>
                    </DropdownToggle>

                    <DropdownMenu right style={{minWidth: '18rem'}}>
                        <DropdownItem header>You have 1 new notification</DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem className="d-flex align-items-center">
                            <IconDownload size="28" className="text-success"/>
                            <div className="ml-3">
                                <div>5 App Downloaded</div>
                                <small className="text-muted">5 min ago</small>
                            </div>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>

    */
}

            <div className="wrap profile">
                <UncontrolledDropdown>
                    <DropdownToggle tag="div">
                        <IconFace size="36" color="#fff"/>
                    </DropdownToggle>
                    <DropdownMenu right style={{minWidth: '12rem'}}>
                        <DropdownItem><Link to="/profile"><IconFace size="16"/> Profile</Link></DropdownItem>
                        <DropdownItem divider/>
                        <div className="text-right ml-3 mr-3 mt-2"><Button block color="info" size="sm" onClick={props.handleLogout}><IconLogout size="15"/>&emsp;Logout</Button></div>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        </div>
    </header>
);
