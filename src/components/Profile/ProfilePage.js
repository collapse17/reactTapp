import React, { Component } from 'react';
import './ProfilePage.css';
import phoneImage from '../../images/phone.png';
import homepageImage from '../../images/home.png';
import infoImage from '../../images/i.png';
import ListViewer from '../Common/ListViewer';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import profileImage from '../../images/profile.png';

import homeIco from '../../images/home_ico.png';
import photoIco from '../../images/photo_ico.png';
import heartIco from '../../images/heart_ico.png';

import MyStudents from './MyStudents';
import Schools from './Schools';
import Events from './Events';

class ProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        	isViewerOpened: false,
            notifications: [],
        };

		this.openViewer = this.openViewer.bind(this);
		this.closeViewer = this.closeViewer.bind(this);
        this.openMyStudentsPage = this.openMyStudentsPage.bind(this);
        this.openSchoolsPage = this.openSchoolsPage.bind(this);
        this.closePages = this.closePages.bind(this);
    }

	openViewer() {
		this.setState({
			isViewerOpened: true
		});

		this.props.disableHoverMenu();

		document.getElementsByClassName('interface')[0].style.visibility = 'hidden';
		var pageTitles = document.getElementsByClassName('profile-page-title');
		for (var i = 0; i < pageTitles.length; i++) {
			pageTitles[i].style.display = 'none';
		}
	}

	closeViewer() {
		this.setState({
			isViewerOpened: false
		});

		this.props.enableHoverMenu();

		document.getElementsByClassName('interface')[0].style.visibility = 'visible';
		var pageTitles = document.getElementsByClassName('profile-page-title');
		for (var i = 0; i < pageTitles.length; i++) {
			pageTitles[i].style.display = 'block';
		}
	}

    getFormatedDate(str){

        // dbg
        //return "13 сен";

        var year = [
            {name: "Янв"}, {name: "Фев"}, {name: "Мар"}, {name: "Апр"},
            {name: "Мая"}, {name: "Июня"}, {name: "Июля"}, {name: "Авг"},
            {name: "Сен"}, {name: "Окт"}, {name: "Нояб"}, {name: "Дек"},
        ];
        var date = str.substr(0,10);
        var dateArr = date.split(".");
        if (dateArr.length===3){
            var result = dateArr[0]+" "+year[parseInt(dateArr[1], 10)-1].name;
            return result;
        } else {
            return "";
        }
    }

    openMyStudentsPage(){
        this.setState({
			myStudentsPage: true
		});
        this.props.disableHoverMenu();
        this.props.interface(false);
    }
    openSchoolsPage(){
        this.setState({
            schoolsPage: true
        });
        this.props.disableHoverMenu();
        this.props.interface(false);
    }
    openEventsPage(){
        this.setState({
            eventsPage: true
        });
        this.props.disableHoverMenu();
        this.props.interface(false);
    }


    closePages(){
        this.setState({
			myStudentsPage: false,
            schoolsPage: false,
            eventsPage: false
		});
        this.props.enableHoverMenu();
        this.props.interface(true);
    }

	render() {
		var { notifications } = this.props,
			notificationContent = (
				<div>
				{notifications.map((notification, key) =>
				<div className="word-card" key={key}>
					<div className="content">
						<div className="tick">
							<img src={homepageImage} alt=""></img>
						</div>
						<div className="word">
							<span className="main-word-in-list">{notification.title}</span><br/>
							<span className="notifications-list-text ">{notification.text}</span>
						</div>
						<div className="points">
							{this.getFormatedDate(notification.date)}
						</div>
					</div>
				</div>
				)}
				</div>
			);

            var notificationPlaceholder = (
                <div className="word-card">
					<div className="content">
						<div className="tick">
							<img src={homepageImage} alt=""></img>
						</div>
						<div className="word">
							<span className="main-word-in-list">Привет!</span><br/>
							<span className="notifications-list-text ">Здесь будут отображаться твои уведомления</span>
						</div>
						<div className="points">
							now
						</div>
					</div>
				</div>
            );

		return (
			<div className="profilepage-container">
				<div>
					<div className="bottom-gradient"></div>

					<img className="profilepage-avatar" src={profileImage} alt=""></img>
					<div className="profilepage-redblock"></div>
					<div className="profilepage-card">
						<span>{this.props.english_name}</span>
						<div className="profilepage-card-warning">
							<img src={infoImage} alt=""></img> {this.props.phrase}
						</div>
					</div>
					<div className="profilepage-buttons">
						<div onClick={() => this.openMyStudentsPage()}><img src={heartIco} alt=""></img> Мои студенты</div>
						<div onClick={() => this.openSchoolsPage()}><img src={homeIco} alt=""></img> Список школ</div>
				        <div onClick={() => this.openEventsPage()}><img src={photoIco} alt=""></img> Мероприятия</div>
					</div>
                    {this.props.notifications.length !== 0 &&
    					<div className="notifications-list" onClick={this.openViewer}>
    						{notificationContent}
    					</div>
                    }
                    {(this.props.loaded && (this.props.notifications.length === 0)) &&

        					<div className="notifications-list">
        						{notificationPlaceholder}
        					</div>
                    
                    }
				</div>
           		{this.state.isViewerOpened && <ReactCSSTransitionGroup transitionName="homework-popup-animation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
           		<ListViewer content={notificationContent} title='Уведомления' closeViewer={this.closeViewer}/>
				</ReactCSSTransitionGroup>}

                <ReactCSSTransitionGroup transitionName="homework-popup-animation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
					{this.state.myStudentsPage && <MyStudents students={this.props.students} close={this.closePages} />}
				</ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup transitionName="homework-popup-animation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
					{this.state.schoolsPage && <Schools schools={this.props.schools} close={this.closePages} />}
				</ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup transitionName="homework-popup-animation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
					{this.state.eventsPage && <Events events={this.props.events} close={this.closePages} />}
				</ReactCSSTransitionGroup>
            </div>
		);
  	}
}

export default ProfilePage;
