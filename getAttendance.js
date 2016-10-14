
module.exports = function(token,res){

var request = require('request');
// var request = request.defaults({'proxy':'http://localhost:3333'})
var cheerio = require('cheerio');
var url="https://academia.srmuniv.ac.in/liveViewHeader.do";
var request = request.defaults({jar:true});
 var headers ={'User-Agent':'Mozilla/5.0 (iPad; CPU OS 7_0_4 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/34.0.1847.18 Mobile/11B554a Safari/9537.53',
 'Accept':'*/*',
 'Accept-Language':'en-US,en;q=0.5',
 'Accept-Encoding':'text/html',
 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
 'X-Requested-With': 'XMLHttpRequest',
 'Cookie':'clientauthtoken='+token
}


var data = {
'sharedBy':'srm_university',
'appLinkName':'academia-academic-services',
'viewLinkName':'My_Attendance',
'urlParams':'{}',
'isPageLoad':'true'
}


  if(token.length==152){
 request.post({url:url,headers:headers,form:data,rejectUnauthorized: false},function(err,httpresp,body){


   if(err){
     console.log(err);
     res.send({"error":err});
   }else{

              $ = cheerio.load(body);
              var length = 0;
              var headers = [];
              var data = [];
              var datachunk = [];


      if($('div[class=cntdDiv]').length==1){





          var table_ = $('table[width=707]').find('tr').each(function(i,ele){

            if(i==0){
              //get the length of headers here
              //store the headers here
              $(this).find('td').each(function(i,ele){
                length+=1;
                headers.push($(this).text());
              });

            }else{
              //hande data here
              $(this).find('td').each(function(i,ele){
                data.push($(this).text());
              });

            }

          });




     while (data.length > 0) {
       datachunk.push(data.splice(0,length));
     }

     var output = {"success":"true","total_sub":datachunk.length,"headers":headers,"data":datachunk};
     res.json(output);
       }else{
         console.log("Div with calss cntDiv not found!");
     res.json({"success":"false","error":"Invalid Token"});
   }}

     });


}else{
console.log("token length mismatch!");
res.json({"success":"false","error":"Invalid Token"});
}



     }
