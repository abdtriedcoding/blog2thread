"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

const formSchema = z.object({
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

export default function ThreadForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberOfTweets: undefined,
      article: "",
    },
  });

  const { isSubmitting } = form.formState;

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
    </div>
  );
}
