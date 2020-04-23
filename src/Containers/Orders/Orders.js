import React from 'react';
import Order from '../../Components/Order/Order';
import axios from '../../hoc/axios-orders';
import withErrorHandler from '../../Components/UI/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../Components/UI/spinner/spinner';
class myOrders extends React.Component{
    state={
        loading:true,
        orderlist:[]
    }
    componentDidMount(){
        this.props.onLoadOrdersStart();
        // axios.get('/orders.json')
        // .then(response=>{
        //     console.log("orderlist in orders.js"+response);
        //     const fetchedOrders=[];
        //     for(let key in response.data){
        //         fetchedOrders.push({    
        //             ...response.data[key],
        //             id:key
        //         })
        //     }
        //         this.setState({
        //             loading:false,
        //             orderlist:fetchedOrders
        //         });
        // }).catch(error=>{
        //     this.setState({
        //         loading:false
        //     });
        // });
    }
    render(){
        // console.log("orderlist in orders.js"+this.state.orderlist);
        let orderlist=<Spinner/>;
        if(!this.props.loading){
            orderlist=this.props.orders.map(order=>(
                <Order key={order.id} 
              ingridients={order.ingredients}
              price={order.totalPrice}/>
            ));
        }
       
        return(
            <div>
                {orderlist}
                {/* {this.state.orderlist.map(order=>(
                      <Order key={order.id} 
                    ingridients={order.ingredients}
                    price={order.totalPrice}/>
                ))} */}
            </div>
        );
    }
}
const mapStateToProps=state=>{
    return{
        orders:state.order.orders,
        loading:state.order.loading
    };
};
const mapDispatchToProps=dispatch=>{
    return{
        onLoadOrdersStart:()=>dispatch(actions.getOrders())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)((withErrorHandler(myOrders,axios)));
