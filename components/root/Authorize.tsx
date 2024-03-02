import React, {  useContext, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Image from 'next/image'
import toast from 'react-hot-toast'
import OtpInput from 'react-otp-input';
import { authentication, getOtpUrl } from '@/utils/route'
import { Appcontext } from '@/context/appcontext'
const Authorize = () => {
    const [otp,setOtp]=useState<string>();
    const [email,setEmail]=useState<string>();
    const [showOtpInput,setShowOtpInput]=useState<boolean>(false);
    const {setTokenHandler}:any=useContext(Appcontext);
    const getOtp=async(e:any)=>{
        e.preventDefault();
        if(email==='' || email?.trim()==='' || email===undefined){
            toast.error('Please enter your email');
            return;
        }
        const toastId = toast.loading('Sending Otp');
        try{
            const res=await fetch(getOtpUrl,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email})
            });
            const data=await res.json();
            if(data.success===true){
                toast.success('Otp sent successfully');
                setShowOtpInput(true);
            }
            else{
                toast.error('Something went wrong');
            }
        }
        catch(error){
            toast.error('Something went wrong');
        }
        finally{
            toast.dismiss(toastId);
        }
    }
    const authenticate=async(e:any)=>{
        e.preventDefault();
        const toastId = toast.loading('Authenticating');
        try{
            const res=await fetch(authentication,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email,otp})
            });
            const data=await res.json();
            if(data.success===true){
                toast.success('Authenticated successfully');
                setTokenHandler(data?.token,data?.email);
            }
            else{
                toast.error('Invalid Otp');
            }
        }
        catch(error){
            toast.error('Something went wrong');
        }
        finally{
            toast.dismiss(toastId);
        }
    }
  return (
    <div className='   w-full h-[calc(100vh-4rem)]  flex justify-center items-center'>
        <div className=' flex flex-col gap-2 items-center'>
            
            <form className=' flex flex-col p-3 rounded-md    items-center gap-6 w-[32vw]'>
            <Image src='/logo.png' width={500} height={500} alt='logo'/>
               <h1 className=' text-xl font-bold'>Authentication</h1>
                <Input  onChange={(e)=>setEmail(e.target.value)} type='text' placeholder='Enter your email id'/>
                {
                    showOtpInput && <OtpInput
                    value={otp}
                    onChange={(otp) => setOtp(otp)}
                    numInputs={4}
                    renderSeparator={<span>-</span>}
                   renderInput={(props) => <input {...props} />}
                   containerStyle="flex gap-2 text-4xl    text-white"
                   inputStyle="bg-slate-400 otpinput px-2 py-1  outline-none rounded-lg"
                    inputType='number'/>
                }
                
                {
                    showOtpInput?<Button onClick={authenticate}   className=' w-fit'>Continue</Button>:<Button onClick={getOtp} className=' w-fit'>Get Otp</Button>
                }
            </form>
        </div>
    </div>
  )
}

export default Authorize