import { habits } from "@/app/dummyData"
import DaysList from "./components/DaysList";
type Props = {
  params: {
    id: string
  }
}

export default function HabitPage({ params }: Props) {
  // fetch the habit using params.id and render out to screen
  const habit = habits[0];
  return (
    <div className="flex flex-col gap-4 w-full px-2 md:px-4 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-1">
        <h2 className="text-lg">{habit.name}</h2>
        <span className="text-xs w-fit rounded-full px-2 py-0.5 bg-gray-200 text-gray-700 border-2 border-gray-50"> &lt; 14 days remaining</span>
      </div>
      <p className="text-sm text-gray-900 max-w-[50rem] leading-6" >{habit.description}</p>
      <DaysList habitID={habit.id} />
    </div>
  )
}
