import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem  from './NavigationItem/NavigationItem';
const navigationItems=(props)=>(
    <ul className={classes.NavigationItems}>
       <NavigationItem link="/" active>BurgerBuilder</NavigationItem>
       <NavigationItem link="/">CheckOut</NavigationItem>
       <NavigationItem link="/">Orders</NavigationItem>
    </ul>

);
export default navigationItems;