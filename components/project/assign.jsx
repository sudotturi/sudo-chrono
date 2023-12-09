
'use client';

import { isProjectAssigned } from '@/utils/constants';
import { CheckIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { Gender, ROLES } from '@prisma/client';
import { Button, Checkbox, Modal, Spinner, TextInput, Tooltip } from 'flowbite-react';
import { useEffect, useState } from 'react';

export default function AssignUser({ isAssigntModelOpen, setAssignModelOpen, projectId }) {

    const [saveLoading, setSaveLoading] = useState(false);
    const [data, setData] = useState([]);

    function onCloseModal() {
        setAssignModelOpen(false);
        setSaveLoading(false);
    }

    useEffect(() => {
        if (isAssigntModelOpen) {
            async function fetchData() {
                const response = await fetch(`/api/post?withAssign=${true}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                const json = await response.json();
                setData(json);
            }
            fetchData();
        } else {
            setData([])
        }
    }, [isAssigntModelOpen])

    const assignUser = async (userId, ind) => {
        try {
            setSaveLoading(true);
            const body = { userId, projectId };
            const res = await fetch(`/api/assign`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const assingUserValue = await res.json()
            onCloseModal();
        } catch (error) {
            console.error(error);
        }
    };

    const removeAssignUser = async (userId) => {
        try {
            setSaveLoading(true);
            const body = { userId, projectId };
            const res = await fetch(`/api/assign`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            onCloseModal();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Modal show={isAssigntModelOpen} onClose={() => onCloseModal()} size={"sm"}>
                <Modal.Header>Contributors</Modal.Header>
                <Modal.Body className='p-3'>
                    <table className='w-full'>
                        <tbody className='w-full'>
                            {data && data.map((user, ind) => {
                                return (
                                    <tr className="flex justify-between items-center">
                                        <td
                                            scope="row"
                                            className="flex items-center text-gray-900 whitespace-nowrap dark:text-white "
                                        >
                                            <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                                <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                            </div>
                                            <div className="ps-3">
                                                <div className="text-base font-semibold">{user.fullName}</div>
                                            </div>
                                        </td>
                                        <td>

                                            {isProjectAssigned(user.projectUser, projectId) ?
                                                <>   <Tooltip content="Remove"> <button onClick={() => removeAssignUser(user.id)} className="p-2 font-medium text-blue-600 hover:underline dark:text-cyan-500">
                                                    <XMarkIcon className="h-7 w-7 text-red-500" />
                                                </button></Tooltip></> : <Tooltip content="Assign"> <button onClick={() => assignUser(user.id, ind)} className="p-2 font-medium text-blue-600 hover:underline dark:text-cyan-500">
                                                    <PlusCircleIcon className="h-7 w-7 text-gray-500" />
                                                </button></Tooltip>}
                                        </td>
                                    </tr>)
                            })}

                        </tbody>
                    </table>
                </Modal.Body>

            </Modal>
        </>
    );
}
