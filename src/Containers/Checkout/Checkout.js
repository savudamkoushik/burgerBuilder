import React from 'react';
import Checkoutsummary from '../../Components/Order/CheckOutSummary/Checkoutsummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
class Checkout extends React.Component{

    // state={
    //     ingredients:null,
    //     totalPrice:0
    // }
    /**we have this componentwillmount state to get ingridients from burgerbuilder using queryparam,now commenting this code because we get it from redux global stae */
    // componentWillMount(){
    //     // console.log(this.props);
    //     const query=new URLSearchParams(this.props.location.search);
    //     const ingredients={};
    //     let price=0;
    //     for(let param of query.entries()){
    //         if(param[0]==='price'){
    //             price=param[1];
    //         }
    //         else{
    //             ingredients[param[0]]=+param[1];
    //         }
    //     }
    //     this.setState({
    //         ingredients:ingredients,
    //         totalPrice:price
    //     });
    // }
    canceledHandler=()=>{
        this.props.history.goBack();
    }
    continueHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return(
            <div>
                <Checkoutsummary ingredients={this.props.ings}
                checkoutCanceled={this.canceledHandler}
                checkoutContinued={this.continueHandler}/>
                {/* <Route path={this.props.match.path+'/contact-data'} render={
                    (props)=> (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>    )
                }/> */}
                <Route path={this.props.match.path+'/contact-data'} component={ContactData}/>
            </div>
        );
    }
}
const mapstateToProps=state=>{
    return{
        ings:state.ingridients,
    }
};
export default connect(mapstateToProps)(Checkout);