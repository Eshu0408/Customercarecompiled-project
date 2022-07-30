const express = require('express');
const path = require('path');
const hbs = require('hbs');
const nodemailer = require('nodemailer')
const session=require('express-session');
const app = express();
const port = process.env.PORT || 3000;
var helpers=require('./hbsHelpers');
const  bodyParser=require('body-parser');
require('./db_config');
const {addCompnayModel} = require('./db_schema');



// public static path to show path/join directory

const static_path= path.join(__dirname, "../public");
const template_path= path.join(__dirname, "../templates/views");
const partials_path= path.join(__dirname, "../templates/partials");


//Use the path in node

app.set('view engine', 'hbs');
app.set('views',template_path);
hbs.registerPartials(partials_path);
app.use(express.static(static_path));
app.use(session({cookie: {maxAge: null},
    resave: false,
    saveUninitialized: true,
    secret : 'something'}));

//Flash message Middleware

app.use((req,res,next)=>{
    res.locals.message=req.session.message;
    delete req.session.message;
    next();
})

for(let helper in helpers){
    hbs.registerHelper(helper, helpers[helper]);

}



//routing

//--------------------------- Banks route--------------------------

const bankRoute= require('../routes/banks');
app.use('',bankRoute );

//--------------------------- Mobile Payments  route--------------------------

const mobilePaymentsRoute= require('../routes/mobilePayments');
app.use('',mobilePaymentsRoute );

//--------------------------- Automobiles  route--------------------------

const automobilesRoute= require('../routes/automobiles');
app.use('',automobilesRoute);

//--------------------------- Telecom Providers  route--------------------------

const telecomProvidersRoute= require('../routes/telecomProviders');
app.use('',telecomProvidersRoute);

//--------------------------- Mobile Phones  route--------------------------

const mobilePhonesRoute= require('../routes/mobilePhones');
app.use('',mobilePhonesRoute);

//--------------------------- Home Appliances  route--------------------------

const homeAppliancesRoute= require('../routes/homeAppliances');
app.use('',homeAppliancesRoute);

//--------------------------- Electronics  route--------------------------

const electronicsRoute= require('../routes/electronics');
app.use('',electronicsRoute);

//--------------------------- E-Comm  route--------------------------

const ecommRoute= require('../routes/e-comm');
app.use('',ecommRoute);


//--------------------------- E-Comm  route--------------------------

const adminRoute= require('../routes/admin');
app.use('',adminRoute);




// Home
app.get("", (req, res)=>{
    res.render('index')

});

 

//Send Contact Us Email

app.post("/",(req,res)=>{
    if ( req.body.textarea == "" && req.body.name == "" && req.body.email == "") {
        req.session.message={
          type:"",
          alert:"Fields Cannot be Empty!",
          color:"#ff8080"
        }
        res.status(201).redirect(`/#contact-us`);
        
      }
      else if ( req.body.name == "") {
        req.session.message={
          type:"",
          alert:"Name Field Cannot be Empty!",
          color:"#ff8080"
        }
        res.status(201).redirect(`/#contact-us`);
      }
     
      else if(req.body.email == ""){
        req.session.message={
          type:"",
          alert:"Email Cannot be Empty!",
          color:"#ff8080"
        }
        res.status(201).redirect(`/#contact-us`);
    
      }
      else if(req.body.textarea == ""){
        req.session.message={
          type:"",
          alert:"Feedback Cannot be Empty!",
          color:"#ff8080"
        }
        res.status(201).redirect(`/#contact-us`);
    
      }
      
      else {
    const output=`
    <p>You have a new Contact Request</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name:${req.body.name}</li>
        <li>Email ID:${req.body.email}</li>
    </ul>
    <h3> Message: </h3>
    <p>${req.body.textarea}</p> `;
    
    let transporter=nodemailer.createTransport({
        service:'gmail',
        auth: {
            user:'eshu0408@gmail.com',
            pass:'kfvrxzgrqgagmqoe'
        }
    });

    let mailOptions = {
        from: req.email,
        to:'eshu0408@gmail.com',
        subject:'Customercarecompiled.com Customer Contacted',
        text: 'Hello',
        html: output
    };

    transporter.sendMail(mailOptions,(er,data)=>{
        if(err){
            console.log("Error Sending Message!");
        }else{
            console.log("Message Sent!");
        }
    })

    req.session.message={
        type:"",
        alert:"Your Message Has Been Sent Successfully! We will revert within 24 Hours",
        color:"#aaff80"
      }

    res.status(201).redirect(`/#contact-us`);
    console.log(req.body);

}})

// To add new Company
app.get("/addCompany", (req, res)=>{
    res.render('addCompany')

});




//To get the data from feedback form 
app.use(express.json())
app.use(express.urlencoded({extended:false}))


//To save the data from feedback form into database
function fetchdata(req){
  // console.log(req);
  
    return new addCompnayModel({
        Company_Name: req.Company,
        Phone1: req.Contact1,
        Phone2: req.Contact2,
        Email_Id: req.Email,
        Address: req.Address,
        Website: req.Website,
        Comments: req.textarea,
        time: Date()
        
      });
    
}



app.post("/addCompany", async (req, res) => {
  if ( req.body.Company == "") {
    req.session.message={
      type:"",
      alert:"Company Name Cannot be Empty!",
      color:"#ff8080"
    }
    res.status(201).redirect(`/addCompany`);
  }
 
  else if(req.body.Contact1 == ""){
    req.session.message={
      type:"",
      alert:"Contact Number Cannot be Empty!",
      color:"#ff8080"
    }
    res.status(201).redirect(`/addCompany`);

  }
  else if(req.body.Email == ""){
    req.session.message={
      type:"",
      alert:"Email Cannot be Empty!",
      color:"#ff8080"
    }
    res.status(201).redirect(`/addCompany`);

  }
  
  else {
    try {
      submitAddCompany = fetchdata(req.body);

      const submitted = await submitAddCompany.save();
      console.log(submitted);
      req.session.message={
        type:"",
        alert:"Your Request Is Submitted Successfully!",
        color:"#aaff80"
      }
      //  Send Mail=============================================================
      const output=`
    <p>You have a new Contact Request</p>
    <h3>Contact Details</h3>
    <ul>
        
        <li>Company_Name: ${req.body.Company}</li>
        <li>Conatct Time: ${Date()}</li>
        <li>Phone1: ${req.body.Contact1}</li>
        <li>Phone2: ${req.body.Contact2}</li>
        <li>Email_Id: ${req.body.Email}</li>
        <li>Address: ${req.body.Address}</li>
        <li>Website: ${req.body.Website}</li>
        <li>Comments: ${req.body.textarea}</li>
        
    </ul>
     `;

      let transporter=nodemailer.createTransport({
        service:'gmail',
        auth: {
            user:'eshu0408@gmail.com',
            pass:'kfvrxzgrqgagmqoe'
        }
    });

    let mailOptions = {
        from: req.email,
        to:'eshu0408@gmail.com',
        subject:'Add New Company Request Submitted For Review',
        text: 'Hello',
        html: output
    };

    

    transporter.sendMail(mailOptions,(err,data)=>{
        if(err){
            console.log("Error Sending Message!");
        }else{
            console.log("Message Sent!");
        }
    })

    // ======================================Sending Mail to Customer==========================

    const output2=`
    <h3>Company/Business Listing Requested on CustomerCareCompiled.in</h3>
    <p> Thank you for contacting us. We have recieved your request. Your Request Will Be Reviewd And You Will Be Notified Within 48 Hours.<br> Once Approved, We Will List Your Company/Business On Our Site And Will Notify Through Mail.</p>
    <p>Have a great day!</p>
    `
  let transporter2=nodemailer.createTransport({
      service:'gmail',
      auth: {
          user:'eshu0408@gmail.com',
          pass:'kfvrxzgrqgagmqoe'
      }
  });
    let mailOptions2 = {
      from: 'eshu0408@gmail.com',
      to: req.body.Email,
      subject:'CustomerCareCompiled.in| Company/Business Listing Requested',
      text: '',
      html:output2
      
  };
    transporter2.sendMail(mailOptions2,(err,data)=>{
      if(err){
          console.log("Error Sending Message!"+err);
      }else{
          console.log("Message Sent!");
      }
  })

      res.status(201).redirect(`/addCompany`);
        } 
    catch (error) {
            res.status(400).send(error);
        }
  }
 
});



// Listening Port

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
});