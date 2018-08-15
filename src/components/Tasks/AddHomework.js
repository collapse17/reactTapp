import React, { Component } from 'react';
import './AddHomework.css';
import RowImage from '../../images/arrow_left.png';
import StudentImage from '../../images/student_photo.png';
import PhoneImage from '../../images/phone_mini.png';
import MailImage from '../../images/mail.png';
import TickImage from '../../images/yes.png';
import NotImage from '../../images/not_white.png';
import axios from 'axios';


class AddHomework extends Component {

    constructor(props){
        super(props);
        this.state = {

            text:this.props.homeworkText,
            files:[],
            homeworks:this.props.homeworks,
        };


        this.textChange = this.textChange.bind(this);
        this.sendData = this.sendData.bind(this);
        this.setFileStatus = this.setFileStatus.bind(this);

    }

    sendData(){
        var studentsIds=[];
        for (var i=0;i<this.state.homeworks.length;i++){
            if (this.state.homeworks[i]["checked"]){
                studentsIds.push(this.state.homeworks[i]["id"]);
            }
        }
        var data = {
            homework: this.state.text,
            homework_file_ids: studentsIds,
        };
        console.log(data);
        axios.patch(`http://a.e-a-s-y.ru/api/lessons/` + this.props.id + `/update_homework`, data, {withCredentials:true})
        .then(res => {
            console.log(data);
            alert("Данные сохранены.");
            this.props.close();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    textChange(event){
        this.setState({
            text: event.target.value,
        });
    }

    setFileStatus(id){
        var homeworks = this.state.homeworks;
        for (var i=0;i<homeworks.length;i++){
            if (homeworks[i]["id"]===id){
                if (homeworks[i]["checked"]===false){
                    homeworks[i]["checked"]=true;
                }else {
                    homeworks[i]["checked"]=false;
                }
            }
        }
        this.setState({
            homeworks:homeworks,
        })

        var files = this.state.files
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
                        <h1>Добавление домашки</h1>
                        <h3>{this.props.groupname}</h3>

                        <div className="popup-section">
                            <span>Комментарий</span>
                            <textarea type="text" value={this.state.text} tag="" rows="3" onChange={this.textChange}></textarea>
                        </div>

                        {this.state.homeworks.map((file, index) =>
                            <div key={index} className="student-card homework-file">

                                <span className="visits-card-title">{file["name"]}</span>

                                {file["checked"] &&
                                    <div className="teacher-card-tick active" onClick={() => this.setFileStatus(file["id"])}><img src={NotImage}></img></div>
                                }
                                {!file["checked"] &&
                                    <div className="teacher-card-tick" onClick={() => this.setFileStatus(file["id"])}><img src={TickImage}></img></div>
                                }
                            </div>
                        )}

                        <div className="popup-section submit" onClick={() => this.sendData()}>
                            Опубликовать
                            <div className="right-button"><img src={TickImage}></img></div>
                        </div>

                    </div>
                </div>
            </div>
		);
  	}
}
export default AddHomework
