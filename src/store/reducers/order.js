import * as actionTypes from '../actions/actionTypes';
const intialstate={
    orders:[],
    loading:false,
    purchased:false
}
const reducer=(state=intialstate,action)=>{
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchased:false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return{
                ...state,
                loading:true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder={
                ...action.orderdata,
                id:action.orderId
            }
            // console.log("purchased at order reducer"+newOrder);
            return{
                ...state,
                loading:false,
                orders:state.orders.concat(newOrder),
                purchased:true
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return{
                ...state,
                loading:false

            };
        case actionTypes.GET_ORDERS_START:
            return{
                ...state,
                loading:true
            };
        case actionTypes.GET_ORDERS_SUCCESS:
            return{
                ...state,
                orders:action.order,
                loading:false
            }
        case actionTypes.GET_ORDERS_FAIL:
            return{
                ...state,
                loading:false
            }
        default: return state;

    }

}
export default reducer;