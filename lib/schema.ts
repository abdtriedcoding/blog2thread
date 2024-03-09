import { z } from "zod";

export const formSchema = z.object({
  numberOfTweets: z.coerce
    .number()
    .min(1, {
      message: "Enter number of tweets to be generated.",
    })
    .max(5, {
      message: "Number of tweets limit exceeded.",
    }),
  article: z
    .string()
    .max(17000, {
      message: "Article length must not exceed 17000 characters.",
    })
    .min(1, {
      message: "Enter your article.",
    }),
});
