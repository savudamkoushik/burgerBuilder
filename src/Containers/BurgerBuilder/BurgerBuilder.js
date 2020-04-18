import React from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControl from '../../Components/Burger/BuildControl/BuildControl';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../hoc/axios-orders';
import Spinner from '../../Components/UI/spinner/spinner';
import withErrorHandler from '../../Components/UI/withErrorHandler/withErrorHandler';
// import modal from '../../Components/UI/Modal/Modal';

const INGREDIENT_PRICES={
    salad:0.5,
    cheese:2.5,
    meat:1.3,
    bacon:0.7
}
class BurgerBuilder extends React.Component{
    state={
        ingredients:null,
        totalPrice:4,
        purchasable:false,
        purchase:false,
        loading:false,
        error:null
    }
    componentDidMount(){
        axios.get('https://burgerbuilder-react-5566d.firebaseio.com/ingredients.json')
        .then(response=>{
                this.setState({
                    ingredients:response.data
                });
        }).catch(error=>{
            this.setState({
                error:error
            });
        });
    }
    updatePurchasableState=(ingr)=>{
        const sum=Object.keys(ingr)
        .map(igkey=>{
            return ingr[igkey];
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0);
        this.setState({
            purchasable:sum>0
        })
    };
    purchaseHandler=()=>{
        this.setState({
            purchase:true
        })
    }
    addIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        const updatedCount=oldCount+1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceAddition=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=priceAddition+oldPrice;
        this.setState({
            ingredients:updatedIngredients,
            totalPrice:newPrice
        });
        this.updatePurchasableState(updatedIngredients);
    }
    removeIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        if(oldCount===0) return;
        const newCount=oldCount-1;
        const updatedIngredients1={
            ...this.state.ingredients
        };
        updatedIngredients1[type]=newCount;
        const priceAddition1=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const updatedPriceCount=oldPrice-priceAddition1;
        this.setState({
            ingredients:updatedIngredients1,
            totalPrice:updatedPriceCount
        });
        this.updatePurchasableState(updatedIngredients1);
    }
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
        const queryParams=[];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString=queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+queryString,
        });
    }
    render(){
        const disabledInfo={
            ...this.state.ingredients
        };
        let ordersummary= null;
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]===0;
        }
        let burger=this.state.error?<p>ingredients not loading...</p>:<Spinner/>
        if(this.state.ingredients){
            burger=(
                <Aux>
                    <Burger ingredients={this.state.ingredients}></Burger>
                    <BuildControl 
                    ingredientHandler={this.addIngredientHandler} 
                    lessIngredientHandler={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    purchase={this.purchaseHandler}
                    price={this.state.totalPrice}/>
                </Aux>
            );
            ordersummary=<OrderSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    cancel={this.purchasedCancledHandler}
                    continue={this.purchaseContinuHandler}/>
        }
        if(this.state.loading){
            ordersummary=<Spinner/>
        }
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
export default withErrorHandler(BurgerBuilder,axios);