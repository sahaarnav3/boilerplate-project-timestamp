// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//creating below endpoint for fetching only with date
app.get("/api/:dateString", (req, res) => {
  // console.log(req.params.year + " " +req.params.month + " " +req.params.date);
  const dateString = req.params.dateString;
  //below if else to check if unix is sent or a date
  let date = "";
  if (dateString.split("-").length > 1) {
    date = new Date(dateString);
  } else {
    date = new Date(parseInt(dateString));
  }
  const unixCode = date.getTime(); // the result is in milliseconds (divide by 1000 to get in seconds)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const dayName = days[date.getDay()];
  const monthName = months[date.getUTCMonth()];
  res.json({ unix: unixCode, utc: `${dayName}, ${date.getDate()} ${monthName} ${date.getFullYear()} 00:00:00 GMT` });
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
