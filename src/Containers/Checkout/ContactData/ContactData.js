import React from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './Contactdata.module.css';
import axios from '../../../hoc/axios-orders';
import Spinner from '../../../Components/UI/spinner/spinner';
import Input from '../../../Components/UI/input/input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../Components/UI/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
class contactdata extends React.Component{
    helperMethodInput=()=>{

    }
    state={
        orderForm:{
            name:{
                elementtype:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your Name'
                },
                val:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:10
                },
                valid:false,
                touched:false
            },
            street:{
                elementtype:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your street'
                },
                val:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:10
                },
                valid:false,
                touched:false
            },
            pincode:{
                elementtype:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your pincode'
                },
                val:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:10
                },
                valid:false,
                touched:false
            },
            email:{
                elementtype:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'your email'
                },
                val:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:10
                },
                valid:false,
                touched:false
            },
            country:{
                elementtype:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your country'
                },
                val:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:10
                },
                valid:false,
                touched:false
            },
            deliverymethod:{
                elementtype:'select',
                elementConfig:{
                    options:[
                        {value:'fast',
                         displayvalue:'fast'
                        },
                        {value:'slow',
                        displayvalue:'slow'
                       }

                    ]
                },
                val:'fast',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:20
                },
                valid:true
            }
        },
        isvalidForm:false
    }
    orderHandler=(event)=>{
        event.preventDefault();
        // console.log(this.state.orderForm.deliverymethod.elementConfig.options);
        // console.log(this.props.ingredients);
        const formData={};
        for(let formdatakeyvalue in this.state.orderForm){
            formData[formdatakeyvalue]=this.state.orderForm[formdatakeyvalue].val;
        }
        // this.setState({
        //         loading:true
        //     });
            // console.log("ingridients"+this.props.ings);
            // console.log("price"+this.props.price);
            // console.log("Loading"+this.props.loading);
            const order={
                ingredients:this.props.ings,
                totalPrice:this.props.price,
                orderData:formData
            }
            this.props.onOrderBurger(order);
            // axios.post('/orders.json',order)
            // .then(response=>
            //     {this.setState({
            //         loading:false
            //     });
            //     this.props.history.push('/');
            // })
            //     .catch(error=> {this.setState({
            //         loading:false
            //     });
            // });
    }
    checkValditity=(value,rules)=>{
        let isValid=true;
        if(rules.required){
            isValid= value.trim() !== '' && value.length >= rules.minLength && value.length <=rules.maxLength;
        }
        
        return isValid;
    }
    changedHandler=(event,inputIdentifier)=>{
        // console.log(inputIdentifier);
        // console.log(this.state.orderForm[inputIdentifier].valid);
        // console.log(event.target.value);
        const updatedorderform={
            ...this.state.orderForm
        }
        const updatedForm={
            ...updatedorderform[inputIdentifier]
        }
        updatedForm.val=event.target.value;
        updatedForm.valid=this.checkValditity(updatedForm.val,updatedForm.validation);
        updatedForm.touched=true;
        updatedorderform[inputIdentifier]=updatedForm;
        // console.log(updatedForm);
        let formisvalidform=true;
        for(let propertyName in updatedorderform){
            formisvalidform=updatedorderform[propertyName].valid && formisvalidform;
        }
        this.setState({
            orderForm:updatedorderform,
            isvalidForm:formisvalidform
        });
        // console.log(this.state.orderForm);

    }
    render(){
        let formElementsArray=[];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        // console.log(formElementsArray);
        // console.log(this.state.isvalidForm);
        let form=(
        <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement=>
                <Input 
                key={formElement.id}
                elementtype ={formElement.config.elementtype} 
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.val} 
                changed={(event)=>this.changedHandler(event,formElement.id)}
                touched={formElement.config.touched}
                isvalid={!formElement.config.valid}
                />)}
                
            <Button btnType="Success" disabled={!this.state.isvalidForm} >ORDER</Button>
        </form>
        );
        if(this.props.loading)
        form=<Spinner/>
        return(
            <div className={classes.ContactData}>
                <h3> enter details to contact you</h3>
                {form}
            </div>
        );
    }
}
const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingridients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading
    };
};
const mapDispatchToProps=dispatch=>{
    return{
        onOrderBurger:(orderData)=>dispatch(actions.purchaseBurger(orderData))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(contactdata,axios));