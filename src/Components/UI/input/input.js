import React from 'react';
import classes from './input.module.css';
const input=(props)=>{
    let inputElement=null;
    let validationError='';
    const inputClasses=[classes.InputElement];
    
    if(props.isvalid && props.touched && props.isrequired){
        inputClasses.push(classes.Invalid);
        validationError=<p>Please enter a minumun of 5 and max of 10 characters</p>
    }
    switch(props.elementtype){
        case('input'):
            inputElement=<input 
            className={inputClasses.join(' ')} 
            {...props.elementConfig}
             value={props.value} 
             onChange={props.changed}/>
            break;
        case('textarea'):
            inputElement=<textarea 
            className={inputClasses.join(' ')} 
            {...props.elementConfig} 
             value={props.value} 
             onChange={props.changed}/>
            break;
        case('select'):
            inputElement=(
            <select 
                 className={classes.InputElement} 
                 value={props.value}
                 onChange={props.changed}>
                 {props.elementConfig.options.map(option=>(
                      <option key={option.value}value={option.value}>
                      {option.displayvalue}
                      </option>
                 ))}
                 
             </select>
            );
            break;
        default:
            inputElement=<input
             className={inputClasses.join(' ')}
                {...props.elementConfig}
               value={props.value}
               onChange={props.changed} />
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}
export default input;