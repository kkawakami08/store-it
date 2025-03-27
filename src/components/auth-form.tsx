"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

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
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createAccount } from "@/lib/actions/user.actions";
import OtpModal from "./otp-modal";

type AuthFormProps = "sign-in" | "sign-up";

export const authFormSchema = (formType: AuthFormProps) => {
  return z.object({
    fullName:
      formType === "sign-up"
        ? z
            .string()
            .min(2, "Name must have at least 2 characters")
            .max(50, "Name can't be more than 50 characters")
        : z.string().optional(),
    email: z.string().email(),
  });
};

const AuthForm = ({ type }: { type: AuthFormProps }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState(null);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async ({ fullName, email }: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const user = await createAccount({ fullName: fullName || "", email });
      setAccountId(user.accountId);
    } catch {
      setErrorMessage("Failed to create an account, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = type === "sign-in";

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="h1 text-center md:text-left ">
            {signIn ? "Sign In" : "Sign Up"}
          </h1>
          {!signIn && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="">
                    <FormLabel className="shad-label">Full Name</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      {...field}
                      className="shad-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="">
                  <FormLabel className="shad-label">Email</FormLabel>
                </div>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="shad-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="primary-btn" disabled={isLoading}>
            {isLoading && (
              <Image
                src={"/assets/icons/loader.svg"}
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}{" "}
            {signIn ? "Sign In" : "Sign Up"}
          </Button>
          {errorMessage && <p>*{errorMessage}</p>}
          <div className="flex justify-center">
            <p className="text-neutral-500">
              {signIn ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Link
              href={signIn ? "/sign-up" : "/sign-in"}
              className="ml-1 font-medium text-cyan-700"
            >
              {signIn ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </Form>
      {/* OTP VERIFICATION */}
      {accountId && (
        <OtpModal email={form.getValues("email")} accountId={accountId} />
      )}
    </>
  );
};

export default AuthForm;
