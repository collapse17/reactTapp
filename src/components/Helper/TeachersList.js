import React, { Component } from 'react';
import './TeachersList.css';
import RowImage from '../../images/arrow_left.png';
import StudentImage from '../../images/student_photo.png';
import PhoneImage from '../../images/phone_mini.png';
import MailImage from '../../images/mail.png';
import TickImage from '../../images/yes.png';
import profileImage from '../../images/profile.png';
import NotImage from '../../images/not_white.png';
import NotImageRed from '../../images/not.png';
import axios from 'axios';

class TeachersList extends Component {

    constructor(props) {
		super(props);
		this.state = {
			teachers: this.props.teachers,
		};

        this.searchChange = this.searchChange.bind(this);
	}

    searchChange(event){
        var query = event.target.value.toLowerCase();
        if (query.length === 0){
            this.setState({
                teachers:this.props.teachers,
            });
        } else {
            var array = [];
            for (var i=0;i<this.props.teachers.length;i++){
                var item = this.props.teachers[i];
                if (item["english_name"]!==null){
                    var name = item["english_name"].toLowerCase();
                    if (name.indexOf(query) !== -1){
                        array.push(item);
                    }
                }
            }
            this.setState({
                teachers:array,
            });
        }
    }
    searchClick(event){
        if (event.target.value === "Поиск"){
            event.target.value="";
        }
    }

    render() {
		return (
            <div>
                <div className="light-BG"></div>
                <div className="popup-container">
                    <div className="popup-content subtitle">
                        <div className="red-block"></div>
                        <div className="popup-back-button" onClick={this.props.close}>
                            <img src={RowImage} alt=""></img>
                        </div>
                        <h1>Выбор учителя</h1>
                        <h3>{this.props.groupname}</h3>

                        <div className="popup-section common-button">
                            <input type="text" style={{width:"100%"}} defaultValue="Поиск" onChange={this.searchChange} onClick={this.searchClick} />
                        </div>

                        <div className="popup-section submit common-button" onClick={() => this.props.saveId("", "")}>
                            Очистить
                            <div className="right-button" style={{background:"#fff"}}><img src={NotImageRed}></img></div>
                        </div>



                        {this.state.teachers.map((teacher, index) =>
                            <div className="student-card" key={index} onClick={() => this.props.saveId(teacher["id"], teacher["english_name"])}>
                                <img className="card-avatar" src={profileImage} alt=""></img>
                                <span className="teacher-card-title">{teacher["english_name"]}</span>
                                <div className="teacher-card-tick active">
                                    <img src={TickImage}></img>
                                </div>
                            </div>
                        )}


                    </div>
                </div>
            </div>
		);
  	}
}
export default TeachersList
