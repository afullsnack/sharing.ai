import { observer } from "@legendapp/state/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { LoaderCircle } from "lucide-react";
import { joinWaitlist } from "@/use-cases/join-waitlist";


const WaitlistFormSchema = z.object({
  email: z.string({
    required_error: "This field is required before submission"
  })
    .email("Invalid email address, please input correct email"),
  name: z.string({ required_error: "Name is required to continue" }).min(3, "Mame must be 3 letters or more"),
});
interface IWaitlistDialog {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  handleWaitlistSubmit: () => Promise<void>;
}
function WaitlistDialog({
  open,
  setIsOpen,
  handleWaitlistSubmit,
}: IWaitlistDialog) {
  const form = useForm<z.infer<typeof WaitlistFormSchema>>({
    resolver: zodResolver(WaitlistFormSchema),
  });

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join the waitlist</DialogTitle>
          <DialogDescription>We're still ironing out the kinks and inner workings so we can offer the best service</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(async () => {
            await joinWaitlist({
              email: form.getValues("email"),
              name: form.getValues("name"),
            });
            await handleWaitlistSubmit();
            form.reset();
          })} className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Input type="text" placeholder="Name" className="w-full" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Input type="email" placeholder="Email address" className="w-full" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="w-full mt-4 flex gap-4 items-center justify-center">
              <DialogClose asChild>
                <Button variant={"outline"} className="flex-1" disabled={form.formState.isSubmitting}>Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={!(form.getValues("email") ?? '').trim() || form.formState.isSubmitting}
                className="flex-1"
              >
                {form.formState.isSubmitting && <LoaderCircle
                  className="-ms-1 me-2 animate-spin"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />}
                Join for updates
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default observer(WaitlistDialog);
