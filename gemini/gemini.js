const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const createPrompt = require('./prompt');

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * converts an arry of emails to tasks using gemini
 * @param {*} emails 
 * @returns 
 */
const emailsToTasks = async (emails)=>{


  const prompt = createPrompt(JSON.stringify(emails))

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  const tasks = JSON.parse(text);

  return tasks
}


module.exports = {emailsToTasks }

