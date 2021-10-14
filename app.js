const express = require('express');
var Cors = require('cors')
const bodyParser = require('body-parser');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

// Require collections routes
const ProductoRoutes = require('./src/routes/Producto.routes')
const UsuarioRoutes = require('./src/routes/Usuario.routes')
const VentaRoutes = require('./src/routes/Venta.routes')
// create express app
const app = express();

//Auth0 autenticación

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://mintic-concesionario.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'api-autenticacion-ventas',
    issuer: 'https://mintic-concesionario.us.auth0.com/',
    algorithms: ['RS256']
});

app.use(jwtCheck);

// Setup server port
const port = process.env.PORT || 5000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// define a root route
app.get('/', (req, res) => {
  res.send("NodeJs + Express + MongoDb");
});
//enable cors
app.use(Cors())
// using as middleware
app.use('/api/v1/producto', ProductoRoutes)
app.use('/api/v1/usuario', UsuarioRoutes)
app.use('/api/v1/venta', VentaRoutes)

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});