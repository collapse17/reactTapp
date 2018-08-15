import React, { Component } from 'react';
import './Loading.css';
import LoadingGif from '../../images/loadingGif.gif';

class Loading extends Component {
	render() {
		return (
			<div className='loading-screen'>
                <div className='loading-text'>
					<img src={LoadingGif} alt="" />
				</div>
			</div>
		);
  	}

}

export default Loading;
