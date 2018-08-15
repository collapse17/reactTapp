import React, { Component } from 'react';
import './Schools.css';
import RowImage from '../../images/arrow_left.png';
import StudentImage from '../../images/student_photo.png';
import PhoneImage from '../../images/phone.png';

class Schools extends Component {

    render() {
		return (
            <div>
                <div className="light-BG"></div>
                <div className="popup-container">
                    <div className="popup-content">
                        <div className="red-block"></div>
                        <div className="popup-back-button" onClick={this.props.close}>
                            <img src={RowImage} alt=""></img>
                        </div>
                        <h1>Список школ</h1>

                        {this.props.schools.map((item, index) =>
                            <div className="school-card" key={index}>
                                <div className="school-openstatus"></div>
                                <span className="school-card-title">{item["name"]}</span>
                                <span className="school-card-subtitle">{item["location"]}</span>

                                <a style={{display:'inline-block'}} href={"tel:" + item['phone']}>
                                    <div className="school-card-phone"><img src={PhoneImage}></img></div>
                                </a>
                            </div>
                        )}

                        <img className="popup-image" src={this.props.image} alt=""></img>
                    </div>
                </div>
            </div>
		);
  	}
}
export default Schools
