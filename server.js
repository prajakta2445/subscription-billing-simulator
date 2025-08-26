import 'dotenv/config';
import { app } from './app.js';
import cron from 'node-cron';
import { runBillingCycle } from './services/billingService.js'; 

const PORT = process.env.PORT || 3000;

// Daily → midnight every day
cron.schedule('0 0 * * *', () => {
  runBillingCycle('daily');
});

// Weekly → midnight every Sunday
cron.schedule('0 0 * * 0', () => {
  runBillingCycle('weekly');
});

// Monthly → midnight on 1st of each month
cron.schedule('0 0 1 * *', () => {
  runBillingCycle('monthly');
});

// Yearly → midnight on Jan 1st
cron.schedule('0 0 1 1 *', () => {
  runBillingCycle('yearly');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
