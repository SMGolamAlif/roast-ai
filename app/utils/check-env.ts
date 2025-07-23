// This file ensures the OpenRouter API key is loaded from the environment in production
if (!process.env.OPENROUTER_API_KEY) {
  throw new Error("OPENROUTER_API_KEY is not set in environment variables.");
}
