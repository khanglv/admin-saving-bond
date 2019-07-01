import React, {Component} from 'react';
import {getListCommandType} from '../../api/api';

class Home extends Component{
    componentDidMount(){
        getListCommandType();
    }

    render(){
        return(
            <div style={{backgroundColor: '#fff', width: '100%', height: '100%', paddingTop: '10vh'}} className="text-center">
                <img alt="" src="/background.png" />
            </div>
        )
    }
}

export default Home;
