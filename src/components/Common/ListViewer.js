import React, { Component } from 'react';
import './ListViewer.css';

class ListViewer extends Component {
	render() {
		var { content, title } = this.props;
		return (
			<div className='viewer-container'>
				<div className='light-bg'></div>
				<div className='top'>
					<div className='title-block'>
						{title}
					</div>
				</div>
				<div className='back' onClick={this.props.closeViewer}></div>
				{content}
			</div>
		);
  	}

}

export default ListViewer;