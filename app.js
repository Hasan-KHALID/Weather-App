const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
 app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");



});

app.post ("/", function(req, res){
  const query = req.body.cityName;
  const appKey = "37e6647f6bfed73a5eb03a757d5eec83"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid="+ appKey +"&units=" + unit;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description
      res.write("<p>the weather is currently "+ weatherDescription +"</p>")
      res.write("<h1>the temperature in "+query+" is " + temp + "cc</h1>")
      res.send()
    })

  })

})


app.listen(3000, function() {
  console.log("server is running on port 3000.");
})
