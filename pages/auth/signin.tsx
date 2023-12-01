import { LoginForm } from "@/components/auth/signin";
import { ReactElement } from "react";

export default function SignIn() {
    return (
        <LoginForm />
    )
}


SignIn.getLayout = function getLayout(page: ReactElement) {
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            {page}
        </section>
    )
}