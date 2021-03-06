import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const ordersummary=(props)=>{
    const ingredients=Object.keys(props.ingredients)
    .map(igKey=>{
    return <li key={igKey}><span style={{textTransform:"capitalize"}}>{igKey}</span>:{props.ingredients[igKey]}</li>
    })
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p>total price:<strong>{props.price.toFixed(2)}Rs</strong></p>
            <p>Continue to check out</p>
            <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>

        </Aux>
    );
};

export default ordersummary;