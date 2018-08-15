import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
import './SearchResult.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import TickImage from '../../images/tick_bold.png';
import NotImage from '../../images/not_white.png';
import ArrowImage from '../../images/enter.png';
import RowImage from '../../images/arrow_left.png';


class SearchResult extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lessons:[],
		};

	}


	render() {
		return(
			<div className='helper'>
				<div className="popup-back-button helper-back" onClick={this.props.close}>
					<img src={RowImage} alt=""></img>
				</div>
				{this.props.lessons.map((item, index) =>
					<div className="result-item" key={index} onClick={() => this.props.selectLesson(item["id"])}>
						<span className="subtitle">{item["classroom_name"]}</span>
						<span className="title">{item["teacher_name"]}</span>
						<span className="time">{item["start_time"]} - {item["end_time"]}</span>
						<span className="lvl">{item["level"]} lvl</span>
					</div>
				)}

			</div>
		);
  	}
}

export default SearchResult;
