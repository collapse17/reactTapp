import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
//import NewsPage from './components/NewsPage';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App /> , document.getElementById('app'));
//ReactDOM.render(<NewsPage news={newsData} />, document.getElementById('content'));
registerServiceWorker();
