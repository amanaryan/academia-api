
module.exports = function(token,res){
var token = token;
var request = require('request');
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
'viewLinkName':'Course_Confirmation_Report',
'urlParams':'{}',
'isPageLoad':'true'
}

try{
if(token.length==152){
 request.post({url:url,headers:headers,form:data,rejectUnauthorized: false},function(err,httpresp,body){

   if(err){
     console.log(err);
     res.send({"error":err});
   }else{

    var name,regno,prog,dept,sem,batch;

     $ = cheerio.load(body);

     if($('div[class=cntdDiv]').length==1){

     var temp = $('div[class=cntdDiv]').find('table[align=left]').find('tr').each(function(i,ele){

       switch (i) {
        case 0:
            regno = $(this).text().split(':')[1];
            break;
        case 1:
            name =  $(this).text().split(':')[1];
            break;
        case 2:
            prog =  $(this).text().split(':')[1];
            break;
        case 3:
            dept =  $(this).text().split(':')[1];
            break;
        case 4:
            var temp =  $(this).text().replace("Batch",":Batch");
            temp = temp.split(":");
            sem = temp[1];
            batch = temp[3];
           break;
         default:

       }

     });

var output = {"Name":name,"RegNo":regno,"Prog":prog,"Dept":dept,"Sem":sem,"Batch":batch};
res.json({"success":"true","data":output});
output={};
name=null;
regno=null;
prog=null;
dept=null;
sem=null;
batch=null;

}else{
res.json({"success":"false","error":"Invalid Token"});
}

     }

 });
}else{

res.json({"success":"false","error":"Invalid Token"});


}

}
catch(err){
res.json({"success":"false","error":"Invalid Token"});``  
}

}
