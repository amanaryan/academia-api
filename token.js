
module.exports = function(reusername,repassword,res){

  var request = require('request');

  var request = request.defaults({jar:true});

  var url="https://academia.srmuniv.ac.in/accounts/signin.ac";

  var email = reusername;
  var password = repassword;

  console.log(Date.now() + " "+email+" "+password);



  var headers ={'User-Agent':'Mozilla/5.0 (iPad; CPU OS 7_0_4 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/34.0.1847.18 Mobile/11B554a Safari/9537.53',
  'Accept':'*/*',
  'Accept-Language':'en-US,en;q=0.5',
  'Accept-Encoding':'text/plain',
  'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
  'Referer':'https://academia.srmuniv.ac.in/accounts/signin?_sh=false&hideidp=true&portal=10002227248&client_portal=true&servicename=ZohoCreator&serviceurl=https//academia.srmuniv.ac.in/',
  'Connection':'close',
  'Pragma':'no-cache',
  'Cache-Control':'no-cache'}

  var params ={'username':email,'password':password,'client_portal':'true','portal':'10002227248','servicename':'ZohoCreator','serviceurl':'https://academia.srmuniv.ac.in/','is_ajax':'true','grant_type':'password'}


  request.post({url:url,headers:headers,form:params,rejectUnauthorized: false},function(err,httpresp,body){


    if(err){
      console.log(err);
      res.json({"success":"false","error":"error in Zoho, Hang on for a fix."});
    }else{

	try{

      if(typeof(JSON.parse(body).error)!=='undefined'){

        res.json({"success":"false","error":"invalid credentials"});

      }else if(typeof(JSON.parse(body).data.response)!=="undefined"){

        var access_token = JSON.parse(body).data.access_token;

        res.json({"success":"true","token":access_token});
        
        console.log(access_token);
      }


	}catch(err){

console.log("error in token js ");
	}
    }
  });



}
