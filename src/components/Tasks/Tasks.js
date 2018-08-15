import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
import './Tasks.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import TickImage from '../../images/tick_bold.png';
import NotImage from '../../images/not_white.png';
import ArrowImage from '../../images/arrow.png';

import TeachersList from './TeachersList';
import Visits from './Visits';
import AddNews from './AddNews';
import AddHomework from './AddHomework';

class Tasks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isHomeworkOpened: false,
			subject: '',
			date: '',
			text: '',
			files: '',
			lessons: [],
			teachers: [],
			homeworks: [],
			firstLesson: true,
			currentGroupname: "",
			empty:false,
			homeworks: [],
			homeworkText:"",
			startPosition:0,
			startIndex : 0,
		};
		this.loadingData = this.loadingData.bind(this);
		this.openVisits = this.openVisits.bind(this);
		this.openAddNews = this.openAddNews.bind(this);
		this.openTeachersList = this.openTeachersList.bind(this);
        this.closePages = this.closePages.bind(this);
		this.openAddHomework = this.openAddHomework.bind(this);
		this.getLessonTime = this.getLessonTime.bind(this);
		this.getCurrentLessonIndex = this.getCurrentLessonIndex.bind(this);
	}
	componentDidMount(){
        this.loadingData(false);
    }

	loadingData(update){
		if (update){
			this.setState({
				lessons:[],
			});
		}
        axios.defaults.withCredentials = true;

        axios.get(`http://a.e-a-s-y.ru/api/lessons/tasks.json`, {withCredentials:true})
        .then(res => {
            var data = res.data;
            console.log(data);

			var index = this.getCurrentLessonIndex(data["lessons"]);

			this.setState({
                lessons: data["lessons"],
                teachers: data["teachers"],
				startIndex: index,
            });

			if (data["lessons"].length === 0){
				this.setState({
	                empty:true,
	            });
			} else {

			}

        })
        .catch((error) => {
            console.log(error);
			this.setState({
				empty:true,
			});
        });

    }
	openTeachersList(id, groupname, teachers){
		this.setState({
			teachersList: true,
			teachers: teachers,
			currentId: id,
			currentGroupname: groupname,
		});
		this.props.disableHoverMenu();
		this.props.interface(false);
	}
	openAddNews(id){
		this.setState({
			addNews: true,
			currentId: id,
		});
		this.props.disableHoverMenu();
		this.props.interface(false);
	}
	openAddHomework(id, groupname, homeworks, homeworkText){
		this.setState({
			addHomework: true,
			homeworks: homeworks,
			currentId: id,
			currentGroupname: groupname,
			homeworkText:homeworkText,
		});
		this.props.disableHoverMenu();
		this.props.interface(false);
	}
	openVisits(id, groupname , students){
		this.setState({
			visits: true,
			students: students,
			currentId: id,
			currentGroupname: groupname,
		});
		this.props.disableHoverMenu();
		this.props.interface(false);
	}
	closePages(){
		this.setState({
			teachersList: false,
			visits:false,
			addNews: false,
			addHomework: false,
		});
		this.props.enableHoverMenu();
		this.props.interface(true);
		this.loadingData(false);
	}
	cancelLesson(id){
		axios.post(`http://a.e-a-s-y.ru/api/lessons/`+id+`/set_cancelled.json`, {withCredentials:true})
        .then(res => {
            var data = res.data;
            console.log(data);
			alert("Урок отменен.");
			this.loadingData(true)
        })
        .catch((error) => {
            console.log(error);
        });

	}
	unCancelLesson(id){
		axios.post(`http://a.e-a-s-y.ru/api/lessons/`+id+`/unset_cancelled.json`, {withCredentials:true})
        .then(res => {
            var data = res.data;
            console.log(data);
			alert("Урок состоится.");
			this.loadingData(true)
        })
        .catch((error) => {
            console.log(error);
        });

	}

	getCurrentLessonIndex(lessons){
		for (var i=0;i<lessons.length;i++){
			if (this.getLessonTime(lessons[i])==="Текущий урок"){
				return i;
			}
		}
	}

	getLessonTime(lesson){
		var startH = lesson["start_time"].split(":")[0];
		var startM = lesson["start_time"].split(":")[1];
		var endH = lesson["end_time"].split(":")[0];
		var endM = lesson["end_time"].split(":")[1];
		var now = new Date();
		var hour = now.getHours();
		var minutes = now.getMinutes();

		if ((hour>=startH) && (hour<=endH)){
			if ((minutes>=startM) && ((minutes<=endM) || (hour<endH))) {
				return ("Текущий урок");
			}
		}

		return (lesson["start_time"] + " - " + lesson["end_time"]);

	}

	render() {
		var array = [];
		for (var i=0;i<this.state.lessons.length;i++){
			if (this.state.lessons[i]["tasks"] != null) {
				var tasks = this.state.lessons[i]["tasks"];
				var item = {}
				for (var j=0;j<tasks.length;j++){
					if (tasks[j]["homework"] != null) {
						item["homework"] = tasks[j]["homework"];
					}
					if (tasks[j]["attendance"] != null) {
						item["attendance"] = tasks[j]["attendance"];
					}
				}
				array.push(item);
			} else {	console.log("null"); }
		}
		return(
			<div className='lessons'>

				{this.state.empty &&
					<div className="empty">
						У тебя нет задач к выполнению :)
					</div>
				}

				<ReactSwipe ref="lessonsSwipe" key={this.state.lessons.length} className='carousel lessons-page-container' swipeOptions={{startSlide: this.state.startIndex ,continuous: false}} >
					{this.state.lessons.map((lesson, index) =>
						<div className="lesson" key={index}>
							<div className="lesson-header">
								<h3>{lesson["group_name"]}</h3>
								<h1>{lesson["classroom_name"]}</h1>
								<span className="lesson-status">{this.getLessonTime(lesson)}</span>
								<span className="lesson-lvl">{lesson["level"]} lvl</span>
							</div>
							{lesson["attendances"].length !== 0 &&
								<div className="lesson-item" onClick={() => this.openVisits(lesson["id"], lesson["group_name"] , lesson["attendances"])}>
									Проставить посещаемость
									{array[index]["attendance"] &&
									<div className="lesson-item-phone">
										<img src={TickImage}/>
									</div>
									}
									{!array[index]["attendance"] &&
									<div className="lesson-item-phone">
										<img src={NotImage}/>
									</div>
									}
								</div>
							}
							<div className="lesson-item" onClick={() => this.openAddHomework(lesson["id"], lesson["group_name"], lesson["homework_files"],lesson["homework"])}>
								Добавить домашку
								{array[index]["homework"] &&
								<div className="lesson-item-phone">
									<img src={TickImage}/>
								</div>
								}
								{!array[index]["homework"] &&
								<div className="lesson-item-phone">
									<img src={NotImage}/>
								</div>
								}
							</div>
							<div className="lesson-item" onClick={() => this.openAddNews(lesson["id"])}>
								Добавить новость
							</div>

						</div>
					)}
				</ReactSwipe>

				<ReactCSSTransitionGroup transitionName="homework-popup-animation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
					{this.state.teachersList && <TeachersList id={this.state.currentId} teachers={this.state.teachers} close={this.closePages} groupname={this.state.currentGroupname} />}
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="homework-popup-animation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
					{this.state.visits && <Visits students={this.state.students} groupname={this.state.currentGroupname} id={this.state.currentId} close={this.closePages} />}
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="homework-popup-animation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
					{this.state.addNews && <AddNews close={this.closePages} id={this.state.currentId} />}
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="homework-popup-animation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
					{this.state.addHomework && <AddHomework close={this.closePages} homeworkText={this.state.homeworkText} id={this.state.currentId} homeworks={this.state.homeworks}  groupname={this.state.currentGroupname}/>}
				</ReactCSSTransitionGroup>
			</div>
		);
  	}
}

export default Tasks;
