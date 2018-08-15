import React, { Component } from 'react';
import './Groups.css';
import Logo from '../../images/logo.png';
import axios from 'axios';

class Groups extends Component {

    constructor(props) {
		super(props);
		this.state = {
            selectedDivId : -1,
		};
        this.getSelectedClasses = this.getSelectedClasses.bind(this);
        this.selectGroup = this.selectGroup.bind(this);
        this.completeGroupSelect = this.completeGroupSelect.bind(this);
	}

    getSelectedClasses(index){
        console.log("getSelectedClasses: index:"+index+" "+this.state.selectedDivId);
        if(index === this.state.selectedDivId){
            return 'group group-select';
        } else {
            return 'group';
        }
    }

    selectGroup(index){
        console.log("selectGroup: index:"+index);
        this.setState({
            selectedDivId : index,
        });
        this.forceUpdate();
        this.completeGroupSelect(index);
    }
    completeGroupSelect(index){
        //var index = this.state.selectedDivId;
        var id = this.props.groups[index]['id'];


        axios.post(`http://a.e-a-s-y.ru/api/groups/`+id+`/select.json`, {withCredentials:true})
        .then(res => {
            this.props.complete();
        })
        .catch(function (error) {
            console.log(error);
        });

    }

	render() {
		var groups = this.props.groups;
		return (
			<div className="groups">
                <img className="groups-logo" src={Logo} alt=""/>
                <div className="groups-title">Отлично!<br/>Ты состоишь <br/>в следующих группах!</div>
                <div className="groups-subtitle">Выбери, с какой начать работу!</div>

                {groups.map((group, key) =>
                    <div className={this.getSelectedClasses(key)} onClick={() => this.selectGroup(key)}>{group.subject_name}</div>
                )}
			</div>
		);
  	}

}

export default Groups;
