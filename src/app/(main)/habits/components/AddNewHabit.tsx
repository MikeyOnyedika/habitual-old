import Link from "next/link";
import { FaPlus as Plus } from "react-icons/fa"
export default function AddNewHabit() {
  return (
    <div className="w-full flex justify-end">
      <Link href="/habits/new" className="px-2 py-2 md:px-3 rounded bg-purple-400 text-white flex items-center gap-1 text-sm hover:bg-purple-700">
        <Plus /> <span>Add New Habit</span>
      </Link>
    </div>
  )
}
