import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox, Avatar, notification } from 'antd';
import {connect} from 'react-redux';
import {login, loginRequest} from '../../stores/actions/loginAction';

const openNotificationWithIcon = (type, data) => {
    notification[type]({
        message: 'Thông báo',
        description: data,
    });
};

class Login extends Component{

    constructor(props) {
        super(props);

        this.state = {
            idUserName: "",
            password: "",
            isRememberAccount: false
        };
    }

    componentDidMount() {
        let obj = JSON.parse(localStorage.getItem('keyConfigLogin'));
        if (obj) {
            this.setState({ idUserName: obj.idUserName, password: obj.password, isRememberAccount: true });
        }
    }

    onChangeAccount = (event)=>{
        this.setState({idUserName: event.target.value});
    }

    onChangePassword = (event)=>{
        this.setState({password: event.target.value});
    }

    handleRememberAccount = ()=>{
        this.setState((prev)=>({isRememberAccount: !prev.isRememberAccount}));
    }

    onSubmit = async()=>{
        if(!this.state.idUserName || !this.state.password){
            openNotificationWithIcon('warning', 'Bạn chưa nhập tài khoản hoặc mật khẩu, vui lòng kiểm tra lại.');
        }else{
            let configLogin = {idUserName: '', password: ''};
            if(this.state.isRememberAccount){
                configLogin.idUserName = this.state.idUserName;
                configLogin.password = this.state.password;
            }
            localStorage.setItem("keyConfigLogin", JSON.stringify(configLogin));
            try {
                const res = await this.props.onLogin(this.state.idUserName, this.state.password);
                if(res.status === 404){
                    openNotificationWithIcon('error', 'Tài khoản hoặc mật khẩu không đúng!!!');
                }else{
                    this.props.history.push('/home');
                }
            } catch (error) {
                openNotificationWithIcon('error', 'Lỗi: ' + error);
            }
        }
    }

    // static getDerivedStateFromProps(nextProps) {
    //     if (!nextProps.isFetching && !nextProps.isAuthenticated && nextProps.messageAlert) {
    //         openNotificationWithIcon('error', 'Tài khoản hoặc mật khẩu không đúng!!!');
            
    //     }
    //     if(nextProps.isFetching && nextProps.isAuthenticated){
    //         nextProps.history.push('/home');
    //     }
    //     return null;
    // }

    render(){
        return(
            <div style={styles.loginForm} className="setBackgroundLogin">
                <Form onSubmit={this.handleSubmit} style={styles.MloginForm} className="login-form">
                    <div className="text-center">
                        <Avatar style={{ backgroundColor: '#4b79a1' }} size={100} icon="user" />
                        <div style={{color: '#0e617b', fontSize: 26}}>Admin</div>
                    </div>
                    <Form.Item style={{marginTop: '3rem'}}>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            value={this.state.idUserName} onChange={this.onChangeAccount}
                            placeholder="Username"
                        />
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            value={this.state.password} onChange={this.onChangePassword}
                            placeholder="Password"
                        />
                        <div>
                            <Checkbox onChange={this.handleRememberAccount} checked={this.state.isRememberAccount}>Remember me</Checkbox>
                            <a className="login-form-forgot" href="/">
                                Forgot password
                            </a>
                        </div>
                        <Button type="primary" htmlType="submit" className="login-form-button right" onClick={this.onSubmit}>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        messageAlert: state.login.message,
        token: state.login.accessToken,
        isFetching: state.login.isFetching,
        isAuthenticated: state.login.isAuthenticated,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onLogin: (idUserName, password)=> dispatch(login(idUserName, password)),
        onLoginRequest: (idUserName)=> dispatch(loginRequest(idUserName)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Login);

const styles = {
    loginForm:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundRepeat : 'no-repeat',
        backgroundSize: 'cover',
    },
    MloginForm:{
        backgroundColor: '#fff',
        width: '20%',
        padding: 15,
        borderRadius: 10,
        boxShadow: '0 5px 8px rgba(0,0,0,0.23)',
        opacity: '1.0'
    }
}