import { forwardRef } from "react";

type Props = {
  label: string,
  name: string,
  value: string,
  onChange: (update: { [key: string]: string }) => void,
  errorMsg?: string,
  min?: string | number
}

const DateInput = forwardRef<HTMLInputElement, Props>(({ label, name, value, onChange, errorMsg, min }, ref) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="text-sm">{label}</label>
      <input min={min} ref={ref} type="date" id={name} name={name} className="px-4 py-2 text-sm rounded outline-purple-300 border-2 border-gray-300" value={value} onChange={(e) => {
        onChange({ [name]: e.target.value });
      }} />
      {
        errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>
      }
    </div >
  )
})

DateInput.displayName = "DateInput"

export default DateInput;

