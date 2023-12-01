
import AddUser from "@/components/user/addUserModel";
import prisma from "@/lib/prisma";
import { CheckCircleIcon, LockClosedIcon, LockOpenIcon, PencilSquareIcon, PlusIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ROLES } from "@prisma/client";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { useEffect, useState } from "react";


export default function Team({ feed }) {


  const [data, setData] = useState(feed);
  const [mode, setMode] = useState('add');
  const [ind, setInd] = useState(0);
  const TableHeaderSection = <section>
    <div>
      <div className="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
        <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/2">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search"
                  required="" />
              </div>
            </form>
          </div>
          <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
            <button
              type="button"
              onClick={() => openAddUserModel()}
              className=" uppercase flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              <PlusIcon className="h-3.5 w-3.5 mr-2" />
              Add New Member
            </button>
            <div className="flex items-center w-full space-x-3 md:w-auto">
              <button
                id="actionsDropdownButton"
                data-dropdown-toggle="actionsDropdown"
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                <svg
                  className="-ml-1 mr-1.5 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
                Actions
              </button>
              <div
                id="actionsDropdown"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="actionsDropdownButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Mass Edit
                    </a>
                  </li>
                </ul>
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Delete all
                  </a>
                </div>
              </div>
              <button
                id="filterDropdownButton"
                data-dropdown-toggle="filterDropdown"
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-4 h-4 mr-2 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    clipRule="evenodd" />
                </svg>
                Filter
                <svg
                  className="-mr-1 ml-1.5 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </button>
              {/* Dropdown menu */}
              <div
                id="filterDropdown"
                className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
              >
                <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                  Category
                </h6>
                <ul
                  className="space-y-2 text-sm"
                  aria-labelledby="dropdownDefault"
                >
                  <li className="flex items-center">
                    <input
                      id="apple"
                      type="checkbox"
                      defaultValue=""
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    <label
                      htmlFor="apple"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Apple (56)
                    </label>
                  </li>
                  <li className="flex items-center">
                    <input
                      id="fitbit"
                      type="checkbox"
                      defaultValue=""
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    <label
                      htmlFor="fitbit"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Fitbit (56)
                    </label>
                  </li>
                  <li className="flex items-center">
                    <input
                      id="dell"
                      type="checkbox"
                      defaultValue=""
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    <label
                      htmlFor="dell"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Dell (56)
                    </label>
                  </li>
                  <li className="flex items-center">
                    <input
                      id="asus"
                      type="checkbox"
                      defaultValue=""
                      defaultChecked=""
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    <label
                      htmlFor="asus"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Asus (97)
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>;

  const [isAddUserModelOpen, setAddUserModelOpen] = useState(false);

  function openAddUserModel() {
    setMode('add');
    setAddUserModelOpen(true);
  }

  const edit = <>
    <>

      <div
        id="dropdownDotsHorizontal"
        className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownMenuIconHorizontalButton"
        >
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Earnings
            </a>
          </li>
        </ul>
        <div className="py-2">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Separated link
          </a>
        </div>
      </div>
    </>
  </>

  useEffect(() => {
    if (!isAddUserModelOpen) {
    }
  }, [isAddUserModelOpen])

  function editUser(ind) {
    setMode('edit');
    setInd(ind);
    setAddUserModelOpen(true);
  }

  function deleteUser(ind) {
    setMode('delete');
    setInd(ind);
    setAddUserModelOpen(true);
  }

  return (<>
    {TableHeaderSection}
    < div className="overflow-x-auto pt-1 md:pt-1" >
      <AddUser isAddUserModelOpen={isAddUserModelOpen} setAddUserModelOpen={setAddUserModelOpen} data={data} setData={setData} mode={mode} ind={ind} />
      <Table hoverable>
        <TableHead>
          <TableHeadCell>Full Name</TableHeadCell>
          <TableHeadCell>Email</TableHeadCell>
          <TableHeadCell>Gener</TableHeadCell>
          <TableHeadCell>Phone Number</TableHeadCell>
          <TableHeadCell>Role</TableHeadCell>
          <TableHeadCell>Active</TableHeadCell>
          <TableHeadCell>Locked</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Actions</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {data.map((user, ind) => {
            return <TableRow key={ind} className="bg-white dark:border-gray-700 dark:bg-gray-800">

              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {user.fullName}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.phoneNumber ? user.phoneNumber : ' - '}</TableCell>
              <TableCell>{user.roles}</TableCell>
              <TableCell>{user.isActive ? <CheckCircleIcon className="h-5 w-5 text-green-500" /> : <XCircleIcon className="h-5 w-5 text-red-500" />}</TableCell>
              <TableCell>{!user.isLocked ? <LockOpenIcon className="h-5 w-5 text-green-500" /> : <LockClosedIcon className="h-5 w-5 text-red-500" />}</TableCell>
              {user.roles == ROLES.SUPER_ADMIN ? (<> <TableCell>

              </TableCell>
              </>) : (<> <TableCell>
                <button onClick={() => editUser(ind)} className="p-2 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  <PencilSquareIcon className="h-5 w-5 text-gray-500" />
                </button>
                <button onClick={() => deleteUser(ind)} className="p-2 font-medium text-blue-600 hover:underline dark:text-cyan-500">
                  <TrashIcon className="h-5 w-5 text-red-500" />
                </button>
              </TableCell>
              </>)}

            </TableRow>
          })}

        </TableBody>
      </Table>
    </div >
  </>
  )
}

export const getStaticProps = async () => {
  const feed = await prisma.user.findMany({
    select: {
      email: true,
      username: true,
      fullName: true,
      dateOfBirth: true,
      gender: true,
      phoneNumber: true,
      roles: true,
      isActive: true,
      isLocked: true
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

