import { ReactNode } from "react"
import Header from "./components/Header"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function MainLayout({ children }: {
  children: ReactNode
}) {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="w-full h-full flex flex-col overflow-auto">
      <Header />
      <main className="w-full h-full flex">
        {children}
      </main>
    </div>
  )
}
