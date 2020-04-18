import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem  from './NavigationItem/NavigationItem';
const navigationItems=(props)=>(
    <ul className={classes.NavigationItems}>
        {/**if u want a link to be a active without using navLink u should mention active in the anchor tag */}
       <NavigationItem link="/" /*active*/>BurgerBuilder</NavigationItem>
       <NavigationItem link="/Orders">Orders</NavigationItem>
    </ul>

);
export default navigationItems;