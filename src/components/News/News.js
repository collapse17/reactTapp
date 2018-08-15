import React, { Component } from 'react';
import './News.css';
import RowImage from '../../images/arrow_left.png';

class News extends Component {

    render() {
		return (
            <div>
                <div className="light-BG"></div>
                <div className="open-news-container">
                    <div className="news-content">
                        <div className="red-block"></div>
                        <div className="back-button" onClick={this.props.closeNews}>
                            <img src={RowImage} alt=""></img>
                        </div>
                        <h2>{this.props.date}</h2>
                        <h1>{this.props.title}</h1>
                        <p>{this.props.text}</p>
                        <img className="news-image" src={this.props.image} alt=""></img>
                    </div>
                </div>
            </div>
		);
  	}
}
export default News
