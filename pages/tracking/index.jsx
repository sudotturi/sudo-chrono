import { UnderConstruction } from "@/components/layouts/underConstruction";
import prisma from "@/lib/prisma";
import { formatDateToCustomString, formatTimeToHHMM, getSecondsFromPrevTime, getTotalTime } from "@/utils/constants";
import { ClockIcon, InformationCircleIcon, ListBulletIcon, PencilSquareIcon, PlusCircleIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Alert, Button, Dropdown, Label, TextInput, Datepicker } from "flowbite-react";
import { getSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";

export default function Home() {
  const [project, setProject] = useState('');
  const [projectId, setProjectId] = useState('');
  const [id, setId] = useState('656b8e0fc4d3dc9f717c5df2');
  const [type, setType] = useState('clock')
  const [timer, setTimer] = useState(false);
  const [task, setTask] = useState('');
  const [from, setFrom] = useState('');
  const [date, setDate] = useState(new Date());
  const [to, setTo] = useState('');
  const [error, setError] = useState('');
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);



  const [startDate, setStartDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/track`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const json = await response.json();
      const projectsRes = await fetch(`/api/project?forTrack=${true}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const projectsData = await projectsRes.json();
      setProjects(projectsData);
      if (json) {
        const curr = json.filter((item) => !item.endDate);
        if (curr && curr.length > 0) {
          const currData = curr[0]
          setStartDate(new Date(currData.startDate));
          setProject(currData.project.name);
          setProjectId(currData.projectId);
          setTask(currData.description);
          setId(currData.id)
          const time = Date.now() - new Date(currData.startDate).getTime();
          setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
          setMinutes(Math.floor((time / 1000 / 60) % 60));
          setSeconds(Math.floor((time / 1000) % 60));
          setTimer(true);
        }
      }
      setData(json.filter((item) => item.endDate));
    }
    fetchData();
  }, [])


  useEffect(() => {
    function getTime() {
      const time = Date.now() - startDate.getTime();
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    }
    if (timer && type == 'clock') {
      const interval = setInterval(() => getTime(), 1000);

      return () => clearInterval(interval);
    }
  }, [timer, startDate, type]);

  async function createTrack(endDate) {
    const body = {
      startDate,
      endDate,
      description: task,
      projectId, id: id
    };
    if (type == 'list') {
      var [hours, minutes] = from.split(':').map(Number);
      var [toHours, toHours] = to.split(':').map(Number);
      const fromDate = new Date(date.getTime());
      const toDate = new Date(date.getTime());;
      toDate.setHours(toHours, toHours);
      fromDate.setHours(hours, minutes);
      var currentDate = date.toISOString().slice(0, 10);
      body.startDate = new Date(currentDate + 'T' + fromDate.toTimeString().slice(0, 8));
      body.endDate = new Date(currentDate + 'T' + toDate.toTimeString().slice(0, 8));
    }
    const res = await fetch(`/api/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    setId(json.id);
    if (json.endDate) {
      let newData = data.concat([json]);
      setData(newData);
    }
  }

  async function deleteTrack(ind, id) {

    const body = { id };
    const res = await fetch(`/api/track`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    let newDate = [].concat(data);
    newDate.splice(ind, 1);
    setData(newDate);
  }

  function triggerTimer() {
    const isList = type == 'list'
    if (!project) {
      setError('Please select project');
      return;
    }
    if (isList && !from) {
      setError('Please select Start Time');
      return;
    }
    if (isList && !to) {
      setError('Please select End Time');
      return;
    }
    if (!task) {
      setError('Description is empty ');
    } else {
      if (timer || isList) {
        createTrack(new Date());
        setProject('');
        setTask('');
        setSeconds(0);
        setMinutes(0);
        setHours(0);
        setFrom('');
        setTo('');
      } else {
        setStartDate(new Date());
        createTrack(null);
      }
      setTimer(!timer);
    }
  }

  const TableHeaderSection = <section>
    <div>
      {error &&
        <Alert color="failure" icon={InformationCircleIcon} onDismiss={() => setError('')}>
          <span className="font-medium"></span> {error}.
        </Alert>
      }
      <div className="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
        <div className="p-2 flex flex-wrap items-center gap-2 justify-end">
          <div className="flex-grow">
            <label htmlFor="task" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <TextInput
                type="text"
                id="task"
                placeholder="What are you working on?"
                onChange={(event) => { setTask(event.target.value); setError('') }}
                value={task}
              />
            </div>
          </div>
          <div className="block border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg">
            <Dropdown id='project' renderTrigger={() => <span className="flex flex-wrap items-center hover:text-blue-500">{project ? project : <><PlusCircleIcon className="h-5 w-5 mr-1" />Project </>}</span>}>
              {projects && projects?.map((proj, ind) => {
                return (<Dropdown.Item key={ind} onClick={() => { setProject(proj.name); setProjectId(proj.id) }}> {proj.name}</Dropdown.Item>)
              })}
            </Dropdown>
          </div>
          {type && type == 'list' && <><Datepicker onSelectedDateChanged={(date) => { setDate(date) }} />
          <div className="flex flex-row gap-1 items-center">
            <div>
              <label htmlFor="fromTime" ></label>
              <TextInput type="time" id="fromTime" name="fromTime" value={from} onChange={(event) => setFrom(event.target.value)} />
            </div>
            <span>-</span>
            <div>
              <label htmlFor="toTime" ></label>
              <TextInput type="time" id="toTime" name="toTime" value={to} onChange={(event) => setTo(event.target.value)} />
            </div>
          </div></>}
          {type && type == 'clock' &&
            <div className="p-2 block border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg">
              <Label>
                <span>{String(hours).padStart(2, "0")}</span>:
                <span>{String(minutes).padStart(2, "0")}</span>:
                <span>{String(seconds).padStart(2, "0")}</span></Label>
            </div>
          }
          <div className="flex gap-2">
          {type && type == 'list' ? <div >
            <Button onClick={() => triggerTimer()}>ADD</Button>
          </div> :
            <div className="">
              <Button onClick={() => triggerTimer()}>{timer ? 'Stop' : 'Start'}</Button>
            </div>
          }
          <div className="">
            <div className="flex flex-col">
              <button onClick={() => setType('clock')} ><ClockIcon className={clsx('h-5 w-5', type == 'clock' ? 'text-cyan-700' : '')} /></button>
              <button onClick={() => setType('list')}><ListBulletIcon className={clsx('h-5 w-5', type == 'list' ? 'text-cyan-700' : '')} /></button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </section >;
  return (

    <div>
      {TableHeaderSection}
      <div className="mt-5 relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg border dark:border-gray-600">
        <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4 border-b dark:border-gray-600">
          <div className="flex items-center flex-1 space-x-4">
            <h5>
              <span className="text-gray-500 ">Tasks & Tracking</span>
            </h5>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all"
                    type="checkbox"
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all" className="sr-only">
                    checkbox
                  </label>
                </div>
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
              <th scope="col" className="px-4 py-3">
              
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((task, ind) => {
              return (<tr key={ind} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="w-4 px-4 py-3">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-table-search-1" className="sr-only">
                      checkbox
                    </label>
                  </div>
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
                <td className="px-4 py-2">
                  <button onClick={() => deleteTrack(ind, task.id)} className="p-2 font-medium text-blue-600 hover:underline dark:text-cyan-500">
                    <TrashIcon className="h-5 w-5 text-red-500" />
                  </button>
                </td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
