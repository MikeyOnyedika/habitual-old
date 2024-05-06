import { signOut } from "next-auth/react"
import { MdExitToApp as Exit } from "react-icons/md"
export default function LogoutBtn() {
  return (
    <button type="button" className="flex items-center hover:bg-gray-200 transition-colors duration-200 rounded-full p-2" onClick={() => {
      signOut();
    }}>
      <Exit className="w-5 h-5" />
    </button >
  )
}
