import React, { useState } from "react";
import StoreContext from "./storeContext";

const ItemsContext = (props) => {
  const [cartItem1, setCartItem1] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [storeItems, setStoreItems] = useState([]);
  const [storeItemsSearch, setStoreItemsSearch] = useState([]);
  const [cartItemsSearch, setCartItemsSearch] = useState([]);
  const [searchBar, setSearchBar] = useState("Faltu");
  const getAllItems = async () => {
    const response = await fetch("http://127.0.0.1:300/cart/items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    let item3 = await response.json();
    setCartItem1(item3);
    setCartItemsSearch(item3)
    let cartPrice=0;
    for(let i=0;i<item3.length;i++){
     cartPrice=cartPrice+parseFloat(item3[i].price*item3[i].NoOfItems,2);
    }
    setTotalPrice(cartPrice);
  };

  const addItem = async (title, description, category, price, imageUrl) => {
    const responseFind = await fetch("http://127.0.0.1:300/cart/findItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ title: title, description: description }),
    });
    let findItem = await responseFind.json();
    if (findItem.success === false) {
      const response = await fetch("http://127.0.0.1:300/cart/addItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({
          title: title,
          description: description,
          category: category,
          price: price,
          imageUrl: imageUrl,
        }),
      });
      let item4 = await response.json();
      setCartItem1(cartItem1.concat(item4));
      setCartItemsSearch(cartItem1)
      setTotalPrice(totalPrice+parseFloat(item4.price,2));
    } else {
      updateItem(findItem.id, findItem.NoOfItems,1);
    }
  };

  const deleteItem = async (id) => {
    const response = await fetch(`http://127.0.0.1:300/cart/deleteItem/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    let item4 = await response.json(); 
    const newcart = cartItem1.filter((item1) => {
      return item1._id !== id;
    });
    setCartItem1(newcart);
    setCartItemsSearch(newcart)
    setTotalPrice(totalPrice-parseFloat(item4.price,2))
  };

  const updateItem = async (id,editiveItems,newItem) => {
    let updatedItems=editiveItems+newItem;
    if (updatedItems > 0) {
      const response = await fetch(
        `http://127.0.0.1:300/cart/updateItem/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify({ NoOfItems: updatedItems }),
        }
      );
      let item4 = await response.json(); 
      let newCartItem = JSON.parse(JSON.stringify(cartItem1));
      for (let index = 0; index < cartItem1.length; index++) {
        const element = cartItem1[index];
        for (let index = 0; index < newCartItem.length; index++) {
          const element = newCartItem[index];
          if (element._id === id) {
            console.log(element);
            element.NoOfItems = updatedItems;
            newCartItem[index].NoOfItems = updatedItems;
            break;
          }
        }
      }
      setCartItem1(newCartItem);
      setCartItemsSearch(newCartItem)
      setTotalPrice(totalPrice+parseFloat(newItem*(item4.price),2));
    } else if (updatedItems === 0) {
      deleteItem(id);
    }
  };
    const getAllStoreItems=async ()=>{
        let coll=await fetch('https://fakestoreapi.com/products');
        let k=await coll.json();
        setStoreItems(k);
        setStoreItemsSearch(k);
    }
  return (
    <div>
      <StoreContext.Provider
        value={{
          deleteItem,
          addItem,
          cartItem1,
          setCartItem1,
          getAllItems,
          updateItem,
          totalPrice,storeItems,getAllStoreItems,storeItemsSearch,setStoreItemsSearch,cartItemsSearch, setCartItemsSearch,searchBar, setSearchBar
        }}
      >
        {props.children}
      </StoreContext.Provider>
    </div>
  );
};

export default ItemsContext;
