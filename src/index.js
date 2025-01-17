import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './progress.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
