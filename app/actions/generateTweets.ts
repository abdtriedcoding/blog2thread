"use server";

import { z } from "zod";
import { formSchema } from "@/lib/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
// import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

type Inputs = z.infer<typeof formSchema>;

export default async function generateTweets(values: Inputs) {
  const result = formSchema.parse(values);
  const prompt = `Turn this article into an interesting twitter thread that catches people's attention, your tone should be like that of a famous twitter thread creator, the first tweet should be an introduction tweet to the thread, the thread should consist of ${result.numberOfTweets} tweets of medium length each. Keep the links and people's name in the article as it is, and clearly label them like "1." and "2.",separate each tweet with a line gap, tweets should be written in first person - \n ${result.article}`;

  // // Ask Google Generative AI for a streaming completion given the prompt
  const response = await genAI
    .getGenerativeModel({ model: "gemini-pro" })
    .generateContentStream({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

  // // Convert the response into a friendly text-stream
  // const stream = GoogleGenerativeAIStream(response);

  // // Respond with the stream
  // // return new StreamingTextResponse(stream);
  // await console.log(new StreamingTextResponse(stream));
  const text = (await response.response).text();
  console.log(text);
}
