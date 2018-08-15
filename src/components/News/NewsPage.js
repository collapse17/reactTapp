import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
import './NewsPage.css';
import News from './News';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import on_1 from '../../images/on_1.png';
import on_2 from '../../images/on_2.png';
import on_16 from '../../images/on_16.png';

class NewsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsPage: false,
            title: "",
            date: "",
            text: "",
            image: "",
            news: [],
        };
        this.openNews = this.openNews.bind(this);
        this.closeNews = this.closeNews.bind(this);
        this.loadingData = this.loadingData.bind(this);
        this.getFormatedDate = this.getFormatedDate.bind(this);
    }
    componentDidMount(){
        this.loadingData();
    }
    loadingData(){
        axios.defaults.withCredentials = true;
        axios.get(`http://a.e-a-s-y.ru/api/posts.json`, {withCredentials: true})
        .then(res => {
            console.log(res);
            var data = res.data;
            var result = [];
            for (var i=0; i<data.length; i++){
                result.push({title:data[i]['title'], date: this.getFormatedDate(data[i]['created_at']), text: data[i]['body'], image:data[i]['photo']});
            }
            this.setState({
                news: result,
            });
            //this.updateDimansions();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    clearText(text){
        var textWithBr = text
        var expression = "<br>";

        var index = 0
        while (index != -1) {
            index = textWithBr.indexOf(expression)
            if (index === -1) {
                break;
            }
            var textBefore = textWithBr.substr(0,index) + "\n\r";
            var textAfter = textWithBr.substr(index+4)

            textWithBr = textBefore + textAfter;
        }

        return textWithBr;
    }

    openNews(index) {
        var newsData = this.state.news;

        this.setState({
            newsPage: true,
            title: newsData[index]['title'],
            date: newsData[index]['date'],
            text: this.clearText(newsData[index]['text']),
            image: newsData[index]['image'],
        });

        this.props.disableHoverMenu();
    }
    closeNews() {
        this.setState({
            newsPage: false,
            title: "",
            date: "",
            text: "",
            image: "",
        });

        this.props.enableHoverMenu();
    }

    getFormatedDate(str){
        var year = [
            {name: "Января"}, {name: "Февраля"}, {name: "Марта"}, {name: "Апреля"},
            {name: "Мая"}, {name: "Июня"}, {name: "Июля"}, {name: "Августа"},
            {name: "Сентября"}, {name: "Октября"}, {name: "Ноября"}, {name: "Декабря"},
        ];
        var date = str.substr(0,10);
        var dateArr = date.split("-");
        if (dateArr.length===3){
            var result = dateArr[2]+" "+year[parseInt(dateArr[1], 10)-1].name;
            return result;
        } else {
            return "";
        }
    }



    render() {
        //var newsData = this.props.news;
        var newsData = this.state.news;
        //console.log(newsData.length);
        //const gradient = "linear-gradient(39deg, rgba(0,0,0,0.00) 82%, rgba(0,0,0,0.50) 99%), linear-gradient(212deg, rgba(255,255,255,0.1) 0%, #C70505 92%)";
        const gradient = "linear-gradient(-168deg, rgba(255,255,255,0.00) 10%, #C70505 99%)";
		return (
            <div>
				<ReactSwipe key={newsData.length} className="carousel news-page-container" swipeOptions={{continuous: false}} >
				{newsData.map((item, index) =>
					<div key={index} className="news-container" onClick={() => this.openNews(index)}>
						<div className="news-item" style={{background: gradient + ", url(" + item.image + ")"}}>

							<div className="news-title">
                                <div className="news-date">{item.date}</div>
                                {item.title}
                            </div>
						</div>
					</div>
				)}
				</ReactSwipe>
				<ReactCSSTransitionGroup transitionName="homework-popup-animation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
					{this.state.newsPage && <News title={this.state.title} text={this.state.text} date={this.state.date} image={this.state.image} closeNews={this.closeNews} />}
				</ReactCSSTransitionGroup>
            </div>
		);
  	}
}
export default NewsPage;
