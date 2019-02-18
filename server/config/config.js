// Puerto
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Base de datos
if (process.env.NODE_ENV === 'dev') {
    process.env.URL_DB = 'mongodb://localhost:27017'
} else {
    process.env.URL_DB = 'mongodb://piskas:lav123.,@piskasdb-shard-00-00-6onhw.mongodb.net:27017,piskasdb-shard-00-01-6onhw.mongodb.net:27017,piskasdb-shard-00-02-6onhw.mongodb.net:27017/test?ssl=true&replicaSet=PiskasDB-shard-0&authSource=admin&retryWrites=true'
}