/**
 * Created by lsd on 2017/12/29.
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

//连接MongoDB数据库
mongoose.connect("mongodb://127.0.0.1:27017/db_demo");

mongoose.connection.on("connected",function () {
  console.log("MongoDB connected success!");
});

mongoose.connection.on("error",function () {
  console.log("MongoDB connected fail!");
});

mongoose.connection.on("disconnected",function () {
  console.log("MongoDB disconnected!");
});

//查询商品列表数据
router.get("/list",function (req,res,next) {
  let page = parseInt(req.param('page'));
  let pageSize = parseInt(req.param('pageSize'));
  let sort = req.param('sort');
  let priceLevel = req.param('priceLevel');
  let skip = (page-1)*pageSize;
  var priceGt,priceLte;
  let params = {};
  if(priceLevel != 'all'){
    switch (priceLevel){
      case '0': priceGt = 0 ; priceLte = 100; break;
      case '1': priceGt = 100 ; priceLte = 500; break;
      case '2': priceGt = 500 ; priceLte = 1000; break;
      case '3': priceGt = 1000 ; priceLte = 3000; break;
      case '4': priceGt = 3000 ; priceLte = 5000; break;
    };
  }else{//当显示全部商品时候
    priceGt = 0;
    priceLte = 100000;
  };
  params = {
    salePrice:{
      $gt:priceGt,
      $lte:priceLte
    }
  };
  //根据条件查找商品数据
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice':sort});

  goodsModel.exec(function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:{
          count:doc.length,
          list:doc
        }
      });
    }
  });
});

//加入到购物车
router.post("/addCart",function (req,res,next) {
  var userId = '100000077',productId = req.body.productId;
  var User = require('./../models/users');

  User.findOne({userId:userId},function (err,userDoc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message
      })
    }else{
      if(userDoc){
        //判断加入购物车的商品是否已经存在
        let goodsItem = '';
        userDoc.cartList.forEach(function (item) {
          if(item.productId == productId ){
            goodsItem = item;
            item.productNum ++;
          }
        });
        //存在
        if(goodsItem){
          userDoc.save(function (err2,doc2) {
            if(err2){
              res.json({
                status:"1",
                msg:err2.message
              })
            }else{
              res.json({
                status:"0",
                msg:'购物车中商品已存在，添加成功！',
                result:'success!'
              })
            }

          })
        //不存在
        }else{
          Goods.findOne({productId:productId},function (err1,doc) {
            if(err1){
              res.json({
                status:"1",
                msg:err1.message
              })
            }else{
              /*
              time:2017.12.31
              auther: lsd
              问题：数据中不能增加字段，导致插入数据库信息丢失
              解决：mongoose中Schema中goods模型加入新字段
               */
              if(doc){
                doc.productNum = 1;
                doc.checked = 1;
                userDoc.cartList.push(doc);
                userDoc.save(function (err2,doc2) {
                  if(err2){
                    res.json({
                      status:"1",
                      msg:"err2错误"
                    })
                  }else{
                    res.json({
                      status:"0",
                      msg:'购物车中商品不存在，添加成功！',
                      result:'success!'
                    })
                  }

                })

              }
            }

          })
        }


      }
    }

  })

})

module.exports = router;
