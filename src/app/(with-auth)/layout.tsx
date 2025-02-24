import { ReactNode } from "react"
import "../globals.css";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
        <body className="bg-[#9bafe2]">
            { children }
        </body>
    </html>
  )
}

export default AuthLayout