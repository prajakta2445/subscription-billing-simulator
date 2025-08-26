import express from 'express';
import { createSubscription, cancelSubscription } from '../controllers/subscriptionController.js';

const router = express.Router();

// Create a new subscription
router.post('/', createSubscription);

// Cancel all subscriptions for a donor
router.delete('/:donorId', cancelSubscription);

export default router;
