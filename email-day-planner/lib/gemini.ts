import { GoogleGenerativeAI } from "@google/generative-ai";
import { Email, DayPlan } from "./types";

// In production, we assume process.env.GEMINI_API_KEY is set.
// For hackathon fallback, we initialize safely.
const apiKey = process.env.GEMINI_API_KEY || "MISSING_KEY";
const genAI = new GoogleGenerativeAI(apiKey);

export async function generateDayPlan(
  emails: Email[],
  userTime: string
): Promise<DayPlan> {

  const emailContext = emails.map((e, i) =>
    `EMAIL ${i + 1}:
    From: ${e.from}
    Subject: ${e.subject}
    Date: ${e.date}
    Body: ${e.body || e.snippet}`
  ).join("\n\n---\n\n");

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are an expert productivity assistant. 
        
Analyze these emails and generate a structured day plan for today.
Current time: ${userTime}

${emailContext}

Return ONLY valid JSON in this exact format:
{
  "date": "Today's date",
  "summary": "2-sentence overview of the day",
  "tasks": [
    {
      "id": "1",
      "title": "Short task title",
      "description": "What needs to be done and why",
      "priority": "urgent|high|medium|low",
      "type": "meeting|deadline|reply|action|fyi",
      "timeEstimate": "30 min",
      "suggestedTime": "10:00 AM",
      "sourceEmailId": "email id here",
      "deadline": "optional deadline string",
      "suggestedReply": "optional short reply draft if type is reply"
    }
  ],
  "ignoredEmails": [
    { "id": "email id", "reason": "newsletter/spam/no action needed" }
  ],
  "focusBlock": "2:00 PM - 4:00 PM (suggested deep work window)"
}

Rules:
- Only create tasks that genuinely require action
- Rank urgent items (explicit deadlines, direct requests) first
- Detect implicit deadlines like "by EOD", "this week", "ASAP"
- Differentiate CC'd emails (lower priority) from direct requests
- Suggest realistic times based on task type and current time
- Include a suggestedReply for any email requiring a written response
- MUST output ONLY valid JSON string starting with { and ending with }. No markdown blocks.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const cleaned = text.replace(/```json|```/g, "").trim();
  
  try {
    return JSON.parse(cleaned) as DayPlan;
  } catch (e) {
    console.error("Failed to parse JSON from Gemini", cleaned);
    throw e;
  }
}
