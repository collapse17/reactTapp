import React, { Component } from 'react';
import './Events.css';
import RowImage from '../../images/arrow_left.png';
import StudentImage from '../../images/student_photo.png';
import PhoneImage from '../../images/phone.png';

class Schools extends Component {

    getCard(){
        return(
        <div className="event-card">
            <span className="event-card-title">ОЧЕНЬ ДЛИННОЕ НАЗВАНИЕ СОБЫТИЯ В ЖИЗНИ ШКОЛЫ</span>
            <span className="event-card-subtitle">ГДЕ: ДЗЕРЖИНСКОГО 24А (ТЦ АЛЬЯНС)</span>
            <span className="event-card-subtitle">КОГДА: 22.12.2017</span>
        </div>
        );
    }
    getEventDate(month, year){
        // temp version
        return(
        <div className="event-date">
            Предстоящие мероприятия
        </div>
        );
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
                        <h1>Мероприятия школы</h1>

                        {this.getEventDate("Декабрь", "2018")}
                        {this.props.events.map((item, index) =>
                            <div className="event-card" key={index}>
                                <span className="event-card-title">{item["name"]}</span>
                                <span className="event-card-subtitle">ГДЕ: {item["location"]}</span>
                                <span className="event-card-subtitle">КОГДА: {item["date"]}</span>
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
