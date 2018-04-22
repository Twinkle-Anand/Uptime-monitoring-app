/*
 * Hepler for various tasks 
 *
*/

//Dependencies 
var crypto = require('crypto');
var config = require('../config');
var querystring = require('querystring');
var https       = require('https');
var fs          = require('fs');
var path        = require('path');
//Container for all the helper
var helper = {};



//create a SHA256 hash 
helper.hash = function(str)
{
	if(typeof(str)=='string' && str.length>0)
	{
		var hash = crypto.createHmac('sha256',config.hashingSecret).update(str).digest('hex');

		return hash;
	}
	else
	{
		return {};
	}
}
// Get the string content of a template, and use provided data for string interpolation
helper.getTemplate = function(templateName,data,callback){
  templateName = typeof(templateName) == 'string' && templateName.length > 0 ? templateName : false;
  data = typeof(data) == 'object' && data !== null ? data : {};
  if(templateName){
    var templatesDir = path.join(__dirname,'/../templates/');
    fs.readFile(templatesDir+templateName+'.html', 'utf8', function(err,str){
      if(!err && str && str.length > 0){
        // Do interpolation on the string
        var finalString = helper.interpolate(str,data);
        callback(false,finalString);
      } else {
        callback('No template could be found');
      }
    });
  } else {
    callback('A valid template name was not specified');
  }
};

// Add the universal header and footer to a string, and pass provided data object to header and footer for interpolation
helper.addUniversalTemplates = function(str,data,callback){
  str = typeof(str) == 'string' && str.length > 0 ? str : '';
  data = typeof(data) == 'object' && data !== null ? data : {};
  // Get the header
  helper.getTemplate('_header',data,function(err,headerString){
    if(!err && headerString){
      // Get the footer
      helper.getTemplate('_footer',data,function(err,footerString){
        if(!err && headerString){
          // Add them all together
          var fullString = headerString+str+footerString;
          callback(false,fullString);
        } else {
          callback('Could not find the footer template');
        }
      });
    } else {
      callback('Could not find the header template');
    }
  });
};

// Take a given string and data object, and find/replace all the keys within it
helper.interpolate = function(str,data){
  str = typeof(str) == 'string' && str.length > 0 ? str : '';
  data = typeof(data) == 'object' && data !== null ? data : {};

  // Add the templateGlobals to the data object, prepending their key name with "global."
  for(var keyName in config.templateGlobals){
     if(config.templateGlobals.hasOwnProperty(keyName)){
       data['global.'+keyName] = config.templateGlobals[keyName];

     }
  }
  console.log('the object',config.templateGlobals);
  // For each key in the data object, insert its value into the string at the corresponding placeholder
  for(var key in data){
     if(data.hasOwnProperty(key) && typeof(data[key] == 'string')){
        var replace = data[key];
        var find = '{'+key+'}';
        str = str.replace(find,replace);

     }
  }
  return str;

};


//parsing json String to javascript object,without throwing
helper.parseJsonToObject = function(str){
   try{
   var JsonObj = JSON.parse(str);
      return JsonObj; 
   }
   catch(e){
    return {};
   }
};

//Random Token generation with the required length as an argument
helper.createRandomString = function(str){
	var strlength = typeof(str)=='number' && str>0?str:false;
	if(strlength){
        var str='';
        var list ='abcdefghijklmnopqrst0123456789';
        for(i=1;i<=20;i++)
        {
        	var randomChar=list.charAt((Math.floor((Math.random()*list.length))));
        	str+=randomChar;
        }
        return str;
	}
  else{
		return false;
	}
}

helper.sendTwilioSms = function(phone,msg,callback){
  // Validate parameters
  phone = typeof(phone) == 'string' && phone.trim().length == 10 ? phone.trim() : false;
  msg = typeof(msg) == 'string' && msg.trim().length > 0 && msg.trim().length <= 1600 ? msg.trim() : false;
  if(phone && msg){

    // Configure the request payload
    var payload = {
      'From' : config.twilio.fromPhone,
      'To' : '+1'+phone,
      'Body' : msg
    };
    var stringPayload = querystring.stringify(payload);


    // Configure the request details
    var requestDetails = {
      'protocol' : 'https:',
      'hostname' : 'api.twilio.com',
      'method' : 'POST',
      'path' : '/2010-04-01/Accounts/'+config.twilio.accountSid+'/Messages.json',
      'auth' : config.twilio.accountSid+':'+config.twilio.authToken,
      'headers' : {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(stringPayload)
      }
    };

    // Instantiate the request object
    var req = https.request(requestDetails,function(res){
        // Grab the status of the sent request
        var status =  res.statusCode;
        // Callback successfully if the request went through
        if(status == 200 || status == 201){
          callback(false);
        } else {
          callback('Status code returned was '+status);
        }
    });

    // Bind to the error event so it doesn't get thrown
    req.on('error',function(e){
      callback(e);
    });

    // Add the payload
    req.write(stringPayload);

    // End the request
    req.end();

  } else {
    callback('Given parameters were missing or invalid');
  }
};


// Get the contents of a static (public) asset
helper.getStaticAsset = function(fileName,callback){
  fileName = typeof(fileName) == 'string' && fileName.length > 0 ? fileName : false;
  if(fileName){
    var publicDir = path.join(__dirname,'/../public/');
    fs.readFile(publicDir+fileName, function(err,data){
      if(!err && data){
        callback(false,data);
      } else {
        callback('No file could be found');
      }
    });
  } else {
    callback('A valid file name was not specified');
  }
};

module.exports=helper;
