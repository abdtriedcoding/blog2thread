"use server";

import { z } from "zod";
import { formSchema } from "@/lib/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

type Inputs = z.infer<typeof formSchema>;

export default async function generateTweets(values: Inputs) {
  const data = formSchema.parse(values);
  const prompt = `Turn this article into an interesting twitter thread that catches people's attention, your tone should be like that of a famous twitter thread creator, the first tweet should be an introduction tweet to the thread, the thread should consist of ${data.numberOfTweets} tweets of medium length each. Keep the links and people's name in the article as it is, and clearly label them like "1." and "2.",separate each tweet with a line gap, tweets should be written in first person - \n ${data.article}`;

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
