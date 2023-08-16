import React, { useContext } from "react";
import StoreContext from "../Context/storeContext";

const Increase = (props) => {
  const context = useContext(StoreContext);
  const { updateItem } = context;
  let { cartItemR } = props;
  const handleIncrease = () => {updateItem(cartItemR._id, cartItemR.NoOfItems,1);};
  const handleDecrease = () => {updateItem(cartItemR._id, cartItemR.NoOfItems, -1);};
  return (
    <div style={{ margin: "0px auto", display: "flex", justifyContent: "center" }}>
      <button onClick={handleDecrease}style={{margin: "0px 5px",height: "30px",width: "30px",color: "white",background: "black"}}>&#8249</button>
      <div className="container" style={{margin: "0px 5px",width: "40px",display: "flex",justifyContent: "center",alignItems: "center",border: "2px solid black"}}>
        <small>{cartItemR.NoOfItems}</small>
      </div>
      <button style={{margin: "0px 5px",height: "30px",width: "30px",color: "white",background: "black"}} onClick={handleIncrease}>&#8250</button>
    </div>
  );
};

export default Increase;
