const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload');

const routes = require('../routes/usuarios');
const authRoute = require('../routes/auth')
const categoryRoute = require('../routes/categorias');
const productosRoute = require('../routes/productos')
const buscarRoute = require('../routes/buscar');
const uploadsRoute = require('../routes/uploads');

const { dbConnection } = require('../database/config');



class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios',
            uploads:    '/api/uploads' 
        }

       
        // conectar a la base de datos
        this.conectarDB()

        // Middlewares
        this.middlewares()

        //Rutas de mi aplicación
        this.routes()
        
    }

    async conectarDB(){
        await dbConnection()
    }


    middlewares(){
        
        //CORS
        this.app.use(cors());

        // Parseo y lectura del body
        this.app.use( express.json() )
    
        //Directorio Publico
        this.app.use(express.static('public'))

        // Fileupload - carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }))

    }

    routes(){
        
        this.app.use(this.paths.auth, authRoute)
        this.app.use(this.paths.buscar, buscarRoute)
        this.app.use(this.paths.categorias, categoryRoute)
        this.app.use(this.paths.usuarios, routes)
        this.app.use(this.paths.productos, productosRoute )
        this.app.use(this.paths.uploads, uploadsRoute )
        
    }

    listen(){        
        this.app.listen(this.port, () => {
        console.log('Servidor corriendo en el puerto', this.port)
    })
    }
}






module.exports = Server



