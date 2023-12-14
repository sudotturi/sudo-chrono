import { LoginForm } from "@/components/auth/signin";

export default function SignIn({setLoading}) {
    setLoading(false);
    return (
        <LoginForm />
    )
}


SignIn.getLayout = function getLayout(page) {
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            {page}
        </section>
    )
}