import React, { useState } from 'react'
import { Input } from '../ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Checkbox } from "@/components/ui/checkbox"
import Courses from '../Home/Courses'
import { dep } from '@/data/dep'
import { covertedData } from '@/data/converted_data'
  
const Home = () => {
    const [courses, setCourses] = useState(covertedData);
    const [searchValue, setSearchValue] = useState('');

    const handleSelect=(e:string)=>{
        setCourses(covertedData.filter((course)=>course?.courseId.slice(0,2)===e));
    }

    const searchHandler=(e:any)=>{
        e.preventDefault();
        setCourses(covertedData.filter((course)=>course?.courseName.toLowerCase().includes(searchValue.toLowerCase())));
        setSearchValue('');
    }

    const handleCheckbox=(e:any)=>{
        if(!e){
            
            setCourses([...covertedData]);
            return;
        }
        let toBeConsidered=[];
        for(let currCourse  of covertedData){

            let totalstudent=0;
            let totalgpa=0;
            if(currCourse!=null){
                const {EX,A,B,C,D,P,F}=currCourse;
                totalstudent=EX+A+B+C+D+P+F;
                totalgpa=(EX*10+A*9+B*8+C*7+D*6+P*5)/totalstudent;

               if(totalgpa>=8.5 && totalstudent>=50){
                toBeConsidered.push({...currCourse,cg:totalgpa});
              }
            } 
        }
        
       toBeConsidered.sort((a,b)=>b.cg-a.cg);
       setCourses(toBeConsidered);
    }
    
  return (
    <div className='  h-[calc(100vh-4rem)] w-[100vw] flex flex-col gap-2  items-center pt-8'>
         <div className=' flex  items-center gap-2'>
             <form onSubmit={searchHandler}>
             <Input onChange={(e)=>setSearchValue(e.target.value)} value={searchValue} className=' w-[38vw]' type='text' placeholder='Search your favourite course'/>
             </form>
             <Select onValueChange={handleSelect}>
             <SelectTrigger className="w-[180px]">
             <SelectValue placeholder="All" />
             </SelectTrigger>
             <SelectContent >
                {dep.map((d,index)=>{
                    return(
                        <SelectItem key={index} value={d}>{d}</SelectItem>
                    )
                })}
            </SelectContent>
            </Select>
         </div>
         <div className=' flex gap-6  justify-center mt-2'>
          <div className="flex items-center space-x-2">
          <Checkbox id="terms" onCheckedChange={handleCheckbox}/>
            <label
              htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-500">
           GPA booster courses
            </label>
          </div>
          <div className="flex items-center space-x-2">
          <Checkbox onCheckedChange={handleCheckbox} id="terms"  />
            <label
              htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-500">
           According to your preference
            </label>
          </div>
          <div className="flex items-center space-x-2">
          <Checkbox id="terms" onCheckedChange={handleCheckbox} />
            <label
              htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-500">
           Boost your career goal
            </label>
          </div>
         </div>
         { courses.length>0 ? <Courses courses={courses} />:<h1 className='mt-20 text-2xl font-bold'>No courses found</h1>}
    </div>
  )
}

export default Home