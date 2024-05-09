"use client"

import CenteredMessage from "@/app/(main)/components/CenteredMessage";
import FetchQueryError from "@/app/(main)/components/FetchQueryError";
import LoadingAnimation from "@/app/components/LoadingAnimation";
import { fetchHabit } from "@/app/requests/habits";
import { useQuery } from "@tanstack/react-query";
import { getRemainingDays } from "@/app/(main)/utils";

type Props = {
  habitID: string
}

export default function HabitDetails({ habitID }: Props) {
  const { data: habitQuery, isLoading, isError, refetch } = useQuery({
    queryKey: ["habits", habitID],
    queryFn: () => fetchHabit(habitID),
    staleTime: 1000 * 60 * 5 // 5minutes
  });

  if (isLoading) {
    return (
      <div className="p-4 h-full w-full flex justify-center items-center">
        <LoadingAnimation />
      </div>
    )
  }

  if (isError || habitQuery?.status === "error") {
    return (
      <FetchQueryError error={"Couldn't fetch habit details"} refetch={refetch} />
    )
  }

  const habit = habitQuery?.data

  if (habit == null) {
    return <CenteredMessage message={"Habit not found"} />
  }


  const remainingDays = getRemainingDays(habit.startDate, habit.stopDate);
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-1">
        <h2 className="text-lg">{habit.name}</h2>
        <span className="text-xs w-fit rounded-full px-2 py-0.5 bg-gray-200 text-gray-700 border-2 border-gray-50"> &lt; {remainingDays}days</span>
      </div>
      <p className="text-sm text-gray-900 max-w-[50rem] leading-6">{habit.description}</p>
    </div>
  )
}
