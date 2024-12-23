import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { NotebookPen } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAllNotes } from "@/redux/slices/noteSlice";

const CreateNoteModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const formSchema = z.object({
    title: z.string().min(2).max(50),
    content: z.string().min(2).max(1000),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const noteRef = doc(collection(db, "notes"));

      await setDoc(noteRef, {
        title: values.title,
        content: values.content,
      });

      toast.success("Not başarıyla oluşturuldu.");

      dispatch(getAllNotes());
      form.reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Not oluşturulurken bir hata oluştu.");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant={"outline"}>
          <NotebookPen />
          Not oluştur
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Not oluşturmak mı istiyorsun?</DialogTitle>
          <DialogDescription>
            Bu alandan not oluşturabilirsin.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Başlık</FormLabel>
                  <FormControl>
                    <Input placeholder="Başlık" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Açıklama</FormLabel>
                  <FormControl>
                    <Textarea
                      cols={20}
                      rows={5}
                      className="min-h-44 max-h-44"
                      placeholder="Açıklama"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Oluştur</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNoteModal;
