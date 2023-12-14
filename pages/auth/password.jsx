
import Image from "next/image";
import SFBLACKFINAL from "@/public/SFBLACKFINAL.svg";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import {SmallSpiner} from '@/components/widgets/loading'
export default function Password({ setLoading }) {
    setLoading(false);
    const [loading, setLoad] = useState(false);
    const [formValues, setFormValues] = useState({
        password: "",
        confirmPassword: "",
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };
    useEffect(() => {
        setError('')
    }, [formValues])
    const router = useRouter();
    const submit = async () => {
        if (!formValues.password || !formValues.confirmPassword) {
            setError("Please fill in both password and confirm password fields.")
            return;
        }
        if (formValues.password != formValues.confirmPassword) {
            setError("Oops! It looks like your passwords don't match. Please try again.")
        }
        setLoad(true);
        const response = await fetch(`/api/pass`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formValues),
        });
        const re = await response.json();
        if (re.success) {
            console.log(re)
            await signOut({ callbackUrl: '/auth/signin' })
        } else {
            setError("Oops! Something wrong...")
        }
        setLoad(false);
    };
    const [error, setError] = useState("");
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {"Please update you're password"}
                        </h1>
                        <div className="space-y-4 md:space-y-6">
                            {error && (
                                <p className="text-center bg-red-300 py-1 mb-6 rounded">
                                    {error}
                                </p>
                            )}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    value={formValues.password}
                                    id="password"
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="cpassword"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Confirm  Password
                                </label>
                                <input
                                    required
                                    type="password"
                                    name="confirmPassword"
                                    value={formValues.confirmPassword}
                                    onChange={handleChange}
                                    id="cpassword"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>

                            <button
                                className="w-full text-white bg-primary-600 relative hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                disabled={loading}
                                onClick={submit}
                            >
                                {loading ? <SmallSpiner loadingText="Submitting..." /> : <span>Save</span>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


Password.getLayout = function getLayout(page) {
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            {page}
        </section>
    )
}