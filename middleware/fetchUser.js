const express=require("express");
var jwt = require('jsonwebtoken');
const JWT_SECRET="JATIN";
const mongoose = require("mongoose");

const fetchUser=(req,res,next)=>{
try {
    const token=req.header("auth-token");
    if(!token){
        return res.status(401).json({err:"token not found"})
    }
    else{
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }    
} catch (error) {
    return res.status(401).json({err:"problem with token"})
}
}

module.exports=fetchUser;