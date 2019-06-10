import React, { Component } from 'react';
import SiderBarMenu from '../components/SiderBarMenu/SiderBarMenu';
import Home from '../components/Home/Home';
import AssetBond from '../components/Asset/AssetBond';
import Frefix from '../components/Frefix/Frefix';
import TransactionCost from '../components/TransactionCost/TransactionCost';

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

class HeaderCom extends Component{
    constructor(props){
        super(props);
        this.state = {
            isShowCardAccount: false
        }
    }
    onActionAccount = ()=>{
        this.setState((prew)=>({isShowCardAccount: !prew.isShowCardAccount}));
    }
    render(){
        return (
            <Header style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
                <b style={{ fontFamily: 'initial', fontSize: 18 }}>V-BONDS</b>
                <div className="pointer" onClick={this.onActionAccount} style={styles.accountHeader}><Avatar style={{ backgroundColor: '#438599' }} icon="user" />&nbsp;&nbsp;Admin</div>
                {this.state.isShowCardAccount ? <CardAccount visible={true}/> : null}
            </Header>
        )
    }
}

const CardAccount = () => (
    <Card size="small" style={styles.customFormAccount} actions={[<Button>Chỉnh sửa</Button>, <Button type="danger">Đăng xuất</Button>]}>
        <Meta
            avatar={<Avatar style={{ backgroundColor: '#438599' }} icon="user" />}
            title="Admin"
            description="This is admin"
        />
    </Card>
)

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

export const FHome = ()=> withSidebar(Home)
export const FBond = ()=> withSidebar(AssetBond)
export const FFrefix = ()=> withSidebar(Frefix)
export const FTransactionCost = ()=> withSidebar(TransactionCost)