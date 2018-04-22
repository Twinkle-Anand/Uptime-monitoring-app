/*
 *Primary file for api
 *
 */

 //Dependencies
 var server = require("./lib/server");
 var worker = require("./lib/worker");
 var cli    = require("./lib/cli");

 // Declare the app
 var app={};

// Init function 
app.init=function(){
 
 //Start the server
  server.init();
 //Start the worker
  worker.init();
 //Start the cli , but make sure it starts last
  setTimeout(function(){
    cli.init();
  },50); 
  
};
//Execute only when called from the command line
if(require.main == module)
{
	app.init();
}


//Export the app
module.exports=app;