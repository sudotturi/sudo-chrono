import ProjectHoursChart from "@/components/charts/doughnut";
import {BarChart} from "@/components/charts/barChart";
import { useEffect, useMemo, useState } from "react";

export default function Home({ }) {
  const [total, setTotal] = useState(0);
  const [project, setTotalProjects] = useState(0);
  const [data, setData] = useState([]);
  const teamFilterConstant = useMemo(() => {
    return ['By Team', 'Only Me']
  },[]);
  const [teamFilter, setTeamFilter] = useState(teamFilterConstant[0]);
  useEffect(() => {
    async function fetchData() {
      const team = teamFilter == teamFilterConstant[0]?true: false;
      const response = await fetch(`/api/dashboard?chart=doughnut&team=${team}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const json = await response.json();
      let tat = 0;
      Object.values(json).map((item: any) => {
        tat += item.tat;
      })
      setTotalProjects(Object.keys(json).length);
      tat = Math.round(tat);
      setTotal(tat);
      setData(json);
    }
    fetchData();
  }, [teamFilter, teamFilterConstant])

  
  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8 w-full">
      <div className="flex justify-between text-center items-center">
        <span className="text-xl text-bold  text-center">
          Dashboard
        </span>
        <div>
          <select
            value={teamFilter}
            onChange={(event) => setTeamFilter(event.target.value)}
            id="role"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option value={teamFilterConstant[0]}>{teamFilterConstant[0]}</option>
            <option value={teamFilterConstant[1]}>{teamFilterConstant[1]}</option>
          </select>
        </div>
      </div>
      <div className="border-2 dark:border-black mt-4">
        <div className="grid  gap-4 grid-cols-2 p-3 divide-x dark:divide-black bg-gray-300 dark:bg-gray-700 border-b-2 dark:border-black">
          <div className="text-center "><h1>Total time</h1>
            <h1 className="text-3xl text-bold ">
              {total}
            </h1></div>
          <div className="text-center"><h1>Total project</h1><h1 className="text-3xl text-bold ">
            {project}
          </h1></div>
        </div>
        <div className="p-2">
          <BarChart data={data}/>
        </div>
        <div className="p-2">
          <ProjectHoursChart data={data}/>
        </div>
      </div>
    </div>
    
  )
}