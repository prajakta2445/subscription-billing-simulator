import { v4 as uuidv4 } from 'uuid';
import db from '../models/inMemoryDB.js';
import { analyzeCampaign } from '../services/llmService.js';

// Validate subscription input
function validateSubscriptionPayload(payload) {
  const { donorId, amount, currency, interval, campaignDescription } = payload;
  if (!donorId || !amount || !currency || !interval || !campaignDescription) {
    return "Missing required fields";
  }
  if (!["daily", "weekly", "monthly", "yearly"].includes(interval)) {
    return "interval must be daily, weekly, monthly, or yearly";
  }
  if (typeof amount !== "number" || amount <= 0) {
    return "amount must be a positive number";
  }
  return null;
}

// Create a new subscription
export const createSubscription = async (req, res, next) => {
  try {
    const error = validateSubscriptionPayload(req.body);
    if (error) return res.status(400).json({ error });

    const { donorId, amount, currency, interval, campaignDescription } = req.body;

    // Analyze campaign description using LLM
    const llmAnalysis = await analyzeCampaign(campaignDescription);

    const subscription = {
      id: uuidv4(),
      donorId,
      amount,
      currency,
      interval,
      campaignDescription,
      llmAnalysis, // { tags, summary }
      createdAt: new Date().toISOString(),
      active: true
    };

    db.subscriptions.push(subscription);

    return res.status(201).json({ subscription });
  } catch (err) {
    next(err);
  }
};

// Cancel all subscriptions for a donor
export const cancelSubscription = (req, res, next) => {
  try {
    const donorId = req.params.donorId;
    let found = false;

    db.subscriptions.forEach(sub => {
      if (sub.donorId === donorId && sub.active) {
        sub.active = false;
        sub.canceledAt = new Date().toISOString();
        found = true;
      }
    });

    if (!found) return res.status(404).json({ error: "No active subscriptions found for donorId" });

    return res.json({ message: "Canceled subscriptions for donor", donorId });
  } catch (err) {
    next(err);
  }
};
