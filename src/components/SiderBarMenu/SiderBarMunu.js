import React, { Component } from 'react';
import './style.css';
import { Layout, Menu, Icon } from 'antd';
import { withRouter } from "react-router";

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SiderBarMenu extends Component {

    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
            isOpen: false,
            dataSendLogout: "",
            current: window.location.pathname,
        };
    }

    onConFirmLogout = ()=>{
        this.setState({isOpen: true, dataSendLogout: 'Bạn có muốn Thoát khỏi trang hay không?'});
    }

    onLogout = ()=>{
        window.location.href = "/login";
    }
    
    onCloseAlert = ()=>{
        this.setState({isOpen: false});
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
        switch(e.key){
            case "/home": 
                this.props.history.push('/home');
                break;
            case "/directive":
                this.props.history.push('/directive');
                break;
            case "/asset-bond":
                this.props.history.push('/asset-bond');
                break;
            case "/list-sold-bond":
                this.props.history.push('/list-sold-bond');
                break;
            case "/bond-investor":
                this.props.history.push('/bond-investor');
                break;    
            default:
                break;
        }
    };

    render() {
        return (
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    {/* <ModalPopup title="Xác nhận" open={this.state.isOpen} onClose={this.onCloseAlert} dataSend={this.state.dataSendLogout} onActionOK={this.onLogout}/> */}
                    <div className="logo">
                        {!this.state.collapsed ? <span>KhangLv@vcsc</span> : null}
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </div>
                    <Menu theme="dark" mode="inline" defaultOpenKeys={['']} selectedKeys={[this.state.current]} onClick={this.handleClick}>
                        <Menu.Item key="/home">
                            <Icon type="home" />
                            <span className="middle-text">Trang chủ</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                                    <Icon type="database" />
                                    <span>Database</span>
                                </span>
                            }
                        >
                            <Menu.Item key="/asset-bond">
                                <Icon type="rocket" />
                                <span className="middle-text">Trái phiếu</span>
                            </Menu.Item>
                            <Menu.Item key="/list-sold-bond">
                                <Icon type="history" />
                                <span className="middle-text">Trái phiếu đã bán</span>
                            </Menu.Item>
                        </SubMenu>
                        
                        <Menu.Item key="key_logout" onClick={this.onConFirmLogout} style={{position: 'absolute', bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.2)'}}>
                            <Icon type="logout" />
                            <span className="middle-text">Đăng xuất</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
        );
    }
};

export default withRouter(SiderBarMenu);