import { UnderConstruction } from "@/components/layouts/underConstruction";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Dropdown, Label, TextInput } from "flowbite-react";
import { useState } from "react";

export default function Home({ }) {
  const [project, setProject] = useState('')
  function onChangeIt(it) {
    console.log(it)
  }
  const TableHeaderSection = <section>
    <div>
      <div className="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
        <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
          <div className="w-full  md:w-1/2">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <TextInput
                  type="text"
                  id="task"
                  placeholder="What are you working on?"
                />
              </div>
            </form>
          </div>
          <div className="flex flex-wrap p-3">
            <div className="p-2 flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
              <Dropdown label="" renderTrigger={() => <span className="flex flex-wrap items-center hover:text-blue-500">{project ? project : <><PlusIcon className="h-3.5 w-3.5 mr-2" />Project </>}</span>}>
                <Dropdown.Item onClick={() => setProject('Project 1')}> Project 1</Dropdown.Item>
                <Dropdown.Item onClick={() => setProject('Project 2')}>Project 2</Dropdown.Item>
              </Dropdown>
            </div>
            <div className="p-2 flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
              <Label>00:00:00</Label>
            </div>
            <div className="p-2 flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
              <Button>Start</Button>
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