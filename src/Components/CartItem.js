import React from 'react'
import Increase from './Increase'

const CartItem = (props) => {
    let {cartitem}=props;
  return (
    <div>
      <div className="card">
  <img src={cartitem.imageUrl} className="card-img-top"  style={{margin:"5px auto",height:"150px",width:"150px"}} alt="..."/>
  <div className="card-body">
  <p className="card-text">{cartitem.title}({cartitem.category})</p>
    <h5 className="card-title">{cartitem.description.slice(0,10)}</h5>
    <p className="card-text">${cartitem.price}</p>
    <Increase cartItemR={cartitem}/>
  </div>
</div>
    </div>
  )
}

export default CartItem
