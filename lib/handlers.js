/*
 * Handler to accept the request 
 *
*/

//Dependencies
var __data = require('./data');
var helpers = require('./helpers');
var config  = require('../config');
var _url    = require('url');
var dns     = require('dns');
var util    = require('util');
var debug   = util.debuglog('performance');
var _performance = require('perf_hooks').performance;

//Container for the handler 
var handler={};



/*
*
*HTML - HANDLER
*/
//Index handler
// Index
handler.index = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Uptime Monitoring - Made Simple',
      'head.description' : 'We offer free, simple uptime monitoring for HTTP/HTTPS sites all kinds. When your site goes down, we\'ll send you a text to let you know',
      'body.class' : 'index'
    };
    // Read in a template as a string
    helpers.getTemplate('index',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Create Account
handler.accountCreate = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Create an Account',
      'head.description' : 'Signup is easy and only takes a few seconds.',
      'body.class' : 'accountCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('accountCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Create New Session
handler.sessionCreate = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Login to your account.',
      'head.description' : 'Please enter your phone number and password to access your account.',
      'body.class' : 'sessionCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('sessionCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Edit Your Account
handler.accountEdit = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Settings',
      'body.class' : 'accountEdit'
    };
    // Read in a template as a string
    helpers.getTemplate('accountEdit',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};


// Session has been deleted
handler.sessionDeleted = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Logged Out',
      'head.description' : 'You have been logged out of your account.',
      'body.class' : 'sessionDeleted'
    };
    // Read in a template as a string
    helpers.getTemplate('sessionDeleted',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};



// Account has been deleted
handler.accountDeleted = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Deleted',
      'head.description' : 'Your account has been deleted.',
      'body.class' : 'accountDeleted'
    };
    // Read in a template as a string
    helpers.getTemplate('accountDeleted',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Create a new check
handler.checksCreate = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Create a New Check',
      'body.class' : 'checksCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('checksCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};
// Dashboard (view all checks)
handler.checksList = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Dashboard',
      'body.class' : 'checksList'
    };
    // Read in a template as a string
    helpers.getTemplate('checksList',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Edit a Check
handler.checksEdit = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Check Details',
      'body.class' : 'checksEdit'
    };
    // Read in a template as a string
    helpers.getTemplate('checksEdit',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

 // Favicon
handler.favicon = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Read in the favicon's data
    helpers.getStaticAsset('favicon.ico',function(err,data){
      if(!err && data){
        // Callback the data
        callback(200,data,'favicon');
      } else {
        callback(500);
      }
    });
  } else {
    callback(405);
  }
};
// Public assets
handler.public = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Get the filename being requested
    var trimmedAssetName = data.trimmedpath.replace('public/','').trim();
    if(trimmedAssetName.length > 0){
      // Read in the asset's data
      helpers.getStaticAsset(trimmedAssetName,function(err,data){
        if(!err && data){

          // Determine the content type (default to plain text)
          var contentType = 'plain';

          if(trimmedAssetName.indexOf('.css') > -1){
            contentType = 'css';
          }

          if(trimmedAssetName.indexOf('.png') > -1){
            contentType = 'png';
          }

          if(trimmedAssetName.indexOf('.jpg') > -1){
            contentType = 'jpg';
          }

          if(trimmedAssetName.indexOf('.ico') > -1){
            contentType = 'favicon';
          }

          // Callback the data
          callback(200,data,contentType);
        } else {
          callback(404);
        }
      });
    } else {
      callback(404);
    }

  } else {
    callback(405);
  }
};

 
/*==============================================================================================================================
*
*=================================== JSON API-HANDLER===========================================================================
*
*===============================================================================================================================
*/

//notFound Handler
handler.notfound=function(data,callback){
  callback(404);
};

//ping handler 
handler.ping = function(data,callback){
  callback(200);
}


//Users
handler.users = function(data,callback){
	//Container for the methods 
    var acceptableMethods = ['post','get','put','delete'];

    //Check if the method of the request made 
    if( acceptableMethods.indexOf(data.method)>-1){
       handler_user[data.method](data,callback);
    }
	else
	{
		callback(405);
	}

};

//Container for the users submethods
var handler_user={};

//Users-Post
//Required field:firstName,lastName,password,phone_no,tosAgreement
//Optional:None
handler_user.post=function(data,callback){
  //check all the required fieds are filled out
  var firstName = typeof(data.payload.firstName)=='string' &&  data.payload.firstName.trim().length>0?data.payload.firstName.trim():'';
  var lastName  = typeof(data.payload.lastName)=='string' &&  data.payload.lastName.trim().length>0?data.payload.lastName.trim():'';
    var phone_no  = typeof(data.payload.phone_no)=='string' &&  data.payload.phone_no.trim().length==10?data.payload.phone_no.trim():'';
    var password  = typeof(data.payload.password)=='string' &&  data.payload.password.trim().length>0?data.payload.password.trim():'';
    var tosAgreement = typeof(data.payload.tosAgreement)=='boolean' &&  data.payload.tosAgreement==true?true:false;

    if(firstName && lastName && phone_no && password && tosAgreement){
       //Make sure that the user doen't exist already
       __data.read('users',phone_no,function(err,data){
           if(err){
            //Hash the password
           var hashedPassword = helpers.hash(password);
               
               if(typeof(hashedPassword)=='string' && hashedPassword.trim().length>0){
                //Create a user Object
                var userObject={
                  'firstName':firstName,
                  'lastName' :lastName,
                  'phone_no' :phone_no,
                  'hashedPassword':hashedPassword,
                  'tosAgreement':true
                };
                 
                //Store the user
                 
                 __data.create('users',phone_no,userObject,function(err){
                   if(!err){
                      callback(200);
                   }
                   else{
                    
                     callback(500,{'Error':'Could not create the new user'});
                   }        

                 });
               }
               else{
                 callback(500,{'Error':'The password hashing is not working'});
               }

        }
        else{
               //User already exist
               callback(400,{'Error':'A user with that phone number already exists'});
        }   
      });
       
    }
    else{
       callback(400,{'Error':'Required fields are missing'});
    }
 };


//Users-Get
//Required-Data:phone_no,token
//Optional data:none
//@TODO ONlY LET THE AUTHENTICATED USER ACCESS THEIR OWN OBJECT,NOT OTHERS
handler_user.get=function(data,callback){
 //check the phone no is valid
 if(typeof(data.queryStringObj.phone_no)=='string' && data.queryStringObj.phone_no.trim().length==10){
       //Get the token from header
        var token_id = typeof(data.header.token_id)=='string'?data.header.token_id.trim():false;
        console.log(token_id);
        //verify the token is valid for given phone number 
        var phone_no = data.queryStringObj.phone_no.trim();
        handler_tokens.verifyToken(phone_no,token_id,function(validToken){
          if(validToken)
          { 
              
              __data.read('users',data.queryStringObj.phone_no,function(err,data){
               if(!err){
                //Return the data
                delete data.hashedPassword;
                callback(200,data);
                }
               else{
                callback(404,{'Error':'User doesn\'t exist'});
                }
              });

          }
          else{
              callback(403,{'Error':'Missing required token in the header,or token id incorrect'});
          }

      });
 }
 else{
  callback(400,{'Error':'Required fields are missing'});
 }    
};

//Users-put
//Required-Data:phone_no,token
//Optional Data:firstName,LastName,password
//@TODO ONlY LET THE AUTHENTICATED USER ACCESS THEIR OWN OBJECT,NOT OTHERS
handler_user.put=function(data,callback){
  //Check for validity of phone_no
  if(typeof(data.payload.phone_no)=='string' && data.payload.phone_no.length==10){
      //Check for any one of the Optional Data
      
      var firstName = typeof(data.payload.firstName)=='string' &&  data.payload.firstName.trim().length>0?data.payload.firstName.trim():false;
      var lastName  = typeof(data.payload.lastName)=='string' &&  data.payload.lastName.trim().length>0?data.payload.lastName.trim():false;
      var password  = typeof(data.payload.password)=='string' &&  data.payload.password.trim().length>0?data.payload.password.trim():false; 
       //Get the token from header
        var token_id = typeof(data.header.token_id)=='string'?data.header.token_id.trim():false;
        //verify the token is valid for given phone number 
        var phone_no =data.payload.phone_no.trim() ;
        handler_tokens.verifyToken(phone_no,token_id,function(validToken){
          if(validToken)
          { 
                if(firstName || lastName || password){
                 
                 __data.read('users',phone_no,function(err,userdata){
                   if(!err && userdata){
                    //update the fields if necessary
                    console.log('the data is ',userdata);
                    
                    if(firstName)
                      userdata.firstName=firstName;
                    if(lastName)
                      userdata.lastName=lastName;
                    if(password)
                      userdata.hashedPassword=helpers.hash(password);
                     
                      __data.update('users',phone_no,userdata,function(err){
                          if(!err){
                             callback(200);
                          }else{
                            callback(500,{'Error':'Can\'t be abe to update'});
                          }
                       });
                     }
                    else{
                      callback(400,{'Error':'Required fields to update are missing'});
                    }
                  });
                }
                 else{
                  callback(400,{'Error':'missing fields to update'});
                 }

       }else{
              callback(403,{'Error':'Missing required token in the header,or token id incorrect'});
          }
    });
  
  }else{
    callback(400,{'Error':'Required fields are missing'});
  }
   
};

//Users-delete
//Required Field:phone_no,token
//Optional Fields:none
handler_user.delete = function(data,callback){
  //check the phone no is valid
 if(typeof(data.queryStringObj.phone_no)=='string' && data.queryStringObj.phone_no.trim().length==10){
        var phone_no = data.queryStringObj.phone_no.trim();
         //Get the token from header
        var token_id = typeof(data.header.token_id)=='string' ?data.header.token_id.trim():false;
        //verify the token is valid for given phone number 
        handler_tokens.verifyToken(phone_no,token_id,function(validToken){
          if(validToken)
          {
             
             __data.read('users',phone_no,function(err,data){

              if(!err && data){
              //delete the file
               
               __data.delete('users',phone_no.trim(),function(err){
                if(!err){
                  callback(200);
                 }
                else{
                   callback(500,{'Error':'Could not delete the file'});
                 }
               });
             }
             else{
              callback(404,{'Error':'User doesn\'t exist'});
             }
           });

          }
          else{
               callback(403,{'Error':'Missing required token in the header,or token id incorrect'});
          }
       });
  }      
 else{
  callback(400,{'Error':'Required fields are missing'});
 }    

};





//Handler for token 
handler.tokens=function(data,callback){
    //check the method 
    var acceptableMethods = ['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method)>-1)
    {
       handler_tokens[data.method](data,callback);
    }
    else
    {
      callback(405);
    }
}
    //Container for token submethods
var handler_tokens={};

//Token-post
//Required Field:phone,password
//Optional data:none 
handler_tokens.post = function(data,callback){
  _performance.mark('entered function');
  var phone_no = typeof(data.payload.phone_no)=='string'&& data.payload.phone_no.trim().length==10?data.payload.phone_no.trim():false;
  var password = typeof(data.payload.password)=='string'&& data.payload.password.trim().length>0?data.payload.password.trim():false;
    _performance.mark('inputs validated');
  if(phone_no && password){
      //Lookup  for the user with the given phone_no
       _performance.mark('beginning user lookup');
      __data.read('users',phone_no,function(err,userData){
          _performance.mark('user lookup complete');
        if(!err){
          //Hash the password from the data,and check its validation 
          _performance.mark('beginning password hashing');
          var hashedPassword = helpers.hash(password);
          _performance.mark('password hashing complete');  
          if(hashedPassword===userData.hashedPassword){
            //generate the token ,and set the expiration time to 1 hour in time
            _performance.mark('creating data for token');
              var token = helpers.createRandomString(20);
              var expires =Date.now()+1000*60*60;

              var tokenObj ={
                'phone_no':phone_no,
                'token_id':token,
                'expires':expires
              }; 
            //create token for the user
               _performance.mark('beginning storing token');
            __data.create('tokens',token,tokenObj,function(err){
                 _performance.mark('storing token complete');
            // Gather all measurements
            _performance.measure('Beginning to end', 'entered function', 'storing token complete');
            _performance.measure('Validating user inputs', 'entered function', 'inputs validated');
            _performance.measure('User lookup', 'beginning user lookup', 'user lookup complete');
            _performance.measure('Password hashing', 'beginning password hashing', 'password hashing complete');
            _performance.measure('Token data creation','creating data for token', 'beginning storing token');
            _performance.measure('Token storing','beginning storing token', 'storing token complete');

            // Log out all the measurements
            var measurements = _performance.getEntriesByType('measure');
            measurements.forEach(function(measurement){
              debug('\x1b[33m%s\x1b[0m',measurement.name+' '+measurement.duration);
            });
               if(!err){
                 callback(200,tokenObj);
               }else{
                callback(500,{'Error':'Could not create new token'});
               }
            });
             

          }else{
            callback(404,{'Error':'Password entered is incorrect'});
          }
          

        }else{
          callback('404',{'Error':'No such user exist'});
        }
      });

  }else{
    callback(400,{'Error':'Required Fields are incorrect or missing'});
  }

};

//TOKEN-GET
//Required data :token_id
//Optional data :none
handler_tokens.get = function(data,callback){
   var token_id=typeof(data.queryStringObj.token_id)=='string' && data.queryStringObj.token_id.trim().length==20?data.queryStringObj.token_id.trim():false;
   if(token_id)
   {
       
       
       __data.read('tokens',token_id,function(err,usertoken){
          if(!err && usertoken){
            callback(200,usertoken);
          }else{
            callback(404);
          }
        });
    }
   else{
       callback(400,{'Error':'Missing required field,or field is invalid'});
   }
};


//TOKEN-PUT
//Required data:token_id,extend
//Optional data:none

handler_tokens.put= function(data,callback){
   var token_id=typeof(data.payload.token_id)=='string'&& data.payload.token_id.trim().length==20?data.payload.token_id.trim():false;
   var extend  =typeof(data.payload.extend)=='boolean' && data.payload.extend==true?true:false;
   if(token_id && extend){
        //LookUp for existing token 
       
       __data.read('tokens',token_id,function(err,usertoken){
          if(!err){
            //Check to make sure token is not expired yet 
            if(usertoken.expires>Date.now())
            {
               // Set the expiration an hour from now
                 usertoken.expires = Date.now() + 1000 * 60 * 60;
                // Store the new updates
                
                __data.update('tokens',token_id,usertoken,function(err){
                  if(!err){
                    callback(200);
                  } else {
                    callback(500,{'Error' : 'Could not update the token\'s expiration.'});
                  }
                });

            }else{
              callback(400,{'Error':'Token has altready expired can\'t be extended'});
            }
          }
          else{
            callback(404);
          }
        });
    }
    else{
     callback(400,{'Error':'Required fields are missing or invalid'});
   }
};

//TOKEN_DELETE
//required-field:id
//Optional-Fields:none
handler_tokens.delete=function(data,callback){
   var token_id=typeof(data.queryStringObj.token_id)=='string'&& data.queryStringObj.token_id.trim().length==20?data.queryStringObj.token_id.trim():false;
    if(token_id){
       // Lookup the token
    
    __data.read('tokens',token_id,function(err,tokenData){
      if(!err && tokenData){
        // Delete the token
        
        __data.delete('tokens',token_id,function(err){
          if(!err){
            callback(200);
          } else {
            callback(500,{'Error' : 'Could not delete the specified token'});
          }
        });
      } else {
        callback(400,{'Error' : 'Could not find the specified token.'});
      }
    });
    }else{
      callback(400,{'Error':'Required fields are missing or Invaid'})
    }
};

//Verify the given user's phone and token_id
handler_tokens.verifyToken = function(phone_no,token_id,callback){
  
  __data.read('tokens',token_id,function(err,tokenData){
     if(!err && tokenData){
       if(tokenData.phone_no == phone_no && tokenData.expires > Date.now()){
         callback(true);     
       }
       else{

        callback(false);
       }
     }
     else{
       
        callback(false);
     }
  });
};



//Handler for checks
handler.checks=function(data,callback){
    //check the method 
    var acceptableMethods = ['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method)>-1)
    {
       handler_checks[data.method](data,callback);
    }
    else
    {
      callback(405);
    }
}




// Container for all the checks methods
handler_checks={};


// Checks - post
// Required data: protocol,url,method,successCodes,timeoutSeconds
// Optional data: none
handler_checks.post = function(data,callback){
  // Validate inputs
  var protocol = typeof(data.payload.protocol) == 'string' && ['https','http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
  var url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
  var method = typeof(data.payload.method) == 'string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
  var successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
  var timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;
  if(protocol && url && method && successCodes && timeoutSeconds){

    // Get token from header
    var token_id = typeof(data.header.token_id) == 'string' ? data.header.token_id : false;

    // Lookup the user phone by reading the token
    
    __data.read('tokens',token_id,function(err,tokenData){
      if(!err && tokenData){
        var userPhone = tokenData.phone_no;

        // Lookup the user data
        
        __data.read('users',userPhone,function(err,userData){
          if(!err && userData){
            var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
            // Verify that user has less than the number of max-checks per user
            if(userChecks.length < config.maxChecks){

              // Verify that the URL given has DNS entries (and therefore can resolve)
              var parsedUrl = _url.parse(protocol+'://'+url, true);
              var hostName = typeof(parsedUrl.hostname) == 'string' && parsedUrl.hostname.length > 0 ? parsedUrl.hostname : false;
              dns.resolve(hostName,function(err,records){
                if(!err && records){
                    // Create random id for check
              var checkId = helpers.createRandomString(20);

              // Create check object including userPhone
              var checkObject = {
                'id' : checkId,
                'userPhone' : userPhone,
                'protocol' : protocol,
                'url' : url,
                'method' : method,
                'successCodes' : successCodes,
                'timeoutSeconds' : timeoutSeconds
              };

              // Save the object
              
              __data.create('checks',checkId,checkObject,function(err){
                if(!err){
                  // Add check id to the user's object
                  userData.checks = userChecks;
                  userData.checks.push(checkId);

                  // Save the new user data
                  
                  __data.update('users',userPhone,userData,function(err){
                    if(!err){
                      // Return the data about the new check
                      callback(200,checkObject);
                    } else {
                      callback(500,{'Error' : 'Could not update the user with the new check.'});
                    }
                  });
                } else {
                  callback(500,{'Error' : 'Could not create the new check'});
                }
              });

                }
                else{
                  callback(400,{'Error':'The hostname of the URL entrered did not resolve to any DNS entries'});
                }
              });

            } else {
              callback(400,{'Error' : 'The user already has the maximum number of checks ('+config.maxChecks+').'})
            }


          } else {
            callback(403);
          }
        });


      } else {
        callback(403);
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required inputs, or inputs are invalid'});
  }
};

// Checks - get
// Required data: id
// Optional data: none
handler_checks.get = function(data,callback){
  // Check that id is valid
  var id = typeof(data.queryStringObj.id) == 'string' && data.queryStringObj.id.trim().length == 20 ? data.queryStringObj.id.trim() : false;
  if(id){
    // Lookup the check
    
    __data.read('checks',id,function(err,checkData){
      if(!err && checkData){
        // Get the token that sent the request
        var token = typeof(data.header.token_id) == 'string' ? data.header.token_id : false;
        // Verify that the given token is valid and belongs to the user who created the check
        handler_tokens.verifyToken(checkData.userPhone,token,function(tokenIsValid){
          if(tokenIsValid){
            // Return check data
            callback(200,checkData);
          } else {
            callback(403);
          }
        });
      } else {
        callback(404);
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field, or field invalid'})
  }
};

// Checks - put
// Required data: id
// Optional data: protocol,url,method,successCodes,timeoutSeconds (one must be sent)
handler_checks.put = function(data,callback){
  // Check for required field
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;

  // Check for optional fields
  var protocol = typeof(data.payload.protocol) == 'string' && ['https','http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
  var url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
  var method = typeof(data.payload.method) == 'string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
  var successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
  var timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;

  // Error if id is invalid
  if(id){
    // Error if nothing is sent to update
    if(protocol || url || method || successCodes || timeoutSeconds){
      // Lookup the check
      
      __data.read('checks',id,function(err,checkData){
        if(!err && checkData){
          // Get the token that sent the request
          var token = typeof(data.header.token_id) == 'string' ? data.header.token_id : false;
          // Verify that the given token is valid and belongs to the user who created the check
          handler_tokens.verifyToken(checkData.userPhone,token,function(tokenIsValid){
            if(tokenIsValid){
              // Update check data where necessary
              if(protocol){
                checkData.protocol = protocol;
              }
              if(url){
                checkData.url = url;
              }
              if(method){
                checkData.method = method;
              }
              if(successCodes){
                checkData.successCodes = successCodes;
              }
              if(timeoutSeconds){
                checkData.timeoutSeconds = timeoutSeconds;
              }

              // Store the new updates
              
              __data.update('checks',id,checkData,function(err){
                if(!err){
                  callback(200);
                } else {
                  callback(500,{'Error' : 'Could not update the check.'});
                }
              });
            } else {
              callback(403);
            }
          });
        } else {
          callback(400,{'Error' : 'Check ID did not exist.'});
        }
      });
    } else {
      callback(400,{'Error' : 'Missing fields to update.'});
    }
  } else {
    callback(400,{'Error' : 'Missing required field.'});
  }
};


// Checks - delete
// Required data: id
// Optional data: none
handler_checks.delete = function(data,callback){
  // Check that id is valid
  var id = typeof(data.queryStringObj.id) == 'string' && data.queryStringObj.id.trim().length == 20 ? data.queryStringObj.id.trim() : false;
  if(id){
    // Lookup the check
    
    __data.read('checks',id,function(err,checkData){
      if(!err && checkData){
        // Get the token that sent the request
        var token = typeof(data.header.token_id) == 'string' ? data.header.token_id : false;
        // Verify that the given token is valid and belongs to the user who created the check
        handler_tokens.verifyToken(checkData.userPhone,token,function(tokenIsValid){
          if(tokenIsValid){

            // Delete the check data
            
            __data.delete('checks',id,function(err){
              if(!err){
                // Lookup the user's object to get all their checks
                
                __data.read('users',checkData.userPhone,function(err,userData){
                  if(!err){
                    var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];

                    // Remove the deleted check from their list of checks
                    var checkPosition = userChecks.indexOf(id);
                    if(checkPosition > -1){
                      userChecks.splice(checkPosition,1);
                      // Re-save the user's data
                      userData.checks = userChecks;
                      
                      __data.update('users',checkData.userPhone,userData,function(err){
                        if(!err){
                          callback(200);
                        } else {
                          callback(500,{'Error' : 'Could not update the user.'});
                        }
                      });
                    } else {
                      callback(500,{"Error" : "Could not find the check on the user's object, so could not remove it."});
                    }
                  } else {
                    callback(500,{"Error" : "Could not find the user who created the check, so could not remove the check from the list of checks on their user object."});
                  }
                });
              } else {
                callback(500,{"Error" : "Could not delete the check data."})
              }
            });
          } else {
            callback(403);
          }
        });
      } else {
        callback(400,{"Error" : "The check ID specified could not be found"});
      }
    });
  } else {
    callback(400,{"Error" : "Missing valid id"});
  }
};




//Export the handler
module.exports= handler;