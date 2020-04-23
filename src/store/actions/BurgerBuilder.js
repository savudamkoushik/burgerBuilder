import * as actionTypes from './actionTypes';
import axios from '../../hoc/axios-orders';
export const addIngridients=(name)=>{
    return {
        type:actionTypes.ADD_INGRIDIENTS,
        ingridientName:name
    };
};
export const removeIngridients=(name)=>{
    return {
        type:actionTypes.REMOVE_INGRIDIENTS,
        ingridientName:name
    };
};
export const setIngridients=(ingridients)=>{
    return {
        type:actionTypes.SET_INGRIDIENTS,
        ings:ingridients
    };
};

export const fetchFailed=()=>{
    return{
        type:actionTypes.FETCH_INGRIDIENTS_FAILED
    };
};

export const initIngridients=()=>{
    return dispatch=>{

        axios.get('https://burgerbuilder-react-5566d.firebaseio.com/ingredients.json')
        .then(response=>{
            // console.log(response.data);
               dispatch(setIngridients(response.data));
        }).catch(error=>{
            dispatch(fetchFailed());
        });

    };
};