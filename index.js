const { urlencoded } = require('body-parser');
const express = require('express'); 
const db = require("./config/mongoose"); 
const Contact = require("./models/contact"); 


const app = express(); 
const port = 8000; 
const path = require('path'); 
app.use(urlencoded()); 
app.use(express.static("assets"))
 
 var contactList = [
    
 ]
app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "views")); 
// controller for rendering the data if route is "/"
app.get('/', function(req, res){
   Contact.find({}, function(err, contacts){
    if(err){
      console.log('error in finding contacts from db'); 
       return; 
   }
     return res.render("home",
     { title: "my title",
     contact_list :contacts

    }
    )
   })
    
})

// controller for submiiting data from form and in which route we are submitting create_contact
app.post("/create_contact", function(req, res){
   
    //var obj =  {
    //   "name": req.body.name,
     //   "no": req.body.phone
    // }
    // contactList.push(obj);
  Contact.create({
    name: req.body.name, 
    phone:req.body.phone
  }, function(err, newContact){
    if(err){
     console.log("err"); 
     return; 
    }
    console.log("*******" + newContact); 
     return res.redirect('back'); 

  })  ;
     

}); 

//  controller for deleting the data 
app.get("/delete_contact/", function(req, res){  // whatever is passed in query  after delete contact will be read as phone  
   let id = req.query.id; 
   Contact.findByIdAndDelete(id, function(err){
    if(err){
      console.log('something happened while deleting the database'); 
      return; 
    }

     return res.redirect('/'); 
   })
  
})









app.listen(port, function(err){
    if(err){
        console.log(error); 
    }
     console.log("server is running "); 
})