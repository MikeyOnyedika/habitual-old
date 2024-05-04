import { daysList } from "@/app/dummyData"
import Day from "./Day"
export default function DaysList({ habitID }) {
  return (
    <div className="flex items-center justify-center h-fit w-full p-3">
      <ul className="flex justify-center py-5 md:py-10 px-2 w-full flex-wrap gap-5 h-full">
        {
          daysList.map((day, index) => (
            <li key={day.id}>
              <Day day={day} serialNumber={index + 1} />
            </li>
          ))
        }
      </ul >
    </div>
  )
}
