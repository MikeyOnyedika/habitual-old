"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAngleRight as AngleRight } from "react-icons/fa"


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
      <header className="sticky top-0 bg-white/80 px-2 py-1 flex w-full  items-center gap-1" >
        <Link href="#" className="font-bold text-purple-700">H</Link>
        <AngleRight className="text-purple-900" />
        <Link href="/habits" className="hover:text-purple-500">Habits</Link>
        {extras}
      </header >
    )
  }

  return (
    <header className="px-2 py-1 flex w-full  items-center gap-1">
      <Link href="#" className="font-bold text-purple-700">H</Link>
      <AngleRight className="text-purple-900" />
      <Link href="/habits" className="hover:text-purple-500">Habits</Link>
    </header >
  )
}
