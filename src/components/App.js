import React, { Component } from 'react';
import EasySwipe from 'react-easy-swipe';
import Interface from './Interface/Interface';
import NewsPage from './News/NewsPage';
import Profile from './Profile/Profile';
import Lessons from './Lessons/Lessons';
import Tasks from './Tasks/Tasks';
import Helper from './Helper/Helper';
import Loading from './Common/Loading';
import Groups from './Common/Groups';
import axios from 'axios';

const pages = [
    {title: 'Задачи'},
    {title: 'Профиль'},
    {title: 'Уроки'},
    {title: 'Новости'},
    {title: 'Отзыв по уроку'}
];

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            onboarding: false,
            onboarding_step: 1,
            pagesCount: 5,
            currentPageName: "",
            currentPageIndex: -1,
            currentSwipeLength: 0,
            pagesList: ["Задачи","Профиль", "Уроки", "Новости", "Отзыв по уроку"],
            hoverMenu: 2,
            hoverMenuEnabled: true, // def: false
            horizontal:0,
            photo: '',
            russian_name: '',
            russian_surname: '',
            russian_middlename: '',
            english_name: '',
            groups: [],
            interfaceVisible: true,
        };

        this.onSwipeMove = this.onSwipeMove.bind(this);
        this.onSwipeEnd = this.onSwipeEnd.bind(this);
        this.getCurrentPage = this.getCurrentPage.bind(this);
        this.disableHoverMenu = this.disableHoverMenu.bind(this);
        this.enableHoverMenu = this.enableHoverMenu.bind(this);
        this.authorize = this.authorize.bind(this);
        this.logout = this.logout.bind(this);
        this.sendToken = this.sendToken.bind(this);
        this.checkNotificationsAction = this.checkNotificationsAction.bind(this);
        this.actionPageOpen = this.actionPageOpen.bind(this);
        this.interface = this.interface.bind(this);
    }

    componentDidMount(){
        this.authorize();
    }

    authorize(){
        var address = window.location.href.toString();
        var token = "";

        var tokenPosition = address.indexOf("token:");
        if (tokenPosition!==-1){
            tokenPosition += 6;
        }

        var emailPosition = address.indexOf("email:");
        if (emailPosition!==-1){
            emailPosition+=6;

            if (tokenPosition!==-1){
                var tokenLng = emailPosition - tokenPosition - 7;
                token = address.substr(tokenPosition, tokenLng);
            }
        }

        var passwordPosition = address.indexOf("password:");
        if (passwordPosition!==-1){
            passwordPosition+=9;
        }
        var separatorPosition = address.indexOf("&", emailPosition);

        if ((emailPosition!==-1) && (passwordPosition!==-1)) {
            var email = address.substr(emailPosition, separatorPosition-emailPosition);
            var password = address.substr(passwordPosition);

            console.log("login:"+email);
            console.log("password:"+password);
            console.log("token:"+token);
            console.log("onboarding:"+this.state.onboarding);

            var postData = {
                "api_user": {
                    "email": email,
                    "password": password,
                    "remember_me": true
                }
            };

            axios.defaults.withCredentials = true;
            axios.post(`http://a.e-a-s-y.ru/api/users/sign_in.json`, postData)
            .then(res => {
                var data = res.data;
                console.log(data);
                this.setState({
                    photo: data['photo']['url'],
                    russian_name: data['russian_name'],
                    russian_surname: data['russian_surname'],
                    russian_middlename: data['russian_middlename'],
                    english_name: data['english_name'],
                    currentPageName: "Уроки",
                    currentPageIndex: 2,
                });



                this.sendToken(token);
                this.checkNotificationsAction();
            })
            .catch((error) => {
                console.log(error);
                this.logout();
            });
        } else {
            console.log("Auth data not found");
            this.logout();
        }
    }


    sendToken(token){
        console.log("TOKEN FUNC:"+token);

        var postData = {"reg_token": token, "is_teacher_app": true};

        axios.defaults.withCredentials = true;
        axios.post(`http://a.e-a-s-y.ru/api/app_user/set_reg_token.json`, postData)
        .then(res => {
            console.log("TOKEN SENDED SUCCESFULLY");
        })
        .catch(function (error) {
            console.log(error);
        });
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

        var address = window.location.href.toString();
        if (address.indexOf("signout") === -1) {
            this.timer = setTimeout(()=>{window.location = "/signout/"}, 500);
        }
    }

    checkNotificationsAction(){
        var address = window.location.href.toString();
        var actionPosition = address.indexOf("action:");

        if (actionPosition === -1){
            return;
        }
        actionPosition += 7
        var separatorPosition = address.indexOf("&");

        var action = address.substr(actionPosition, separatorPosition-actionPosition);

        var actionArr = action.split("::");

        switch (actionArr[0]) {
            case "page":
                console.log(actionArr[1]);
                this.actionPageOpen(actionArr[1]);
                break;
            case "site":
                console.log(actionArr[1]);
                window.open(actionArr[1], 'Pay', '_blank');
                break;
            default:
                return;
                break;
        }

    }

    actionPageOpen(pageName){
        console.log(pageName);
        switch (pageName) {
            case "report":
                this.setState({
                    currentPageName: "Профиль",
                    currentPageIndex: 1,
                    hoverMenuEnabled: true,
                });
                break;
            case "tasks":
                this.setState({
                    currentPageName: "Задачи",
                    currentPageIndex: 0,
                    hoverMenuEnabled: true,
                });
                break;
            case "profile":
                this.setState({
                    currentPageName: "Профиль",
                    currentPageIndex: 1,
                    hoverMenuEnabled: true,
                });
                break;
            case "lessons":
                this.setState({
                    currentPageName: "Уроки",
                    currentPageIndex: 2,
                    hoverMenuEnabled: true,
                });
                break;
            case "news":
                this.setState({
                    currentPageName: "Новости",
                    currentPageIndex: 3,
                    hoverMenuEnabled: true,
                });
                break;
            case "helper":
                this.setState({
                    currentPageName: "Отзыв по уроку",
                    currentPageIndex: 4,
                    hoverMenuEnabled: true,
                });
                break;
            default:
                return;
        }
    }

    onSwipeMove(position, event) {
        if (this.state.hoverMenuEnabled){
            if ( position.y > 100 || position.y < -100){
                this.setState({currentSwipeLength: position.y});
            } else {
                this.setState({currentSwipeLength: 0});
            }
            // определения открывающейся страницы (в сторону которой идет свайп)
            var index = this.state.currentPageIndex;
            var pagesCount = this.state.pagesCount;

            if (position.y > 0){
                if (index !== 0) {
                    index = index - 1;
                }
            } else if (position.y < 0){
                if (index !== (pagesCount-1)) {
                    index++;
                }
            }
            // off vertical when horizontal
            if (position.x<100 && position.x>-100){
                // visual swipe
                this.setState({
                    hoverMenu: position.y,
                    horizontal: position.x,
                    nextPageIndex: index,
                });
            } else {
                this.setState({
                    horizontal: position.x,
                });
            }
        }
    }
    onSwipeEnd(event) {
        var index = this.state.currentPageIndex;
        var pagesCount = this.state.pagesCount;
        var horizontal = false;
        if (this.state.horizontal<100 && this.state.horizontal>-100){
            horizontal = true;
        }
        console.log(this.state.horizontal);
        console.log(horizontal);

        if (this.state.currentSwipeLength > 100 && horizontal){
            if (index !== 0) {
                index = index - 1;
            }
        } else if (this.state.currentSwipeLength < - 100 && horizontal){
            if (index !== (pagesCount-1)) {
                index++;
            }
        } else {
            this.setState ({
                currentSwipeLength: 0,
                hoverMenu: 0,
            });
        }
        if (this.state.hoverMenuEnabled===true && horizontal){
            this.setState ({
                currentPageName: this.state.pagesList[index],
                currentPageIndex: index,
                currentSwipeLength: 0,
                hoverMenu: 0,
            });
        }
    }
    disableHoverMenu(){
        this.setState({
            hoverMenuEnabled: false,
        });
    }
    enableHoverMenu(){
        this.setState({
            hoverMenuEnabled: true,
        });
    }


    getCurrentPage(){
        switch (this.state.currentPageName) {
            case "Новости":
                return <NewsPage disableHoverMenu = {this.disableHoverMenu} enableHoverMenu = {this.enableHoverMenu}/>;
            case "Профиль":
                return <Profile interface={this.interface} disableHoverMenu = {this.disableHoverMenu} enableHoverMenu = {this.enableHoverMenu}/>;
            case "Уроки":
                return <Lessons interface={this.interface} disableHoverMenu = {this.disableHoverMenu} enableHoverMenu = {this.enableHoverMenu}/>;
            case "Задачи":
                return <Tasks interface={this.interface} disableHoverMenu = {this.disableHoverMenu} enableHoverMenu = {this.enableHoverMenu}/>;
            case "Отзыв по уроку":
                return <Helper interface={this.interface} disableHoverMenu = {this.disableHoverMenu} enableHoverMenu = {this.enableHoverMenu}/>;
            default :
                return <Loading />;
        }
    }

    interface(status){
        this.setState({
            interfaceVisible: status,
        });
    }

	render() {
		return (
            <EasySwipe
                onSwipeMove={this.onSwipeMove}
                onSwipeEnd={this.onSwipeEnd}
            >

                {this.state.interfaceVisible &&
                    <div id="root">
                        <Interface  index={this.state.currentPageIndex}
                                    disableHoverMenu={this.disableHoverMenu}
                                    enableHoverMenu={this.enableHoverMenu}
                                    groupsSelect={this.groupsSelect}
                                    swipeLength={this.state.hoverMenu}
                                    pagesCount={this.state.pagesCount}
                                    pageName={this.state.currentPageName}
                                    hoverMenuEnabled = {this.state.hoverMenuEnabled}
                                    pagesList={pages} nextPageIndex={this.state.nextPageIndex}
                        />
                    </div>
                }
                <div id="content">
                    {this.getCurrentPage()}
                </div>
            </EasySwipe>
		);
  	}
}
export default App;
