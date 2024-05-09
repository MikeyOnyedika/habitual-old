"use client"
import { useQuery } from "@tanstack/react-query"
import Day from "./Day"
import { fetchDays } from "@/app/requests/days"
import LoadingAnimation from "@/app/components/LoadingAnimation"
import FetchQueryError from "@/app/(main)/components/FetchQueryError"
import { TDay } from "@/app/types"
type Props = {
  habitID: string,
  currentDate: string
}

export default function DaysList({ habitID, currentDate }: Props) {
  const { data: daysQuery, isFetching, isError, refetch } = useQuery({
    queryKey: ["days"],
    queryFn: async () => fetchDays(habitID),
  });

  if (isFetching) {
    return (
      <div className="p-4 h-full w-full flex justify-center items-center">
        <LoadingAnimation />
      </div>
    )
  }

  if (isError || daysQuery?.status === "error") {
    return (
      <FetchQueryError error={"Couldn't fetch habit days"} refetch={refetch} />
    )
  }

  const days = daysQuery?.data as TDay[]
  return (
    <div className="flex items-center justify-center h-fit w-full p-3">
      <ul className="flex justify-center py-5 md:py-10 px-2 w-full flex-wrap gap-5 h-full">
        {
          days.map((day, index) => (
            <li key={day.id}>
              <Day currentDateTime={currentDate} day={day} serialNumber={index + 1} />
            </li>
          ))
        }
      </ul>
    </div>
  )
}
