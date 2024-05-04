"use client"
import { THabit } from "@/app/types"
import Link from "next/link"
import { BsPencil as Edit, BsTrash as Trash } from "react-icons/bs"
import { IconContext } from "react-icons"
import { useRouter } from "next/navigation"

type Props = THabit & {}

export default function HabitCard({ description, id, name, stopDate, startDate, currentDay }: Props) {
  const router = useRouter();
  const start = new Date(startDate);
  const stop = new Date(stopDate);
  const remainingMillis = Math.abs(stop.getTime() - start.getTime());
  const remainingDays = Math.ceil(remainingMillis / (1000 * 60 * 60 * 24));
  return (
    <div
      onClick={(e) => {
        router.push(`/habits/${id}`)
      }}
      className="rounded-md cursor-pointer group border-purple-100 border-2 w-full xl:max-w-[30rem] p-4 hover:bg-purple-50 flex">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex w-full gap-1 justify-between">
          <h2 className="text-base line-clamp-1">{name}</h2>
          <div className="flex items-center gap-1 group-hover:visible invisible">
            <IconContext.Provider value={{ className: "text-3xl hover:bg-gray-200 p-1.5 rounded-md" }}>
              <button onClick={(e) => {
                e.stopPropagation();
                router.push(`/habits/edit/${id}`);
              }}>
                <Edit />
              </button>
              <button>
                <Trash />
              </button>
            </IconContext.Provider>
          </div>
        </div>
        {description ? (
          <p className="text-gray-700 line-clamp-2 text-sm"> {description}</p>
        ) : (
          <p className="text-gray-700 italic line-clamp-2 text-sm">{"<No Description>"}</p>
        )}

        <p className="flex items-center justify-end text-xs">
          &lt;
          {
            remainingDays
          } days</p>
      </div>
    </div>
  )
}
