var express = require('express');
const router = express.Router();
const {validateMe} = require('../middlewares/validateMe.js');
const fs = require('fs');
const {OpenApiValidator} = require('express-openapi-validate');
const jsYaml = require('js-yaml');

const openApiDocument = jsYaml.load(
    fs.readFileSync("./api.yaml","utf-8")
  );
  
  const validator = new OpenApiValidator(openApiDocument,
    {
      ajv:{
        allErrors: true,
        removeAdditional: "all",
      }
    }
  );

var myData = [{
    "emplId": 234567,
    "name" : "Sourav Bhattacharjee",
    "Org" : "TCS"
},
{   "emplId": 234568,
    "name" : "Parthasarathi Sahu",
    "Org" : "TCS"
}
]


router.get('/api/v1/employee', validator.validate('get','/api/v1/employee'), (req,res) =>{    
    res.status(200).send({data:myData});
});


router.get('/api/v1/employee/:org',validator.validate('get','/api/v1/employee/{org}'), (req,res) =>{
    const {org} = req.params;
    var myOrg = myData.filter(emp => emp.Org == org);    
    res.status(200).send(myOrg);
});


router.post('/api/v1/employee',validator.validate("post",'/api/v1/employee'), (req,res) => {
    const {emplId,name,Org} = req.body;
    console.log(emplId,name,Org);
    myData.push({
        "emplId": emplId,
        "name" : name,
        "Org" : Org
    })
    res.status(201).send({
       myData
    });
});


router.put('/api/v1/employee/:emplId',validator.validate("put",'/api/v1/employee/{emplId}') ,(req,res) => {
    const {name,Org} = req.body;
    const {emplId} = req.params;
    console.log(name,Org);
    const emplIndex = myData.findIndex(
        element => element.emplId == emplId )
    let newEmplArray = [...myData]
    newEmplArray[emplIndex] = {...newEmplArray[emplIndex], 
        name: name,
        Org: Org}
    myData = newEmplArray;
    res.status(201).send({
        myData
    });
});

router.delete('/api/v1/employee', validator.validate("delete",'/api/v1/employee'), (req,res) => {
    const {emplId} = req.body;
    const filteredEmployee = myData.filter(
        item => item.emplId !== emplId);
    myData=filteredEmployee;
    res.status(201).send({
        myData
    });
});

module.exports = router;