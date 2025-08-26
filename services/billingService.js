import db from '../models/inMemoryDB.js';

// Simulate charging a subscription
export function chargeSubscription(sub) {
  console.log(
    `💳 Charged donor ${sub.donorId} ${sub.amount} ${sub.currency} for campaign: ${sub.summary}`
  );
}

// Run billing cycle for a specific interval
export function runBillingCycle(interval) {
  db.subscriptions.forEach(sub => {
    if (!sub.active) return;
    if (sub.interval === interval) {
      chargeSubscription(sub);
    }
  });
}

