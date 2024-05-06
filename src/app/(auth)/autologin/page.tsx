"use client"
import { signIn } from "next-auth/react";
import { useCallback, useEffect } from "react";
import { useTempSigninCredentials } from "../contexts/TempSigninCredentialsProvider";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoadingAnimation from "@/app/components/LoadingAnimation";
import { useMutation } from "@tanstack/react-query";
import { logIn } from "@/app/requests";

export default function AutoLogin() {
  const router = useRouter();
  // get the user and password from global store and 
  const tempCredContext = useTempSigninCredentials();
  const loginMutation = useMutation({
    async mutationFn({ email, password }: { email: string, password: string }) {
      return await logIn({ email, password });
    }
  });

  const autoLogin = useCallback(async () => {
    // check if temp email and password was set
    if (!tempCredContext?.tempCredentials) {
      router.push("/login");
      return;
    }

    const res = await loginMutation.mutateAsync({
      email: tempCredContext.tempCredentials.email,
      password: tempCredContext.tempCredentials.password,
    });

    if (res.status === "error") {
      toast.error("Couldn't auto signin. Try manually logging in");
      router.push("/login");
      return;
    }

    toast.success("Login successful!");
    tempCredContext.setTempCredentials(null);
    router.push("/habits");

    /* eslint-disable */
  }, [])

  useEffect(() => {
    autoLogin();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4 justify-center items-center">
      <p className="text-center text-2xl">{loginMutation.isPending ? "Signing in...Please wait" : "Please wait"}</p>
      <LoadingAnimation />
    </div>
  )
}
