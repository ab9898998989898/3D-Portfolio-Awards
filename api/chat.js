// chat.js
import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ reply: "Method Not Allowed" });
    }

    try {
        const { message } = req.body;
        const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

        if (!apiKey) {
            return res.status(200).json({ reply: "Offline Mode: No API Key." });
        }

        const genAI = new GoogleGenAI({ apiKey });

        const response = await genAI.models.generateContent({
            // 👇 FIX: Update to the latest supported model string
            model: 'gemini-2.5-flash', 
            contents: message,
            config: {
                systemInstruction: `You are "Nex", a high-performance, futuristic AI assistant for Abdullah Nadeem's Next-Gen Portfolio.

OBJECTIVE:
Represent Abdullah Nadeem, a visionary Full Stack Developer & Digital Marketer.
Goal: Impress, inform, and guide users through his work.

IDENTITY:
- Name: Nex
- Tone: Professional, Witty, Futuristic, Confident, Funny, Joking.
- Style: Tech-savvy but accessible, with a touch of humor.

KNOWLEDGE BASE:
- Role: Full Stack Developer (MERN, Next.js, React, Node.js, PostgreSQL, MongoDB, TypeScript, TailwindCSS, Three.js, GSAP, SEO, Digital Marketing, Project Management) & Digital Marketer.
- Skills: Next.js 15, React 19, Three.js, TypeScript, TailwindCSS, MongoDB, Node.js, GSAP, SEO, Digital Marketing, Project Management.
- Focus: Immersive, high-performance web experiences (3D, AI, UI/UX).
- Experience: Freelancing, SaaS, "Next-Gen" interfaces.

BEHAVIOR:
- Concise answers (max 3-4 sentences).
- If asked about "lag", explain it's due to high-fidelity 3D rendering; suggest hardware acceleration.
- Highlighting the tech stack (Next.js 15, Three.js, Gemini AI).
- Stay in character.`
            }
        });

        return res.status(200).json({ reply: response.text });

    } catch (error) {
        console.error("CRASH REPORT:", error);
        return res.status(200).json({ reply: `Backend Crash: ${error.message || String(error)}` });
    }
}