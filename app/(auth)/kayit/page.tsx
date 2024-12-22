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
import { registerService } from "@/redux/slices/userSlice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .email("Lütfen e-posta giriniz.")
    .min(2, "Lütfen en az 2 karakter giriniz."),
  password: z.string().min(6, "Lütfen en az 6 karakter giriniz."),
  username: z.string().min(2, "Lütfen en az 2 karakter giriniz."),
});

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await dispatch(registerService(data)).unwrap();
      toast.success("Kayıt başarılı. Giriş yapabilirsiniz.");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Kayıt Ol</CardTitle>
        <CardDescription>
          Kayıt olmak için lütfen bilgilerini gir.
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kullanıcı Adı</FormLabel>
                  <FormControl>
                    <Input placeholder="Kullanıcı adı Giriniz..." {...field} />
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
                    <Input
                      type="password"
                      placeholder="Parola Giriniz..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Kayıt ol
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="w-full  flex justify-end items-center">
          <Button variant="link">
            <Link className="text-sm" href="/giris">
              Hesabın var mı?
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterPage;
