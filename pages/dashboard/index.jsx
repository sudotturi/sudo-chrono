import ProjectHoursChart from "@/components/charts/doughnut";
import {BarChart} from "@/components/charts/barChart";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { formatDateToCustomString, formatTimeToHHMM, getTotalTime } from "@/utils/constants";

export default function Home({setLoading }) {
  const [total, setTotal] = useState(0);
  const [project, setTotalProjects] = useState(0);
  const [data, setData] = useState({labels: {}, track: []});
  const teamFilterConstant = useMemo(() => {
    return ['By Team', 'Only Me']
  },[]);
  const [teamFilter, setTeamFilter] = useState(teamFilterConstant[0]);

  const session = useSession();

  useEffect(() => {
    async function fetchData() {
      const team = teamFilter == teamFilterConstant[0]?true: false;
      const userData = "ADMIN" == session?.data?.user?.roles || "SUPER_ADMIN" == session?.data?.user?.roles;
      const response = await fetch(`/api/dashboard?chart=doughnut&team=${team}&userData=${userData}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const json = await response.json();
      let tat = 0;
      if(!userData){
        json.track = []
      }
      Object.values(json.labels).map((item) => {
        tat += item.tat;
      })
      setTotalProjects(Object.keys(json.labels).length);
      tat = Math.round(tat);
      setTotal(tat);
      setData(json);
      setLoading(false);
    }
    fetchData();
  }, [teamFilter, teamFilterConstant, session?.data?.user?.roles, setLoading])

  
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
          <BarChart data={data.labels}/>
        </div>
        <div className="p-2">
          <ProjectHoursChart data={data.labels}/>
        </div>
      </div>
      <div className="border-2 dark:border-black mt-4">
        <div className="grid  gap-4 grid-cols-2 p-3 divide-x dark:divide-black bg-gray-300 dark:bg-gray-700 border-b-2 dark:border-black">
          <div className=" "><h1>Team activities</h1></div>
        </div>
        <div className="p-2 overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
              <th scope="col" className="px-4 py-3">
                   Member
                </th>
                <th scope="col" className="px-4 py-3">
                  Date
                </th>
                <th scope="col" className="px-4 py-3">
                  Description
                </th>
                <th scope="col" className="px-4 py-3">
                  Project
                </th>
                <th scope="col" className="px-4 py-3">
                  Start Time
                </th>
                <th scope="col" className="px-4 py-3">
                  End Time
                </th>
                <th scope="col" className="px-4 py-3">
                  Total Time
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.track && data?.track.map((task, ind) => {
                return (<tr key={ind} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                 
                 <td className="px-4 py-2">
                    <span className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                     {task.user.fullName}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {formatDateToCustomString(new Date(task.startDate))}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {task.description}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {task.project.name}
                    </span>
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {formatTimeToHHMM(new Date(task.startDate))}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {formatTimeToHHMM(new Date(task.endDate))}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {getTotalTime(new Date(task.endDate), new Date(task.startDate))}
                  </td>
                </tr>)
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
  )
}