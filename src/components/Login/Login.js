import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

class Login extends Component{
    onLogin = ()=>{
        this.props.history.push('/home');
    }
    render(){
        return(
            <div style={styles.loginForm}>
                <Form onSubmit={this.handleSubmit} style={styles.MloginForm} className="login-form">
                    <div className="text-center">
                        <p style={{color: '#0e617b', fontSize: 26}}>Admin</p>
                    </div>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />
                        <div>
                            <Checkbox>Remember me</Checkbox>
                            <a className="login-form-forgot" href="/">
                                Forgot password
                            </a>
                        </div>
                        <Button type="primary" htmlType="submit" className="login-form-button right" onClick={this.onLogin}>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Login;

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
        padding: 15,
        borderRadius: 10,
        boxShadow: '0 5px 8px rgba(0,0,0,0.23)'
    }
}