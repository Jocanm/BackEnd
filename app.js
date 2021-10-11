const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');

// Require collections routes
const ProductoRoutes = require('./src/routes/Producto.routes')
const UsuarioRoutes = require('./src/routes/Usuario.routes')
const VentaRoutes = require('./src/routes/Venta.routes')
// create express app
const app = express();
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
app.use(cors())
// using as middleware
app.use('/api/v1/producto', ProductoRoutes)
app.use('/api/v1/usuario', UsuarioRoutes)
app.use('/api/v1/venta', VentaRoutes)

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});