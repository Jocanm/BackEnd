import Express from "express";
import Cors from 'cors';
import conexionBD from "./db/db.js";
import dotenv from 'dotenv';
import rutasProducto from './views/rutaProducto.js'
import rutasUsuario from './views/rutaUsuario.js'
import rutasVenta from './views/rutaVenta.js'
import jwt from "express-jwt";
import jwks from 'jwks-rsa'


dotenv.config({
    path: "./.env"
})

const app = Express()
app.use(Express.json())
app.use(Cors())

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

app.use(rutasProducto)
app.use(rutasUsuario)
app.use(rutasVenta)

const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`Corriendo en el puerto ${process.env.PORT}`)
    })
}

conexionBD(main)