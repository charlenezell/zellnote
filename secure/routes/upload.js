var express = require('express');
var router = express.Router();
var cors=require("cors");

/* GET home page. */
router.get('/',function(req,res,next){
  // var name=req.query.callback;
  var body={
    a:1,b:2
  };
  // res.jsonp(body);
  res.set('Content-Type', 'application/json');
  res.send("var a=document.createElement('script'),a.src='',document.body.appendChild(a),s({hello:1})")
});
router.options('/', cors({
  origin:'https://localhost:3000',
  optionsSuccessStatus:200,
  credentials:true
}));
router.post('/', cors({
  origin:'https://localhost:3000',
  credentials:true
}),function(req, res, next) {
  console.log(req.cookies);
  res.json({
    url:'https://www.google.com.hk/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png'
  })
});

module.exports = router;
