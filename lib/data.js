/*
 * Library for storing and editing the data
 */

//Dependencies 
 var fs = require('fs');
 var path = require('path');
 var helpers = require('./helpers');
//Container for the module to be exported
  var lib = {};

//Base directory of the data folder
  lib.baseDir = path.join(__dirname,'/../.data/'); 

// Write the data into the file 
 lib.create = function(dir,file,data,callback){
     //Open the file for writing
     fs.open(lib.baseDir+dir+"/"+file+'.json','wx',function(err,fileDescriptor){
        if(!err && fileDescriptor){
        	//Convert the data to string
        	var stringData = JSON.stringify(data);

        	//Write the file and close it
        	fs.writeFile(fileDescriptor,stringData,function(err){
               if(!err){
                 //CLose the file
                 fs.close(fileDescriptor,function(err){
                  if(!err){
                  	callback(false);
                  }
                  else{
                  	callback('Error closing the new File');
                  }

                 });
               }
               else{
                 callback('Error writing to the new File');
               }    
        	});
        }
        else{
        	callback('Could not create new file,it may already exist');
        }
     });  
};   


//Read the already existing file 
lib.read=function(dir,filename,callback){
    fs.readFile(lib.baseDir+dir+'/'+filename+'.json','utf-8',function(err,data){
       if(!err && data )
       {
        var parsedData=helpers.parseJsonToObject(data);
        callback(false,parsedData);
       }
       else{
        console.log(err);
        callback(err,data);
       }
     });
};

//Update the data inside the file
lib.update=function(dir,filename,data,callback){
	fs.open(lib.baseDir+dir+'/'+filename+'.json','r+',function(err,fileDescriptor){
		if(!err && fileDescriptor )
		{
            //Convert the data into String
            var stringData = JSON.stringify(data);
            //Truncate the file 
            fs.truncate(fileDescriptor,function(err){
               if(!err){
               	  //Write the file and close it
               	  fs.writeFile(fileDescriptor,stringData,function(err){
                    if(!err){
                    	  fs.close(fileDescriptor,function(err){
                         if(!err){
                           callback(false);
                         }
                         else{
                         	callback('Error closing existing file');
                         }
                        });
                    }
                    else{
                      callback('Error occur while overwriting the file');
                    }
               	  });
               }
               else{
               	callback('Error truncating file');

               }
            });
		}
		else{ 
			callback('Error while updating the file or it may not exist');
		}
	});
};

//Delete the existing file
lib.delete = function(dir,filename,callback){
	fs.unlink(lib.baseDir+dir+'/'+filename+'.json',function(err){
	   if(!err){	
	    callback(false);
	   }
	   else{
	   	callback('Error while deleting the file');
	   }
	 });
};

//list all the items in a directory
lib.list = function(dir,callback){
  fs.readdir(lib.baseDir+dir+'/',function(err,data){
     if(!err && data && data.length>0){
      var trimmedFileNames =[];
      data.forEach(function(filename){
        trimmedFileNames.push(filename.replace('.json',''));
      });
      callback(false,trimmedFileNames);
     }
     else{
      callback(err,data);
     }
  });

};





 module.exports=lib;