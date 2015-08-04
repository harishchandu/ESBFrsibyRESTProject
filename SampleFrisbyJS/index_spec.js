var frisby = require('frisby');
var util = require('util');
var fs = require('fs');
var export_module=require('./exports.js');
var dir='./get/';
var myObj=new Object();

//search for the files in the specified directory
function walkDirectory(currentDirPath, callback) {
    var fs = require('fs'), path = require('path');
    fs.readdirSync(currentDirPath).forEach(function(name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkDirectory(filePath, callback);
        }
    });
}
walkDirectory(dir, function(filePath, stat) {
  
//Read the data from the file
var data = fs.readFileSync(filePath);
 
myObj = JSON.parse(data);
 //collect the Test Cases
 for(i=0;i<myObj.TestSuite.TestCases.length;i++)
 {
 var Endpoint=myObj.TestSuite.TestCases[i].Endpoint;
 var Resource=myObj.TestSuite.TestCases[i].Resource;
 var URL=myObj.TestSuite.TestCases[i].URL;
 var TestCase=myObj.TestSuite.TestCases[i].Description;
 var hdrDetails=myObj.TestSuite.TestCases[i].headerString;
 var queryString=myObj.TestSuite.TestCases[i].queryString;
 var username=myObj.TestSuite.TestCases[i].UserName;
 var password=myObj.TestSuite.TestCases[i].Password;
 var expectedFormatJSON=new Object();
 

   var JSONFormatheaderDet=new Object();
  var headerDetails=export_module.reqHeaderDetails(hdrDetails);
  
   JSONFormatheaderDet=JSON.parse(headerDetails);
  
   

 var formatedQueryStr=export_module.queryStringDetails(queryString);
 
 

 var EndpointURL=Endpoint+Resource+formatedQueryStr;
 (function(i) {
 // call Frsiby Test API 
 frisby.create(TestCase)
 .get(EndpointURL
  	,JSONFormatheaderDet)
  .auth(username,password,false)
  .inspectJSON()
  .afterJSON(function (body) {
  
  
	var assertions=myObj.TestSuite.TestCases[i].assertions;
	
	 	
	//evaluate the assertions    
	
 expect(JSON.stringify(body)).toMatch(JSON.stringify(assertions))
  
		
   
	})
	   .toss() ;
	    })(i);
   
 }

 });