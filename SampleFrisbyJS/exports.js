

//export the Query String.
exports.queryStringDetails = function(queryString) {
   //Query String varaiables initializations
var strLength=0;
var formatedQueryString='';
var specialCharacter1='?';
var specialCharacter2='&';
for (var key in queryString)
   {

   console.log('Query String in export.js'+queryString)
     if(strLength==0){
	 formatedQueryString=specialCharacter1+key+'='+queryString[key];
	 
	 }
	 else{
	 formatedQueryString=formatedQueryString+specialCharacter2+key+'='+queryString[key];
	 }
	 strLength=strLength+1;
	 //console.log('formatedQueryString' + ' is ' + formatedQueryString);
   }
   
  return formatedQueryString;
};
//export the Request Header detials.   
exports.reqHeaderDetails = function(headerDetails) {
   //Header String varaibles initializations  
var formatedHeaderString='';
var specialCharacter3='"';
var specialCharacter4=',';
var strHeaderLength=0;
for (var key in headerDetails)
   {

   console.log('headr details in export.js'+headerDetails)
     if(strHeaderLength==0){
	 formatedHeaderString=specialCharacter3+key+specialCharacter3+':'+specialCharacter3+headerDetails[key]+specialCharacter3;
	 
	 }
	 else{
	 formatedHeaderString=formatedHeaderString+specialCharacter4+specialCharacter3+key+specialCharacter3+':'+specialCharacter3+headerDetails[key]+specialCharacter3;
	 //console.log('formatedHeaderString'+formatedHeaderString);
	 }
	 strHeaderLength=strHeaderLength+1;
	 //console.log('formatedHeaderString in export.js' + ' is ' + formatedHeaderString);
   }

  return '{ "headers":'+'{'+formatedHeaderString+'}'+'}';
};

  
