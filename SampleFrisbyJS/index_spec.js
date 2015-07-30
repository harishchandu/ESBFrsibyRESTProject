var frisby = require('frisby');
var util = require('util');
var fs = require('fs');
var export_module=require('./exports.js');
//var export_headerDetailsModule=require('./exportHeader.js');
var file = "test_case.json";
var myObj=new Object();
var data = fs.readFileSync('sample_test_case.json');
 myObj = JSON.parse(data);
 //console.log(myObj)
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
 
 //var actualJSONObj=myObj.TestSuite.TestCases[i].assertions;

   //console.log("Actaul RESPONSE----------"+JSON.stringify(actualJSONObj)) 
   var JSONFormatheaderDet=new Object();
  var headerDetails=export_module.reqHeaderDetails(hdrDetails);
  // var headerDetails=export_headerDetailsModule.headerDetails(hdrDetails);
   JSONFormatheaderDet=JSON.parse(headerDetails);
   console.log('headerDetails'+headerDetails)
   
//}
 //console.log("EndpointURL----"+EndpointURL)
 var formatedQueryStr=export_module.queryStringDetails(queryString);
 // console.log('formatedQueryStr'+formatedQueryStr)
 

 var EndpointURL=Endpoint+Resource+formatedQueryStr;
 (function(i) {
 frisby.create(TestCase)
 .get(EndpointURL
  	,JSONFormatheaderDet)
 //.inspectRequest()
 .auth(username,password,false)
  .inspectJSON()
  .afterJSON(function (body) {
  	console.log("Expected RESPONSE"+JSON.stringify(body))
	var assertions=myObj.TestSuite.TestCases[i].assertions;
	console.log("Actaul RESPONSE"+'iterator'+i+JSON.stringify(assertions))
	 	
	    
	
 expect(JSON.stringify(body)).toMatch(JSON.stringify(assertions))
  
		
   
	})
	   .toss() ;
	    })(i);
   
 }
 