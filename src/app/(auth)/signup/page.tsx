"use client"
import SubmitBtn from "@/app/components/SubmitBtn";
import TextInput from "@/app/components/TextInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTempSigninCredentials } from "../contexts/TempSigninCredentialsProvider";
import { createAccount } from "@/app/requests";
import { useMutation } from "@tanstack/react-query";

const initialFormState = {
  email: "",
  password: ""
}

export default function Signup() {
  const [formState, setFormState] = useState(initialFormState);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const tempCredContext = useTempSigninCredentials();

  const signupMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string, password: string }) => await createAccount(email, password),
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

    const signupRes = await signupMutation.mutateAsync({ email: formState.email, password: formState.password });

    if (signupRes.status === "error") {
      if (typeof signupRes.error === "string") {
        toast.error(signupRes.error);
      }
      // TODO: provide better error messages on fields using the TZodError[] returned
      toast.error("Some fields were not filled correctly");
      return;
    }

    // redirect to /login if user already exists
    if (typeof signupRes.data === "string") {
      setFormState(initialFormState);
      toast.success(signupRes.data)
      router.push("/login");
      return;
    }

    tempCredContext?.setTempCredentials({ email: formState.email, password: formState.password });
    toast.success("Signup successful!");
    setFormState(initialFormState);
    router.push("/autologin");
  }

  return (
    <div className="w-full max-w-[25rem] flex flex-col gap-4">
      <p className="text-center text-lg">Signup</p>
      <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
        <TextInput ref={emailRef} name="email" value={formState.email} label="Email" onChange={handleOnChange} />
        <TextInput ref={passwordRef} type="password" name="password" value={formState.password} label="Password" onChange={handleOnChange} />
        <SubmitBtn label="Continue" isPending={signupMutation.isPending} />
      </form>
      <Link href="/login" className="text-sm hover:underline w-full text-purple-800 text-center">Already have an account? Login</Link>
    </div>
  )
}
