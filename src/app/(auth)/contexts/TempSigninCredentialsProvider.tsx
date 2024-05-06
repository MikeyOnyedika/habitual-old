"use client"
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

type LoginCred = {
  email: string,
  password: string
}

const TempSigninCredentialsContext = createContext<{
  tempCredentials: LoginCred | null,
  setTempCredentials: Dispatch<SetStateAction<LoginCred | null>>
} | null>(null);

export function useTempSigninCredentials() {
  return useContext(TempSigninCredentialsContext);
}

export default function TempSigninCredentialsProvider({ children }: { children: ReactNode }) {
  const [tempCredentials, setTempCredentials] = useState<LoginCred | null>(null);

  return (
    <TempSigninCredentialsContext.Provider value={{
      tempCredentials, setTempCredentials
    }}>
      {children}
    </TempSigninCredentialsContext.Provider>
  )
}
