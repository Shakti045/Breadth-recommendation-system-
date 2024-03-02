'use client'
import { Toaster } from "react-hot-toast"
import Appcontextprovider from "./appcontext"

const ContextProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <Appcontextprovider>
        {children}
        <Toaster/>
    </Appcontextprovider>
  )
}

export default ContextProvider