/**
 * Created by lsd on 2017/12/30.
 */

var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  "userId" : String,
  "userName" : String,
  "userPwd" : String,
  "orderList" :Array,
  "cartList" :[
    {
      "productImage" : String,
      "salePrice": String,
      "productName": String,
      "productId":String,
      "productNum":String,
      "checked":String
    }
  ],
  "addressList":[
    {
      "addressId": String,
      "userName": String,
      "streetName": String,
      "postCode": Number,
      "tel": Number,
      "isDefault": Boolean
    }
  ]
});

module.exports = mongoose.model('User',userSchema,'users');
