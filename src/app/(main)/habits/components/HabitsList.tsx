"use client"
import HabitCard from "./HabitCard"
import { fetchHabits } from "@/app/requests/habits";
import CenteredMessage from "../../components/CenteredMessage";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "@/app/components/LoadingAnimation";
import FetchQueryError from "../../components/FetchQueryError";

export default function HabitsList() {
  // const habitsQuery = await fetchHabits();
  const { data: habitsQuery, isFetching, isError, refetch } = useQuery({
    queryKey: ["habits"],
    queryFn: fetchHabits,
    staleTime: 1000 * 60 * 5 // 5minutes
  });

  if (isFetching) {
    return (
      <div className="p-4 h-full w-full flex justify-center items-center">
        <LoadingAnimation />
      </div>
    )
  }

  if (isError) {
    return (
      <FetchQueryError error={"Couldn't fetch habits"} refetch={refetch} />
    )
  }

  if (habitsQuery?.status === "error") {
    return <div className="w-full flex items-center justify-center p-4">
      <p className="">{habitsQuery.error}</p>
    </div>
  }

  return (
    habitsQuery && habitsQuery.data.length > 0 ? (
      <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
        {
          habitsQuery.data.map(habit => (
            <li key={habit.id} className="">
              <HabitCard {...habit} />
            </li>
          ))
        }
      </ul>
    ) : (
      <CenteredMessage message={"you are currently not tracking any habit"} />
    )
  )
}
