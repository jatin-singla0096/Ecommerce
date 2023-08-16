import React,{useEffect,useContext} from 'react'
import CartItem from './CartItem';
import {useNavigate} from "react-router-dom";
import StoreContext from '../Context/storeContext';

const Cart = () => {

  const context = useContext(StoreContext);
  const {cartItemsSearch,getAllItems,totalPrice} = context;
  const navigate=useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("auth-token")){
     navigate("/login");
    }
    else{
      getAllItems();
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div style={{margin:"80px"}}>
      <p>Total Price:${totalPrice}</p>
      <div className='container'>
        <div className='row'>
          {cartItemsSearch.map((element)=>{
      return <div className='col-md-4'style={{margin:"5px 20px"}} key={element.id}>
        <CartItem cartitem={element}/>
      </div>
      })}
        </div>
      </div>     
    </div>
  )
}

export default Cart
