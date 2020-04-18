import React from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './Contactdata.module.css';
import axios from '../../../hoc/axios-orders';
import Spinner from '../../../Components/UI/spinner/spinner';
class contactdata extends React.Component{
    state={
        name:'',
        address:{
            pincode:'',
            street:''
        },
        email:'',
        loading:false
    }
    orderHandler=(event)=>{
        event.preventDefault();
        // console.log(this.props.ingredients);
        this.setState({
                loading:true
            });
            const order={
                ingredients:this.props.ingredients,
                totalPrice:this.props.price,
                customer:{
                    name:"kittu",
                    address:{
                        pincode:"501920",
                        street:"nandi hills"
                    },
                    email:"koushik@test.com"
                }
            }
            axios.post('/neworders.json',order)
            .then(response=>
                {this.setState({
                    loading:false
                });
                this.props.history.push('/');
            })
                .catch(error=> {this.setState({
                    loading:false
                });
            });
    }
    render(){
        let form=(
            <form>
            <input className={classes.Input} type="text" name="name" placeholder="enter your name"/>
            <input className={classes.Input} type="text" name="email" placeholder="enter your email"/>  
            <input className={classes.Input} type="text" name="street" placeholder="enter your street"/>
            <input className={classes.Input} type="text" name="postal" placeholder="enter your postal"/>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
        );
        if(this.state.loading)
        form=<Spinner/>
        return(
            <div className={classes.ContactData}>
                <h3> enter details to contact you</h3>
                {form}
            </div>
        );
    }
}
export default contactdata;