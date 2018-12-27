var HashMap = require('hashmap');
var express = require('express');
var request = require('request');
var app= express();
var bodyparser= require('body-parser')
app.use(bodyparser.json());
var config=[]
config= new HashMap()
config.set("supports_search", true);
config.set("supports_group_request", false);
config.set("supports_marks", true);
config.set("supports_timescale_marks", true);
config.set("supports_time", true);
var exchangeValues1 =  new HashMap();
exchangeValues1.set("value", "");
exchangeValues1.set("name", "All Exchanges");
exchangeValues1.set("desc", "");
var exchangeValues2= new HashMap();
exchangeValues2.set("value", "Deviant X");
exchangeValues2.set("name", "Deviant X");
exchangeValues2.set("desc", "Deviant X");
var exchangeValues3=new HashMap();
exchangeValues3.set("value", "NYSE");
exchangeValues3.set("name", "NYSE");
exchangeValues3.set("desc", "NYSE");
var exchangeValues4= new HashMap();
exchangeValues4.set("value", "NCM");
exchangeValues4.set("name", "NCM");
exchangeValues4.set("desc", "NCM");
var exchangeValues5= new HashMap();
exchangeValues5.set("value", "NGM");
exchangeValues5.set("name", "NGM");
exchangeValues5.set("desc", "NGM");
config.set("exchanges",JSON.stringify([exchangeValues1,exchangeValues2,exchangeValues3,exchangeValues4,exchangeValues5]));
var symbols1=new HashMap()
symbols1.set("name", "");
symbols1.set("value", "All types");
var symbols2 = new HashMap();
symbols2.set("name", "stock");
symbols2.set("value", "Stock");
var symbols3 = new HashMap();
symbols3.set("name", "index");
symbols3.set("value", "Index");
config.set("symbols_types", JSON.stringify([symbols1, symbols2, symbols3]));

config.set("supported_resolutions", ["D", "2D", "3D", "W", "3W", "M", "6M"]);
console.log(config.get("exchanges"));
var symboles =new HashMap();
app.post("/json/symbols",(req,res)=>{
    var sym=req.query.sym;
symboles.set("name", sym);
symboles.set("exchange-traded", "Deviant X");
symboles.set("exchange-listed", "Deviant X");
symboles.set("timezone", "Asia/Kolkata");
symboles.set("minmov", 1);
symboles.set("minmov2", 0);
symboles.set("pointvalue", 1);
symboles.set("session", "0930-1630");
symboles.set("has_intraday", false);
symboles.set("has_no_volume", false);
symboles.set("description", sym);
symboles.set("type", "exchange");
symboles.set("supported_resolutions",JSON.stringify(["D", "2D", "3D", "W", "3W", "M", "6M"]));
symboles.set("pricescale", 100);
symboles.set("ticker", sym);
console.log(symboles);
})
app.listen(4000, function () {
    console.log('app running on port : 3000');
});
app.get("/config",(req,res)=>{
    res.json(config);
})
app.post("/json/history",(req,res)=>{
    var symbol = req.body.symbol;
    // var resolution =req.body.resolution;
    // var from =req.body.from;
    var to = req.body.to;
    var pairs=[] = symbol.split("-");
    var fromCoin = pairs[0];
    var toCoin = pairs[1];
    var url = "https://min-api.cryptocompare.com/data/histoday?fsym=" + fromCoin + "&tsym=" + toCoin + "&limit=2000&toTs=" + to;
    getHistory(url,res);
})
app.post("/json/search",(req,res)=>{
    var query=req.body.query;
    var limit=req.body.limit;
    var pairs =[]= query.split("-");
    var fromCoin = pairs[0];
    var toCoin = pairs[1];
    var url = "https://min-api.cryptocompare.com/data/histoday?fsym=" + fromCoin + "&tsym=" + toCoin + "&limit=" + limit;
    getHistory(url,res);
})
function getHistory(url,res){
    request(url,(err,resp,body)=>{
    console.log(res);
    var t=[]
    var convert=JSON.parse(body);
    convert.forEach(element => {
     t.element.Data.time;
    });
    console.log(t);
    res.json();
    })
}
