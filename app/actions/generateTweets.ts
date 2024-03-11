"use server";

import { z } from "zod";
import { formSchema } from "@/lib/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

type Inputs = z.infer<typeof formSchema>;

export default async function generateTweets(values: Inputs) {
  const data = formSchema.parse(values);
  const prompt = `Generate ${data.numberOfTweets} twitter threads by turning this article into an interesting twitter thread that catches people's attention and clearly labeled "1.", "2.", and "3.". Make sure each generated thread is less than 300 characters. and feel free to use this context as well for article: ${data.article}`;

  const generationResult = await genAI
    .getGenerativeModel({ model: "gemini-pro" })
    .generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

  const response = generationResult.response;
  const text = response.text();
  console.log(text);
  return text;
}
