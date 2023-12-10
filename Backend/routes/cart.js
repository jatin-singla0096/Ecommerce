var express = require('express');
var Router = express.Router();
const mongoose = require("mongoose");
const Cart=require("../models/cart");
const fetchUser =require("../middleware/fetchUser");

Router.get("/items",fetchUser,async (req,res)=>{
  let cart=await Cart.find({user:req.user.id});
  if(!cart){
    return res.json({});
  }
  return res.json(cart);
})

Router.post("/addItem",fetchUser,async (req,res)=>{
  let item=await Cart.create({title:req.body.title,description:req.body.description,price:req.body.price,category:req.body.category,title:req.body.title,imageUrl:req.body.imageUrl,user:req.user.id})
  return res.json(item);
})

Router.post("/deleteItem/:id",fetchUser,async (req,res)=>{
  try {
    let cart=await Cart.findById(req.params.id);
    if(!cart){return res.status(404).send("Not found");}
    if(cart.user.toString()!==req.user.id){return res.status(401).send("Not Allowed");}
    cart=await Cart.findByIdAndDelete(req.params.id);
    return res.json(cart);
  } catch (error) {
    res.status(404).send("Internal server error occured");
  }
})

Router.post("/updateItem/:id",fetchUser,async (req,res)=>{
try {
  let cart=await Cart.findById(req.params.id);
  if(!cart){return res.status(404).send("Not Found");}
  if(cart.user.toString()!==req.user.id){return res.status(401).send("Not Allowed");}
  let newCart=cart;
  newCart.NoOfItems=req.body.NoOfItems;  
  cart=await Cart.findByIdAndUpdate(req.params.id,{$set:newCart},{new:true});
  return res.json(cart);
} catch (error) {
  res.status(404).send("Internal server error occured"); 
}
})

Router.post("/findItem",fetchUser,async (req,res)=>{
  try {
    let cart=await Cart.findOne({title:req.body.title,description:req.body.description});
    if(!cart){return res.json({success:false});}
    if(cart.user.toString()!==req.user.id){return res.status(401).send("Not Allowed");}
    return res.json({success:true,id:cart._id,NoOfItems:cart.NoOfItems,price:cart.price});
  } catch (error) {
    res.status(404).send("Internal server error occured"); 
  }
  })

module.exports=Router;