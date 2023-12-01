
'use client';

import { Gender, ROLES } from '@prisma/client';
import { Button, Checkbox, Label, Modal, Spinner, TextInput } from 'flowbite-react';
import { title } from 'process';
import { useEffect, useState } from 'react';

export default function AddUser({ isAddUserModelOpen, setAddUserModelOpen, feed, setData }) {

    const [email, setEmail] = useState('');
    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState(ROLES.USER.toString());
    const [gender, setGender] = useState(Gender.MALE.toString());
    const [saveLoading, setSaveLoading] = useState(false);

    function onCloseModal() {
        setEmail('');
        setUserName('');
        setName('');
        setRole(ROLES.USER.toString());
        setGender(Gender.MALE.toString());
        setAddUserModelOpen(false);
        setSaveLoading(false);
    }


    const submitData = async () => {
        try {
            setSaveLoading(true);
            const body = { name, email, username, gender, role, phone };
            await fetch(`/api/post`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            setSaveLoading(false);
            const data = [{
                email: true,
                username: true,
                fullName: true,
                dateOfBirth: true,
                gender: true,
                phoneNumber: true,
                roles: true
            }]
            data.concat(feed);
            console.log(data)
            setData(data);
            onCloseModal();
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <form className="p-4 md:p-5" >
                <Modal show={isAddUserModelOpen} onClose={() => onCloseModal()}>
                    <Modal.Header>Add New Member</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <div className="grid gap-4 mb-4 grid-cols-2">
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
                                        value={name}
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
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        User Name
                                    </label>
                                    <TextInput
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
                                        value={phone}
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
                                        <option value="Female">Female</option>
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
                                        value={role}
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
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {saveLoading ? (<Button><Spinner className='w-4 mr-2' />Submitting...</Button>) : <Button onClick={(event) => submitData()} type='submit'>Add User</Button>}
                        <Button color="gray" onClick={() => onCloseModal()}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </form>
        </>
    );
}
