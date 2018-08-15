import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
import './Helper.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import TickImage from '../../images/tick_bold.png';
import NotImage from '../../images/not_white.png';
import ArrowImage from '../../images/enter.png';
import SearchResult from './SearchResult';
import TeachersList from './TeachersList';
import Schools from './Schools';
import Test from './Test';

class Helper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			schoolsList: false,
			teachersList: false,
			schoolName:"",
			teacherName:"",
			schools:[],
			teachers: [],
			schoolId : "",
			teacherId : "",
			date: "",
			page: "search",
			results: [],
			lessonId: 0,
		};

		this.openTeachersList = this.openTeachersList.bind(this);
		this.openSchoolsList = this.openSchoolsList.bind(this);
        this.closePages = this.closePages.bind(this);
		this.setPage = this.setPage.bind(this);
		this.loadingData = this.loadingData.bind(this);
		this.searchLesson = this.searchLesson.bind(this);
		this.dateChange = this.dateChange.bind(this);
		this.saveSchoolId = this.saveSchoolId.bind(this);
		this.saveTeacherId = this.saveTeacherId.bind(this);
		this.selectLesson = this.selectLesson.bind(this);
	}
	componentDidMount(){
		this.loadingData();
	}

	loadingData(){
        axios.defaults.withCredentials = true;

        axios.get(`http://a.e-a-s-y.ru/api/helper.json`, {withCredentials:true})
        .then(res => {
            var data = res.data;
            console.log(data);

            this.setState({
                schools: data["schools"],
                teachers: data["teachers"],
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

	openSchoolsList(){
		this.setState({
			schoolsList: true
		});
		this.props.disableHoverMenu();
		this.props.interface(false);
	}
	openTeachersList(){
		this.setState({
			teachersList: true
		});
		this.props.disableHoverMenu();
		this.props.interface(false);
	}
	closePages(){
		this.setState({
			page:"search",
			teachersList: false,
			schoolsList: false,
		});
		this.props.enableHoverMenu();
		this.props.interface(true);
	}
	setPage(name){
		this.setState({
			page: name,
		})
	}

	searchLesson(){
		console.log(this.state.date);
		console.log(this.state.teacherId);
		console.log(this.state.schoolId);

		axios.post(`http://a.e-a-s-y.ru/api/helper/find_lesson.json`,
			{
				date: this.state.date,
				teacher_id:this.state.teacherId,
				school_id:this.state.schoolId
			} ,
			{withCredentials:true}
		)
        .then(res => {
            var data = res.data;
            console.log(data);

			if (data.length !== 0){
	            this.setState({
	                results: data,
	            });
				this.setPage("result");
				this.props.disableHoverMenu();
			} else {
				alert("Уроков по заданым критериям не найдено.")
			}
        })
        .catch((error) => {
            console.log(error);
        });
	}
	dateChange(event){
		var value = event.target.value;
		var array = value.split("-");
		var date = array[2]+"."+array[1]+"."+array[0];

        this.setState({
            date: date,
        });
    }
	saveSchoolId(id, name){
		this.setState({
			schoolId:id,
			schoolName:name,
		});
		this.closePages()
	}
	saveTeacherId(id, name){
		this.setState({
			teacherId:id,
			teacherName:name,
		});
		this.closePages()
	}

	selectLesson(id){
		console.log("lesson");
		console.log(id);
		this.props.enableHoverMenu();

		axios.post(`http://a.e-a-s-y.ru/api/helper/select_lesson.json`,
			{
				lesson_id: id,
			} ,
			{withCredentials:true}
		)
        .then(res => {
            var data = res.data;
            console.log(data);

			if (data["questions"].length !== 0){
				this.setState({
					lessonId:id,
					questions: data["questions"] ,
				});
				this.setPage("test");
			} else {
				alert("Ошибка")
			}
        })
        .catch((error) => {
            console.log(error);
        });


	}

	getSearchPage() {
		return(
			<div className='helper'>

				<h1>Давай найдем урок</h1>

				<div className="popup-section">
					<span>Выбери дату </span> <br/>
					<input type="date" onChange={this.dateChange} />
				</div>

				<div className="popup-section" onClick={() => this.openSchoolsList()} >
					<span>Выбери школу</span>
					<input type="text" disabled value={this.state.schoolName} />
				</div>

				<div className="popup-section" onClick={() => this.openTeachersList()} >
					<span>Выбери учителя</span>
					<input type="text" disabled value={this.state.teacherName} />
				</div>

				<div className="popup-section submit"  onClick={() => this.searchLesson()}>
					Найти
					<div className="right-button"><img src={ArrowImage}></img></div>
				</div>

				<ReactCSSTransitionGroup transitionName="homework-popup-animation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
					{this.state.teachersList && <TeachersList saveId={this.saveTeacherId} teachers={this.state.teachers} close={this.closePages} />}
				</ReactCSSTransitionGroup>

				<ReactCSSTransitionGroup transitionName="homework-popup-animation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
					{this.state.schoolsList && <Schools saveId={this.saveSchoolId} schools={this.state.schools} close={this.closePages} />}
				</ReactCSSTransitionGroup>

			</div>
		);
	}

	render() {
		return(
			<div>
			{this.state.page === "search" && this.getSearchPage()}
			{this.state.page === "result" && <SearchResult selectLesson={this.selectLesson} lessons={this.state.results} close={this.closePages}/> }
			{this.state.page === "test" && <Test lessonId={this.state.lessonId} questions={this.state.questions} close={this.closePages}/>}
			</div>
		);
  	}
}

export default Helper;
