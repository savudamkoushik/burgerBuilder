import React from 'react';
import classes from './BuildController.module.css';

const buildController=(props)=>(
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} onClick={props.removed} disabled={props.disabled}>less</button>
        <button className={classes.More} onClick={props.added}>more</button>
    </div>
);
export default buildController;