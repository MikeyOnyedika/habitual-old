export default function LoadingAnimation({ size = "large" }: {
  size?: "small" | "large"
}) {
  return (
    <div className="flex justify-center">
      <div className={`animate-spin border-r-purple-300  rounded-full bg-transparent
${size === "small" ? "w-4 h-4 border-t-2 border-r-2" : ""}  ${size === "large" ? "w-10 h-10 border-t-4 border-r-4" : ""}
`}></div>
    </div>
  )
}
