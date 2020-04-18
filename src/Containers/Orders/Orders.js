import React from 'react';
import Order from '../../Components/Order/Order';
import axios from '../../hoc/axios-orders';
import withErrorHandler from '../../Components/UI/withErrorHandler/withErrorHandler';
class myOrders extends React.Component{
    state={
        loading:true,
        orderlist:[]
    }
    componentDidMount(){
        axios.get('/neworders.json')
        .then(response=>{
            console.log(response.data);
            const fetchedOrders=[];
            for(let key in response.data){
                fetchedOrders.push({    
                    ...response.data[key],
                    id:key
                })
            }
                this.setState({
                    loading:false,
                    orderlist:fetchedOrders
                });
        }).catch(error=>{
            this.setState({
                loading:false
            });
        });
    }
    render(){
        return(
            <div>
                {this.state.orderlist.map(order=>(
                      <Order key={order.id} 
                    ingridients={order.ingredients}
                    price={order.totalPrice}/>
                ))}
            </div>
        );
    }
}
export default withErrorHandler(myOrders,axios);
