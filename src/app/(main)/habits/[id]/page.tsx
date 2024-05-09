import { getDateStringFromDateTimeString } from "@/app/api/lib/utils";
import DaysList from "./components/DaysList";
import HabitDetails from "./components/HabitDetails";
type Props = {
  params: {
    id: string
  }
}

export default function HabitPage({ params }: Props) {
  const currentDate = getDateStringFromDateTimeString(new Date().toISOString());

  return (
    <div className="flex flex-col gap-4 w-full px-2 md:px-4 py-4">
      <HabitDetails habitID={params.id} />
      <DaysList habitID={params.id} currentDate={currentDate} />
    </div>
  )
}
