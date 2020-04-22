import * as actionTypes from './actions';
const intialState={
    ingridients:{
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    totalPrice:4
};
const INGREDIENT_PRICES={
    salad:2,
    cheese:3,
    meat:5,
    bacon:1
};
const reducer=(state=intialState,action)=>{
    console.log(state.totalPrice);
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
        default:
            return state;

    }
};
export default reducer;