/*
 *
 * Config the environment 
 */

 //create an object naming environment
 var environment={};

 //define the staging environment
 environment.staging={
    'httpPort':3000,
    'httpsPort':3001,
    'envName':'staging',
    'hashingSecret':'thisIsASecret',
    'maxChecks':5,
    'twilio' : {
    'accountSid' : 'ACb32d411ad7fe886aac54c665d25e5c5d',
    'authToken' : '9455e3eb3109edc12e3d8c92768f7a67',
    'fromPhone' : '+15005550006'
    },
    'templateGlobals':{
      'appName' : 'UptimeChecker',
      'companyName' : 'NotARealCompany, Inc.',
      'yearCreated' : '2018',
      'baseUrl' : 'http://localhost:3000/'
    }
  
 };

 // Testing environment
environment.testing = {
  'httpPort' : 4000,
  'httpsPort' : 4001,
  'envName' : 'testing',
  'hashingSecret' : 'thisIsASecret',
  'maxChecks' : 5,
  'twilio' : {
    'accountSid' : 'ACb32d411ad7fe886aac54c665d25e5c5d',
    'authToken' : '9455e3eb3109edc12e3d8c92768f7a67',
    'fromPhone' : '+15005550006'
  },
  'templateGlobals' : {
    'appName' : 'UptimeChecker',
    'companyName' : 'NotARealCompany, Inc.',
    'yearCreated' : '2018',
    'baseUrl' : 'http://localhost:4000/'
  }
};


 //define the production enviroment
 environment.production= {
 	'httpPort':5000,
 	'httpsPort':5001,
 	'envName':'production',
 	'hashingSecret':'thisIsAlsoASecret',
 	'maxChecks':10,
 	 'twilio' : {
    'accountSid' : '',
    'authToken' : '',
    'fromPhone' : ''
   },
  'templateGlobals' : {
    'appName' : 'UptimeChecker',
    'companyName' : 'NotARealCompany, Inc.',
    'yearCreated' : '2018'
  }
 };

 //export the environment variabes based on cmmd-line input ;defaut is staging 
  var currEnvironment = typeof(process.env.NODE_ENV)=='string'?process.env.NODE_ENV.toLowerCase():'';

 //check the current environment is one of the environment above ,if not,default to staging area
  var environmentToExport = typeof(environment[currEnvironment])=='object'?environment[currEnvironment]:environment['staging'];

module.exports=environmentToExport;