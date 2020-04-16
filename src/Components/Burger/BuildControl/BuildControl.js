import React from 'react';

import classes from './BuildControl.module.css';
import BuildController from './BuildController/BuildController';

const controls=[
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'}
];
const BuildControl =(props)=>(
    <div className={classes.BuildControls}>
         <p>Current Price:<strong>{props.price.toFixed(2)}</strong></p>
        {  
            controls.map(ctrl=>(
                <BuildController 
                key={ctrl.label} 
                label={ctrl.label} 
                added={()=>props.ingredientHandler(ctrl.type)}
                removed={()=>props.lessIngredientHandler(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
                />
            ))
        }
        <button 
        disabled={!props.purchasable} 
        onClick={props.purchase}
        className={classes.OrderButton}>ORDER NOW</button>

    </div>
);
export default BuildControl;