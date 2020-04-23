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