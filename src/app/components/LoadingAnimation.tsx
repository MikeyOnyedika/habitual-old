export default function LoadingAnimation({ scale = 1 }: {
  scale?: number
}) {
  return (
    <div className="flex justify-center">
      <div className={`animate-spin w-[3rem] h-[3rem] border-t-4 border-t-purple-300 border-r-4 border-r-purple-300 border-b-4 border-b-purple-300 rounded-full bg-transparent scale-[${scale}]`}></div>
    </div>
  )
}
