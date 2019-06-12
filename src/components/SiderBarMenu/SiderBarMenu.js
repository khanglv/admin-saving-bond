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
            case "/asset-bond":
                this.props.history.push('/asset-bond');
                break;
            case "/frefix":
                this.props.history.push('/frefix');
                break;
            case "/company":
                this.props.history.push('/company');
                break;
            case "/payment-period":
                this.props.history.push('/payment-period');
                break;
            case "/bank-interest":
                this.props.history.push('/bank-interest');
                break;      
            case "/fee-trade":
                this.props.history.push('/fee-trade');
                break;  
            default:
                break;
        }
    };

    render() {
        return (
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <Icon
                        className="trigger"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />
                    <Menu theme="dark" mode="inline" defaultOpenKeys={['sub1']} selectedKeys={[this.state.current]} onClick={this.handleClick}>
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="tool" />
                                    <span className="middle-text">Configs</span>
                                </span>
                            }
                        >
                            <Menu.Item key="/asset-bond">
                                <span className="middle-text">Trái phiếu</span>
                            </Menu.Item>
                            <Menu.Item key="/frefix">
                                <span className="middle-text">Frefix</span>
                            </Menu.Item>
                            <Menu.Item key="/company">
                                <span className="middle-text">Công ty</span>
                            </Menu.Item>
                            <Menu.Item key="/bank-interest">
                                <span className="middle-text">Lãi suất ngân hàng</span>
                            </Menu.Item>
                            <Menu.Item key="/fee-trade">
                                <span className="middle-text">Chi phí giao dịch</span>
                            </Menu.Item>
                            <Menu.Item key="/payment-period">
                                <span className="middle-text">Kỳ hạn thanh toán</span>
                            </Menu.Item>
                        </SubMenu>
                        
                    </Menu>
                </Sider>
        );
    }
};

export default withRouter(SiderBarMenu);