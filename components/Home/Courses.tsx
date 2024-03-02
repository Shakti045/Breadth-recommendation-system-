import React, { useState } from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';


const Courses = ({courses}:{courses:any[]}) => {
    const [limit, setLimit] = useState({start:0,end:10});
  return (
    <div className='h-full  w-full  px-11 flex flex-col gap-3 mt-8 '>
        <div className=' flex justify-between  font-bold'>
            <div className='flex gap-6 w-[60%]'>
            <p>Course Id</p>
            <p>Course Name</p>
            </div>
             <div className='flex justify-between w-[40%]'>
             <p>Session</p>
            <p>EX</p>
            <p>A</p>
            <p>B</p>
            <p>C</p>
            <p>D</p>
            <p>P</p>
            <p>F</p>
             </div>
        </div>

        <div className='  flex flex-col flex-1 overflow-y-scroll gap-2 '>
            {
                courses.slice(limit.start,limit.end).map((course,index)=>{
                    return(
                        <Link key={index} href={`/visualize/${course?.courseId}`} className=' flex justify-between bg-neutral-300  px-3 py-2  rounded-sm'>
                            <div className='flex gap-6 w-[60%]'>
                            <p>{course?.courseId}</p>
                            <p>{course?.courseName}</p>
                            </div>
                            <div className=' flex justify-between w-[40%]'>
                            <p>{course?.session}</p>
                            <p>{course?.EX}</p>
                            <p>{course?.A}</p>
                            <p>{course?.B}</p>
                            <p>{course?.C}</p>
                            <p>{course?.D}</p>
                            <p>{course?.P}</p>
                            <p>{course?.F}</p>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
        <div className=' flex gap-3 justify-center mb-4'>
            {limit.start!=0 && <Button onClick={()=>setLimit({start:limit.start-10,end:limit.end-10})} >Prev</Button>}
            {limit.end<=courses.length && <Button onClick={()=>setLimit({start:limit.start+10,end:limit.end+10})} >Next</Button>}
        </div>
    </div>
  )
}

export default Courses