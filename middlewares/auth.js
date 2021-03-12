aad = require('azure-ad-jwt');

validateToken = (req,res,next) => {
  var audience = '66e18db9-b692-4fdb-a10d-2e3263c0968b'
  var authorization = req.headers['authorization']
  if (authorization) {
    var bearer = authorization.split(" ");
    var jwtToken = bearer[1];
  
    if (jwtToken) {  
      aad.verify(jwtToken, audience, function(err, result) {
        if (result) {
          next();         
        } else {
          res.status(401).send('no valid token') 
        }
      })  
    } else {
      res.status(401).send('no token in header')  
    }  
  } else {
    res.status(401).send('no auth attr in header')
  }
}

module.exports ={
    validateToken:validateToken
}