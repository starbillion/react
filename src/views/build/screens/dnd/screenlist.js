import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './container';
 
class ScreenList extends Component {

	render() {
		var listOne = [], listTwo = [];	

		for(var i = 0; i < this.props.screens.length; i++){
			var item = {"id" : i + 1, "text" : this.props.screens[i]};
			listOne[i] = item;
		}

		for(var i = 0; i < this.props.appScreens.length; i++){
			var item = {"id" : i + this.props.screens.length + 1, "text" : this.props.appScreens[i]};
			listTwo[i] = item;
		}

		// const listOne = [
		// 	{ id: 1, text: "Item 1" },
		// 	{ id: 2, text: "Item 2" },
		// 	{ id: 3, text: "Item 3" }
		// ];
 
		// const listTwo = [
		// 	{ id: 4, text: "Item 4" },
		// 	{ id: 5, text: "Item 5" },
		// 	{ id: 6, text: "Item 6" }
		// ];

		const style = {
			display: "flex",
			justifyContent: "space-around",
			paddingTop: "20px",
			width: "100%"
		}

		// alert('a' + JSON.stringify(listOne));
		// alert('b' + JSON.stringify(listTwo));
 
		return (
			<div style={{...style}}>
				<div className="col-sm-2 col-md-3">
	                <Container id={1} list={listOne} />
	            </div>    
	            <div className="col-sm-2 col-md-9">
	                <div className="d-flex justify-content-between wid-100p" style={{minHeight: 200}}>    
	                    <div className="footer">
	                        {   
	                            /*
	                            <div className={(this.state.rSelected === 2) ? 'active-tab home-tab tab' : 'home-tab tab'} onClick={() => this.onRadioBtnClick(2)}>
	                                <IconHome size="32" color="#868686" onClick={() => this.onRadioBtnClick(2)}/>
	                            </div>
	                            <div className={(this.state.rSelected === 3) ? 'active-tab map-tab tab' : 'map-tab tab'} onClick={() => this.onRadioBtnClick(3)}>
	                                <IconMap size="32" color="#868686" onClick={() => this.onRadioBtnClick(3)}/>
	                            </div>
	                            <div className={(this.state.rSelected === 4) ? 'active-tab tour-tab tab' : 'tour-tab tab'} onClick={() => this.onRadioBtnClick(4)}>
	                                <IconWalk size="32" color="#868686" onClick={() => this.onRadioBtnClick(4)}/>
	                            </div>
	                            <div className={(this.state.rSelected === 5) ? 'active-tab content-tab tab' : 'content-tab tab'} onClick={() => this.onRadioBtnClick(5)}>
	                                <IconMessage size="32" color="#868686" onClick={() => this.onRadioBtnClick(5)}/>
	                            </div>
	                            <div className={(this.state.rSelected === 1) ? 'active-tab menu-tab tab' : 'menu-tab tab'} onClick={() => this.onRadioBtnClick(1)}>
	                                <IconMenu size="32" color="#868686" />
	                            </div>
	                            */
	                        }
	                        <div className="footer-div">
	                        	<Container id={2} list={listTwo} />
	                        </div>
	                    </div>
	                </div>
	            </div>
			</div>
		);
	}

}
 
export default DragDropContext(HTML5Backend)(ScreenList);
