import React, { Component } from 'react';
import './AddNews.css';
import axios from 'axios';
import RowImage from '../../images/arrow_left.png';
import StudentImage from '../../images/student_photo.png';
import PhoneImage from '../../images/phone_mini.png';
import MailImage from '../../images/mail.png';
import TickImage from '../../images/yes.png';
import NotImage from '../../images/not_white.png';


class AddNews extends Component {

    constructor(props){
        super(props);
        this.state = {
            title:"",
            text:"",
            file:"",

        };

        this.titleChange = this.titleChange.bind(this);
        this.textChange = this.textChange.bind(this);
        this.sendNews = this.sendNews.bind(this);
    }

    titleChange(event){
        this.setState({
            title: event.target.value,
        });
    }

    textChange(event){
        this.setState({
            text: event.target.value,
        });
    }

    sendNews(){
        console.log(this.props.id);
        if (this.fileInput.files.length !== 0){
            console.log(this.fileInput.files[0].name);
        } else {
            alert("Не выбран файл.");
            return;
        }
        if (this.state.title !== ""){
            console.log(this.state.title);
        } else {
            alert("Не введен заголовок.");
            return;
        }
        if (this.state.text !== ""){
            console.log(this.state.text);
        } else {
            alert("Не введен текст.");
            return;
        }

        let data = new FormData();
        data.append("post[lesson_id]", this.props.id);
        data.append("post[title]", this.state.title);
        data.append("post[body]", this.state.text);
        data.append("post[photo]", this.fileInput.files[0])
        axios.defaults.withCredentials = true;
        axios.post(`http://a.e-a-s-y.ru/api/posts/add_group_news`, data, {withCredentials:true})
        .then(res => {
            var data = res.data;
            console.log(data);
            alert("Новость добавлена");
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
                        <h1>Добавление новости</h1>
                        <h3>Новость для студентов группы</h3>

                        <div className="popup-section">
                            <span>Заголовок</span>
                            <input type="text" tag="title" placeholder="Enter title" onChange={this.titleChange} />
                        </div>

                        <div className="popup-section">
                            <span>Текст</span>
                            <textarea type="text" tag="text" rows="3" onChange={this.textChange}></textarea>
                        </div>

                        <div className="popup-section">
                            <span>Файл</span>
                            <input type="file" tag="file" ref={input => {this.fileInput = input;}}/>
                        </div>

                        <div className="popup-section submit" onClick={() => this.sendNews()}>
                            Опубликовать
                            <div className="right-button"><img src={TickImage}></img></div>
                        </div>

                    </div>
                </div>
            </div>
		);
  	}
}
export default AddNews
