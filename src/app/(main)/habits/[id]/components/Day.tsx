"use client"

import { canUpdateDayStatus, getDateStringFromDateTimeString } from "@/app/(main)/utils";
import { updateDayStatus } from "@/app/requests/days";
import { TDay } from "@/app/types"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function Day({ day, serialNumber, currentDateTime }: {
  day: TDay,
  serialNumber: number,
  currentDateTime: string,
}) {
  const [isHabitPerformed, setIsHabitPerformed] = useState(day.isPerformed);
  const queryClient = useQueryClient();

  const updateDayStatusMutation = useMutation({
    mutationFn: async (update: { habitID: string, status: boolean, id: string }) => await updateDayStatus(update.habitID, update.status, update.id),
  });

  const currentDate = getDateStringFromDateTimeString(currentDateTime);
  const canUpdate = canUpdateDayStatus(currentDate, day.date);

  const isCurrentDay = currentDate === getDateStringFromDateTimeString(day.date);

  useEffect(() => {
    if (isHabitPerformed !== day.isPerformed) {
      triggerUpdateDayStatus();
    }

    /* eslint-disable */
  }, [isHabitPerformed, day.isPerformed])

  async function triggerUpdateDayStatus() {
    const res = await updateDayStatusMutation.mutateAsync({
      habitID: day.habitID,
      status: isHabitPerformed,
      id: day.id,
    })
    if (res.status === "error") {
      setIsHabitPerformed(day.isPerformed);
      toast.error(res.error);
      return;
    }

    // probably invalidate all days and refetch all the days???. For now, I might just refetch all days in one api call
    toast.success("Day updated successfully");
    // queryClient.invalidateQueries({
    //   queryKey: ["days"]
    // })
    queryClient.setQueryData(["days"], (prev: { status: "success" | "error", data: TDay[] }) => {
      const updatedDays = prev.data.map(d => {
        if (d.id === day.id) {
          return {
            ...res.data
          }
        }
        return d
      });
      return {
        status: prev.status,
        data: updatedDays
      }
    })
  }

  return (
    <div className={`flex flex-col items-center group gap-1 ${canUpdate === false ? "opacity-30" : ""}`}>
      <label
        className={`w-[5rem] h-[5rem]  ${isCurrentDay ? "border-4" : "border-2"} border-purple-200 hover:border-purple-300 rounded-full text-xl text-purple-700 aria-disabled:hover:border-purple-200 flex items-center justify-center cursor-pointer transition-colors duration-200 ${isHabitPerformed ? "bg-purple-500 border-purple-600 text-white" : ""}`}
        aria-disabled={canUpdate === false}>
        {serialNumber}
        <input
          type="checkbox"
          disabled={canUpdate === false}
          className="hidden"
          onChange={(e) => {
            setIsHabitPerformed(e.target.checked);
          }}
          checked={isHabitPerformed}
        />
      </label>

      <span className="text-xs invisible text-gray-700 group-hover:visible">{
        getDayMonth(day.date)
      }</span>
    </div>
  )
}

function getDayMonth(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthFormatter = new Intl.DateTimeFormat("default", {
    month: "short"
  })
  return `${day}/${monthFormatter.format(date)}`
}
