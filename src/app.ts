import 'reflect-metadata'; // We need this in order to use @Decorators
import express from 'express';

import { usersRouter } from './api/routers/user';
import { sequelize } from './configs/sequalize';

const port = process.env.PORT || 3001;

const startServer = async () => {
    const app = express().use('/user', usersRouter);

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
}

startServer();