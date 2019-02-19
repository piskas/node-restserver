// Puerto
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Base de datos
let databaseName = 'cafe';

if (process.env.NODE_ENV === 'dev') {
    process.env.URL_DB = `mongodb://localhost:27017/${databaseName}`
        // process.env.URL_DB = `mongodb://piskas:abc123@192.168.0.101:27017/${databaseName}`
} else {
    process.env.URL_DB = `mongodb+srv://piskas:wSunHzOlUk2Hnxh5@piskasdb-6onhw.mongodb.net/${databaseName}?retryWrites=true`
}

// Vencimiento de Token
process.env.EXPIRES_IN = '1h';

// Seed de Autenticacion
process.env.KEY = process.env.KEY || 'KEY_DEV';