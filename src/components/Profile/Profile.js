import React, { Component } from 'react';
import './Profile.css';
import ReactSwipe from 'react-swipe';
import ProfilePage from './ProfilePage';
import ReportPage from './ReportPage';
import axios from 'axios';
import on_7 from '../../images/on_7.png';
import on_8 from '../../images/on_8.png';
import on_9 from '../../images/on_9.png';
import on_10 from '../../images/on_10.png';
import on_11 from '../../images/on_11.png';
import on_12 from '../../images/on_12.png';
import on_12_1 from '../../images/on_12_1.png';
import on_13 from '../../images/on_13.png';
import on_13_1 from '../../images/on_13_1.png';
import on_15 from '../../images/on_15.png';
import on_16 from '../../images/on_16.png';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageList: [{title:'Профиль'},{title:"Отчет"}],
            activePage: 0,
            name: "",
            photo: "",
            students: [],
            schools:[],
            events: [],
            notifications: [],
            report: [],
            loaded : false,
        };
        this.getTitle = this.getTitle.bind(this);
        this.setActivePage = this.setActivePage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.loadingData = this.loadingData.bind(this);
    }

    componentDidMount(){
        this.loadingData();
    }
    loadingData(){
        axios.defaults.withCredentials = true;

        axios.get(`http://a.e-a-s-y.ru/api/teacher_profile.json`, {withCredentials:true})
        .then(res => {
            var data = res.data;
            console.log(data);

            this.setState({
                name: data["name"],
                photo: data["photo"],
                students: data["students"],
                schools: data["schools"],
                events: data["events"],
                notifications: data["notifications"],
                report: data["report_data"],
                loaded:true,
            });

        })
        .catch((error) => {
            console.log(error);
        });
    }

    getTitle(index){
        const activeIndex = this.state.activePage;
        const pagesList = this.state.pageList;

        if (activeIndex === index){
            return (<div className="profile-page-title active visible">{pagesList[index].title}</div>);
        } else if ((activeIndex+1) === (index)){
            return (<div className="profile-page-title visible" onClick={this.nextPage}>{pagesList[index].title}</div>);
        }
    }
    setActivePage(index){
        this.setState(
        {
           activePage: index,
        });
    }
    nextPage() {
        this.refs.pageSwipe.next();
    }

	render() {

        var notifications = this.state.notifications;

		return (
            <div>


                <ReactSwipe ref="pageSwipe" id="reactSwipe" key={this.state.loaded ? 2 : 1} className="profileContainer" swipeOptions={
                    {
                        continuous: false,
                        callback: (index) => {
                            this.setActivePage(index);
                            console.log("callback");
                        },
                        transitionEnd() {
                            console.log("end");
                        },
                    }
                }>
                    <div className="profile-page" style={{zIndex:1}}>
                        {this.getTitle(0)}
                        <ProfilePage loaded={this.state.loaded} interface={this.props.interface} english_name={this.state.name} photo={this.state.photo} notifications={this.state.notifications} schools={this.state.schools} events={this.state.events} students={this.state.students} disableHoverMenu={this.props.disableHoverMenu} enableHoverMenu = {this.props.enableHoverMenu}/>
                    </div>
                    {this.state.loaded &&
                        <div className="profile-page">
                            {this.getTitle(1)}
                            <ReportPage interface={this.props.interface} data={this.state.report}  disableHoverMenu={this.props.disableHoverMenu} enableHoverMenu = {this.props.enableHoverMenu}/>
                        </div>
                    }

                </ReactSwipe>

            </div>
		);
  	}

}


export default Profile;
