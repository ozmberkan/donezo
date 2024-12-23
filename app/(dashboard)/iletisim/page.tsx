"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Text, TextIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import dayjs from "dayjs";

const formSchema = z.object({
  title: z.string().min(2, "Minimum 2 karakter girebilirsiniz.").max(50),
  content: z.string().min(10, "Minimum 10 karakter girebilirsiniz.").max(200),
});

const ContactPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const feedbackRef = doc(collection(db, "feedbacks")); // Otomatik ID oluşturuluyor
      await setDoc(feedbackRef, {
        id: feedbackRef.id, // Otomatik oluşturulan ID
        title: values.title,
        content: values.content,
        createdAt: dayjs().format("DD.MM.YYYY HH:mm"), // Tarih formatı
      });

      form.reset(); // Formu sıfırla
      toast.success("Başarıyla geri bildirim gönderildi.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Bir hata oluştu.");
      } else {
        toast.error("Beklenmedik bir hata oluştu.");
      }
    }
  }

  return (
    <div className="flex flex-col p-3">
      <h1 className="text-[40px] font-black text-neutral-600">İletişim</h1>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-5 w-full max-w-3xl"
        >
          {/* Başlık Alanı */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Başlık</FormLabel>
                <FormControl>
                  <Input placeholder="Konu başlığı" {...field} />
                </FormControl>
                <FormDescription>Konu başlığını giriniz.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* İçerik Alanı */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>İçerik</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Mesajınızı buraya yazınız..."
                    {...field}
                    className="min-h-[150px]"
                  />
                </FormControl>
                <FormDescription>
                  Mesajınızı detaylı bir şekilde yazınız.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gönder Butonu */}
          <Button type="submit" className="w-full">
            Gönder
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactPage;
