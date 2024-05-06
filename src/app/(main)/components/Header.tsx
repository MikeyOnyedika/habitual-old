"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAngleRight as AngleRight } from "react-icons/fa"
import LogoutBtn from "./LogoutBtn";


export default function Header() {
  const pathname = usePathname();

  if (pathname.startsWith("/habits")) {
    let extras = <></>
    const pathParts = pathname.split("/").slice(1);
    const secondPart = pathParts[1];
    if (secondPart === "new" || secondPart === "edit") {
      extras = (
        <>
          <AngleRight className="text-purple-900" />
          <span>{secondPart}</span >
        </>
      )
    } else {
      extras = (
        <>
          <AngleRight className="text-purple-900" />
          <Link href={`/habits/${secondPart}`} className="hover:text-purple-500">{secondPart}</Link>
        </>
      )
    }

    return (
      <header className="sticky top-0 bg-white/80 px-4 py-1 flex w-full  items-center gap-1 ">
        <div className="flex items-center gap-1 w-full">
          < Link href="#" className="font-bold text-purple-700" > H</Link >
          <AngleRight className="text-purple-900" />
          <Link href="/habits" className="hover:text-purple-500">Habits</Link>
          {extras}
        </div >
        <div className="w-full flex justify-end">
          <LogoutBtn />
        </div>
      </header >
    )
  }

  return (
    <header className="px-4 py-1 flex w-full  items-center gap-1">
      <div className="flex items-center gap-1 w-full">
        <Link href="#" className="font-bold text-purple-700">H</Link>
        <AngleRight className="text-purple-900" />
        <Link href="/habits" className="hover:text-purple-500">Habits</Link>
      </div>

      <div className="w-full flex flex-end">
        <LogoutBtn />
      </div>
    </header >
  )
}
