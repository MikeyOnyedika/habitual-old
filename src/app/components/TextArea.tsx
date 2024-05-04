type Props = {
  label: string,
  name: string,
  value: string,
  onChange: (update: { [key: string]: string }) => void
}

export default function TextArea({ label, name, value, onChange }: Props) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="text-sm">{label}</label>
      <textarea id={name} name={name} className="px-4 py-2 text-sm rounded outline-purple-300 border-2 border-gray-300 w-full" rows={5} value={value} onChange={(e) => onChange({ [name]: e.target.value })}></textarea>
    </div >
  )

}
