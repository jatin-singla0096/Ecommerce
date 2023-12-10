const mongoose=require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
    user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
    },
    title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true,
  },
  imageUrl:{
    type:String,
    required:true
  },
  price:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },NoOfItems:{
    type:Number,
    default:1,
  },
  timestamp:{
    type:Date,
    default:Date.now
  }
  });
const Cart = mongoose.model('Cart', cartSchema);
module.exports=Cart;