"use client"
import DateInput from "@/app/components/DateInput"
import TextInput from "@/app/components/TextInput"
import TextArea from "@/app/components/TextArea"
import SubmitBtn from "@/app/components/SubmitBtn"
import { THabit, THabitFormState } from "@/app/types"
import { FormEvent, useEffect, useState } from "react"

const initialFormState: THabitFormState = {
  name: "",
  startDate: "",
  stopDate: "",
  description: ""
}

type Props = {
  isEdit?: boolean,
  oldFormState?: THabit
}

export default function HabitForm({ isEdit = false, oldFormState }: Props) {
  const [formState, setFormState] = useState<THabit | THabitFormState>(() => {
    if (isEdit) {
      return oldFormState as THabit
    }
    return initialFormState
  });

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  function updateFormState(update: { [key: string]: string }) {
    setFormState((prev) => {
      return { ...prev, ...update }
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="flex w-full justify-center">
      <div className={`flex flex-col w-full max-w-[30rem] px-4 py-2 ${"visible"}`}>
        <h2 className="text-xl text-center">{
          isEdit ? "Edit Habit" : "Add New Habit"
        }</h2>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextInput name={"name"} label="Name" value={formState.name} onChange={updateFormState} />
          <TextArea name={"description"} label="Description" value={formState.description} onChange={updateFormState} />
          <DateInput name={"stopDate"} label="Stop Tracking on" value={new Date(formState.stopDate).toDateString()} onChange={updateFormState} />
          <SubmitBtn />
        </form>
      </div>
    </div >
  )
}
