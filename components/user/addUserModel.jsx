
'use client';

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { Gender, ROLES } from '@prisma/client';
import { Alert, Button, Checkbox, Modal, Spinner, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import  { SmallSpiner } from '../widgets/loading';
import  { validateParams } from '@/utils/utils';
export default function AddUser({ isAddUserModelOpen, setAddUserModelOpen, data, setData, mode, ind }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setName] = useState("");
    const [username, setUserName] = useState("");
    const [id, setId] = useState("6576de5c30db76e0b0b3701e");
    const [phoneNumber, setPhone] = useState("");
    const [roles, setRole] = useState(ROLES.USER.toString());
    const [gender, setGender] = useState(Gender.MALE.toString());
    const [saveLoading, setSaveLoading] = useState(false);
    const [isActive, setActive] = useState(true);
    const [isLocked, setLocked] = useState(false);
    const [error, setError] = useState('');
    const isedit = mode == 'edit';
    const isadd = mode == 'add';
    const isdel = mode == 'delete';
    function onCloseModal() {
        setEmail('');
        setPassword('');
        setUserName('');
        setName('');
        setActive(true);
        setLocked(false);
        setPhone('');
        setRole(ROLES.USER.toString());
        setGender(Gender.MALE.toString());
        setAddUserModelOpen(false);
        setSaveLoading(false);
        setError('');
    }
    useEffect(() => {
        setError('')
    },[fullName, email, username, gender, roles, phoneNumber, password])

    useEffect(() => {
        if (isAddUserModelOpen && !isadd) {
            const us = data[ind];
            setError('');
            setEmail(us.email);
            setUserName(us.username);
            setName(us.fullName);
            setPhone(us.phoneNumber);
            setGender(us.gender);
            setRole(us.roles);
            setActive(us.isActive);
            setLocked(us.isLocked);
            setId(us.id);
        }
    }, [isAddUserModelOpen, data, ind, isadd])

    const submitData = async () => {
        try {
            const err = validateParams(fullName, email, username, gender, roles, phoneNumber, isedit?'test':password)
            if(err){
                setError(err);
                return;
            }
            setSaveLoading(true);
            setError('');
            const body = { fullName, email, username, gender, id, roles, phoneNumber, password, isActive, isLocked };
            const res = await fetch(`/api/post`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (res.status == 400) {
                const msg = await res.json();
                setError(msg.message);
                setSaveLoading(false);
                return;
            }
            setSaveLoading(false);
            if (isadd) {
                const mer = data.concat([{
                    id,
                    email,
                    username,
                    fullName,
                    dateOfBirth: null,
                    gender,
                    phoneNumber,
                    roles, isActive, isLocked
                }]);
                setData(mer);
            } else if (isedit) {
                let newData = [].concat(data)
                newData[ind] = {
                    id,
                    email,
                    username,
                    fullName,
                    dateOfBirth: null,
                    gender,
                    phoneNumber,
                    roles, isActive, isLocked
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
            const body = { username, roles, userId: id };
            const res = await fetch(`/api/post`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (res.status == 400) {
                const msg = await res.json();
                setError(msg.message);
                setSaveLoading(false);
                return;
            }
            setSaveLoading(false);
            data.splice(ind, 1);
            setData(data);
            onCloseModal();
        } catch (error) {
            console.error(error);
        }
    };

    if (isdel) {
        return (<Modal show={isAddUserModelOpen} size="md" onClose={() => onCloseModal()} popup>
            
            <Modal.Header />
            {error &&
                <Alert color="failure" icon={InformationCircleIcon} onDismiss={() => setError('')}>
                    <span className="font-medium"></span> {error}.
                </Alert>
            }
            <Modal.Body>
                <div className="text-center">
                    <ExclamationCircleIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this user?<br /> {email}
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
            <Modal show={isAddUserModelOpen} onClose={() => onCloseModal()} size="md">

                <Modal.Header>{!isedit ? "Add New Member" : "Edit Member"}</Modal.Header>
                {error &&
                    <Alert color="failure" icon={InformationCircleIcon} onDismiss={() => setError('')}>
                        <span className="font-medium"></span> {error}.
                    </Alert>
                }
                <Modal.Body className="overflow-x-auto max-h-96">
                    <div className="space-y-2">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    User Name
                                </label>
                                <TextInput
                                    disabled={isedit}
                                    name="username"
                                    id="username"
                                    placeholder="User Name"
                                    value={username}
                                    onChange={(event) => setUserName(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Full Name
                                </label>
                                <TextInput
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter Full Name"
                                    value={fullName}
                                    onChange={(event) => setName(event.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Email
                                </label>
                                <TextInput
                                    name="email"
                                    id="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="phone"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Phone
                                </label>
                                <TextInput
                                    name="phone"
                                    id="phone"
                                    placeholder="9876543210"
                                    required
                                    value={phoneNumber}
                                    onChange={(event) => setPhone(event.target.value)}
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="gender"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Gender
                                </label>
                                <select
                                    value={gender}
                                    id="gender"
                                    onChange={(event) => setGender(event.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="role"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Role
                                </label>
                                <select
                                    value={roles}
                                    onChange={(event) => setRole(event.target.value)}
                                    id="role"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                    <option>Select Role</option>
                                    <option value={ROLES.ADMIN}>Admin</option>
                                    <option value={ROLES.USER}>Team Member</option>
                                </select>
                            </div>


                        </div>
                        <>
                            {isadd && <div >
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <TextInput
                                    name="password"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                            </div>}
                            <div className="m-1">
                                <Checkbox

                                    id="bordered-checkbox-1"
                                    checked={isActive}
                                    onChange={(event) => (setActive(event.target.checked))}
                                    name="bordered-checkbox"
                                    className="w-4 grow flex-grow h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor="bordered-checkbox-1"
                                    className="w-full py-4 flex-grow  ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Active
                                </label>
                            </div>

                        </>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {saveLoading ? (<Button> <SmallSpiner loadingText={"Submitting..."} /> </Button>) : <Button onClick={(event) => submitData()} type='submit'>{isedit ? "Edit User" : "Add User"}</Button>}
                    <Button color="gray" onClick={() => onCloseModal()}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
