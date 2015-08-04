//export the Query String.
exports.queryStringDetails = function(queryString) {
   //varaiables initializations
var strLength=0;
var formatedQueryString='';
var qstnmarkSplCharacter='?';
var ampersandSplCharacter='&';
for (var key in queryString)
   {

  
     if(strLength==0){
	 formatedQueryString=qstnmarkSplCharacter+key+'='+queryString[key];
	 
	 }
	 else{
	 formatedQueryString=formatedQueryString+ampersandSplCharacter+key+'='+queryString[key];
	 }
	 strLength=strLength+1;
	 
   }
   
  return formatedQueryString;
};
//export the Request Header detials.   
exports.reqHeaderDetails = function(headerDetails) {
   //varaibles initializations  
var formatedHeaderString='';
var dblInvrtdCommaSplCharacter='"';
var commaSplCharacter=',';
var strHeaderLength=0;
for (var key in headerDetails)
   {

   
     if(strHeaderLength==0){
	 formatedHeaderString=dblInvrtdCommaSplCharacter+key+dblInvrtdCommaSplCharacter+':'+dblInvrtdCommaSplCharacter+headerDetails[key]+dblInvrtdCommaSplCharacter;
	 
	 }
	 else{
	 formatedHeaderString=formatedHeaderString+commaSplCharacter+dblInvrtdCommaSplCharacter+key+dblInvrtdCommaSplCharacter+':'+dblInvrtdCommaSplCharacter+headerDetails[key]+dblInvrtdCommaSplCharacter;
	 
	 }
	 strHeaderLength=strHeaderLength+1;
	 
   }

  return '{ "headers":'+'{'+formatedHeaderString+'}'+'}';
};



