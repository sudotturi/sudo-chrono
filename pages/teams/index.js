
import AddUser from "@/components/user/addUserModel";
import prisma from "@/lib/prisma";
import { CheckCircleIcon, LockClosedIcon, LockOpenIcon, PencilSquareIcon, PlusIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { useEffect, useState } from "react";


export default function Team({ feed, setLoading }) {

  
  useEffect(()=>{
    if(feed){
      setLoading(false)
    }
  },[feed, setLoading])

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
              <TableCell>
                <button onClick={() => editUser(ind)} className="p-2 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  <PencilSquareIcon className="h-5 w-5 text-gray-500" />
                </button>
                <button onClick={() => deleteUser(ind)} className="p-2 font-medium text-blue-600 hover:underline dark:text-cyan-500">
                  <TrashIcon className="h-5 w-5 text-red-500" />
                </button>
              </TableCell>
            </TableRow>
          })}

        </TableBody>
      </Table>
    </div >
  </>
  )
}

export const getServerSideProps = async () => {
  const feed = await prisma.user.findMany({
    select: {
      id: true,
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
    props: { feed }
  };
};

