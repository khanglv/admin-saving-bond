import React, { Component } from 'react';
import SiderBarMenu from '../components/SiderBarMenu/SiderBarMenu';
import {removeStorageToken} from '../api/storage';
import Home from '../components/Home/Home';
import AssetBond from '../components/Asset/AssetBond';
import Frefix from '../components/Frefix/Frefix';
import Company from '../components/Company/Company';
import PaymentPeriod from '../components/PaymentPeriod/PaymentPeriod';
import BankInterest from '../components/BankInterest/BankInterest';
import FeeTrace from '../components/FeeTrade/FeeTrade';

import { Layout, Avatar, Card, Button } from 'antd';
const { Meta } = Card;
const { Header } = Layout;

const withSidebar = (View) =>
    <div>
        <div>
            <Layout>
                <HeaderCom />
                <Layout>
                    <SiderBarMenu />
                    <Layout style={{height: '93vh'}}>
                        <View/>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    </div>

export const FHome = ()=> withSidebar(Home)
export const FBond = ()=> withSidebar(AssetBond)
export const FFrefix = ()=> withSidebar(Frefix)
export const FCompany = ()=> withSidebar(Company)
export const FPaymentPeriod = ()=> withSidebar(PaymentPeriod)
export const FBankInterest = ()=> withSidebar(BankInterest)
export const FFeeTrace = ()=> withSidebar(FeeTrace)

class HeaderCom extends Component{
    constructor(props){
        super(props);
        this.state = {
            isShowCardAccount: false,
            accountInfo: JSON.parse(localStorage.getItem('accountInfoKey'))
        }
    }
    onActionAccount = ()=>{
        this.setState((prew)=>({isShowCardAccount: !prew.isShowCardAccount}));
    }

    render(){
        return (
            <Header style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
                <b style={{ fontFamily: 'initial', fontSize: 18 }}>V-BONDS</b>
                <div className="pointer" onClick={this.onActionAccount} style={styles.accountHeader}><Avatar style={{ backgroundColor: '#438599' }} icon="user" />&nbsp;&nbsp;{this.state.accountInfo ? this.state.accountInfo[0].USERNAME : "Admin"}</div>
                {this.state.isShowCardAccount ? <CardAccount visible={true}/> : null}
            </Header>
        )
    }
}

class CardAccount extends Component {
    constructor(props){
        super(props);
        this.state = {
            accountInfo: JSON.parse(localStorage.getItem('accountInfoKey'))
        };
    }
    onLogout = async()=>{
        await removeStorageToken();
        window.location.href = "/login";
    }
    render(){
        return(
            <Card size="small" style={styles.customFormAccount} 
                actions={
                    [<Button>Chỉnh sửa</Button>, <Button onClick={this.onLogout} type="danger">Đăng xuất</Button>]}
            >
                <Meta
                    avatar={<Avatar style={{ backgroundColor: '#438599' }} icon="user" />}
                    title={this.state.accountInfo ? this.state.accountInfo[0].USERNAME : "Admin"}
                    description={this.state.accountInfo ? this.state.accountInfo[0].FullName : "This is admin"}
                />
            </Card>
        )
    }
}

const styles = {
    accountHeader:{
        position: 'absolute',
        right: 0,
        height: '7vh',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#0e303a'
    },
    customFormAccount: {
        width: '17rem',
        position: 'absolute', 
        right: '1rem', 
        top: '7.3vh', 
        zIndex: '10000',
        boxShadow: '0 5px 6px rgba(0,0,0,0.23)'
    }
}