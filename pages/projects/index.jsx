import ProjectAction from "@/components/project/project";
import AssignUser from "@/components/project/assign";
import { CheckCircleIcon, PencilSquareIcon, TrashIcon, UserGroupIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function Project({ }) {

  const [data, setData] = useState([]);
  const [mode, setMode] = useState('add');
  const [ind, setInd] = useState(0);
  const [projectId, setProjectId] = useState('656a1eb2dbe4290dd25a7bb4');

  const [isProjectModelOpen, setProjectModelOpen] = useState(false);

  const [isAssigntModelOpen, setAssignModelOpen] = useState(false);

  function openAddUserModel() {
    setMode('add');
    setProjectModelOpen(true);
  }

  useEffect(() => {
    if (!isProjectModelOpen) {
    }
  }, [isProjectModelOpen])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/project`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, [])
  function editUser(ind) {
    setMode('edit');
    setInd(ind);
    setProjectModelOpen(true);
  }

  function assignUsers(projectId) {
    setProjectId(projectId)
    setAssignModelOpen(true);
  }

  function deleteUser(ind) {
    setMode('delete');
    setInd(ind);
    setProjectModelOpen(true);
  }

  return (
    <div>
      <ProjectAction isProjectModelOpen={isProjectModelOpen} setProjectModelOpen={setProjectModelOpen} data={data} mode={mode} setData={setData} ind={ind} />
      <AssignUser isAssigntModelOpen={isAssigntModelOpen} setAssignModelOpen={setAssignModelOpen} projectId={projectId} />
      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg border dark:border-gray-600">
        <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4 border-b dark:border-gray-600">
          <div className="flex items-center flex-1 space-x-4">
            <h5>
              <span className="text-gray-500 ">All Projects</span>
            </h5>
          </div>
          <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
            <button
              type="button"
              onClick={() => setProjectModelOpen(true)}
              className="uppercase flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              <svg
                className="h-3.5 w-3.5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                />
              </svg>
              Add new project
            </button>
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
                  Project
                </th>
                <th scope="col" className="px-4 py-3">
                  Description
                </th>
                <th scope="col" className="px-4 py-3">
                  Access
                </th>
                <th scope="col" className="px-4 py-3">
                  Archived
                </th>
                <th scope="col" className="px-4 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((project, ind) => {
                return (
                  <tr key={ind} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
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
                        {project.name}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {project.description}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {project.access}
                      </span>
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {project.archive ? <CheckCircleIcon className="h-5 w-5 text-green-500" /> : <XCircleIcon className="h-5 w-5 text-red-500" />}
                    </td> <td className="px-4 py-2">
                      {project.access && project.access == 'Private' && <button onClick={() => assignUsers(project.id)} className="p-2 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                        <UserGroupIcon className="h-5 w-5 text-gray-500" />
                      </button>}
                    
                      <button onClick={() => editUser(ind)} className="p-2 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                        <PencilSquareIcon className="h-5 w-5 text-gray-500" />
                      </button>
                      <button onClick={() => deleteUser(ind)} className="p-2 font-medium text-blue-600 hover:underline dark:text-cyan-500">
                        <TrashIcon className="h-5 w-5 text-red-500" />
                      </button>
                    </td>
                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>
        <nav
          className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
          aria-label="Table navigation"
        >
          {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span className="font-semibold text-gray-900 dark:text-white">
                1-10
              </span>
              of
              <span className="font-semibold text-gray-900 dark:text-white">
                1000
              </span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight border text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  ...
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  100
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul> */}
        </nav>
      </div>
    </div>
  )
}