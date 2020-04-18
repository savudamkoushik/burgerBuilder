import React from 'react';
import Checkoutsummary from '../../Components/Order/CheckOutSummary/Checkoutsummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
class Checkout extends React.Component{
    state={
        ingredients:null,
        totalPrice:0
    }
    componentWillMount(){
        // console.log(this.props);
        const query=new URLSearchParams(this.props.location.search);
        const ingredients={};
        let price=0;
        for(let param of query.entries()){
            if(param[0]==='price'){
                price=param[1];
            }
            else{
                ingredients[param[0]]=+param[1];
            }
        }
        this.setState({
            ingredients:ingredients,
            totalPrice:price
        });
    }
    canceledHandler=()=>{
        this.props.history.goBack();
    }
    continueHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return(
            <div>
                <Checkoutsummary ingredients={this.state.ingredients}
                checkoutCanceled={this.canceledHandler}
                checkoutContinued={this.continueHandler}/>
                <Route path={this.props.match.path+'/contact-data'} render={
                    (props)=> (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>    )
                }/>
            </div>
        );
    }
}
export default Checkout;