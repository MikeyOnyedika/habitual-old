type Props = {
  type?: "text" | "password",
  label: string,
  name: string,
  value: string,
  onChange: (update: { [key: string]: string }) => void
}

export default function TextInput({ label, type = "text", name, value, onChange }: Props) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="text-sm">{label}</label>
      <input id={name} name={name} type={type} className="px-4 py-2 rounded outline-purple-300 border-2 border-gray-300 text-sm" value={value} onChange={(e) => onChange({ [name]: e.target.value })} />
    </div >
  )

}
