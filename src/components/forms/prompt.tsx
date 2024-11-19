import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, Info, PaperclipIcon, SendIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useObservable, observer, useObserve } from "@legendapp/state/react"


const FormSchema = z.object({
  prompt: z
    .string()
    .min(10, {
      message: "Prompt must be at least 10 characters.",
    })
    .max(160, {
      message: "Prompt must not be longer than 30 characters.",
    }),
})

interface IPromptForm {
  onPromptSubmit: () => void;
  promptValue?: string;
}
function PromptForm({
  onPromptSubmit,
  promptValue
}: IPromptForm) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: promptValue ?? "",
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    onPromptSubmit();
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className={cn("group grid border rounded-lg overflow-hidden transition-shadow duration-200 focus-within:shadow-md focus-within:ring-2 focus-within:ring-primary")}>
                  <Textarea
                    placeholder="Ask for a suggestion or to generate images"
                    className="min-h-[100px] resize-none bg-white dark:bg-background border-none ring-0 outline-0 focus-visible:ring-0 resize-none"
                    {...field}
                  />
                  <div className="flex justify-between items-center items-center justify-between p-2">
                    <div className="space-x-2 pointer-events-auto">
                      <Button type="button" variant="outline" onClick={() => {
                        onPromptSubmit();
                      }}>
                        <ImageIcon className="w-4 h-4" />
                        Upload images
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      disabled={!(field.value ?? '').trim()}
                    >
                      <SendIcon className="w-4 h-4 mr-" />
                      Submit
                    </Button>
                  </div>
                </div>
              </FormControl>
              <FormDescription className="flex items-center justify-start gap-1 px-2">
                <Info className="size-3 text-orange-600" />
                Generated responses might be incorrect or unrelatable, please use with discretion
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default PromptForm;
