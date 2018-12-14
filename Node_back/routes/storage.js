var express = require('express');
var router = express.Router();
//var foodtype = require('./../database/foodtype_schema.js');
var ingredientpool = require('./../database/ingredient_schema');
const authorize  = require('./../business_flow/user/checkAuthorized');
/* GET users listing. */
router.get('/', function(req, res) {
  res.send('Welcome to store keeper page');
});
router.get('/all', function(req, res){
  authorize.checker(req.params.uid, function(role){
    console.log(role);
    if( role > 1){
      res.json(
      {
        "storage": 
        [
          {
            "_id": "43134346jrhhbg",
            "name": "Thit nac vai",
            "quantity": 45.7,
            "unit": "Kg",
            "status": "Ready",
            "import-date": "10-10-2018",
            "expire-date": "10-11-2018"
          },
          {
            "_id": "43134346jrhhbg",
            "name": "Tom hum xanh",
            "quantity": 6,
            "unit": "Con",
            "status": "Dong lanh",
            "import-date": "10-9-2018",
            "expire-date": "10-12-2018"
          }
        ]
      })
    }
    else if(authorize.USER  == role) res.status(403).json(authorize.unauthorized_message);
    else res.status(200).json(authorize.guess);
  });
});
router.get('/import', function(req, res){
  res.send('import');
})
router.get('/all_type/:uid', function(req, res){
  authorize.checker(req.params.uid, function(role){
    console.log(role);
    if( role > 1){
      foodtype.find({}, function(err, alltype){
        if(err || JSON.stringify(alltype) == 'null'){
          console.log("khong tim thay kieu nao hoac co loi");
          res.status(404).json([]);
        }
        else {
          res.status(200).json(alltype);
        }
      });
    }
    else if(authorize.USER  == role) res.status(403).json(authorize.unauthorized_message);
    else res.status(200).json(authorize.guess);
  });
})

router.get('/ingredientsInType/:uid', function(req, res){
  authorize.checker(req.params.uid, function(role){
    console.log(role);
    if( role > 1){
      var type = req.body.type;
      ingredientpool.find({"type": type}, function(err, ingredientInType){
        if(err || JSON.stringify(ingredientInType) == 'null'){
          console.log("khong tim thay nguyen lieu nao hoac co loi");
          res.status(404).json([]);
        }
        else {
          res.status(200).json(ingredientInType);
        }
      });
    }
    else if(authorize.USER  == role) res.status(403).json(authorize.unauthorized_message);
    else res.status(200).json(authorize.guess);
  });
})


/* snippet
router.get('/', function(req, ress){
  authorize.checker(req.params.uid, function(role){
    console.log(role);
    if( role > 1){
      
    }
    else if(authorize.USER  == role) res.status(403).json(authorize.unauthorized_message);
    else res.status(200).json(authorize.guess);
  });
});
*/
router.post("/addingredient/:uid", function(req,res){
  authorize.checker(req.params.uid, function(role){
    console.log(role);
    if( role == authorize.ADMIN){
      var ingredientForm = req.body;
      console.log("adding ingredient " + JSON.stringify(ingredientForm));
      ingredientpool.create(ingredientForm, function(err,result){
        if(err) {
          console.log("insert ingredient failed");
          res,status(500).json({});
        }
        else {
          console.log("1 ingredient added to storage");
          console.log(result);
          res.status(200).json({});
        }
      });
    }
    else if(authorize.USER  == role) res.status(403).json(authorize.unauthorized_message);
    else res.status(402).json(authorize.guess);
  });
});

router.delete('/delingredient/:uid', function(req, res){
  authorize.checker(req.params.uid, function(role){
    console.log(role);
    if( role == authorize.ADMIN){
      var iId = req.body._id;
      ingredientpool.findOneAndDelete({"_id": iId }, function(err, ressu){
        if(err) {
          console.log("xoa failed");
          res.status(403).json({});
        }
        else {
          console.log("da xoa ingredient "+ iId);
          res.status(200).json({});
        }
      })
    }
    else if(authorize.USER  == role) res.status(403).json(authorize.unauthorized_message);
    else res.status(402).json(authorize.guess);
  });
});

module.exports = router;
