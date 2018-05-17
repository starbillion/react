import React, { Component } from 'react';
import screenfull from 'screenfull';
import {Link} from 'react-router';
import {
    Button, ButtonGroup,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Progress, Modal, Card, CardBlock, CardTitle, Row, ModalHeader, ModalBody,
    InputGroup, InputGroupAddon, Input
} from 'reactstrap';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {bindActionCreators} from 'redux';

import IconNotification from 'react-icons/lib/md/notifications-none';
import IconFullScreen from 'react-icons/lib/md/crop-free';
import IconFace from 'react-icons/lib/md/face';
import IconMail from 'react-icons/lib/md/mail';
import IconSecurity from 'react-icons/lib/md/security';
import IconHelp from 'react-icons/lib/md/help';
import IconLogout from 'react-icons/lib/md/power-settings-new';
import IconDownload from 'react-icons/lib/md/cloud-download';
import IconCake from 'react-icons/lib/md/cake';
import IconSent from 'react-icons/lib/fa/paper-plane-o';
import IconDraft from 'react-icons/lib/fa/pencil';
import IconChat from 'react-icons/lib/fa/comments-o';
import IconTrash from 'react-icons/lib/fa/trash-o';
import IconLabel from 'react-icons/lib/md/lens';
import IconBack from 'react-icons/lib/md/arrow-back';
import IconForward from 'react-icons/lib/md/arrow-forward';
import IconMenu from 'react-icons/lib/md/menu';

import IconInfo from 'react-icons/lib/md/info';
import IconMessage from 'react-icons/lib/md/message';
import IconAudio from 'react-icons/lib/md/headset';
import IconHome from 'react-icons/lib/md/home';
import IconLocation from 'react-icons/lib/md/location-city';
import IconEvent from 'react-icons/lib/md/event';
import IconPicture from 'react-icons/lib/md/photo';
import IconMap from 'react-icons/lib/md/map';
import IconEye from 'react-icons/lib/md/remove-red-eye';
import IconNewEvent from 'react-icons/lib/md/event-available';
import IconPictures from 'react-icons/lib/md/photo-library';
import IconShare from 'react-icons/lib/md/share';
import IconQuestion from 'react-icons/lib/fa/question-circle';
import IconEdit from 'react-icons/lib/fa/pencil-square';
import IconPlay from 'react-icons/lib/fa/play-circle-o';


import { connect } from 'react-redux';
import { loadTour, loadToursStops } from '../../../../actions/tourActions';
import { logout } from '../../../../actions/authActions';
import './style.scss';

class BuildStopDetails extends Component {
    constructor(props) {
        super(props);

    }

    onRadioBtnClick(rSelected) {
        //this.setState({ rSelected });
        this.setState({
            rSelected: rSelected
        })
    }

    render() {
        return (
            <div className="stop-details"></div>
        )
    }
};


function mapStateToProps(state, ownProps) {
  return {
    tourMapsData: state.tours.mapsData,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadTour, logout, loadToursStops }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(BuildStopDetails);

BuildStopDetails.contextTypes = {
  router: React.PropTypes.object.isRequired
}

BuildStopDetails.propTypes = {
  loadTour: React.PropTypes.func.isRequired,
  loadToursStops: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired
}

