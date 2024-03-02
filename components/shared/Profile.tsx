'use client'
import { Appcontext } from "@/context/appcontext";
import { useContext } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import {  ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
const Profile = () => {
    const router = useRouter();
    const {token,removeTokenHandler,email}:{token:string | null,removeTokenHandler:any,email:string} = useContext(Appcontext);
    console.log(token)
  return (
    <div>
         <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer  flex items-center gap-1">
        <img  className=" rounded-full" src={`https://api.dicebear.com/5.x/initials/svg?seed=${email}`} height={40} width={40} alt="logo"/>
        <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
          <DropdownMenuItem onClick={()=>{
            router.push('/profile');
          }}>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        <DropdownMenuItem onClick={removeTokenHandler}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}

export default Profile