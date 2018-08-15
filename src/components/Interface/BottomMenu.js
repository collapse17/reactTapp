import React, { Component } from 'react';
import './BottomMenu.css';
import phoneImage from '../../images/phone_light.png';
import updateImage from '../../images/update_light.png';
import homeImage from '../../images/home_light.png';
import profileImage from '../../images/profile.png';
import passwordImage from '../../images/password.png';
import tickImage from '../../images/tick_white.png';
import logoutImage from '../../images/logout.png';
import ezhImage from '../../images/ezh.png';
import axios from 'axios';

class BottomMenu extends Component {

    constructor() {
        super();

        this.state = {
            currentLevel: "Главное меню",
            error: "",
        };

        this.changeGroup = this.changeGroup.bind(this);
        this.getContentByCurrentLevel = this.getContentByCurrentLevel.bind(this);
        this.setCurrentLevel = this.setCurrentLevel.bind(this);
        this.newPassword = this.newPassword.bind(this);
        this.getUserEmail = this.getUserEmail.bind(this);
        this.newPhoto = this.newPhoto.bind(this);
    }

    changeGroup(){
        this.props.groupsSelect();
        this.props.hideBottomMenu();
    }

    setCurrentLevel(name){
        this.setState({
            currentLevel: name,
        })
    }

    logout(){
        axios.defaults.withCredentials = true;
        axios.delete(`http://a.e-a-s-y.ru/api/users/sign_out.json`,{withCredentials:true})
        .then(res => {
            var data = res.data;
            console.log(data);
        })
        .catch(function (error) {
            console.log(error);
        });
        this.timer = setTimeout(()=>{window.location = "/signout/"}, 500);
    }
    locationLogOut(){
        //window.location = "/signout/";
    }

    getUserEmail(){
        var address = window.location.href.toString();
        var emailPosition = address.indexOf("email:");
        if (emailPosition!==-1){
            emailPosition+=6;
        }
        var separatorPosition = address.indexOf("&");

        if (emailPosition!==-1) {
            var email = address.substr(emailPosition, separatorPosition-emailPosition);
            return email;
        }
        return "";
    }

    newPassword(){
        var oldPassword = this.inputOldPassword.value;
        var newPassword = this.inputNewPassword.value;
        var newPassword2 = this.inputNewPassword2.value;

        if ((newPassword2 === newPassword) && (newPassword.length>7)){
            //var postData = {"api_user[email]":this.getUserEmail(), "api_user[password]":newPassword,"api_user[current_password]":oldPassword};
            //var postData = {"api_user": {"email": this.getUserEmail(),"password": newPassword,"current_password": oldPassword}};

            let data = new FormData();
            data.append("api_user[password]", newPassword);
            data.append("api_user[current_password]", oldPassword);

            //var postData = {"api_user[password]": ,:oldPassword};
            console.log(data);

            axios.defaults.withCredentials = true;
            axios.put(`http://a.e-a-s-y.ru/api/users.json`, data, {withCredentials:true})
            .then(res => {
                var data = res.data;
                console.log(data);
                this.logout();
            })
            .catch(function (error) {
                console.log(error);
            });
        } else if (newPassword.length<8) {
            this.setState({
                error: "Длина пароля не меньше 8 символов",
            });
        } else {
            this.setState({
                error: "Проверьте правильность ввода пароля",
            });
        }
    }

    newPhoto(e){
        console.log(e);

        var address = window.location.href.toString();
        var emailPosition = address.indexOf("email:");
        if (emailPosition!==-1){
            emailPosition+=6;
        }
        var passwordPosition = address.indexOf("password:");
        if (passwordPosition!==-1){
            passwordPosition+=9;
        }
        var separatorPosition = address.indexOf("&");

        if ((emailPosition!==-1) && (passwordPosition!==-1)) {
            var email = address.substr(emailPosition, separatorPosition-emailPosition);
            var password = address.substr(passwordPosition);

            let data = new FormData();
            for (var i = 0; i < e.length; i++) {
                let file = e.item(i);
                data.append("api_user[photo]", file, file.name);
                this.inputPhoto.src = URL.createObjectURL(e[0]);
            }
            data.append("api_user[email]", email);
            data.append("api_user[current_password]", password);
            axios.defaults.withCredentials = true;
            axios.put(`http://a.e-a-s-y.ru/api/users.json`, data, {withCredentials:true})
            .then(res => {
                var data = res.data;
                console.log(data);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    // редактирование профиля
    //<div className="bottomMenu-link rounded" onClick={() => this.setCurrentLevel("Изменение фотографии")}>
    //    <img src={profileImage}></img>
    //    <span>Изменить фотографию</span>
    //</div>

    getContentByCurrentLevel(){
        switch (this.state.currentLevel) {
            case "Главное меню":
                return (
                    <div>
                        <div className="darkBG" onClick={this.props.hideBottomMenu}></div>
                        <div className="bottomMenu">

                            <a href="http://wiki.e-a-s-y.ru/" target="_blank" rel="noopener noreferrer" className="bottomMenu-link">
                                <img src={ezhImage} alt=""></img>
                                <span>Ежевика</span>
                            </a>
                            <a href="http://e-a-s-y.ru/" target="_blank" rel="noopener noreferrer" className="bottomMenu-link">
                                <img src={homeImage} alt=""></img>
                                <span>Перейти на сайт школы</span>
                            </a>
                            <div className="bottomMenu-link rounded" onClick={() => this.setCurrentLevel("Редактирование профиля")}>
                                <img src={profileImage} alt=""></img>
                                <span>Редактировать профиль</span>
                            </div>
                        </div>
                    </div>
                );
            case "Редактирование профиля":
                return (
                    <div>
                        <div className="darkBG" onClick={this.props.hideBottomMenu}></div>
                        <div className="bottomMenu">
                            <div className="bottomMenu-link rounded" onClick={() => this.setCurrentLevel("Изменение пароля")}>
                                <img src={passwordImage} alt=""></img>
                                <span>Изменить пароль</span>
                            </div>




                            <div className="bottomMenu-link rounded" onClick={this.logout}>
                                <img src={logoutImage} alt=""></img>
                                <span>Выйти</span>
                            </div>
                        </div>
                    </div>
                );
            case "Изменение пароля":
                return (
                    <div>
                        <div className="darkBG" onClick={this.props.hideBottomMenu}></div>
                        <div className="bottomMenu topMenu">
                            <div className="bottomMenu-link rounded">
                                <img src={passwordImage} alt=""></img>
                                <input type="text" placeholder="Старый пароль" ref={el => this.inputOldPassword = el} />
                            </div>
                            <div className="bottomMenu-link rounded">
                                <img src={passwordImage} alt=""></img>
                                <input type="text" placeholder="Новый пароль" ref={el => this.inputNewPassword = el} />
                            </div>
                            <div className="bottomMenu-link rounded">
                                <img src={passwordImage} alt=""></img>
                                <input type="text" placeholder="Повторите пароль" ref={el => this.inputNewPassword2 = el} />
                            </div>
                            <div className="bottomMenu-link rounded displayblock">
                                <img src={tickImage} alt=""></img>
                                <button onClick={this.newPassword}>Сохранить</button>
                            </div>
                            <div className="bottomMenu-link rounded displayblock error-alert">
                                {this.state.error}
                            </div>
                        </div>
                    </div>
                );
            case "Изменение фотографии":
                return (
                    <div>
                        <div className="darkBG" onClick={this.props.hideBottomMenu}></div>
                        <div className="bottomMenu topMenu">
                            <div className="bottomMenu-link rounded profileImage">
                                <img src={profileImage} alt="" ref={el => this.inputPhoto = el} ></img>
                                <input type="file" onChange={ (e) => this.newPhoto(e.target.files) } />
                            </div>
                            <div className="bottomMenu-link rounded displayblock">
                            </div>
                        </div>
                    </div>
                );

            default:
                return(<div></div>);
        }
    }

    render() {
		return (
            <div>
                {this.getContentByCurrentLevel()}
            </div>
		);
  	}

}

export default BottomMenu
