import React, { Component } from 'react';
import './ReportInfoPage.css';
import RowImage from '../../images/arrow_left.png';

class ReportPageInfo extends Component {

    render() {
		return (
            <div>
                <div className="light-BG"></div>
                <div className="open-profile-container">
                    <div className="news-content">
                        <div className="red-block"></div>
                        <div className="back-button" onClick={this.props.close}>
                            <img src={RowImage} alt=""></img>
                        </div>
                        <h1>{this.props.title}</h1>
                        <p>{this.props.text}</p>

                    </div>
                </div>
            </div>
		);
  	}
}
export default ReportPageInfo
