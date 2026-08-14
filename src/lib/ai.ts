import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini client
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in the environment variables. Please add it to your .env file.");
  }
  return new GoogleGenAI({ apiKey });
};

export async function evaluateResume(resumeText: string, requiredKeywords: string) {
  try {
    const ai = getAiClient();
    const prompt = `
You are an expert HR AI assistant. Your task is to evaluate a candidate's resume strictly against the required job keywords.

Resume Text:
"""
${resumeText}
"""

Required Keywords:
${requiredKeywords}

Instructions:
1. Extract the candidate's core "education" history (degrees, institutions) and return as a clean summary string.
2. Extract the candidate's core "experience" (job titles, companies, years) and return as a clean summary string.
3. Compare the candidate's resume strictly against the Required Keywords.
4. If ALL the Required Keywords are present in the resume (even as variations), you should set "matched" to true.
5. STRICT RULE: If EVEN ONE required keyword is entirely missing from the candidate's skill set/resume, you MUST set "matched" to false!
6. Calculate a score out of 100 based on how well their background fits the job requirements. (Only set matched: true if score is 70+ AND all keywords are present).
7. Provide a "summary" of your reasoning, explaining exactly which keywords were found and which were missing (if any).

Respond ONLY with a valid JSON object. No markdown wrappers.
{
  "education": "string summarizing education",
  "experience": "string summarizing experience",
  "matched": boolean,
  "score": number,
  "summary": "string explaining reasoning"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response from AI");
    }

    // Try to strip out markdown JSON wrappers if Gemini accidentally includes them
    let cleanText = resultText.trim();
    if (cleanText.startsWith("```json")) {
      cleanText = cleanText.substring(7);
    }
    if (cleanText.startsWith("```")) {
      cleanText = cleanText.substring(3);
    }
    if (cleanText.endsWith("```")) {
      cleanText = cleanText.substring(0, cleanText.length - 3);
    }
    cleanText = cleanText.trim();

    const parsed = JSON.parse(cleanText);
    return {
      education: String(parsed.education || "Not explicitly mentioned."),
      experience: String(parsed.experience || "Not explicitly mentioned."),
      matched: Boolean(parsed.matched),
      score: Number(parsed.score) || 0,
      summary: String(parsed.summary) || "No summary provided.",
    };
  } catch (error: any) {
    console.error("AI Evaluation Error:", error);
    return {
      matched: false,
      score: 0,
      summary: `AI evaluation failed: ${error.message || error}. Manual review required.`,
    };
  }
}
