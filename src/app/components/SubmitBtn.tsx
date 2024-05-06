type Props = {
  label?: string,
  isPending?: boolean
}

export default function SubmitBtn({ label = "submit", isPending = false }: Props) {
  return (
    <div className="flex flex-col w-full">
      <button type="submit" className={`px-4 py-2 text-sm rounded-md capitalize bg-purple-400 hover:bg-purple-500 text-white font-bold `} disabled={isPending}>{isPending ? "..." : label}</button>
    </div >
  )
}
