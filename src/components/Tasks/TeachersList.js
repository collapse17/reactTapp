import React, { Component } from 'react';
import './TeachersList.css';
import RowImage from '../../images/arrow_left.png';
import StudentImage from '../../images/student_photo.png';
import PhoneImage from '../../images/phone_mini.png';
import MailImage from '../../images/mail.png';
import TickImage from '../../images/yes.png';
import profileImage from '../../images/profile.png';
import axios from 'axios';

class TeachersList extends Component {

    setTeacher(id){

        axios.patch(`http://a.e-a-s-y.ru/api/lessons/` + this.props.id + `/set_sub_teacher`, {"sub_teacher_id":id, "teachers_sickness": true}, {withCredentials:true})
        .then(res => {
            var data = res.data;
            console.log(data);
            alert("Учитель выбран.");
            this.props.close();
        })
        .catch(function (error) {
            console.log(error);
        });
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
                        <h1>Выбор заменяющего</h1>
                        <h3>{this.props.groupname}</h3>
                        {this.props.teachers.map((teacher, index) =>
                            <div className="student-card">
                                <img className="card-avatar" src={profileImage} alt=""></img>
                                <span className="teacher-card-title">{teacher["english_name"]}</span>
                                <div className="teacher-card-tick active" onClick={() => this.setTeacher(teacher["id"])}>
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
