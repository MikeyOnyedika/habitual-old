type Props = {
  error: string, refetch: () => void
}

export default function FetchQueryError({ error, refetch }: Props) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
      <p className="text-lg text-gray-700 capitalize">{error}</p>
      <button className="text-purple-500 hover:text-purple-800 px-4 py-2 rounded-md" onClick={() => refetch()}>Retry</button>
    </div>
  )
}
