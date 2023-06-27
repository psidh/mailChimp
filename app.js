//_________________________________________________________

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const apiKey = "b92bb6715de1c9e261c6ad10829e3146-us21";
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//_________________________________________________________

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");

})


app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    let data = {
        members: [
            {
                email_address : email,
                status: "subscribed",
                merge_fields : {
                    FNAME: firstName,
                    LNAME: lastName
                }

        }
    ]
    };

    let jsonData = JSON.stringify(data)
    let url = "https://us21.api.mailchimp.com/3.0/lists/86750ab13d" 
    const options = {
        method: "POST",
        auth : "sidharth:b92bb6715de1c9e261c6ad10829e3146-us21",

    }

    const request = https.request(url, options, function(response){
        
        if (response.statusCode === 200 ){
            res.sendFile(__dirname + "/success.html");

        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

}) 


app.post("/failure", function(req, res){
    res.sendFile(__dirname + "/failure.html");

})

app.listen(process.env.PORT || 3000, function(req, res){

    console.log('the server is running at port 3000');

})

// list Id : 86750ab13d