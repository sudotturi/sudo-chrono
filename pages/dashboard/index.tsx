import ProjectHoursChart from "@/components/charts/doughnut";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";

export default function Home({ }) {
  const [total, setTotal] = useState(0);
  const [project, setTotalProjects] = useState(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/dashboard?chart=doughnut`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const json = await response.json();
      let tat = 0;
      Object.values(json).map((item:any)=>{
        tat += item;
      })
      setTotalProjects(Object.keys(json).length);
      tat = Math.round(tat);
      setTotal(tat);
      setData(json);
    }
    fetchData();
  }, [])

  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8 w-full">
      <div className="flex flex-wrap gap-4 border-b p-2">
       <Card className="max-w-sm">
        <div className="flex gap-2 items-center">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Total time 
      </h5>
      <p className="font-normal text-2xl text-gray-700 dark:text-gray-400">
      : {total}
      </p>
      </div>
      
    </Card>
   
    <Card  className="max-w-sm">
       
      <div className="flex gap-2 items-center">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Total Projects 
      </h5>
      <p className="font-normal text-2xl text-gray-700 dark:text-gray-400">
      : {project}
      </p>
      </div>
    </Card>
    </div>
    <div className=''>
    <ProjectHoursChart data={data} />
    </div>
    </div>
  )
}