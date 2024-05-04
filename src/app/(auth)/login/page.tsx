"use client"
import SubmitBtn from "@/app/components/SubmitBtn";
import TextInput from "@/app/components/TextInput";
import Link from "next/link";
import { FormEvent, useState } from "react";

const initialFormState = {
  email: "",
  password: ""
}

export default function Login() {
  const [formState, setFormState] = useState(initialFormState);

  function handleOnChange(update: { [key: string]: string }) {
    setFormState((prev) => {
      return { ...prev, ...update };
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="w-full max-w-[30rem] flex flex-col gap-4">
      <p className="text-center text-lg">Login</p>
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextInput name="email" value={formState.email} label="Email" onChange={handleOnChange} />
        <TextInput name="password" value={formState.password} label="Password" onChange={handleOnChange} />
        <SubmitBtn label="Continue" />
      </form>
      <Link href="/signup" className="text-sm hover:underline w-full text-purple-800 text-center">Don't have an account? Signup</Link>
    </div>
  )
}
