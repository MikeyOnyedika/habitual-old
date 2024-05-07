import { ReactNode } from "react"
import Header from "./components/Header"

export default async function MainLayout({ children }: {
  children: ReactNode
}) {
  return (
    <div className="w-full h-full flex flex-col overflow-auto">
      <Header />
      <main className="w-full h-full flex">
        {children}
      </main>
    </div>
  )
}
