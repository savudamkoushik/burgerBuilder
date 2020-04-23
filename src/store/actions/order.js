import * as actionTypes from './actionTypes';
import axios from '../../hoc/axios-orders';
export const purchaseburgersucces=(id,orderData)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderdata:orderData
    };
};

export const purchaseburgerfail=(error)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    };
};

export const purchaseBurgerStart=()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger=(OrderData)=>{
    return dispatch=>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json',OrderData)
        .then(response=>{ 
            console.log("order data at ordre.js::"+OrderData);
           dispatch(purchaseburgersucces(response.data.name,OrderData));
        })
            .catch(error=> {
                dispatch(purchaseburgerfail(error));
        });

    }
};
export const purchaseInit=()=>{
    return{
        type:actionTypes.PURCHASE_INIT
    };
};
export const getOrdersStart=()=>{
    return {
        type:actionTypes.GET_ORDERS_START
    };
};
export const getOrdersSuccess=(orders)=>{
    return{
        type:actionTypes.GET_ORDERS_SUCCESS,
        order:orders
    };
};
export const getOrdersFail=(error)=>{
    return{
        type:actionTypes.GET_ORDERS_FAIL,
        error:error
    };
};
export const getOrders=()=>{
    return dispatch=>{
        dispatch(getOrdersStart());
        axios.get('/orders.json')
        .then(response=>{
            console.log("orderlist in orders.js"+response);
            const fetchedOrders=[];
            for(let key in response.data){
                fetchedOrders.push({    
                    ...response.data[key],
                    id:key
                })
            }
            dispatch(getOrdersSuccess(fetchedOrders));
                // this.setState({
                //     loading:false,
                //     orderlist:fetchedOrders
                // });
        }).catch(error=>{
            dispatch(getOrdersFail(error));
            // this.setState({
            //     loading:false
            // });
        });
    };
};