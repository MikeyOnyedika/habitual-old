export default function CenteredMessage({ message }: { message: string }) {
  return (
    <div className="w-full h-full flex justify-center items-center p-4">
      <p className="text-lg text-gray-700 capitalize">{message}</p>
    </div>
  )
}
