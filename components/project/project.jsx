
'use client';

import {  getRandomHexColor } from '@/utils/constants';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { Button, Checkbox, Modal, Spinner, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';

export default function ProjectAction({ isProjectModelOpen, setProjectModelOpen, data, setData, mode, ind }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState("");
    const [access, setAccess] = useState("Private");
    const [archive, setArchive] = useState(false);
    const [color, setColor] = useState(getRandomHexColor());
    const [saveLoading, setSaveLoading] = useState(false);
    const isedit = mode == 'edit';
    const isadd = mode == 'add';
    const isdel = mode == 'delete';
    function onCloseModal() {
        setName('');
        setAccess('');
        setDescription('');
        setArchive(false);
        setColor(getRandomHexColor);
        setProjectModelOpen(false);
        setSaveLoading(false);
    }

    useEffect(() => {
        if (isProjectModelOpen && !isadd) {
            const model = data[ind];
            setName(model.name);
            setAccess(model.access);
            setDescription(model.description);
            setArchive(model.archive);
            setColor(model.color);
        }
    }, [isProjectModelOpen, data, ind, isadd])

    const submitData = async () => {
        try {
            setSaveLoading(true);
            const body = { description, name, access, archive, color };
            const res = await fetch(`/api/project`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            setSaveLoading(false);
            if (isadd) {
                const mer = data.concat([{
                    name,
                    access,
                    description,
                    archive,
                    color
                }]);
                setData(mer);
            } else if (isedit) {
                let newData = [].concat(data)
                newData[ind] = {
                    name,
                    access,
                    description,
                    archive,
                    color
                }
                setData(newData);
            }
            onCloseModal();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUser = async () => {
        try {
            setSaveLoading(true);
            const body = { name };
            await fetch(`/api/project`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            setSaveLoading(false);
            data.splice(ind, 1);
            setData(data);
            onCloseModal();
        } catch (error) {
            console.error(error);
        }
    };

    if (isdel) {
        return (<Modal show={isProjectModelOpen} size="md" onClose={() => onCloseModal()} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <ExclamationCircleIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this project?<br /> {name}
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={() => deleteUser()}>
                            {saveLoading ? "Deleting..." : "Yes, I'm sure"}
                        </Button>
                        <Button color="gray" onClick={() => onCloseModal()}>
                            No, cancel
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
        )
    }


    return (
        <>
            <Modal show={isProjectModelOpen} onClose={() => onCloseModal()} size={"sm"}>
                <Modal.Header>{!isedit ? "Add New Project" : "Edit Project"}</Modal.Header>
                <Modal.Body>
                    <div className="space-y-3">
                        <div className="grid gap-4">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Project Name
                                </label>
                                <TextInput
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter Full Name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="desc"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Description
                                </label>
                                <TextInput
                                    name="desc"
                                    id="desc"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    required
                                />
                            </div>
                            <div >
                                <label
                                    htmlFor="access"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Access
                                </label>
                                <select
                                    value={access}
                                    id="access"
                                    onChange={(event) => setAccess(event.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                    <option value="Private">Private</option>
                                    <option value="Public">Public</option>
                                </select>
                            </div>

                            <div className='flex gap-2 w-full justify-center flex-grow w-100'>

                                <div className="flex grow items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                    <Checkbox
                                        id="bordered-checkbox-2"
                                        checked={archive}
                                        name="bordered-checkbox"
                                        onChange={(event) => (setArchive(event.target.checked))}
                                        className=" w-100 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="bordered-checkbox-2"
                                        className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Archived
                                    </label>
                                </div>

                                <div className="flex grow items-center ps-4 border border-gray-200 rounded dark:border-gray-700">

                                    <input id="nativeColorPicker1" type="color" onChange={(event)=>setColor(event.target.value)} value={color} />
                                    <label
                                        htmlFor="nativeColorPicker1"
                                        className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Color
                                    </label>
                                </div>

                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {saveLoading ? (<Button><Spinner className='w-4 mr-2' />Submitting...</Button>) : <Button onClick={(event) => submitData()} type='submit'>{isedit ? "Edit User" : "Add User"}</Button>}
                    <Button color="gray" onClick={() => onCloseModal()}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
