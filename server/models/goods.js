/**
 * Created by lsd on 2017/12/29.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productSchema = new Schema({
  "productId" : String,
  "productName" : String,
  "salePrice" : Number,
  "productImage" : String,
  "productNum":String,
  "checked":String
});

module.exports = mongoose.model('Good',productSchema,'goods');

