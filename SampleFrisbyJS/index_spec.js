var frisby = require('frisby');
var util = require('util');
var fs = require('fs');
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
 var headerDetails=myObj.GETRESTServices.TestCases[i].headerString;
 var queryString=myObj.GETRESTServices.TestCases[i].queryString;
 console.log('QUERY STRING'+queryString)
//for(i = 0; i < 2; i++) {
//var str=queryString[0];
//console.log('queryIndexString'+str);
var strLength=0;
var formatedQueryString='';
var specialCharacter1='?';
var specialCharacter2='&';
   for (var key in queryString)
   {
     if(strLength==0){
	 formatedQueryString=specialCharacter1+key+'='+queryString[key];
	 
	 }
	 else{
	 formatedQueryString=formatedQueryString+specialCharacter2+key+'='+queryString[key];
	 }
	 strLength=strLength+1;
	 //console.log('formatedQueryString' + ' is ' + formatedQueryString);
   }
   var formatedHeaderString='';
   var specialCharacter3='"';
   var specialCharacter4=',';
   var strHeaderLength=0;
   for (var key in headerDetails)
   {
     if(strHeaderLength==0){
	 formatedHeaderString=specialCharacter3+key+specialCharacter3+':'+specialCharacter3+headerDetails[key]+specialCharacter3;
	 
	 }
	 else{
	 formatedHeaderString='{ headers:'+'{'+formatedHeaderString+specialCharacter4+specialCharacter3+key+specialCharacter3+':'+specialCharacter3+headerDetails[key]+specialCharacter3+'}'+'}';
	 console.log('formatedHeaderString'+formatedHeaderString);
	 }
	 strHeaderLength=strHeaderLength+1;
	 //console.log('formatedQueryString' + ' is ' + formatedQueryString);
   }
   var headerDetails=formatedHeaderString;
   console.log('headerDetails'+headerDetails)
//}
 //console.log("EndpointURL----"+EndpointURL)
 var EndpointURL=Endpoint+Resource+formatedQueryString;
 frisby.create(TestCase)
 .get(EndpointURL
  	,headerDetails)
 //.inspectRequest()
  .inspectJSON()
  .afterJSON(function (body) {
  	//console.log("RESPONSE"+body)
    expect(body.MobilePhoneNumber).toMatch(3603496654)
   expect(body.status).toMatch('SUCCESS')
    expect(body.MobilePhoneStatusCode).toMatch('V')
  })
   .toss() ;
 }
 