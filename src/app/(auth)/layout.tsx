import { ReactNode } from "react"
import Header from "./components/Header"
import TempSigninCredentialsProvider from "./contexts/TempSigninCredentialsProvider"

export default function AuthLayout({ children }: {
  children: ReactNode
}) {
  return (
    <div className="w-full h-full flex flex-col overflow-auto">
      <Header />
      <main className="w-full h-full flex p-4 justify-center">
        <TempSigninCredentialsProvider>
          {children}
        </TempSigninCredentialsProvider>
      </main>
    </div>
  )
}
