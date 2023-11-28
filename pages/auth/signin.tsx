import { LoginForm } from "@/components/auth/signin";

export default function SignIn() {

    // useEffect(() => {
    //     console.log(session + "dsfsdf")
    //     if (session) {
    //       // router.push('/tracking');
    //     }
    //   }, []);

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <LoginForm />
            </section>
        </>
    )
}
