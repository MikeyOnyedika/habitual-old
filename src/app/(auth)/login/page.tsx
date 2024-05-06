"use client"
import SubmitBtn from "@/app/components/SubmitBtn";
import TextInput from "@/app/components/TextInput";
import { logIn } from "@/app/requests";
import { TLoginBody } from "@/app/types";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useRef } from "react";
import toast from "react-hot-toast";

const initialFormState = {
  email: "",
  password: ""
}

export default function Login() {
  const [formState, setFormState] = useState(initialFormState);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: TLoginBody) => await logIn({ email, password }),
  });

  function handleOnChange(update: { [key: string]: string }) {
    setFormState((prev) => {
      return { ...prev, ...update };
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formState.email) {
      toast.error("Email is required");
      if (emailRef.current) {
        emailRef.current.focus();
      }
      return;
    }

    if (!formState.password) {
      toast.error("Password is required");
      if (passwordRef.current) {
        passwordRef.current.focus();
      }
      return;
    }

    const res = await loginMutation.mutateAsync({ email: formState.email, password: formState.password });

    if (res.status === "error") {
      toast.error(res.error);
      return;
    }

    toast.success("Login successful!");
    setFormState(initialFormState);
    router.push("/habits");
  }

  return (
    <div className="w-full max-w-[25rem] flex flex-col gap-4">
      <p className="text-center text-lg">Login</p>
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextInput ref={emailRef} name="email" value={formState.email} label="Email" onChange={handleOnChange} />
        <TextInput ref={passwordRef} name="password" type="password" value={formState.password} label="Password" onChange={handleOnChange} />
        <SubmitBtn label="Continue" isPending={loginMutation.isPending} />
      </form>
      <Link href="/signup" className="text-sm hover:underline w-full text-purple-800 text-center">Don&apos;t have an account? Signup</Link>
    </div>
  )
}
