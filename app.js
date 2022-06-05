const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: true}))



app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");
   
});
app.post("/",function(req,res){
    
    
    const query =req.body.cityName;
    const apiKey="bad109b82c3d65dd14f5021963651c5e"
    const unit="metric";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
https.get(url,function(response){
    console.log(response.statusCode);

    
    response.on("data",function(data){
    const weatherData=  JSON.parse(data);
    const temp=weatherData.main.temp;
    const weatherDescription= weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
    res.write("<h1>the weather is currently "+weatherDescription+"<br> the tempeature in "+query+" is "+temp+" degrees celcius</h1>");
    res.write("<img src="+imgurl+">");
    res.send();
    })
})
})
/*const query ="Tunisie";
    const apiKey="bad109b82c3d65dd14f5021963651c5e"
    const unit="metric";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
https.get(url,function(response){
    console.log(response.statusCode);

    
    response.on("data",function(data){
    const weatherData=  JSON.parse(data);
    const temp=weatherData.main.temp;
    const weatherDescription= weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
    res.write("<h1>the weather is currently "+weatherDescription+"<br> the tempeature in Tunisia is "+temp+" degrees celcius</h1>");
    res.write("<img src="+imgurl+">");
    res.send();
    })
})*/

app.listen(3000,function(){
    console.log("server is running on port 3000");
});