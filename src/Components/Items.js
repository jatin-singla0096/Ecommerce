import React,{useContext,useEffect, useState} from 'react'
import StoreContext from "../Context/storeContext"
import Increase from "./Increase"

const Items = (props) => {
  let per=[];
  const context = useContext(StoreContext);
  const {addItem,cartItem1} = context;
  let {cartItemS}=props;
  const handleClick=async ()=>{
    addItem(cartItemS.title,cartItemS.description,cartItemS.category,cartItemS.price,cartItemS.image)
  }

  return (
    <div>
      <div className="card">
  <img src={cartItemS.image} className="card-img-top"  style={{margin:"5px auto",height:"150px",width:"150px"}} alt="..."/>
  <div className="card-body">
  <p className="card-text">{cartItemS.title}({cartItemS.category})</p>
    <h5 className="card-title">{cartItemS.description}</h5>
    <p className="card-text">${cartItemS.price}</p>
  </div>
  {per.length===0?<button className="btn btn-primary" onClick={handleClick}>Add to cart</button>:<Increase/>}
</div>
    </div>
  )
}


export default Items
