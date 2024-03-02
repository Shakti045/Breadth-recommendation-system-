'use client'
 import {covertedData} from '@/data/converted_data';
 import {Chart, registerables} from "chart.js"
 import {Line} from "react-chartjs-2"
 import '../../globals.css'
Chart.register(...registerables);


const VisualizePage = ({params}:{params:{courseId:string}}) => {
const {courseId}=params;
  const filteredData=covertedData.filter((course)=>course?.courseId===courseId);
// console.log(filteredData)
  const datas=filteredData.map((course)=>{
    return {label:course?.session,data:[course?.EX,course?.A,course?.B,course?.C,course?.D,course?.P,course?.F],fill:false,borderColor:`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`,tension:0.1};
  });
  const labels = (['EX','A','B','C','D','P','F']);
const data = {
  labels: labels,
  datasets: [...datas],
};


  return (
    <div className=' h-[100vh] w-[100vw]  flex flex-col justify-center items-center'>
    <p className='text-neutral-400'>Grade Distribution For Course: {courseId}</p>
    <div className='graph-wrapper'>
    <Line height={500}  width={600} data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
    </div>

  )
}

export default VisualizePage;