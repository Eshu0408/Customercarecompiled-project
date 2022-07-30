const { query } = require('express');
const express = require('express');
const { default: mongoose } = require('mongoose');
const router=express.Router();
const app = express();
require('../src/db_config');
const {feedbackModel,servicesModel} = require('../src/db_schema');

// ==============================================GET METHOD================================================================
// ========================================================================================================================


router.get("/admin",async (req, res)=>{
    res.render('admin')
});


router.post("/admin",(req,res)=>{
    if ( req.body.name == "" && req.body.email == "" ) {
        req.session.message={
          type:"",
          alert:"Fields Cannot be Empty!",
          color:"#ff8080"
        }
        res.status(201).redirect(`/admin`);
        
      }
      else if ( req.body.name == "") {
        req.session.message={
          type:"",
          alert:"Admin Id Cannot be Empty!",
          color:"#ff8080"
        }
        res.status(201).redirect(`/admin`);
      }
     
      else if(req.body.email == ""){
        req.session.message={
          type:"",
          alert:"Admin Password Cannot be Empty!",
          color:"#ff8080"
        }}

    else{
        req.session.message={
            type:"",
            alert:"Invalid Id or Password! Please try again",
            color:"#ff8080"
          } 
     
    res.status(201).redirect(`/admin`);
    console.log(req.body);

}})


module.exports= router;