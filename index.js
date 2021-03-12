var express = require('express');
var bodyParser = require('body-parser');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');

const jsYaml = require('js-yaml');


var router = require('./routes/employee');
const openApiDocument = jsYaml.load(
  fs.readFileSync("./api.yaml","utf-8")
);

const app = express();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.use(bodyParser.json());
app.use(router);
app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error:{
      name: err.name,
      message: err.message,
      data: err.data
    }
  })
});



const start = async() =>{
    //Code for connecting to SQL Server
    app.listen(3333,()=>{
        console.log("Server started at port 3333")
    })
};
start();