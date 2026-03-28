const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const app = express();

// 1. Import Swagger UI and your generated JSON file
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Uses './' assuming it's in the same folder as this file

app.set('json spaces', 2);

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, z-key, Authorization');
    next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {
            console.log(`Database is listening and Node is running on port ${port}`);
        });
    }
});