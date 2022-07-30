const { query } = require('express');
const express = require('express');
const { default: mongoose } = require('mongoose');
const router=express.Router();
const app = express();
require('../src/db_config');
const {feedbackModel,servicesModel} = require('../src/db_schema');



// ==============================================GET METHOD================================================================
// ========================================================================================================================

router.get("/banks",async (req, res)=>{
    let listData=await servicesModel.find({Service:"Banks"});
    // console.log( listData)
    listData=listData[0];
    res.render('banks',{data:  listData })
});

 
router.get("/banks/:id", async(req, res)=>{
    //-------------for displaying list------------
    let listData= await servicesModel.find({Service:"Banks"});
    listData=listData;
    //-------------for displaying feedback-----------
    let feedbackData= await  feedbackModel.find({slug:req.params.id});
    // console.log(feedbackData);
    res.render(`banks/${req.params.id}`,{data:  listData, list_link:{link:req.params.id,service:"Banks"},feedbackData:feedbackData  })
});


// ==============================================POST METHOD===============================================================
// ========================================================================================================================


//To get the data from feedback form 
router.use(express.json())
router.use(express.urlencoded({extended:false}))

const date=new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) ;
const time= new Date().toLocaleTimeString('en-US');
datetime=date + " | "+time;


//To save the data from feedback form into database
function fetchdata(req){
  let name=req.name;
  name=name.slice(0,1).toUpperCase()+name.slice(1);
   
    return new feedbackModel({
        name: name,
        email: req.email,
        feedback: req.textarea,
        service: req.path,
        slug:req.slug,
        time: datetime ,
      });
    
}

router.post("/banks/:id", async (req, res) => {
  if ( req.body.textarea == "" && req.body.name == "" && req.body.email == "") {
    req.session.message={
      type:"",
      alert:"Fields Cannot be Empty!",
      color:"#ff8080"
    }
    res.status(201).redirect(`/banks/${req.params.id}#feedback-redirect`);
    
  }
  else if ( req.body.textarea == "") {
    req.session.message={
      type:"",
      alert:"Feedback Field Cannot be Empty!",
      color:"#ff8080"
    }
    res.status(201).redirect(`/banks/${req.params.id}#feedback-redirect`);
  }
 
  else if(req.body.name == ""){
    req.session.message={
      type:"",
      alert:"Name Cannot be Empty!",
      color:"#ff8080"
    }
    res.status(201).redirect(`/banks/${req.params.id}#feedback-redirect`);

  }
  else if(req.body.email == ""){
    req.session.message={
      type:"",
      alert:"Email Cannot be Empty!",
      color:"#ff8080"
    }
    res.status(201).redirect(`/banks/${req.params.id}#feedback-redirect`);

  }
  
  else {
    try {
      submitFeedback = fetchdata(req.body);

      const submitted = await submitFeedback.save();
      // console.log(submitted);
      req.session.message={
        type:"",
        alert:"Feedback Submitted Successfully!",
        color:"#aaff80"
      }
      res.status(201).redirect(`/banks/${req.params.id}#feedback-redirect`);
        } 
    catch (error) {
            res.status(400).send(error);
        }
  }
 
});



module.exports= router;