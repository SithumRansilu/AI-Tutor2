import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
};

const commonSystemInstruction = `You are an expert AI tutor for Sri Lankan Advanced Level (A/L) students, specializing in Physics and Combined Mathematics. 
- Provide clear, accurate, and step-by-step explanations. 
- Relate your answers directly to the Sri Lankan A/L syllabus.
- Explain concepts simply and avoid overly technical jargon.
- Use Markdown formatting (like lists, bold text, and blockquotes) to structure your answers for maximum readability.
- IMPORTANT: For all mathematical formulas, variables, and equations, you MUST enclose them in LaTeX delimiters. Use $ for inline math (e.g., $E=mc^2$) and $$ for block-level equations (e.g., $$ \\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2} $$). This is crucial for correct display.`;


export const generateTextOnly = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: commonSystemInstruction,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error generating text:", error);
    return "Sorry, I encountered an error while processing your request. Please try again.";
  }
};

export const generateFromImage = async (prompt: string, imageFile: File): Promise<string> => {
  try {
    const base64Data = await fileToBase64(imageFile);
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: imageFile.type,
      },
    };
    
    const textPart = { text: prompt };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
       config: {
        systemInstruction: `${commonSystemInstruction} Your goal is to analyze the provided image, identify the academic problem, and provide a detailed, step-by-step solution based on the user's question.`,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating from image:", error);
    return "Sorry, I couldn't analyze the image. Please ensure it's a valid format and try again.";
  }
};

export const generateComplex = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        systemInstruction: `You are a world-class academic expert. ${commonSystemInstruction} Your task is to provide comprehensive, in-depth, and highly accurate explanations for complex, multi-step problems. Break down the solution into logical steps, define all variables and theorems used, and ensure the final answer is precise.`,
        thinkingConfig: { thinkingBudget: 32768 },
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error generating complex response:", error);
    return "Sorry, an error occurred during deep analysis. The problem might be too complex or there was a connection issue.";
  }
};

export const generateFormulaSheet = async (subject: string, topics: string[]): Promise<string> => {
  try {
    const prompt = `
      You are an expert academic assistant specializing in the Sri Lankan Advanced Level (A/L) syllabus.
      Your task is to generate a concise, well-organized, and accurate formula sheet.

      Subject: ${subject}
      Topics to include: ${topics.join(', ')}

      Please adhere to the following instructions:
      1. Generate a formula sheet ONLY for the topics listed above.
      2. The formulas must be relevant to the Sri Lankan A/L syllabus.
      3. Organize the sheet with clear headings for each topic using Markdown (e.g., "## Mechanics").
      4. For each formula, provide a brief description of what it represents and define the variables used.
      5. IMPORTANT: ALL mathematical formulas and variables MUST be enclosed in LaTeX delimiters ($ for inline, $$ for block-level) for correct rendering.
      6. Ensure the output is clean, easy to read, and suitable for a student's revision.
      
      Begin the formula sheet now.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    return response.text;
  } catch (error)
 {
    console.error("Error generating formula sheet:", error);
    return "Sorry, I couldn't generate the formula sheet. There might have been an issue connecting to the service. Please try again.";
  }
};