const express = require('express');

const middleware = {
    loggingMiddleware: (req, res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
        next();
    },

    errorHandler: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
};

module.exports = middleware;
