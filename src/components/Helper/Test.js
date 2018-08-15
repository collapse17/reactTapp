import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
import './Test.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import TickImage from '../../images/tick_bold.png';
import NotImage from '../../images/not_white.png';
import ArrowImage from '../../images/enter.png';
import SearchResult from './SearchResult';
import TeachersList from './TeachersList';
import Schools from './Schools';

class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentQuestion: 0,
			text: "",
			activeTrue:false,
			activeFalse:false,
			answers:[],
			currentAnswer:"",

		};
		this.textChange = this.textChange.bind(this);
		this.saveAnswer = this.saveAnswer.bind(this);
		this.sendResults = this.sendResults.bind(this);
		this.nextQuestion = this.nextQuestion.bind(this);
		this.currentAnswer = this.currentAnswer.bind(this);
	}

// TODO: НУЖНО СДЕЛАТЬ НАКОПЛЕНИЕ ОТВЕТОВ И ОТПРАВКУ ИХ ВСЕ РАЗОМ :()
// sendAnswer переделать в saveAnswer и отправлять только на последнем ответе через другой метод

	saveAnswer(answer){

		//dbg
		console.log(this.props.questions[this.state.currentQuestion]["id"]);
		console.log(answer);

		// save answer in array in states
		var answers = this.state.answers;
		if (answer===""){
			answer=3;
		}
		answers.push({"id":this.props.questions[this.state.currentQuestion]["id"] , "answer":answer});
		this.setState({
			answers:answers,
		});
		console.log(this.state.answers);

		// if end
		if (this.state.currentQuestion === (this.props.questions.length-1)) {
			this.sendResults()
			this.setState({
				currentQuestion : 0,
			});
		}

	}
	sendResults(){
		console.log("SEND");
		console.log(this.state.answers);
		console.log(this.props.lessonId);

		axios.post(`http://a.e-a-s-y.ru/api/helper/submit_survey.json`,
			{
				questions: this.state.answers,
				lesson_id: this.props.lessonId,
			} ,
			{withCredentials:true}
		)
        .then(res => {
            var data = res.data;
            console.log(data);

			alert("Спасибо!");
			this.props.close();
        })
        .catch((error) => {
			alert("Ошибка отправки.");
			this.props.close();
            console.log(error);
        });
	}

	textChange(event){
		this.setState({
			currentAnswer: event.target.value,
		});
	}

	currentAnswer(answer){
		this.setState({
			currentAnswer: answer,
		});
		// индикация
		if (answer===1){
			this.setState({
				activeTrue:true,
				activeFalse:false,
			});
		} else if (answer===2) {
			this.setState({
				activeFalse:true,
				activeTrue:false,
			});
		}
	}

	nextQuestion(type){
		console.log(type);
		console.log(this.state.currentAnswer);
		if ((type!==4) || ((this.state.currentAnswer !== "") && (type===4))){
			var i = this.state.currentQuestion;
			console.log("i = " + i + " - lng = "+ this.props.questions.length);

			this.saveAnswer(this.state.currentAnswer);

			if ((i-2) !== this.props.questions.length) {
				i++;

				this.setState({
					currentQuestion: i,
					activeFalse:false,
					activeTrue:false,
				});
			}
			this.setState({
				currentAnswer: "",
			});
		} else {
			alert("Этот вопрос является обязательным");
		}

	}


	render() {
		var activeTrue = ""
		if (this.state.activeTrue) {
			activeTrue = "active"
		}
		var activeFalse = ""
		if (this.state.activeFalse) {
			activeFalse = "active"
		}

		return(
			<div>
			<div className='helper'>
			{this.state.currentQuestion < this.props.questions.length &&
				<div className={((this.props.questions[this.state.currentQuestion]["question_type_id"] == 4)||(this.props.questions[this.state.currentQuestion]["question_type_id"] == 2)) ? "test-item" : "test-item test-item-type2"}>
					<span>{this.props.questions[this.state.currentQuestion]["section"]}</span>
					<h2>{this.props.questions[this.state.currentQuestion]["text"]}</h2>
					<div className="answers">
						{this.props.questions[this.state.currentQuestion]["question_type_id"] == 2  &&
							<div className={activeTrue} onClick={() => this.currentAnswer(1)}><img src={TickImage}></img></div>
						}
						{this.props.questions[this.state.currentQuestion]["question_type_id"] == 2  &&
							<div className={activeFalse} onClick={() => this.currentAnswer(2)}><img src={NotImage}></img></div>
						}
						{this.props.questions[this.state.currentQuestion]["question_type_id"] == 2  &&
							<div onClick={() => this.nextQuestion(2)}><img src={ArrowImage}></img></div>
						}

						{this.props.questions[this.state.currentQuestion]["question_type_id"] == 4  &&
							<div className={activeTrue} onClick={() => this.currentAnswer(1)}><img src={TickImage}></img></div>
						}
						{this.props.questions[this.state.currentQuestion]["question_type_id"] == 4  &&
							<div className={activeFalse} onClick={() => this.currentAnswer(2)}><img src={NotImage}></img></div>
						}
						{this.props.questions[this.state.currentQuestion]["question_type_id"] == 4  &&
							<div onClick={() => this.nextQuestion(4)}><img src={ArrowImage}></img></div>
						}

						{this.props.questions[this.state.currentQuestion]["question_type_id"] == 1  &&
						<div>

							<textarea className="answer-text" type="text" rows="3" onChange={this.textChange}></textarea>

							<div onClick={() => this.nextQuestion(1)}><img src={ArrowImage}></img></div>
						</div>
						}
					</div>
				</div>
			}
			</div>
			</div>
		);
  	}
}

export default Test;
