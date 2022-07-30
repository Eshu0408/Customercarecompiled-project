const mongoose=require('mongoose');
const feedbackSchema=mongoose.Schema({
    name:String,
    email:String,
    feedback:String,
    service: String,
    slug:String,
    time:String
});

const servicesSchema=mongoose.Schema({
    Service:String,
    Name:[String],
    Link:[String]
})

const addCompnaySchema=mongoose.Schema({
    Company_Name:String,
    Phone1:String,
    Phone2:String,
    Email_Id:String,
    Address:String,
    Website:String,
    Comments:String,
    time:Date
 
})

feedbackModel=  mongoose.model('customercares',feedbackSchema);
servicesModel=mongoose.model('services',servicesSchema);
addCompnayModel=mongoose.model('addcompanies',addCompnaySchema);

 module.exports={feedbackModel,servicesModel,addCompnayModel}