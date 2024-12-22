"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { loginService } from "@/redux/slices/userSlice";
import { toast } from "sonner";

const formSchema = z.object({
  email: z
    .string()
    .email("Lütfen e-posta giriniz.")
    .min(2, "Lütfen en az 2 karakter giriniz."),
  password: z.string().min(6, "Lütfen en az 6 karakter giriniz."),
});

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await dispatch(loginService(data)).unwrap();
      toast.success("Giriş başarılı.");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Giriş başarısız.");
      } else {
        toast.error("Bilinmeyen bir hata oluştu.");
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Giriş Yap</CardTitle>
        <CardDescription>
          Giriş yapmak için lütfen bilgilerini gir.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-Posta</FormLabel>
                  <FormControl>
                    <Input placeholder="E-Posta Giriniz..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parola</FormLabel>
                  <FormControl>
                    <Input placeholder="Parola Giriniz..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Giriş Yap
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="w-full  flex justify-end items-center">
          <Button variant="link">
            <Link className="text-sm" href="/kayit">
              Hesabın yok mu?
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
