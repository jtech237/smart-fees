"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "next-auth/react";

const LoginSchema = z.object({
  email: z.string().email('Entrez une adresse email valide. Exp: monemail@example.com'),
  password: z.string().min(8, 'Le mot de passe doit avoir minimum 8 caracteres'),
});
export const Login = () => {

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    const {email, password} = data
    const res = await signIn("credentials", {
      email,
      password,
      redirectTo: '/'
    })

    console.log(res);
    if (res?.error) {
      alert("Erreur de connexion : " + res.error);
    } else {
      alert("Connexion réussie !");
    }
  }

  return (
    <>
      <Card className="mx-auto max-w-lg w-2/3">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>Adresse Email</FormLabel>
                          <FormControl>
                            <Input {...field} autoComplete="off" />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                </div>
                <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>Mot de passe</FormLabel>
                          <FormControl>
                            <Input {...field} type="password"/>
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                </div>
                <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>Login</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};
