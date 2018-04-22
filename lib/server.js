/*
 *Server related tasks
*/
//dependencies
var http = require('http');
var https = require('https');
var url  = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('../config');
var fs     = require('fs');
var __data = require('./data');
var helpers = require('./helpers');
var handlers = require('./handlers');
var path     = require('path');


//Instantiate the server module object
var server={};


//Instantiate the Http Server
server.httpServer = http.createServer(function(req,res){
    server.unifiedServer(req,res);
 
});


//Instantiate the Https Server
 server.httpsServerOption ={
  'key': fs.readFileSync(path.join(__dirname,'/../https/key.pem'),'utf8'),
  'cert':fs.readFileSync(path.join(__dirname,'/../https/cert.pem'),'utf8')
};

server.httpsServer = https.createServer(server.httpsServerOption,function(req,res){
    unifiedServer(req,res);
});

//define a unified server function
server.unifiedServer = function(req,res){
	
	//get the parsedurl from user
 var parsedurl = url.parse(req.url,true);

 //get the path
 var path = parsedurl.pathname;
 var trimmedpath=path.replace(/^\/+|\/+$/g,'');
 
 //get the method
 var method = req.method.toLowerCase();

 //get the header object
 var header = req.headers;

 //get the query string
 var queryStringObj = parsedurl.query;

 //get the payload ,if any
 var decoder = new StringDecoder('utf-8');
 var buffer ='';

 //event occur when we get the stream of data 
 req.on('data',function(data){
    buffer+=decoder.write(data);
 });


 req.on('end',function(){
 	buffer+=decoder.end();
    
    //if the path exist then direct req to that path else to notFound
    var chosenHandler = typeof(server.router[trimmedpath])!=='undefined' && server.router[trimmedpath]?server.router[trimmedpath]:handlers.notfound;
    
    // If the request is within the public directory use to the public handler instead
       chosenHandler = trimmedpath.indexOf('public/') > -1 ? handlers.public:chosenHandler;


    //define the data object 
    var data={
    	'trimmedpath':trimmedpath,
    	'queryStringObj':queryStringObj,
    	'header':header,
    	'payload':helpers.parseJsonToObject(buffer),
    	'method':method
    }
    
    //Route the request to the handler specified in the router
    chosenHandler(data,function(statusCode,payload,contentType){
    	// Determine the type of response (fallback to JSON)
         contentType = typeof(contentType) == 'string' ? contentType : 'json';

         // Use the status code returned from the handler, or set the default status code to 200
         statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

         // Return the response parts that are content-type specific
         var payloadString = '';
         if(contentType == 'json'){
           res.setHeader('Content-Type', 'application/json');
           payload = typeof(payload) == 'object'? payload : {};
           payloadString = JSON.stringify(payload);
         }

         if(contentType == 'html'){
           res.setHeader('Content-Type', 'text/html');
           payloadString = typeof(payload) == 'string'? payload : '';
         }
        
           if(contentType == 'favicon'){
           res.setHeader('Content-Type', 'image/x-icon');
           payloadString = typeof(payload) !== 'undefined' ? payload : '';
         }

         if(contentType == 'plain'){
           res.setHeader('Content-Type', 'text/plain');
           payloadString = typeof(payload) !== 'undefined' ? payload : '';
         }

         if(contentType == 'css'){
           res.setHeader('Content-Type', 'text/css');
           payloadString = typeof(payload) !== 'undefined' ? payload : '';
         }

         if(contentType == 'png'){
           res.setHeader('Content-Type', 'image/png');
           payloadString = typeof(payload) !== 'undefined' ? payload : '';
         }

         if(contentType == 'jpg'){
           res.setHeader('Content-Type', 'image/jpeg');
           payloadString = typeof(payload) !== 'undefined' ? payload : '';
         }


         // Return the response-parts common to all content-types
         res.writeHead(statusCode);
         res.end(payloadString);
     //    console.log("the response is ",payload,status);
       });

    });
};
   
//define the router
 server.router={
    '':handlers.index,
    'account/create':handlers.accountCreate,
    'account/edit':handlers.accountEdit,
    'account/deleted':handlers.accountDeleted,
    'session/create':handlers.sessionCreate,
    'session/deleted':handlers.sessionDeleted,
    'checks/all':handlers.checksList,
    'checks/create':handlers.checksCreate,
    'checks/edit':handlers.checksEdit,
	  'api/users':handlers.users,
	  'api/tokens':handlers.tokens,
	  'api/checks':handlers.checks,
    'ping':handlers.ping,
    'favicon.ico' : handlers.favicon,
    'public':handlers.public

};

//INIT THE SERVER
server.init = function(){
 //Start the http server
    server.httpServer.listen(config.httpPort,function(){
     console.log("server has started at port "+config.httpPort);
    });
//Start the https server
    server.httpsServer.listen(config.httpsPort,function(){
     console.log("server has started at port "+config.httpsPort);
    });

}

//Export the server
module.exports= server;
