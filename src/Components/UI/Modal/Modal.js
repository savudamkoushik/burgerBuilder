import React from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import BackDrop from '../Backdrop/Backdrop';

const modal =(props)=>{
    return(
       <Aux>
           <BackDrop show={props.show} clicked={props.modalClosed}/>
            <div 
                style={
                    {
                        transform:(props.show)?'translateY(0)':'translate(-100vh)',
                        opacity: (props.show)? '1':'0'
                    }
                }
                className={classes.Modal}>
                {props.children}
        </div>
       </Aux>
    );
}
export default modal;
