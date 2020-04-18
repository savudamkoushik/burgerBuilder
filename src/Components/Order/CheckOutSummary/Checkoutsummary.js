import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';
const checkoutSummary=(props)=>{
    return(
        <div className={classes.Checkoutsummary}>
            <h1>
                We Hope it tastes well
            </h1>
            <div style={{ width:'80%'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.checkoutCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>Continue</Button>
        </div>
    );
}
export default checkoutSummary;