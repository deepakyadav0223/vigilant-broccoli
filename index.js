require('dotenv').config();
const express = require('express');
const cluster = require('cluster');
const helmet = require('helmet');
const morgan = require('morgan');
const PORT = process.env.PORT || 80;
const databaseConn = require("./DataAccessLayer/conn")
const routes = require('./routes/routes');
const bodyParser = require("body-parser");

// number of cpu
const numCPUs = require('os').cpus().length ;


const app = express();
app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());

// For Master process
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    
    // This event is firs when worker died
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
    }
    
    // For Worker
else {
    // Workers can share any TCP connection
    app.listen(PORT, err => {
        err ?
        console.log("Error in server setup") :
        console.log(`Worker ${process.pid} started`);
    });
    
    app.use("/api/v1/" , routes);
    

    };
