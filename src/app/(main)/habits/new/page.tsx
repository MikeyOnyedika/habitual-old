import HabitForm from "../components/HabitForm";

export default function NewHabitPage() {
  return (
    <div className="flex flex-col gap-1 w-full px-2 md:px-4 py-1">
      <HabitForm isEdit={false} />
    </div>
  )
}



