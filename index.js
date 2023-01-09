const { urlencoded } = require('body-parser');
const express = require('express'); 
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
    return res.render("home",
     { title: "my title",
     contact_list :contactList

    }
    )
})

// controller for submiiting data from form and in which route we are submitting create_contact
app.post("/create_contact", function(req, res){
   
    var obj =  {
        "name": req.body.name,
        "no": req.body.phone
     }
     contactList.push(obj); 
     return res.redirect("/"); 

}); 

//  controller for deleting the data 
app.get("/delete_contact/", function(req, res){  // whatever is passed in query  after delete contact will be read as phone  
   let phone = req.query.phone; 
   console.log(phone); 
   for(let i =0; i<contactList.length; i++){
     console.log(contactList[i].no); 
    if(contactList[i].no == phone){
     
        contactList.splice(i, 1); 
    }
   } 
   return res.redirect('/'); 
})









app.listen(port, function(err){
    if(err){
        console.lof(error); 
    }
     console.log("server is running "); 
})