import React from 'react';
import SiderBarMenu from '../components/SiderBarMenu/SiderBarMenu';
import Home from '../components/Home/Home';
import AssetBond from '../components/Asset/AssetBond';
import Frefix from '../components/Frefix/Frefix';
import TransactionCost from '../components/TransactionCost/TransactionCost';

import { Layout } from 'antd';
const { Header } = Layout;

const withSidebar = (View) =>
    <div>
        <div>
            <Layout>
                <SiderBarMenu />
                <Layout style={{height: '85vh'}}>
                    <Header style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff'}}>Admin</Header>
                    <View />
                </Layout>
            </Layout>
        </div>
    </div>

export const FHome = ()=> withSidebar(Home)
export const FBond = ()=> withSidebar(AssetBond)
export const FFrefix = ()=> withSidebar(Frefix)
export const FTransactionCost = ()=> withSidebar(TransactionCost)