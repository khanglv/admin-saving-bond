import React, { Component } from 'react';
import './style.css';
import { Layout, Menu, Icon } from 'antd';
import { withRouter } from "react-router";

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const LIST_ROUTE_CONFIG = ['/frefix', '/command-type', '/trade-status', '/branch-vcsc'];
const LIST_ROUTE_DATABASE = ['/frefix', '/company', '/payment-term', '/bank-interest', '/fee-trade', '/bond-type', '/command-type', 
                           '/trade-status', '/branch-vcsc', '/investor-type', '/investor', '/interest-rate', '/contract-vcsc', '/day-interest-year'];
const LIST_ROUTE_GENERAL = ['/asset-bond', '/ensure-asset'];

const checkRouteOpenDefaultKey = ()=> {
    for(let i = 0; i < LIST_ROUTE_CONFIG.length; i++){
        if(LIST_ROUTE_CONFIG[i] === window.location.pathname){
            return 'configs';
        }
    }
    for(let i = 0; i < LIST_ROUTE_GENERAL.length; i++){
        if(LIST_ROUTE_GENERAL[i] === window.location.pathname){
            return 'general';
        }
    }
    for(let i = 0; i < LIST_ROUTE_DATABASE.length; i++){
        if(LIST_ROUTE_DATABASE[i] === window.location.pathname){
            return 'database';
        }
    }
}

class SiderBarMenu extends Component {

    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
            isOpen: false,
            dataSendLogout: "",
            current: window.location.pathname,
            openDefaultKey: checkRouteOpenDefaultKey()
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
            case "/ensure-asset":
                this.props.history.push('/ensure-asset');
                break;
            case "/contract-vcsc":
                this.props.history.push('/contract-vcsc');
                break;
            case "/day-interest-year":
                this.props.history.push('/day-interest-year');
                break;
            case "/frefix":
                this.props.history.push('/frefix');
                break;
            case "/company":
                this.props.history.push('/company');
                break;
            case "/payment-term":
                this.props.history.push('/payment-term');
                break;
            case "/bank-interest":
                this.props.history.push('/bank-interest');
                break;
            case "/fee-trade":
                this.props.history.push('/fee-trade');
                break;
            case "/bond-type":
                this.props.history.push('/bond-type');
                break;
            case "/command-type":
                this.props.history.push('/command-type');
                break;
            case "/trade-status":
                this.props.history.push('/trade-status');
                break;
            case "/branch-vcsc":
                this.props.history.push('/branch-vcsc');
                break;
            case "/investor":
                this.props.history.push('/investor');
                break;
            case "/interest-rate":
                this.props.history.push('/interest-rate');
                break;    
            default:
                break;
        }
    };

    render() {
        return (
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} 
                    style={{
                        overflow: 'auto',
                        height: '93vh',
                    }}
                >
                    <Icon
                        className="trigger"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />
                    <Menu theme="dark" mode="inline"
                     defaultOpenKeys={[this.state.openDefaultKey]} selectedKeys={[this.state.current]} onClick={this.handleClick}>
                         <SubMenu
                            key="database"
                            title={
                                <span>
                                    <Icon type="database" />
                                    <span className="middle-text">Database</span>
                                </span>
                            }
                        >
                            <Menu.Item key="/company">
                                <span className="middle-text">Tổ chức phát hành</span>
                            </Menu.Item>
                            <Menu.Item key="/bank-interest">
                                <span className="middle-text">Lãi suất ngân hàng</span>
                            </Menu.Item>
                            <Menu.Item key="/fee-trade">
                                <span className="middle-text">Chi phí giao dịch</span>
                            </Menu.Item>
                            <Menu.Item key="/payment-term">
                                <span className="middle-text">Kỳ hạn thanh toán</span>
                            </Menu.Item>
                            <Menu.Item key="/bond-type">
                                <span className="middle-text">Loại trái phiếu</span>
                            </Menu.Item>
                            <Menu.Item key="/investor">
                                <span className="middle-text">Nhà đầu tư</span>
                            </Menu.Item>
                            {/* <Menu.Item key="/interest-rate">
                                <span className="middle-text">Lãi suất</span>
                            </Menu.Item> */}
                            <Menu.Item key="/contract-vcsc">
                                <span className="middle-text">Hợp đồng mua VCSC</span>
                            </Menu.Item>
                            <Menu.Item key="/day-interest-year">
                                <span className="middle-text">Ngày tính lãi trong năm</span>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="general"
                            title={
                                <span>
                                    <Icon type="control" />
                                    <span className="middle-text">General</span>
                                </span>
                            }
                        >
                            <Menu.Item key="/asset-bond">
                                <span className="middle-text">Trái phiếu</span>
                            </Menu.Item>
                            <Menu.Item key="/ensure-asset">
                                <span className="middle-text">Tài sản đảm bảo</span>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="configs"
                            title={
                                <span>
                                    <Icon type="tool" />
                                    <span className="middle-text">Configs</span>
                                </span>
                            }
                        >
                            <Menu.Item key="/frefix">
                                <span className="middle-text">Prefix</span>
                            </Menu.Item>
                            <Menu.Item key="/command-type">
                                <span className="middle-text">Loại Lệnh</span>
                            </Menu.Item>
                            <Menu.Item key="/trade-status">
                                <span className="middle-text">Trạng thái giao dịch</span>
                            </Menu.Item>
                            <Menu.Item key="/branch-vcsc">
                                <span className="middle-text">Chi nhánh VCSC</span>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
        );
    }
};

export default withRouter(SiderBarMenu);