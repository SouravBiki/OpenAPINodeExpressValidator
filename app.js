const cors = require('cors')
const express = require('express'); 
const bodyParser = require("body-parser");
const fs = require('fs'); 
const path = require('path') 
const formidable = require('formidable'); 
const router = require('./routes/employee.js');
const {validateToken} = require('./middlewares/auth.js');
const port = process.env.PORT || 3000;

const app = express(); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
//app.use(employeeRouter)
app.post('/api/upload', (req, res, next) => { 	
	
	//res.status(200).send("Received Req");
	const form = new formidable.IncomingForm(); 
    form.multiples = true;

    // form.on('file', function(field, file) {
    //     console.log(file);
    //     console.log(field);
    //   });
    //   // log any errors that occur
    //   form.on('error', function(err) {
    //     console.log('An error has occured: \n' + err);
    //   });
    //   // once all the files have been uploaded, send a response to the client
    //   form.on('end', function() {
    //     res.end('success');
    //   });
    //   // parse the incoming request containing the form data
    //   form.parse(req);
	form.parse(req, function(err, fields, files){ 
        console.log(files);
        files.sentFiles.forEach(file => {
            console.log(file.path);
        });
        console.log(fields.metadatProps);
		if (err)
			res.status(400).send(err);	
        //     files.forEach(element => {
        //         var oldPath = files.imageFile.path; 
		// var rawData = fs.readFileSync(oldPath) 
		// const json = JSON.stringify({ blob: rawData.toString("base64") });
		// const parsed = JSON.parse(json);
		 const returnObj ={};
		returnObj.status="Success";
		returnObj.fileContent = "";
		res.status(200).send(returnObj);
            });	
        
 }); 

app.get("/",validateToken,(req,res)=>{
	res.status(201).send("Hello From Azure");
})

app.get("/api/me",validateToken,(req,res)=>{
	console.log(req.headers.authorization);
	res.status(201).send("Hello From Azure");
})

app.listen(port, function(err){ 
	if(err) console.log(err) 
	console.log(`Server has started on port ${port}!`); 
}); 
