"use client";

import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { formSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import generateTweets from "@/app/actions/generateTweets";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Markdown from "./markdown";

export default function ThreadForm() {
  const [tweets, setTweets] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberOfTweets: undefined,
      article: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Jarvis was  thinking...");
    const text = await generateTweets(values);
    setTweets(text);
    toast.success("Your tweets are ready!");
    toast.dismiss(toastId);
  }

  return (
    <div className="space-y-8 p-4">
      <h2 className="text-xl font-bold w-full bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 via-neutral-800 to-stone-900">
        Create a new thread
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="numberOfTweets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Tweets (1-5)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="article"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Article (Max 17k characters)</FormLabel>
                <FormControl>
                  <Textarea
                    rows={12}
                    placeholder="Enter your article..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type="submit">
            Submit
          </Button>
        </form>
      </Form>
      {tweets.trim() &&
        tweets.split("\n\n").map((tweet: string, index: number) => (
          <p
            key={index}
            className="bg-zinc-200 shadow-md relative z-[100] border border-zinc-300/60 rounded-md p-4 pr-10 text-zinc-900"
          >
            <Markdown text={tweet.trim()} />
            {/* <CopyButton text={tweet.trim().slice(3)} /> */}
          </p>
        ))}
    </div>
  );
}
