var config = require('config');
var CryptoJS = require('crypto-js');
var AdminHelper=require("./service/adminhelper");
var TeamHelper=require("./service/teamhelper");


var fail_obj = {
    status: 401,
    'error': 'you are not authenticated to perform this action'
};

exports.user_auth = function(req, res, next) {

	console.log("Inside the User Auth Middleware");
   /*Check the user for protected api here*/
   return next();
}




exports.header = function(req, res, next) {
    var token= req.header.token;


	console.log("Inside the User Auth Middleware");
   /*Check the user for protected api here*/
   return next();
}



exports.adminCheck = lib.asyncMiddleware(async(req, res, next) => {
    var token= req.headers.token;


	console.log("Inside the check Middleware");
    try {
        /*Async await*/
       
        data = await AdminHelper.getTokenExpiry(token);
       
        console.log("data is"+data);
        
        if(data!=null){
            console.log(+data);
            var token_expiry = data.token_expiry;
            console.log(+token_expiry);
            var currentDate = new Date();
            console.log("current date is"+currentDate);

          
            var result = token_expiry - currentDate;
            console.log("result is"+result);
           
                if(result<0){
                return res.status(401).send({status:401, message:"token_expired"});
                }
                else{
                    console.log("token not expired")
                    return next();
                }

            }
        
            
       else{
           console.log("token not expired")
           return next();
       }
        
    } catch (err) {
        console.log("Error\t", err);
        return res.status(500).send("Server Error");
    }
});



exports.teamCheck = lib.asyncMiddleware(async(req, res, next) => {
    var token= req.headers.token;


	console.log("Inside the check Middleware");
    try {
        /*Async await*/
       
        data = await TeamHelper.getTokenExpiry(token);
       
        console.log("data is"+data);
        
        if(data!=null){
            console.log("data is"+data);
            var token_expiry = data.token_expiry;
            console.log(+token_expiry);
            var currentDate = new Date();
            console.log("current date is"+currentDate);

         
            var result = token_expiry - currentDate;
            console.log("result is"+result);
          
                if(result<0){
                return res.status(401).send({status:401, message:"token_expired"});
                }
                else{
                    console.log("token not expired")
                    return next();
                }

            }
        
            
       else{
           console.log("token not expired")
           return next();
       }
        
    } catch (err) {
        console.log("Error\t", err);
        return res.status(500).send("Server Error");
    }
});



