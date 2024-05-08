"use client"
import DateInput from "@/app/components/DateInput"
import TextInput from "@/app/components/TextInput"
import TextArea from "@/app/components/TextArea"
import SubmitBtn from "@/app/components/SubmitBtn"
import { THabit, THabitFormState, TNewHabit } from "@/app/types"
import { FormEvent, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addHabit } from "@/app/requests/habits"

const initialFormState: THabitFormState = {
  name: "",
  stopDate: "",
  description: "",
  startDate: new Date().toISOString()
}

type Props = {
  isEdit: true,
  oldFormState: THabit
} | {
  isEdit: false
}

export default function HabitForm(props: Props) {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const stopDateRef = useRef<HTMLInputElement>(null);
  const [nameErrMsg, setNameErrMsg] = useState("");
  const [descriptionErrMsg, setDescriptionErrMsg] = useState("");
  const [stopDateErrMsg, setStopDateErrMsg] = useState("");
  const [formState, setFormState] = useState<THabit | THabitFormState>(() => {
    if (props.isEdit) {
      return props.oldFormState
    }
    return initialFormState
  });
  const today = new Date().toISOString().split("T")[0];
  const queryClient = useQueryClient();


  const addHabitMutation = useMutation({
    mutationFn: async ({ name, description, startDate, stopDate }: TNewHabit) => await addHabit({ name, stopDate, startDate, description }),
  });


  function updateFormState(update: { [key: string]: string }) {
    setFormState((prev) => {
      return { ...prev, ...update }
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formState.name || !formState.stopDate || !formState.description) {
      if (!formState.stopDate) {
        setStopDateErrMsg("Stop Date is required");
        stopDateRef.current!.focus();
      } else {
        setStopDateErrMsg("");
      }
      if (!formState.description) {
        setDescriptionErrMsg("Description is required");
        descriptionRef.current!.focus();
      } else {
        setDescriptionErrMsg("");
      }
      if (!formState.name) {
        nameRef.current!.focus();
        setNameErrMsg("Name is required")
      } else {
        setNameErrMsg("")
      }
      toast.error("Some fields weren't filled properly");
      return;
    }

    setStopDateErrMsg("");
    setDescriptionErrMsg("");
    setNameErrMsg("")

    if (props.isEdit) {
      // trigger the editHabitMutation

    } else {
      // trigger the addHabitMutation
      const res = await addHabitMutation.mutateAsync({
        name: formState.name,
        description: formState.description,
        startDate: formState.startDate,
        stopDate: formState.stopDate,
      });
      if (res.status === "error") {
        toast.error(res.error);
        return;
      }

      queryClient.invalidateQueries({
        queryKey: ["habits"],
        exact: true
      })
      setFormState(initialFormState);
      toast.success("New Habit added successfully");
    }
  }

  return (
    <div className="flex w-full justify-center">
      <div className={`flex flex-col w-full max-w-[30rem] px-4 py-2 ${"visible"}`}>
        <h2 className="text-xl text-center">{
          props.isEdit ? "Edit Habit" : "Add New Habit"
        }</h2>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextInput errorMsg={nameErrMsg} ref={nameRef} name={"name"} label="Name" value={formState.name} onChange={updateFormState} />
          <TextArea ref={descriptionRef} errorMsg={descriptionErrMsg} name={"description"} label="Description" value={formState.description} onChange={updateFormState} />
          <DateInput min={today} ref={stopDateRef} errorMsg={stopDateErrMsg} name={"stopDate"} label="Stop Tracking on" value={formState.stopDate} onChange={updateFormState} />
          <SubmitBtn isPending={
            addHabitMutation.isPending
          } />
        </form>
      </div>
    </div >
  )
}
