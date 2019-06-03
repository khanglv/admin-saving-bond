import React, {Component} from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';

import {Error404} from '../components/Error404/Error404';
import Login from '../components/Login/Login';
import {
    FHome,
    FBond
} from './MainGeneral';

class RouteURL extends Component{
    constructor(props){
        super(props);
        this.state = {
            isShowLoading: true
        }
    }
    componentDidMount(){
        this.setState({isShowLoading : false});
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     var currentRouteName = window.location.pathname;
    //     if(currentRouteName!=='/login' && !accessToken){
    //         window.location.href = "/login";
    //         return false;
    //     }
    //     return true;
    // }

    render() {
        return (
                this.state.isShowLoading ? 
                    <div className="lds-spinner">
                        <div></div><div></div><div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
                : <BrowserRouter>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route exact path="/" component={FHome} />
                        <Route exact path="/home" component={FHome} />
                        <Route exact path="/asset-bond" component={FBond} />
                        {/* nhập sai đường dẫn */}
                        <Route exact path="*" component={Error404} />
                    </Switch>
                </BrowserRouter>
        );
    }
}

export default RouteURL;