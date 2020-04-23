import React from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControl from '../../Components/Burger/BuildControl/BuildControl';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../hoc/axios-orders';
import Spinner from '../../Components/UI/spinner/spinner';
import withErrorHandler from '../../Components/UI/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
// import modal from '../../Components/UI/Modal/Modal';
class BurgerBuilder extends React.Component{
    state={
        purchase:false,
        // loading:false,
        // error:null
    }
    componentDidMount(){
        // console.log("aabsfdflkg");
        this.props.onInItIngridients();
        // axios.get('https://burgerbuilder-react-5566d.firebaseio.com/ingredients.json')
        // .then(response=>{
        //     // console.log(response.data);
        //         this.setState({
        //             ingredients:response.data
        //         });
        // }).catch(error=>{
        //     this.setState({
        //         error:error
        //     });
        // });
    }
    updatePurchasableState=(ingr)=>{
        const sum=Object.keys(ingr)
        .map(igkey=>{
            return ingr[igkey];
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0);
        return sum>0;
        
    };
    purchaseHandler=()=>{
        this.setState({
            purchase:true
        })
    }
    // addIngredientHandler=(type)=>{
    //     const oldCount=this.state.ingredients[type];
    //     const updatedCount=oldCount+1;
    //     const updatedIngredients={
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type]=updatedCount;
    //     const priceAddition=INGREDIENT_PRICES[type];
    //     const oldPrice=this.state.totalPrice;
    //     const newPrice=priceAddition+oldPrice;
    //     this.setState({
    //         ingredients:updatedIngredients,
    //         totalPrice:newPrice
    //     });
    //     this.updatePurchasableState(updatedIngredients);
    // }
    // removeIngredientHandler=(type)=>{
    //     const oldCount=this.state.ingredients[type];
    //     if(oldCount===0) return;
    //     const newCount=oldCount-1;
    //     const updatedIngredients1={
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients1[type]=newCount;
    //     const priceAddition1=INGREDIENT_PRICES[type];
    //     const oldPrice=this.state.totalPrice;
    //     const updatedPriceCount=oldPrice-priceAddition1;
    //     this.setState({
    //         ingredients:updatedIngredients1,
    //         totalPrice:updatedPriceCount
    //     });
    //     this.updatePurchasableState(updatedIngredients1);
    // }
    purchasedCancledHandler=()=>{
        this.setState({
            purchase:false
        });
    }
    purchaseContinuHandler=()=>{
        // alert("continue!!");
        // this.setState({
        //     loading:true
        // });
        // const order={
        //     ingredients:this.state.ingredients,
        //     totalPrice:this.state.totalPrice,
        //     customer:{
        //         name:"koushik",
        //         address:{
        //             pincode:"501920",
        //             street:"nandi hills"
        //         },
        //         email:"koushik@test.com"
        //     }
        // }
        // axios.post('/orders.json',order)
        // .then(response=>
        //     {this.setState({
        //         loading:false,
        //         purchase:false,
        //         purchasable:false
        //     });
        // })
        //     .catch(error=> {this.setState({
        //         loading:false,
        //         purchase:false,
        //         purchasable:false
        //     });
        // });
        // const queryParams=[];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price='+this.state.totalPrice);
        // const queryString=queryParams.join('&');
        // this.props.history.push({
        //     pathname:'/checkout',
        //     search:'?'+queryString,
        // });
        this.props.onPurchaseCompleted();
        this.props.history.push('/checkout');
    }
    render(){
        /* after connecting to redux this,state.ingridients is replace with this.props.ings*/
        const disabledInfo={
            // ...this.state.ingredients 
            ...this.props.ings
        };
        let ordersummary= null;
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]===0;
        }
        let burger=this.props.error?<p>ingredients not loading...</p>:<Spinner/>
        if(this.props.ings){
            //  console.log(this.props.price);

            burger=(
                <Aux>
                    <Burger ingredients={this.props.ings}></Burger>
                    <BuildControl 
                    /*ingredientHandler={this.addIngredientHandler} */
                    /*lessIngredientHandler={this.removeIngredientHandler}*/
                    ingredientHandler={this.props.onIngridientAdded}
                    lessIngredientHandler={this.props.onIngridientRemoved}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchasableState(this.props.ings)}
                    purchase={this.purchaseHandler}
                    price={this.props.price}/>
                </Aux>
            );
            ordersummary=<OrderSummary 
                    ingredients={this.props.ings}
                    price={this.props.price}
                    cancel={this.purchasedCancledHandler}
                    continue={this.purchaseContinuHandler}/>
        }
        // if(this.state.loading){
        //     ordersummary=<Spinner/>
        // }
        return(
            <Aux>
                <Modal show={this.state.purchase} modalClosed={this.purchasedCancledHandler}>
                  {ordersummary}
                </Modal>
                {burger}
               
            </Aux>

        );
    }
}

const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingridients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        purchased:state.order.purchased
    };

};
const mapDispatchToProps=dispatch=>{
    return{
        onIngridientAdded: (ingName)=>dispatch(actions.addIngridients(ingName)),
        onIngridientRemoved: (ingName)=>dispatch(actions.removeIngridients(ingName)),
        onInItIngridients:()=>dispatch(actions.initIngridients()),
        onPurchaseCompleted:()=>dispatch(actions.purchaseInit())

    };
};
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));