var http = require('http');
var pg = require('pg');

var conString = "postgres://localhost:5432/postgres";
var conString1 ="postgres://postgres:Delong845@localhost/postgres"

var server = http.createServer(function(req, res) {

  // get a pg client from the connection pool
  var client = new pg.Client(conString1);
  client.connect();

  var query = client.query('Select * from dbo."Log"', function(err, result){
  //query.on('end', function() { client.end(); });


  res.writeHead(200, {'content-type': 'text/plain'});
  res.end('You are visitor number ' + result.rows[0].username);
  });

});


server.listen(3001)
