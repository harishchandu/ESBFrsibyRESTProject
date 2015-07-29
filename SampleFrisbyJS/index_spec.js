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
 for(i=0;i<myObj.GETRESTServices.TestCases.length;i++)
 {
 var Endpoint=myObj.GETRESTServices.TestCases[i].Endpoint;
 var Resource=myObj.GETRESTServices.TestCases[i].Resource;
 var URL=myObj.GETRESTServices.TestCases[i].URL;
 var TestCase=myObj.GETRESTServices.TestCases[i].Description;
 var hdrDetails=myObj.GETRESTServices.TestCases[i].headerString;
 var queryString=myObj.GETRESTServices.TestCases[i].queryString;
 var username=myObj.GETRESTServices.TestCases[i].UserName;
 var password=myObj.GETRESTServices.TestCases[i].Password;
 var expectedFormatJSON=new Object();
 var expectedJSON=myObj.GETRESTServices.TestCases[i].assertions;
    
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
 frisby.create(TestCase)
 .get(EndpointURL
  	,JSONFormatheaderDet)
 //.inspectRequest()
 .auth(username,password,false)
  .inspectJSON()
  .afterJSON(function (body) {
  	//console.log("RESPONSE"+body.toString())
	for(var key in expectedJSON)
	{
	var expectJSONKey=key;
	//console.log('expectJSONKey'+expectJSONKey)
	 for (var key in body)
   {
   var bodyJSONKey=key;
   if(expectJSONKey==bodyJSONKey){
   
   //console.log('Key'+key)
   //console.log('Value'+body[key])
   var matchJSON=body[bodyJSONKey];
   expect(matchJSON).toMatch(expectedJSON[expectJSONKey])
   }
   }
   }
    //expect(body.MobilePhoneNumber).toMatch(3603496654)
   //expect(body.status).toMatch('SUCCESS')
    //expect(body.MobilePhoneStatusCode).toMatch('V')
  })
   .toss() ;
 }
 