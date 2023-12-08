import { UnderConstruction } from "@/components/layouts/underConstruction";
import prisma from "@/lib/prisma";
import { ClockIcon, InformationCircleIcon, ListBulletIcon, PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Alert, Button, Dropdown, Label, TextInput, Datepicker } from "flowbite-react";
import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";

export default function Home({ projects }) {
  const [project, setProject] = useState('')
  const [type, setType] = useState('clock')
  const [timer, setTimer] = useState(false);
  const [task, setTask] = useState('');
  const [error, setError] = useState('');
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  function getSecondsFromPrevTime(prevTime, shouldRound) {
    const now = new Date().getTime();
    const milliSecondsDistance = now - prevTime;
    if (milliSecondsDistance > 0) {
      const val = milliSecondsDistance / 1000;
      return Math.round(val);
    }
    return 0;
  }

  const deadline = Date.now();

  const getTime = () => {
    const time = Date.now() - deadline;
    setTotalSeconds(getSecondsFromPrevTime(deadline));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    if (timer) {
      const interval = setInterval(() => getTime(deadline), 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);


  function triggerTimer() {
    if (!task) {
      setError('Description is empty ')
    } else {
      if (timer) {
        setProject('');
        setTask('');
        setSeconds(0);
        setMinutes(0);
        setHours(0);
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
              {projects && projects?.map((proj) => {
                return (<Dropdown.Item onClick={() => setProject(proj.name)}> {proj.name}</Dropdown.Item>)
              })}
            </Dropdown>
          </div>
          {type && type == 'list' && <><Datepicker /><div className="flex flex-row space-x-2 items-center">
            <div>
              <label for="fromTime" ></label>
              <TextInput type="time" id="fromTime" name="fromTime" />
            </div>
            <span>-</span>
            <div>
              <label for="toTime" ></label>
              <TextInput type="time" id="toTime" name="toTime" />
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
          {type && type == 'list' ? <div >
            <Button onClick={() => triggerTimer()}>ADD</Button>
          </div> :
            <div className="">
              <Button onClick={() => triggerTimer()}>{timer ? 'Stop' : 'Start'}</Button>
            </div>
          }
          <div className="">
            <div class="flex flex-col">
              <button onClick={() => setType('clock')} ><ClockIcon className={clsx('h-5 w-5', type == 'clock' ? 'text-cyan-700' : '')} /></button>
              <button onClick={() => setType('list')}><ListBulletIcon className={clsx('h-5 w-5', type == 'list' ? 'text-cyan-700' : '')} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section >;
  return (

    <div>
      {TableHeaderSection}
    </div>
  )
}


export const getStaticProps = async () => {
  const projects = await prisma.project.findMany({
    select: {
      name: true,
      description: true
    }
  });
  return {
    props: { projects }
  };
};

