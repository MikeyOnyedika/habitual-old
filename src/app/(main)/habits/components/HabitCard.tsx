"use client"
import { THabit } from "@/app/types";
import toast from "react-hot-toast";
import { BsPencil as Edit, BsTrash as Trash } from "react-icons/bs"
import { IconContext } from "react-icons"
import { useRouter } from "next/navigation"
import { MouseEvent } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteHabit } from "@/app/requests/habits"
import LoadingAnimation from "@/app/components/LoadingAnimation";
import { getRemainingDays } from "../../utils";

type Props = THabit

export default function HabitCard({ description, id, name, stopDate, startDate }: Props) {
  const router = useRouter();

  const remainingDays = getRemainingDays(startDate, stopDate);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => await deleteHabit(id),
  });

  const triggerDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const res = await deleteMutation.mutateAsync(id);
    if (res.status === "error") {
      toast.error(res.error);
      return;
    }
    queryClient.invalidateQueries({
      queryKey: ["habits"],
      exact: true
    })
    toast.success("Habit has been successfully deleted!");
  }

  return (
    <div
      onClick={(e) => {
        if (deleteMutation.isPending) return;
        router.push(`/habits/${id}`)
      }}
      className={`rounded-md cursor-pointer group border-purple-100 border-2 w-full h-full xl:max-w-[30rem] p-4 hover:bg-purple-50 flex ${deleteMutation.isPending ? "opacity-75" : ""}`}>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex w-full gap-1 justify-between">
          <h2 className="text-base line-clamp-1">{name}</h2>
          <div className="flex items-center gap-1">
            <IconContext.Provider value={{ className: "text-3xl hover:bg-gray-200 p-1.5 rounded-md" }}>
              <button type="button" onClick={(e) => {
                e.stopPropagation();
                router.push(`/habits/edit/${id}`);
              }}
                disabled={deleteMutation.isPending}
              >
                <Edit />
              </button>
              <button type="button" onClick={triggerDelete} disabled={deleteMutation.isPending} >
                {
                  deleteMutation.isPending ? (
                    <LoadingAnimation size="small" />
                  ) : (
                    <Trash />
                  )
                }
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
