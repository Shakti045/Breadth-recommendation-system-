'use state'
import { createContext, useState } from "react";
export let Appcontext:any=createContext(null);

function Appcontextprovider({children}:{children:React.ReactNode}){
  
    const [token,setToken]=useState<string | null>(typeof window === 'undefined' ? null : localStorage.getItem('hackathontoken')===null?null:JSON.parse(localStorage.getItem('token')!));
    const [email,setEmail]=useState<string | null>(typeof window === 'undefined' ? null : localStorage.getItem('hackathonemail')===null?null:JSON.parse(localStorage.getItem('hackathonemail')!) );

    const setTokenHandler=(token:string,email:string)=>{
        setToken(token);
        if(typeof window === 'undefined') return;
        localStorage.setItem('hackathontoken',JSON.stringify(token));
        setEmail(email);
        localStorage.setItem('hackathonemail',JSON.stringify(email));
    
    }
    
    const removeTokenHandler=()=>{
        setToken(null);
        if(typeof window === 'undefined') return;
        localStorage.removeItem('hackathontoken');
        setEmail(null);
        localStorage.removeItem('hackathonemail');
    }
    return <Appcontext.Provider value={{token,setTokenHandler,removeTokenHandler,setEmail,email}}>
        {children}
    </Appcontext.Provider>
    
}


export default Appcontextprovider;