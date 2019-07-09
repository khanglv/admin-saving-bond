import React, {Component} from 'react';
import {getListFrefix} from '../../api/api';

class Home extends Component{
    componentDidMount(){
        getListFrefix();
    }

    render(){
        return(
            <div style={{backgroundColor: '#fff', width: '100%', height: '100%', paddingTop: '10vh'}} type="flex" align="middle">
                <img alt="" src="/background.png" />
            </div>
        )
    }
}

export default Home;
