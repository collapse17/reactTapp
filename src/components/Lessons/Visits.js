import React, { Component } from 'react';
import './Visits.css';
import RowImage from '../../images/arrow_left.png';
import StudentImage from '../../images/student_photo.png';
import PhoneImage from '../../images/phone_mini.png';
import MailImage from '../../images/mail.png';
import TickImage from '../../images/yes_red.png';
import NotImage from '../../images/not_white.png';
import ArrowImage from '../../images/enter.png';
import axios from 'axios';


class Visits extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.students);

        var students = this.props.students;
        for (var i=0;i<students.length;i++) {
            if (students[i]["state"] === null) {
                students[i]["state"] = true;
            }
        }

        this.state = {
            students:students,
        };

        this.setStudentStatus = this.setStudentStatus.bind(this);
        this.sendUsersState = this.sendUsersState.bind(this);
    }

    setStudentStatus(id){
        var students = this.state.students;

        for (var i=0;i<students.length;i++) {
            if (students[i]["id"] == id){
                if (students[i]["state"]==false){
                    students[i]["state"] = true;
                } else {
                    students[i]["state"] = false;
                }
            }
        }

        this.setState({
            students: students,
        });
    }

    sendUsersState(){
        var students = this.state.students;
        var data = [];

        for (var i=0; i<students.length; i++) {
            var item = { id: students[i]["id"],
                        state: students[i]["state"]
            };
            data.push(item);
        }

        console.log(data);

        axios.patch(`http://a.e-a-s-y.ru/api/lessons/` + this.props.id + `/update_attendances`, {"attendances":data}, {withCredentials:true})
        .then(res => {
            var data = res.data;
            console.log(data);
            alert("Данные сохранены.");
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
                        <h1>Посещения</h1>
                        <h3>{this.props.groupname}</h3>

                        <div className="popup-section submit visits" onClick={() => this.sendUsersState()}>
                            Сохранить
                            <div className="right-button"><img src={ArrowImage}></img></div>
                        </div>

                        {this.state.students.map((student, index) =>
                            <div key={index} className="student-card">
                                <img className="card-avatar"  src={"http://a.e-a-s-y.ru" + student["photo"]} alt=""></img>
                                <span className="visits-card-title">{student["student_name"]}</span>
                                <span className="teacher-card-subtitle"></span>
                                <div className="teachers-buttons">
                                    <a href={"tel:" + student['phone']}><img src={PhoneImage}></img></a>
                                </div>
                                {student["state"] &&
                                    <div className="teacher-card-tick" onClick={() => this.setStudentStatus(student["id"])}><img src={TickImage}></img></div>
                                }
                                {!student["state"] &&
                                    <div className="teacher-card-tick active" onClick={() => this.setStudentStatus(student["id"])}><img src={NotImage}></img></div>
                                }
                            </div>
                        )}

                    </div>
                </div>
            </div>
		);
  	}
}
export default Visits
