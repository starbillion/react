import React, {PropTypes} from 'react';
import {
    ButtonGroup, Button, ButtonToolbar, Card, CardBlock, Form, FormGroup, CardTitle, Row, Progress, Nav, NavItem, NavLink
} from 'reactstrap';
import {
    BarChart, Bar, Tooltip
} from 'recharts';

import ScrollArea from 'react-scrollbar';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { loadApps } from '../../../actions/appsActions';
import { loadContents } from '../../../actions/contentActions';

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
            <h1 className="h5 title text-uppercase">Content</h1>
            <p className="mb-0 subtitle">Manage your question and answers that will go to all of your tours.</p>
        </header>
    </div>
);

const ViewContent = ({children}) => (
    <div className="view-content view-components">
        {children}
    </div>
);


class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            perPage : 10,
            pageIndex : 1,
            contents : [],
            allContents : [],
            selectedApp : 0
        }

        this.getContentData = this.getContentData.bind(this);
        this.getScrollData = this.getScrollData.bind(this);
        this.getAllContentData = this.getAllContentData.bind(this);
    }

    componentDidMount() {
        this.props.loadApps();
        this.props.loadContents(this.state.pageIndex , this.state.perPage);
    }

    getContentData(e){
        let appId = e.target.id;
        let contentsData = [];

        this.state.allContents.forEach(function (value, index ) {
            if(appId == value.app_id){
                contentsData.push(value);
            }
        });

        this.setState({contents : contentsData, selectedApp : appId})

    }

    getAllContentData(e){
        
        let appId = e.target.id;
        this.setState({contents : this.state.allContents, selectedApp : appId})

    }

     getScrollData(e){
         
         let calledOnce = false;
         if((e.realHeight - e.containerHeight) == e.topPosition){
            if(!calledOnce && this.state.contents.length >= ( this.state.pageIndex * this.state.perPage) ){
                this.props.loadContents(this.state.pageIndex + 1 , this.state.perPage);
                this.setState({pageIndex : this.state.pageIndex + 1});
                calledOnce = true;
            }
         }
     }

    componentWillReceiveProps(nextProps) {

        let contentsData = this.state.contents;
        let contentData = nextProps.contents;

        contentData.forEach(function (value, index ) {

            contentsData.push(value);
        
        });

        if(contentData.length != 0){
            this.setState({contents : contentsData, allContents : contentsData});
        }
    }

    render() {
        const apps = this.props.apps;
        const contents = this.state.contents;
        const _this = this;
        return (
            <div className="view">
                <ViewHeader/>
                <ViewContent>
                    {/* widget set - 1 */}
                    <Row className="white p-3">
                        <div className="col-2 mb-5"> 
                            <Nav pills className="flex-column">
                            <NavItem>
                                <NavLink href="#"  id="0" active={_this.state.selectedApp =="0"} onClick={_this.getAllContentData}>All Apps</NavLink>
                            </NavItem>
                            {apps.map(function(item, index) {
                                return <NavItem key={index}>
                                    <NavLink href="#" id={item.id}  active={_this.state.selectedApp == item.id} onClick={_this.getContentData}>{item.title}</NavLink>
                                </NavItem>
                            })}
                            </Nav>        
                        </div>
                        <div className="col-10 mb-5">
                            <ScrollArea horizontal={false} verticalScrollbarStyle={{width: '10px'}}style ={{height:'500px'}} onScroll={this.getScrollData} className="container-posts">
                                {contents.map(function(item, index) {
                                    return <div key={index}>
                                        <div className="row">
                                            <div className="col-12">
<div className="post-box text">
    <div className="box-header">
        <h3><a href=""><img src={item.user.profile_picture} alt="Card image cap" className="profile-picture" /> {item.user.first_name} {item.user.last_name}</a>
            <p>{item.created_at}</p>
        </h3>
    </div>
    <div className="box-content">
        <div className="content">
            <p>{item.description}</p>
        </div>
    </div>
    <div className="box-likes">
        <div className="row">
            <span>145 comments</span>
        </div>
    </div>
    <div className="box-buttons">
        <div className="row">
            <button className="btn-success btn"><span className="fa fa-angle-up"></span> Upvote</button>
            <button className="btn-danger btn"><span className="fa fa-angle-down"></span> Downvote</button>
        </div>
    </div>
  
    <div className="box-new-comment">
        <img src="https://goo.gl/oOD0V2" alt="" />

        <div className="content">
            <div className="row">
              <textarea placeholder="write a comment..."></textarea>
            </div>
            <div className="row">
              <span className="ion-android-attach"></span>
              <span className="fa fa-smile-o"></span>
            </div>
        </div>
    </div>
</div> 

                                            </div>
                                        </div>
                                    </div>
                                })}
                            </ScrollArea>
                            {/*<div className="row p-t-lg">
                                <div className="col-12 mb-5 p-5">
                                    <div className="row">
                                        <a href="#" className="thumbnail col-1 tablet-hide p-2">
                                            <img src="https://decorator.io/modulr/webroot/media/nouser.png" />
                                        </a>
                                        <div className="col-11 p-a">
                                            <p className="lh-12 p-t-lg">
                                            <a href="#" className="text-teal text-strong hover-text-underline">Some Dude</a>
                                            </p>
                                            <p className="lh-12"><span>2 min ago</span></p>
                                        </div>
                                    </div>
                                    <div className="row p-2">
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                        </p>
                                    </div>
                                    <div className="row p-2 mt-2">
                                        <a href="#" className="btn btn-default text-success">
                                            <i className="fa fa-lg fa-angle-up"></i> 255
                                        </a>
                                        <a href="#" className="btn btn-default text-danger">
                                            <i className="fa fa-lg fa-angle-down"></i> 13
                                        </a>
                                        <div className="pull-right">
                                            <a href="#" className="btn fill-transparent hover-fill-disable text-gray hover-text-teal">
                                                <i className="fa fa-exclamation-triangle"></i> Report
                                            </a>
                                            <a href="#" className="btn fill-transparent hover-fill-disable text-gray hover-text-teal -padding-right">
                                                <i className="fa fa-reply"></i> Reply
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row d-flex mb-2">
                                    <div className="col-2 after"></div>
                                    <div className="col-10 my-2 p-2 pb-5">
                                        <div className="row">
                                            <a href="#" className="thumbnail col-1 tablet-hide p-2">
                                                <img src="https://decorator.io/modulr/webroot/media/nouser.png" />
                                            </a>
                                            <div className="col-11 p-2">
                                                <p className="lh-12">
                                                    <a href="#" className="text-teal text-strong hover-text-underline">Some Dude</a>
                                                </p>
                                                <p className="lh-12"><span>2 min ago</span></p>
                                            </div>
                                        </div>
                                        <div className="row p-2">
                                            <p>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                            </p>
                                        </div>
                                        <div className="row p-2">
                                            <a href="#" className="btn btn-default text-success">
                                                <i className="fa fa-lg fa-angle-up"></i> 255
                                            </a>
                                            <a href="#" className="btn btn-default text-danger">
                                                <i className="fa fa-lg fa-angle-down"></i> 13
                                            </a>
                                            <div className="pull-right">
                                                <a href="#" className="btn fill-transparent hover-fill-disable text-gray hover-text-teal">
                                                    <i className="fa fa-exclamation-triangle"></i> Report
                                                </a>
                                                <a href="#" className="btn fill-transparent hover-fill-disable text-gray hover-text-teal -padding-right">
                                                    <i className="fa fa-reply"></i> Reply
                                                </a>
                                            </div>
                                        </div>
                                        <div className="row d-flex mb-5">
                                            <div className="col-2 after"></div>
                                            <div className="col-10 mb-5 p-5">
                                                <div className="row">
                                                    <a href="#" className="thumbnail tablet-hide col-1 p-2">
                                                        <img src="https://decorator.io/modulr/webroot/media/nouser.png" />
                                                    </a>
                                                    <div className="col-11 p-2">
                                                        <p className="lh-12">
                                                          <a href="#" className="text-teal text-strong hover-text-underline">Some Dude</a>
                                                        </p>
                                                        <p className="lh-12"><span>2 min ago</span></p>
                                                    </div>
                                                </div>
                                                <div className="row p-2">
                                                  <p>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                                  </p>
                                                </div>
                                                <div className="row p-2">
                                                    <a href="#" className="btn btn-default text-success">
                                                        <i className="fa fa-lg fa-angle-up"></i> 255
                                                    </a>
                                                    <a href="#" className="btn btn-default text-danger">
                                                        <i className="fa fa-lg fa-angle-down"></i> 13
                                                    </a>
                                                    <div className="pull-right">
                                                        <a href="#" className="btn fill-transparent hover-fill-disable text-gray hover-text-teal">
                                                            <i className="fa fa-exclamation-triangle"></i> Report
                                                        </a>
                                                        <a href="#" className="btn fill-transparent hover-fill-disable text-gray hover-text-teal -padding-right">
                                                            <i className="fa fa-reply"></i> Reply
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 mb-2 p-2">
                                            <div className="row">
                                                <a href="#" className="thumbnail col-1 tablet-hide p-2">
                                                  <img src="https://decorator.io/modulr/webroot/media/nouser.png" />
                                                </a>
                                                <div className="col-11 p-a">
                                                      <p className="lh-12 p-t-lg">
                                                        <a href="#" className="text-teal text-strong hover-text-underline">Some Dude</a>
                                                      </p>
                                                      <p className="lh-12"><span>2 min ago</span></p>
                                                </div>
                                            </div>
                                            <div className="row p-2">
                                            <p>
                                                 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                                </p>
                                            </div>
                                            <div className="row p-2 mt-5">
                                                <a href="#" className="btn hover-fill-disable fill-transparent text-teal -padding-left">
                                                    <i className="fa fa-lg fa-angle-up"></i> 255
                                                </a>
                                                <a href="#" className="btn  hover-fill-disable fill-transparent text-red">
                                                      <i className="fa fa-lg fa-angle-down"></i> 13
                                                </a>
                                                <div className="pull-right">
                                                      <a href="#" className="btn fill-transparent hover-fill-disable text-gray hover-text-teal">
                                                        <i className="fa fa-exclamation-triangle"></i> Report
                                                      </a>
                                                      <a href="#" className="btn fill-transparent hover-fill-disable text-gray hover-text-teal -padding-right">
                                                        <i className="fa fa-reply"></i> Reply
                                                      </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>*/}
                        </div>
                    </Row>
                </ViewContent>
            </div>
        )
    }
}

Content.propTypes = {
  apps: PropTypes.array,
  contents: PropTypes.array
};

function mapStateToProps(state, ownProps) {
  return {
    apps: state.apps.apps,
    contents: state.contents.contents
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadApps , loadContents}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Content);
