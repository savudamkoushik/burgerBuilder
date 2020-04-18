import React from 'react';
import './App.css';

import Layout from './Components/Layout/Layout';
import {Route,Switch} from 'react-router-dom';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';


class App extends React.Component {
   /*this code is to make the BurgerBuilder app disappear after 5 seconds*/
  // state={
  //   show:true
  // }
 
  // componentDidMount(){
  //   setTimeout(()=>{
  //     this.setState({
  //       show:false
  //     })
  //   },5000);
  // }
  render(){
    return(
        <div>
          <Layout>
            {/* {this.state.show? */}
           {/* if switch is used the first matched route will be executed*/} 
            <Switch>
            <Route path="/checkout" component={Checkout}/>
            {/*we can either use switch or exact  */}
            <Route path="/" exact component={BurgerBuilder}/>
            </Switch>
            {/* <BurgerBuilder />
            <Checkout/> */}
            {/* :null} */}
          </Layout>
        </div>
    );
  }

}

export default App;
