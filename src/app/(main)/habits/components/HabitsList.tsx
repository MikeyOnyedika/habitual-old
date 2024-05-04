import { THabit } from "@/app/types"
import HabitCard from "./HabitCard"
import { habits } from "@/app/dummyData"

export default async function HabitsList() {
  // const habits = await fetchHabits();
  return (
    <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
      {
        habits.map(habit => (
          <li key={habit.id} className="">
            <HabitCard {...habit} />
          </li>
        ))
      }
    </ul>
  )
}
