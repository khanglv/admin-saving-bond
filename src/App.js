import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './stores/configureStore';
import RouteURL from './routers/Router';

function App() {
  return (
    <Provider store={store} >
      {<RouteURL />}
    </Provider>
  );
}

export default App;
