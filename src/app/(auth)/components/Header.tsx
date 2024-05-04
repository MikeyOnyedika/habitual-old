import Link from "next/link";
export default function Header() {
  return (
    <header className="sticky top-0 bg-white/80 px-2 py-1 flex w-full  items-center gap-1">
      <Link href="#" className="text-purple-400 font-bold text-xl">H</Link>
    </header>
  )
}
