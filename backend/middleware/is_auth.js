const jwt = require('jsonwebtoken');

module.exports=(req,res,next)=>{
    const authHeader=req.get('Authorization');
    if(!authHeader){
        req.isAuth=false;
        return next();
    }
    const token=authHeader.split(' ')[1];
    let decodedToken;
    try{
        decodedToken=jwt.verify(token,'techburner');
    }
    catch(err){
        req.isAuth=false;
        return next();
    }
    if(!decodedToken){
        const error=new Error('Not authenticated.');
        req.isAuth=false;
        return next();
    }
    req.userId=decodedToken.id;
    //console.log(req.userId);
    req.isAuth=true;
    next();
};