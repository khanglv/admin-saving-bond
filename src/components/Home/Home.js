import React, {Component} from 'react';

class Home extends Component{
    
    render(){
        return(
            <div style={styles.loginForm}>
                
            </div>
        )
    }
}

export default Home;

const styles = {
    loginForm:{
        background: '#F2F2F2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    MloginForm:{
        backgroundColor: '#fff',
        width: '20%',
        padding: 10,
        borderRadius: 10,
        boxShadow: '0 5px 8px rgba(0,0,0,0.23)'
    }
}