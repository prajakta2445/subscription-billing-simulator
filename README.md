# Subscription Billing Simulator

Simple Node.js backend that simulates recurring donations for nonprofit campaigns.

## Setup

1. Copy `.env.example` to `.env` and add your OpenAI API key:

   ```
   PORT = 3000
   OPENAI_API_KEY=sk-...
   BILLING_TICK_MS=30000
   BASE_CURRENCY=USD

   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   node server.js
   ```

## API Endpoints

* **POST /subscriptions**: Create a new subscription.
* **DELETE /subscriptions/\:donorId**: Cancel a subscription.

## Notes

* Uses OpenAI LLM to generate tags and summary from campaign description.
* Simulates recurring charges using a background job (`setInterval`).
* All data stored in memory for simplicity; replace with a database for production.
* Change `BATCH_INTERVAL_MS` in `.env` to control how often billing runs.

## Example Request

```bash
curl -X POST http://localhost:3000/subscriptions \
  -H 'Content-Type: application/json' \
  -d '{"donorId":"abc123","amount":1500,"currency":"USD","interval":"monthly","campaignDescription":"Emergency food and clean water for earthquake victims in Nepal"}'
```
