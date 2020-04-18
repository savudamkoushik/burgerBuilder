import React from 'react';
import classes from './Order.module.css';
const order =(props)=>{
    const Ingredients=[];
    console.log(props.ingridients);
    for(let ingridientName in props.ingridients){
        Ingredients.push(
            {
                name:ingridientName,
                amount:props.ingridients[ingridientName]
            }
        );
    }
    const IngredientOutput=Ingredients.map(ig=>{
    return <span
            style={{textTransform:"capitalize",
                    display:"inline-block",
                    margin:"0px 8px",
                    border:"1px solid #ccc",
                    padding:'5px '}}
            key={ig.name}> {ig.name} ({ig.amount})</span>
    });
    return(
        <div className={classes.Order}>
            <p>Ingredients:{IngredientOutput} </p>
            <p>Price :<strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}
export default order;
