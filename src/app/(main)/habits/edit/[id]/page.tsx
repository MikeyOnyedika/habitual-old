import HabitForm from "../../components/HabitForm"
import { fetchHabit } from "@/app/requests/habits";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string
  }
}

export default async function EditHabitPage({ params }: Props) {
  const habitToEdit = await fetchHabit(params.id);
  if (habitToEdit.status === "success") {
    console.log("habit successful: ", habitToEdit);
    return (
      <div className="flex flex-col gap-1 w-full px-2 md:px-4 py-1">
        <HabitForm isEdit={true} oldFormState={habitToEdit.data} />
      </div>
    )
  }
  console.log("Cannot find this habit");
  redirect("/habits");
}

