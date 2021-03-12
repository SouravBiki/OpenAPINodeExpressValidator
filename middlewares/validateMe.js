validateMe = (req,res,next) =>{
    const {emplId} = req.body;
    if (typeof emplId !== 'number'){
        res.status(400).send("Bad Request");       
    }
    else {
        next()
    }
    
}
module.exports ={
    validateMe:validateMe
}