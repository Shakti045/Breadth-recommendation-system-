'use client'
import Authorize from "@/components/root/Authorize";
import Home from "@/components/root/Home";
import { Appcontext } from "@/context/appcontext";
import { useContext, useEffect, useState } from "react"

const page = () => {
  const [isClieent,setIsClient]=useState<boolean>(false);
  useEffect(()=>{
    setIsClient(true);
  },[])
  if(!isClieent){
    return;
  }
  const {token}:{token:string} = useContext(Appcontext);
  return (
    <div >
      {
        token===null?<Authorize/>:<Home/>
      }
    </div>
  )
}

export default page