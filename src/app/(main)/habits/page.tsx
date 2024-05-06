import AddNewHabit from "./components/AddNewHabit";
import HabitsList from "./components/HabitsList";

export default function HabitsPage() {
  // fetch the habits and display them
  return (
    <div className="flex flex-col gap-2 w-full px-2 md:px-4">
      <AddNewHabit />
      <HabitsList />
    </div>
  )
}
