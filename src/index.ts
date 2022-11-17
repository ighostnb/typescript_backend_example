import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import logger from './config/logger';
import config from './config/config';
import goodsRoutes from './routes/goods';
import shoppingCartRoutes from './routes/shopping_cart';
import mongoose from 'mongoose';

const router = express();
const NAMESPACE = 'Server';

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use('/api/goods', goodsRoutes);
router.use('/api/cart', shoppingCartRoutes);

router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message,
    });
});

router.use((req, res, next) => {
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    next();
});

mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((_) => {
        logger.info(NAMESPACE, 'Mongo Connected');
    })
    .catch((error) => {
        logger.error(NAMESPACE, error.message, error);
    });

router.use((req, res, next) => {
    logger.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logger.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
        
    next();
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => logger.info(NAMESPACE, `Server is running`));
