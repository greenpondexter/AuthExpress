var express = require('./node_modules/express')
var pg = require('./node_modules/pg')
var app = express();


var conString = "postgres://postgres:5432@localhost/postgres";

app.use(express.static(__dirname));


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)


  //Postgres Connection

  pg.connect(conString, function(err, client, done) {

    var handleError = function(err) {
      // no error occurred, continue with the request
      if(!err) return false;

      // An error occurred, remove the client from the connection pool.
      // A truthy value passed to done will remove the connection from the pool
      // instead of simply returning it to be reused.
      // In this case, if we have successfully received a client (truthy)
      // then it will be removed from the pool.
      done(client);
      res.writeHead(500, {'content-type': 'text/plain'});
      res.end('An error occurred');
      return true;
    };

    // record the visit
    client.query('SELECT * FROM dbo.Logins', function(err, result) {

      // handle an error from the query
      if(handleError(err)) return;

      done();
      res.writeHead(200, {'content-type': 'text/plain'});
      res.end('You are visitor number ' + result.rows[0]);


    });
  });

})
