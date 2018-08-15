import React, { Component } from 'react';
import './MyStudents.css';
import RowImage from '../../images/arrow_left.png';
import StudentImage from '../../images/student_photo.png';
import PhoneImage from '../../images/phone_light.png';

class MyStudents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: this.props.students,
        };

        this.searchChange = this.searchChange.bind(this);
    }

    searchChange(event){
        var query = event.target.value.toLowerCase();
        if (query.length === 0){
            this.setState({
                students:this.props.students,
            });
        } else {
            var array = [];
            for (var i=0;i<this.props.students.length;i++){
                var item = this.props.students[i];
                if (item["student_name"]!==null){
                    var name = item["student_name"].toLowerCase();
                    if (name.indexOf(query) !== -1){
                        array.push(item);
                    }
                }
            }
            this.setState({
                students:array,
            });
        }
    }
    searchClick(event){
        if (event.target.value === "Поиск"){
            event.target.value="";
        }
    }

    render() {
		return (
            <div>
                <div className="light-BG"></div>
                <div className="popup-container">
                    <div className="popup-content">
                        <div className="red-block"></div>
                        <div className="popup-back-button" onClick={this.props.close}>
                            <img src={RowImage} alt=""></img>
                        </div>
                        <h1>Мои студенты</h1>
                        <div className="popup-section common-button">
                            <input type="text" style={{width:"100%"}} defaultValue="Поиск" onChange={this.searchChange} onClick={this.searchClick} />
                        </div>
                        {this.state.students.map((item, index) =>

                            <div className="student-card" key={index}>
                                <img className="card-avatar" src={"http://a.e-a-s-y.ru" + item["photo"]} alt=""></img>
                                <span className="student-card-title">{item["student_name"]}</span>
                                <span className="student-card-subtitle">{item["birthday"]}</span>
                                <span className="student-card-subtitle">{item["group_name"]}</span>
                                <a style={{display:'inline-block'}} href={"tel:" + item['phone']}><div className="student-card-phone"><img src={PhoneImage}></img></div></a>
                            </div>

                        )}

                        <img className="popup-image" src={this.props.image} alt=""></img>
                    </div>
                </div>
            </div>
		);
  	}
}
export default MyStudents
