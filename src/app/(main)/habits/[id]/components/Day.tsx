"use client"
import { TDay, TDayStatus } from "@/app/types"
import { ChangeEvent, useEffect, useState } from "react"

export default function Day({ day, serialNumber }: {
  day: TDay,
  serialNumber: number
}) {
  const [status, setStatus] = useState<TDayStatus>(day.status);

  const booleanStatus = statusToBoolean(status);

  function booleanToStatus(isChecked: boolean): TDayStatus {
    if (isChecked) {
      return "fulfilled"
    }
    return "unfulfilled"
  }

  function statusToBoolean(status: TDayStatus): boolean {
    if (status === "pending" || status === "unfulfilled") return false
    return true;
  }

  return (
    <div className={`flex flex-col items-center group gap-1 ${day.status === "pending" ? "opacity-30" : ""}`}>
      <label
        className={`w-[5rem] h-[5rem] border-2 border-purple-200 rounded-full text-xl text-purple-700 hover:border-purple-300 aria-disabled:hover:border-purple-200 flex items-center justify-center cursor-pointer transition-colors duration-200 ${status === "fulfilled" ? "bg-purple-500 border-purple-600 text-white" : ""}`}
        aria-disabled={day.status === "pending"}>
        {serialNumber}
        <input
          type="checkbox"
          disabled={day.status === "pending"}
          className="hidden"
          onChange={(e) => {
            const isChecked = e.target.checked;
            setStatus(booleanToStatus(isChecked));
          }}
          checked={booleanStatus}
        />
      </label>

      <span className="text-xs invisible text-gray-700 group-hover:visible">{
        "3/May"
      }</span>
    </div>
  )
}
