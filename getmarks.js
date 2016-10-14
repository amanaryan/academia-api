
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
try{
  if(token.length==152){
 request.post({url:url,headers:headers,form:data,rejectUnauthorized: false},function(err,httpresp,body){


   if(err){
     console.log(err);
     res.json({"success":"false","error":err});
   }else{
              var headers = [];
              var data = [];
              var datachunk ={};
              var marks = [];
              var marker = 0;
              $ = cheerio.load(body);



      if($('div[class=cntdDiv]').length==1){

                    var t = $('table').next().next().next().children().parent().find('tr').each(function(i,ele){


                      if(i==0){

                            $(this).find('td').each(function(n,el){
                                headers.push($(this).text());
                            });

                      }else{

                      $(this).find('td').each(function(i,elem){
                        var good = $(this).find('table').length;
                        var fontcount =  $(this).find('font').length;

                        // 0 = not good
                        // 1 = useful data


                        if(good == 1){
                          // console.log("The next item must be marks!");
                          // console.log($(this).html());
                          if($(this).text().length==0){
                            //handle blank marks here
                          datachunk["-"]="-";
                        }else{

                          $(this).find('td').each(function(i,e){
                            // console.log(e.type);

                            var re = '/(\xC2\xA0/|&nbsp;)';
                            // console.log($(this).text());
                            var tag = $(this).html().replace("<br>","").replace("&#xA0;&#xA0;&#xA0;&#xA0;","-")
                            var temp = cheerio.load(tag);
                            var marksarray = temp.text().split("-");

                            var m ={};
                            var h = marksarray[0];

                          datachunk[h]=marksarray[1] ;
                          });
                        }


                        }else if((good == 0) && (fontcount==0)){

                          if(marker == 0 ){
                            var temp = $(this).text();
                            var j = {};
                            datachunk["courseCode"] = temp;

                          }else{
                            var temp = $(this).text();

                            datachunk["subType"] = temp;

                          }
                          marker +=1;

                        }else {

                        }


                      });

                    }
                    if(i%2!=0){
                    data.push(datachunk);
                    datachunk ={};
                    marks=[];
                    marker = 0;
                  }

                    });

                    res.json({"headers":headers,"length":data.length,"data":data});

                    headers = [];
                    data = [];



       }else{
         console.log("Div with calss cntDiv not found!");
         res.json({"success":"false","error":"Invalid Token"});
   }}

     });


}else{
console.log("token length mismatch!");
res.json({"success":"false","error":"Invalid Token"});

}
}catch(err){

  console.log("error");
}


     }
