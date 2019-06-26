import React, {Component} from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';

import {Error404} from '../components/Error404/Error404';
import Login from '../components/Login/Login';
import {
    FHome,
    FBond,
    FFrefix,
    FCompany,
    FPaymentTerm,
    FFeeTrace,
    FBankInterest,
    FBondType,
    FCommandType,
    FTradeStatus,
    FBranchVCSC,
    FInvestor,
    FInvestorType,
    FEnsureAsset,
    FInterestRate,
    FContractVCSC,
    FDayInterestYear,
    FBondPrice,
    FRoomVCSC,
    FSetCommand
} from './MainGeneral';

const accessTokenAuth = localStorage.getItem('accessTokenAuthKey');

class RouteURL extends Component{
    constructor(props){
        super(props);
        this.state = {
            isShowLoading: true
        }
    }
    componentDidMount(){
        this.setState({isShowLoading : false});
    }

    shouldComponentUpdate(nextProps, nextState) {
        var currentRouteName = window.location.pathname;
        if(currentRouteName!=='/login' && !accessTokenAuth){
            window.location.href = "/login";
            return false;
        }
        return true;
    }

    render() {
        return (
                this.state.isShowLoading ? 
                    <div className="lds-spinner">
                        <div></div><div></div><div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
                : <BrowserRouter>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route exact path="/" component={FHome} />
                        <Route exact path="/home" component={FHome} />
                        <Route exact path="/asset-bond" component={FBond} />
                        <Route exact path="/ensure-asset" component={FEnsureAsset} />
                        <Route exact path="/frefix" component={FFrefix} />
                        <Route exact path="/company" component={FCompany} />
                        <Route exact path="/payment-term" component={FPaymentTerm} />
                        <Route exact path="/bank-interest" component={FBankInterest} />
                        <Route exact path="/fee-trade" component={FFeeTrace} />
                        <Route exact path="/bond-type" component={FBondType} />
                        <Route exact path="/command-type" component={FCommandType} />
                        <Route exact path="/trade-status" component={FTradeStatus} />
                        <Route exact path="/branch-vcsc" component={FBranchVCSC} />
                        <Route exact path="/investor-type" component={FInvestorType} />
                        <Route exact path="/investor" component={FInvestor} />
                        <Route exact path="/interest-rate" component={FInterestRate} />
                        <Route exact path="/contract-vcsc" component={FContractVCSC} />
                        <Route exact path="/day-interest-year" component={FDayInterestYear} />
                        <Route exact path="/bond-price" component={FBondPrice} />
                        <Route exact path="/room-vcsc" component={FRoomVCSC} />
                        <Route exact path="/set-command" component={FSetCommand} />
                        {/* nhập sai đường dẫn */}
                        <Route exact path="*" component={Error404} />
                    </Switch>
                </BrowserRouter>
        );
    }
}

export default RouteURL;