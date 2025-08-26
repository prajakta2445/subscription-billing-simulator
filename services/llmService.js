import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure your .env has a valid key
});


export async function analyzeCampaign(description) {
  const models = ["gpt-5", "gpt-4", "gpt-3.5-turbo"];
  for (const model of models) {
    try {
      const response = await openai.responses.create({
        model,
        input: `Analyze the following campaign description.
1. Extract 2-3 short tags (keywords).
2. Provide a concise summary in 1-2 sentences.

Campaign description: "${description}"`
      });

      const outputText = response.output_text || "";
      const [tagsLine, ...summaryLines] = outputText.split("\n").filter(Boolean);
      const tags = tagsLine ? tagsLine.replace(/Tags:/i, "").split(",").map(t => t.trim()) : [];
      const summary = summaryLines.join(" ") || outputText;

      return { tags, summary };
    } catch (err) {
      console.warn(`Error using model ${model}: ${err.message}`);
    }
  }

  // Fallback if all models fail
  return {
    tags: ["general", "donation"],
    summary: description.slice(0, 100) + "...",
  };
}
