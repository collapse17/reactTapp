import React, { Component } from 'react';
import './Schools.css';
import RowImage from '../../images/arrow_left.png';
import StudentImage from '../../images/student_photo.png';
import PhoneImage from '../../images/phone.png';
import ArrowImage from '../../images/arrow.png';
import NotImage from '../../images/not_white.png';
import NotImageRed from '../../images/not.png';

class Schools extends Component {

    saveId(id){
        console.log(id);

    }

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
                        <div className="popup-section submit common-button" onClick={() => this.props.saveId("", "")}>
                            Очистить
                            <div className="right-button" style={{background:"#fff"}}><img src={NotImageRed}></img></div>
                        </div>
                        {this.props.schools.map((item, index) =>
                            <div className="school-card" key={index} onClick={() => this.props.saveId(item["id"], item["name"])} >
                                <div className="school-openstatus"></div>
                                <span className="school-card-title">{item["name"]}</span>
                                <span className="school-card-subtitle">{item["location"]}</span>
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
