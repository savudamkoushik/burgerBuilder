import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
class Layout extends React.Component{
    state={
        showSideDrawer:false
    }
    sideDrawerCloserHandler=()=>{
        this.setState({
            showSideDrawer:false
        });
    }
    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
           return { showSideDrawer: !prevState.showSideDrawer};
        });
    }
    render(){
        return(
            <Aux>
                {/* <div>Toolbar,sideBar,BackDrop</div> */}
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                open={this.state.showSideDrawer}
                closed={this.sideDrawerCloserHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
    
        );
    }
    
}
export default Layout;