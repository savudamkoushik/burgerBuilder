import * as actionTypes from '../actions/actionTypes';
const intialState={
    ingridients:null,
    totalPrice:4,
    error:false
};
const INGREDIENT_PRICES={
    salad:2,
    cheese:3,
    meat:5,
    bacon:1
};
const reducer=(state=intialState,action)=>{
    // console.log(state.totalPrice);
    switch(action.type){
        case actionTypes.ADD_INGRIDIENTS:
        return{
            ...state,
            ingridients:{
                ...state.ingridients,
                [action.ingridientName]: state.ingridients[action.ingridientName]+1
            },
            totalPrice:state.totalPrice+INGREDIENT_PRICES[action.ingridientName]
        };
        case actionTypes.REMOVE_INGRIDIENTS:
        return{
            ...state,
            ingridients:{
                ...state.ingridients,
                [action.ingridientName]:state.ingridients[action.ingridientName]-1
            }, 
            totalPrice:state.totalPrice-INGREDIENT_PRICES[action.ingridientName]
        };
        case actionTypes.SET_INGRIDIENTS:
            // console.log(action.ings);
            return{
                ...state,
                ingridients:{
                    salad:action.ings.salad,
                    bacon:action.ings.bacon,
                    cheese:action.ings.cheese,
                    meat:action.ings.meat

                },
                totalPrice:4,
                error:false
            };
        case actionTypes.FETCH_INGRIDIENTS_FAILED:
            return{
                ...state,
                error:true
            };
        default:
            return state;

    }
};
export default reducer;