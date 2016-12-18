var express = require('express');
var app = express();

var PORT = 3000;

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

app.use(express.static('.'));

app.listen(PORT, function() { console.log("Server is listening at port " + PORT);  });
