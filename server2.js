var express = require('./node_modules/express')
var pg = require('./node_modules/pg')
var app = express();


var conString ="postgres://postgres:Delong845@localhost/postgres"

app.use(express.static(__dirname));


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  //console.log('Example app listening at http://%s:%s', host, port)


  //Postgres Connection

  pg.connect(conString, function(err, client, done) {

    var handleError = function(err) {
      // no error occurred, continue with the request
      if(!err) return false;

      done(client);
      //res.writeHead(500, {'content-type': 'text/plain'});
      //res.end('An error occurred');
      //return true;
    };

    // record the visit
    client.query('SELECT * FROM dbo."Log"', function(err, result) {

      // handle an error from the query
      if(handleError(err)) return;

      //done();
      //res.writeHead(200, {'content-type': 'text/plain'});
      //res.end('You are visitor number ' + result.rows[0].username);
      console.log(result.rows[0].username)


    });
  });

})
