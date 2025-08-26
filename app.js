import express from 'express';
import bodyParser from 'body-parser';
import subscriptionsRouter from './routes/subscriptionRoutes.js';

export const app = express();

app.use(bodyParser.json());
app.use('/subscriptions', subscriptionsRouter);

app.get('/health', (req, res) => res.send('OK'));
