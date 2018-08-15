import React, { Component } from 'react';
import './ReportPage.css';
import ArrowImage from '../../images/enter.png';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReportInfoPage from './ReportInfoPage';
import axios from 'axios';

class ReportPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        	infoOpen: false,
            dataOpen: false,
            reportText: "",
            sportSpanding:this.props.data["other_data"]["sport_spending_value"],
            sportPlaces:this.props.data["other_data"]["sport_place"],
            comment: this.props.data["other_data"]["comment"],
            responsibility:this.props.data["other_data"]["responsibility"],

        };

        this.sportTextChange = this.sportTextChange.bind(this);
        this.whereTextChange = this.whereTextChange.bind(this);
        this.commentTextChange = this.commentTextChange.bind(this);
        this.responsibilityTextChange = this.responsibilityTextChange.bind(this);
        this.sendReport = this.sendReport.bind(this);
        this.closePages = this.closePages.bind(this);
        this.compilateText = this.compilateText.bind(this);


    }

    compilateText(){
        var data = this.props.data;
        var groupData = data["group_data"];
        var replacementData = data["replacement_data"];

        var usualLessons = [];
        for (var i = 0; i< groupData["usual"]["groups"].length; i++){
            usualLessons.push(<p>{groupData["usual"]["groups"][i]["name"]} - <b>{groupData["usual"]["groups"][i]["lessons_num"]}</b></p>)
        }

        usualLessons.push(<p>Список - <b>{groupData["usual"]["lesson_list"]}</b></p>);
        usualLessons.push(<p>Количество уроков - <b>{groupData["usual"]["lessons_num"]}</b></p>);

        var individualLessons = [];
        for (var i = 0; i< groupData["individual"]["groups"].length; i++){
            individualLessons.push(<p>{groupData["individual"]["groups"][i]["name"]} - <b>{groupData["individual"]["groups"][i]["lessons_num"]}</b></p>);
        }
        individualLessons.push(<p>Количество уроков - <b>{groupData["individual"]["lessons_num"]}</b></p>);

        var corporateLessons = [];
        for (var i = 0; i< groupData["corporate"]["groups"].length; i++){
            corporateLessons.push(<p>{groupData["corporate"]["groups"][i]["name"]} - <b>{groupData["corporate"]["groups"][i]["lessons_num"]}</b></p>);
        }
        corporateLessons.push(<p>Количество уроков - <b>{groupData["corporate"]["lessons_num"]}</b></p>);

        var replaced = [];
        var replacedData = replacementData["replaced"];
        for (var i=0;i<replacedData["lessons"].length;i++){
            replaced.push(<p>{replacedData["lessons"][i]["date"]} - {replacedData["lessons"][i]["name"]} - {replacedData["lessons"][i]["original_teacher"]}</p>) ;
        }
        replaced.push(<p>Всего замен: <b>{replacedData["lessons"].length}</b></p>);

        var wasReplaced = [];
        var wasReplacedData = replacementData["was_replaced"];
        for (var i=0;i<wasReplacedData["lessons"].length;i++){
            wasReplaced.push(<p>
                {wasReplacedData["lessons"][i]["date"]} -
                {wasReplacedData["lessons"][i]["name"]} -
                {wasReplacedData["lessons"][i]["sub_teacher"]} -
                {wasReplacedData["lessons"][i]["sickness"]}
            </p>);
        }
        wasReplaced.push(<p>Всего замен: <b>{wasReplacedData["lessons"].length}</b></p>);



        var text =  <div>
                        <h3>Количество уроков, которые я провел в течении месяца:</h3>
                        <h4>Обычные уроки:</h4>
                        {usualLessons}
                        <h4>Индивидуальные уроки:</h4>
                        {individualLessons}
                        <h4>Корпоративные уроки:</h4>
                        {corporateLessons}

                        <h3>Замены:</h3>
                        <h4>Я заменял(а):</h4>
                        {replaced}
                        <h4>Меня заменяли:</h4>
                        {wasReplaced}

                    </div>;

        return text;
    }

    openDataPage(){
        this.props.disableHoverMenu();
        this.setState({
            dataOpen: true,
        });
        this.props.interface(false);
    }
    openInfoPage(){
        this.props.disableHoverMenu();
        this.setState({
            infoOpen: true,
        });
        this.props.interface(false);
    }
    closePages(){
        this.setState({
            infoOpen: false,
            dataOpen: false,
        });
        this.props.enableHoverMenu();
        this.props.interface(true);
    }
    sendReport(){
        var id = this.props.data["id"];
        console.log(id);
        console.log(this.state.sportSpanding);
        console.log(this.state.sportPlaces);
        console.log(this.state.comment);
        console.log(this.state.responsibility);

        var postData = {
            id: id,
            sport_spending_value: this.state.sportSpanding,
            sport_place: this.state.sportPlaces,
            responsibility: this.state.responsibility,
            comment: this.state.comment
        };

        axios.defaults.withCredentials = true;
        axios.post(`http://a.e-a-s-y.ru/api/teacher_profile/update_report.json`, postData)
        .then(res => {
            var data = res.data;
            console.log(data);
            alert("Данные сохранены.")
        })
        .catch((error) => {
            console.log(error);
        });
    }

    sportTextChange(event){
        this.setState({
            sportSpanding: event.target.value,
        });
    }
    whereTextChange(event){
        this.setState({
            sportPlaces: event.target.value,
        });
    }
    commentTextChange(event){
        this.setState({
            comment: event.target.value,
        });
    }
    responsibilityTextChange(event){
        this.setState({
            responsibility: event.target.value,
        });
    }

	render() {
		return (
            <div>
                <div className='report'>

                    <div className="popup-section submit info" onClick={() => this.openInfoPage()}>
                        !
                    </div>

                    <div className="popup-section submit data" onClick={() => this.openDataPage()}>
                        Информация
                    </div>

                    <div className="popup-section">
                        <span>Траты на спорт</span>
                        <input type="text" tag="sport" onChange={this.sportTextChange} value={this.state.sportSpanding}/>
                    </div>

                    <div className="popup-section">
                        <span>Куда ходите</span>
                        <input type="text" tag="where" onChange={this.whereTextChange} value={this.state.sportPlaces}/>
                    </div>

                    <div className="popup-section">
                        <span>Комментарий</span>
                        <textarea rows="3" tag="comment" onChange={this.commentTextChange} value={this.state.comment}/>
                    </div>

                    <div className="popup-section">
                        <span>Ответственность</span>
                        <input type="text" tag="responsibility" onChange={this.responsibilityTextChange} value={this.state.responsibility}/>
                    </div>

                    <div className="popup-section submit" onClick={() => this.sendReport()}>
                        Сохранить
                        <div className="right-button"><img src={ArrowImage}></img></div>
                    </div>

                </div>

                <ReactCSSTransitionGroup transitionName="homework-popup-animation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {this.state.infoOpen && <ReportInfoPage title={"Инструкции"} text={text} close={this.closePages} />}
                </ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup transitionName="homework-popup-animation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {this.state.dataOpen && <ReportInfoPage title={"Отчет за месяц"} text={this.compilateText()} close={this.closePages} />}
                </ReactCSSTransitionGroup>
            </div>


		);
  	}
}
const text = <div><p>Дорогой учитель, нужно проверить количество отведенных тобою уроков, чтобы количество соответствовало реальности
          (так как на основе этих данных рассчитывается твоя зарплата и зарплата другого учителя). </p>

        <p>Если ты нашел расхождения:
        <ul><li>в обычных группах - проставь посещаемость за все дни месяца;</li>
          <li>в индивидуальных уроках - проверь длительность этих уроков и посещения за эти уроки;</li>
          <li>если нет информации о корпорации, в которой ты ведешь уроки, проверь, есть ли группа, в которой ты ведешь;</li></ul></p>


        <p>Если ты кого-то заменял, а информации об этом нет, скажи этому учителю, чтобы отметил это в своих группах;</p>

        <p>Если тебя заменяли в этом месяце, нужно внести эту информацию:
        <ul><li>зайди в группу, в которой тебя заменяли;</li>
          <li>нажми на вкладку «Уроки» и выбери дату урока;</li>
          <li>нажми «Редактировать»;</li>
          <li>в строке «Заменяющий учитель» укажи имя того, кто тебя заменял;</li>
          <li>нажми галочку «По болезни» (если это было по болезни)</li></ul>
        </p></div>;


export default ReportPage;
